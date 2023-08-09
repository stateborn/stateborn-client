<template>
  <div style="height:350px">
    <div class="row justify-center items-center">
      <div class="col-auto q-pa-xs justify-center">
        <q-icon name="fa-solid fa-cube" color="primary" style="font-size: 1.3rem !important;"></q-icon>
      </div>
      <div class="col-auto justify-center">
        <div class="text-h6 text-center" >
          Transactions   <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
          <q-tooltip class="stateborn-tooltip">
            Transactions to be executed if proposal passes.<br>
            These transactions will be <b class="text-red">executed only all together</b> if proposal passes.<br>
          </q-tooltip>
        </q-icon>
        </div>
      </div>
    </div>
    <q-separator class="q-ma-xs"></q-separator>

    <div class="row q-mt-md">
      <div class="col-xl-6 col-xs-auto ">
        <q-card class="stateborn-card q-pl-md">
          <div class="row">
            <div class="col-grow">
              <span class="text-h6">Timeline</span>
              <q-timeline layout="dense" side="right" color="grey-7">
                <q-timeline-entry

                  subtitle="1. Created off-chain - transaction added to proposal"
                  :style="transactionStatus === ProposalTransactionStatus.CREATED_OFFCHAIN ? '': 'height:40px'"
                  :icon="(transactionStatus === ProposalTransactionStatus.CREATED_OFFCHAIN || transactionStatus=== ProposalTransactionStatus.CREATED_ON_CHAIN) ? 'fa-solid fa-check' : undefined"
                  :color="(transactionStatus === ProposalTransactionStatus.CREATED_OFFCHAIN || transactionStatus=== ProposalTransactionStatus.CREATED_ON_CHAIN) ? 'green-9' : ''"
                  :class="transactionStatus === ProposalTransactionStatus.CREATED_OFFCHAIN ? 'noisegreen' : ''"
                  side="left">
                  <div v-if="transactionStatus === ProposalTransactionStatus.CREATED_OFFCHAIN" >
                    <div class="row text-subtitle2">
                      <div class="col-2 text-bold sectionName">Overview</div>
                      <div class="col-10 text-right ">Transaction added to off-chain proposal description <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToIpfs(proposalIpfsHash)"/>
                        <br> Proposal is now under voting.</div>
                    </div>
                    <span class="text-primary"></span>
                  </div>
                </q-timeline-entry>
                <q-timeline-entry
                  :style="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED ? '': 'height:40px'"
                  title=""
                  v-if="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED"
                  subtitle="1. Rejected - proposal did not pass"
                  :icon="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED ? 'fa-solid fa-circle-plus' : undefined"
                  :color="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED ? 'green' : ''"
                  :class="transactionStatus === ProposalTransactionStatus.PROPOSAL_REJECTED ? 'noisered' : ''"
                  side="left">
                </q-timeline-entry>
                <q-timeline-entry
                  :style="transactionStatus === ProposalTransactionStatus.CREATED_ON_CHAIN ? '': 'height:40px'"
                  :class="transactionStatus === ProposalTransactionStatus.CREATED_ON_CHAIN ? 'noisegreen' : ''"
                  :icon="transactionStatus === ProposalTransactionStatus.CREATED_ON_CHAIN ? 'fa-solid fa-check' : undefined"
                  :color=" transactionStatus === ProposalTransactionStatus.CREATED_ON_CHAIN? 'green-9' : ''"
                  subtitle="2. Created on-chain - transaction proposal created on-chain"
                  side="left"
                >
                  <div v-if="transactionStatus === ProposalTransactionStatus.CREATED_ON_CHAIN">
                    <div class="row text-subtitle2">
                      <div class="col-auto text-bold sectionName">Overview</div>
                      <div class="col-grow text-right">Proposal passed. Transaction proposal created on-chain.</div>
                    </div>
                    <span class="text-primary"></span>
                    <div class="row text-subtitle2">
                      <div class="col-auto text-bold sectionName">Tx hash</div>
                      <div class="col-grow text-right">{{ `${txHash.substring(0, 40)}...` }}
                        <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                               @click="goToEtherscanTx(txHash, rows[0].chainId)"/>
                      </div>
                    </div>
                    <div class="row text-subtitle2">
                      <div class="col-auto text-bold sectionName">Proposal address</div>
                      <div class="col-grow text-right numberfont " >{{address}}
                      <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                             @click="goToEtherscan(address, rows[0].chainId)"/>
                      </div>
                    </div>
                  </div>
                </q-timeline-entry>
                <q-timeline-entry
                  subtitle="3. Executed"
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
        <q-scroll-area style="height: 295px; width:100%">
          <q-list class="rounded-borders">
            <q-item v-for="item in rows" class="q-ml-md q-mr-md q-mb-md bodynoise" dense>
              <q-item-section>
                <q-item-label overline class="text-primary text-bold">{{item.description}}</q-item-label>
                <q-separator class="q-mb-md"></q-separator>
                <div class="row text-subtitle2">
                  <div class="col-auto text-bold sectionName">Description</div>
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
                  <div class="col-auto text-bold sectionName">Transfer amount</div>
                  <div class="col-grow text-right">{{ item.amount }} {{ item.tokenSymbol }}
                  </div>
                </div>
                <div class="row text-subtitle2">
                  <div class="col-auto text-bold sectionName">Receiver</div>
                  <div class="col-grow text-right">{{ item.transferToAddress }}
                    <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                           @click="goToEtherscan(item.transferToAddress, item.chainId)"/>
                  </div>
                </div>
                <div class="row text-subtitle2">
                  <div class="col-auto text-bold sectionName">Token</div>
                  <div class="col-grow text-right">{{ item.token }}
                    <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                           @click="goToEtherscan(item.tokenAddress, item.chainId)"/>
                  </div>
                </div>

              </q-item-section>
            </q-item>
          </q-list>

        </q-scroll-area>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';
import { TransferErc20TransactionData } from 'src/api/model/ipfs/proposal-transaction/transfer-erc-20-transaction-data';
import { api } from 'boot/axios';
import { BlockchainProposalDto } from 'src/api/dto/blockchain-proposal-dto';
import { ProposalTransactionStatus } from 'src/api/model/proposal-transaction-status';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { goToEtherscan, goToEtherscanTx, goToIpfs } from 'src/api/services/utils-service';
import { ProposalTransactionType } from 'src/api/model/ipfs/proposal-transaction-type';

const rows = ref([]);
const props = defineProps(['transactions', 'proposalIpfsHash']);
const ethConnectionStore = useEthConnectionStore();
const txHash = ref('');
const address = ref('');
const transactionStatus = ref(ProposalTransactionStatus.SAVED);
const fillTable = async () => {
  let i = 1;
  const tabla = [props.transactions[0], props.transactions[0], props.transactions[0]];
  rows.value = tabla.map((_: ClientProposalTransaction) => {
    const data = _.data as TransferErc20TransactionData;
    i++;
    return {
      description: `Transaction #${i - 1}`,
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
    const res = await api.get(`/api/rest/v1/proposal/${props.proposalIpfsHash}/blockchain`);
    const blockchainProposalDto: BlockchainProposalDto = <BlockchainProposalDto>res.data;
    txHash.value = blockchainProposalDto.blockchainProposalChainTransactions[0].txHash ?? '';
    transactionStatus.value = blockchainProposalDto.status;
    address.value = blockchainProposalDto.address;
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
