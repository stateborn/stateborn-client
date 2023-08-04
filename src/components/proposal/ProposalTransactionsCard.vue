<template>
  <div class="row items-center">
    <div class="col-6">
      <q-card class="stateborn-card grow q-ma-xs q-pa-xs">
        <div class="row justify-center text-center items-center q-pt-xs" style="height:50px">
          <div class="col-auto justify-center items-center">
            <div class="text-subtitle2" style="line-height: 1.5rem">
              <span class="text-bold">Transactions</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-grow">
            <q-timeline layout="dense" side="right" color="grey-7">
              <q-timeline-entry
                style="height:40px"
                title=""
                subtitle="Created off-chain - transaction added to proposal"
                :icon="transactionStatus === ProposalTransactionStatus.CREATED_OFFCHAIN ? 'fa-solid fa-circle-plus' : undefined"
                :color="transactionStatus === ProposalTransactionStatus.CREATED_OFFCHAIN ? 'green' : ''"
                :class="transactionStatus === ProposalTransactionStatus.CREATED_OFFCHAIN ? 'noisegreen' : ''"
                side="left">
              </q-timeline-entry>
              <q-timeline-entry
                style="height:40px"
                title=""
                v-if="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED"
                subtitle="Rejected - proposal did not pass"
                :icon="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED ? 'fa-solid fa-circle-plus' : undefined"
                :color="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED ? 'green' : ''"
                :class="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED ? 'noisered' : ''"
                side="left">
              </q-timeline-entry>
              <q-timeline-entry
                :class="transactionStatus === ProposalTransactionStatus.CREATED_ON_CHAIN ? 'noisegreen' : ''"
                :icon="transactionStatus === ProposalTransactionStatus.CREATED_ON_CHAIN ? 'fa-solid fa-cube' : undefined"
                :color=" transactionStatus === ProposalTransactionStatus.CREATED_ON_CHAIN? 'green-9' : ''"
                subtitle="Created on-chain"
                side="left"
              >
                <div class="row text-subtitle2">
                  <div class="col-auto text-bold">Overview</div>
                  <div class="col-grow text-right">Proposal passed. Transaction proposal created on-chain</div>
                </div>
                <span class="text-primary"></span>
                <div class="row text-subtitle2">
                  <div class="col-auto text-bold">Tx hash</div>
                  <div class="col-grow text-right">{{ txHash }}
                    <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                           @click="goToEtherscanTx(txHash, rows[0].chainId)"/>
                  </div>
                </div>
              </q-timeline-entry>
              <q-timeline-entry
                subtitle="Executed"
                :style="transactionStatus === ProposalTransactionStatus.EXECUTED ? '': 'height:40px'"
                :class="transactionStatus === ProposalTransactionStatus.EXECUTED ? 'noisegreen' : ''"
                :icon="transactionStatus === ProposalTransactionStatus.EXECUTED ? 'fa-solid fa-cube' : undefined"
                :color=" transactionStatus === ProposalTransactionStatus.EXECUTED? 'green-9' : ''"
                side="left">
              </q-timeline-entry>
            </q-timeline>
          </div>
        </div>
      </q-card>
    </div>
    <div class="col-6 items-center">
      <q-list class="rounded-borders" style="max-height: 400px; overflow: auto">
        <q-item v-for="item in rows" class="q-ma-lg bodynoise" dense>

          <q-item-section avatar>
            <!--            <q-badge style="padding:5px" :label="item.tokenType"-->
            <!--                     :color="item.tokenType === TokenType.ERC20 ? 'primary' : 'secondary'"-->
            <!--                     :text-color="item.tokenType === TokenType.ERC20 ? 'white' : 'black'"></q-badge>-->
            <div class="q-pa-xs">
              <span class="text-primary text-bold">{{ item.amount }} {{ item.tokenSymbol }}</span>
              <q-item-label caption class="text-primary">
                Transfer amount
              </q-item-label>
            </div>
          </q-item-section>

          <q-item-section>
            <q-item-label overline class="text-primary text-bold">Description #1</q-item-label>
            <q-separator class="q-mb-md"></q-separator>

            <!--            <div class="q-pa-xs">-->
            <!--              <span  class="text-primary text-bold"> Transfer ERC-20 tokens</span>-->
            <!--              <q-item-label caption class="text-primary">-->
            <!--                Transaction description-->
            <!--              </q-item-label>-->
            <!--            </div>-->
            <div class="row text-subtitle2">
              <div class="col-auto text-bold">Description</div>
              <div class="col-grow text-right">
                <q-badge style="padding:5px" :label="`TRANSFER ${item.tokenType}`"
                         :color="item.tokenType === TokenType.ERC20 ? 'primary' : 'secondary'"
                         :text-color="item.tokenType === TokenType.ERC20 ? 'white' : 'black'"></q-badge>
                <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px;padding-right:5px">
                  <q-tooltip class="stateborn-tooltip">
                    All votes - all addresses votes including changed votes<br>
                    Unique votes - only final addresses vote (last submitted), 1 vote/address
                  </q-tooltip>
                </q-icon>
              </div>
            </div>
            <div class="row text-subtitle2">
              <div class="col-auto text-bold">Receiver</div>
              <div class="col-grow text-right">{{ item.transferToAddress }}
                <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                       @click="goToEtherscan(item.transferToAddress, item.chainId)"/>
              </div>
            </div>
            <div class="row text-subtitle2">
              <div class="col-auto text-bold">Token</div>
              <div class="col-grow text-right">{{ item.token }}
                <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                       @click="goToEtherscan(item.tokenAddress, item.chainId)"/>
              </div>
            </div>


            <!--            <q-item-label>{{ item.transferToAddress }}-->
            <!--              <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscan(item.transferToAddress, item.chainId)"/>-->
            <!--            </q-item-label>-->
            <!--            <q-item-label caption class="text-primary">-->
            <!--              Receiver address-->
            <!--            </q-item-label>-->
            <!--            <q-item-label>{{ item.token }}-->
            <!--              <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscan(item.tokenAddress, item.chainId)"/>-->
            <!--            </q-item-label>-->
            <!--            <q-item-label caption class="text-primary">-->
            <!--              Token-->
            <!--            </q-item-label>-->

          </q-item-section>
          <!--          <q-item-section side>-->
          <!--            <div class="q-pa-xs">-->
          <!--              <span  class="text-primary text-bold">{{item.amount}} {{item.tokenSymbol}}</span>-->
          <!--              <q-item-label caption class="text-primary">-->
          <!--                Transaction amount-->
          <!--              </q-item-label>-->
          <!--            </div>-->
          <!--          </q-item-section>-->

        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';
import { TransferErc20TransactionData } from 'src/api/model/ipfs/proposal-transaction/transfer-erc-20-transaction-data';
import { api } from 'boot/axios';
import { ProposalTransactionAggregateDto } from 'src/api/dto/proposal-transaction-aggregate-dto';
import { ProposalTransactionStatus } from 'src/api/model/proposal-transaction-status';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { goToEtherscan, goToEtherscanTx } from 'src/api/services/utils-service';
import { ProposalTransactionType } from 'src/api/model/ipfs/proposal-transaction-type';

const rows = ref([]);
const props = defineProps(['transactions', 'proposalIpfsHash']);
const ethConnectionStore = useEthConnectionStore();
const txHash = ref('');
const transactionStatus = ref(ProposalTransactionStatus.SAVED);
const fillTable = async () => {
  const lista = [props.transactions[0]];
  rows.value = lista.map((_: ClientProposalTransaction) => {
    const data = _.data as TransferErc20TransactionData;
    return {
      transactionType: _.transactionType,
      token: `${data.token.name} (${data.token.symbol})`,
      tokenAddress: data.token.address,
      transferToAddress: data.transferToAddress,
      amount: _.transactionType === ProposalTransactionType.TRANSFER_ERC_20_TOKENS ? data.transferAmount : '',
      tokenId: _.transactionType === ProposalTransactionType.TRANSFER_NFT_TOKEN ? data.transferAmount : '',
      tokenSymbol: data.token.symbol,
      chainId: data.token.chainId,
      tokenType: data.token.type,
    }
  });
};
const fetchTransactionAggregate = async () => {
  if (props.proposalIpfsHash) {
    const res = await api.get(`/api/rest/v1/proposal/${props.proposalIpfsHash}/transactions`);
    const proposalTransactionAggregateDto: ProposalTransactionAggregateDto = <ProposalTransactionAggregateDto>res.data;
    txHash.value = proposalTransactionAggregateDto.txHash ?? '';
    transactionStatus.value = proposalTransactionAggregateDto.transactionStatus;
  }
};
watch(() => [props.transactions], () => {
  fillTable();
});
watch(() => [props.proposalIpfsHash], () => {
  fetchTransactionAggregate();
});
fillTable();
fetchTransactionAggregate();
</script>
