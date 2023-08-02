<template>
  <q-table
    square
    :class="thereAreNoInvalidVotes ? (someVotesAreNotVerified ? 'noiseredcard' : 'stateborn-card') : 'noiseredcard'"
    dense
    title="Proposal transactions"
    :rows="rows"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:body="props">
      <q-tr :props="props" class="text-subtitle2" >
        <q-td key="transactionType" :props="props" >
          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pr-md">
            <q-tooltip class="stateborn-tooltip">
              Transaction description: send {{props.row.amount}} {{props.row.tokenSymbol}} tokens from DAO to address {{props.row.transferToAddress}}.
            </q-tooltip>
          </q-icon>
          <q-badge style="padding:5px">
            {{ props.row.transactionType.replaceAll('_' , ' ').replace('ERC 20', 'ERC-20') }}
          </q-badge>
        </q-td>
        <q-td key="token" :props="props">
          {{ props.row.token }}
        </q-td>
        <q-td key="tokenAddress" :props="props">
          {{ props.row.tokenAddress }}
          <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square"
                 @click="goToEtherscan(props.row.tokenAddress, props.row.chainId)"/>
        </q-td>
        <q-td key="transferToAddress" :props="props">
          {{ props.row.transferToAddress }}
          <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square"
                 @click="goToEtherscan(props.row.transferToAddress, props.row.chainId)"/>
        </q-td>
        <q-td key="amount" :props="props">
          {{ props.row.amount }} {{props.row.tokenSymbol}}
        </q-td>
      </q-tr>
    </template>
    <template v-slot:no-data="{ icon, message, filter }">
      <div class="full-width row flex-center q-gutter-sm text-primary">
        <span>
           No data found
          </span>
        <q-icon name="fa-solid fa-triangle-exclamation" />
      </div>
    </template>
  </q-table>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getAllUserVotes } from 'src/api/services/vote-service';
import { goToEtherscan, goToIpfs } from 'src/api/services/utils-service';
import { VoteDataSource } from 'src/api/model/vote-data-source';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { abiEncodeVote } from 'src/api/services/signature-service';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';
import { TransferErc20TransactionData } from 'src/api/model/ipfs/proposal-transaction/transfer-erc-20-transaction-data';

const columns = [
  {
    name: 'transactionType', label: 'Transaction type', align: 'left', field: 'transactionType', format: (val) => `${val}`, sortable: false,
  },
  {
    name: 'token', align: 'left', label: 'Token', field: 'token', sortable: true,
  },
  {
    name: 'tokenAddress', label: 'Token address', field: 'tokenAddress', align: 'left',
  },
  {
    name: 'transferToAddress', label: 'Transfer to address', field: 'transferToAddress', sortable: true, align: 'left',
  },
  {
    name: 'amount', label: 'Amount', field: 'amount', sortable: false, align: 'center',
  },
];
const rows = ref([]);
const thereAreNoInvalidVotes = ref(true);
const someVotesAreNotVerified = ref(false);
const isLoading = ref(true);
const props = defineProps(['transactions']);
const ethConnectionStore = useEthConnectionStore();
const fillTable = async () => {
  rows.value = props.transactions.map((_: ClientProposalTransaction) => {
    const data = _.data as TransferErc20TransactionData;
    return {
      transactionType: _.transactionType,
      token: `${data.token.name} (${data.token.symbol})`,
      tokenAddress: data.token.address,
      transferToAddress: data.transferToAddress,
      amount: data.transferAmount,
      tokenSymbol: data.token.symbol,
      chainId: data.token.chainId,
    }
  });
};
watch(() => [props.transactions],  () => {
  fillTable();
});
fillTable();

</script>
