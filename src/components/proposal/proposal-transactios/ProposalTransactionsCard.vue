<template>
  <div >
    <div class="row justify-center items-center">
      <div class="col-auto q-pa-xs justify-center">
        <q-img src="/cube2.svg" style="height:25px; width: 25px"></q-img>

      </div>
      <div class="col-auto justify-center">
        <div class="col-auto justify-center">
          <q-item-label class=" text-primary text-overline text-bold" style="font-size: 1rem">Transfers
            <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
              <q-tooltip class="stateborn-tooltip">
                Transfers to be executed if proposal passes.<br>
                These transfers will be <b class="text-red">executed only all together</b> if proposal passes.<br>
              </q-tooltip>
            </q-icon></q-item-label>
        </div>
      </div>
    </div>
    <q-separator class="q-ma-xs"></q-separator>
    <div class="row q-mt-md">
      <div class="col-xl-6 col-xs-auto ">
        <q-card class="stateborn-card q-pl-md">
          <div class="row">
            <div class="col-grow">
              <q-item-label class=" text-primary text-left text-overline" style="font-size: 1rem">Timeline</q-item-label>
              <q-timeline layout="dense" side="right" color="grey-7">
                <CreatedOffchainTransactionsTimelineEntry
                  :proposal-ipfs-hash="proposalIpfsHash"
                  :transaction-status="transactionStatus">
                </CreatedOffchainTransactionsTimelineEntry>
                <ProposalRejectedTransactionsTimelineEntry
                  :transaction-status="transactionStatus">
                </ProposalRejectedTransactionsTimelineEntry>
                <CreatedOnchainTransactionsTimelineEntry
                  :proposal-address="proposalAddress"
                  :tx-hash="txHash"
                  :transaction-status="transactionStatus"
                  :chain-id="chainId"
                  @challengeSequencerPeriodEnded="onChallengeSequencerPeriodEnded"
                >
                </CreatedOnchainTransactionsTimelineEntry>

                <q-timeline-entry
                  subtitle="3. Executed"
                  :style="transactionStatus === BlockchainProposalStatus.EXECUTED ? '': 'height:40px'"
                  :class="transactionStatus === BlockchainProposalStatus.EXECUTED ? 'noisegreen' : ''"
                  :icon="transactionStatus === BlockchainProposalStatus.EXECUTED ? 'fa-solid fa-cube' : undefined"
                  :color=" transactionStatus === BlockchainProposalStatus.EXECUTED? 'green-9' : ''"
                  side="left">
                </q-timeline-entry>
              </q-timeline>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-6">
        <q-scroll-area style="height: 330px; width:100%;">
          <q-list class="rounded-borders">
            <q-item v-for="item in rows" class="bodynoise q-ma-xs" dense >
              <div class="row items-center" style="width:100%" >
                <div class="col-12 " >
                  <q-item-label overline class="text-primary text-bold">{{ item.description }}</q-item-label>
                  <q-separator class="q-mb-md"></q-separator>
                  <div class="row items-center" style="width:100%;">
                    <div class="col-auto " v-if="item.tokenType === TokenType.NFT" >
                      <q-item-section avatar>
                        <q-img v-if="item.ipfsNftInfo?.imageBase64" :src="item.ipfsNftInfo?.imageBase64"
                               style="height:120px;width:120px; border:1px solid #424242"/>
                        <div class="row items-center justify-center" v-else>
                          <div class="col-auto">
                            <q-skeleton square style="height:120px;width:120px;"/>
                          </div>
                        </div>
                      </q-item-section>
                    </div>
                    <div class="col-grow">
                      <div class="row text-subtitle2">
                        <div class="col-auto text-bold sectionName">Description</div>
                        <div class="col-grow text-right">
                          <q-badge style="padding:5px" :label="`TRANSFER ${item.tokenType}`"
                                   :color="item.tokenType === TokenType.ERC20 ? 'primary' : 'secondary'"
                                   :text-color="item.tokenType === TokenType.ERC20 ? 'white' : 'black'"></q-badge>
                          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs"
                                  style="margin-bottom: 3px;padding-right:5px">
                            <q-tooltip class="stateborn-tooltip" v-if="item.tokenType === TokenType.ERC20">
                              Description: Transfer {{item.amount}} {{item.tokenSymbol}} of DAO treasury to
                              address {{item.transferToAddress}}.
                            </q-tooltip>
                            <q-tooltip class="stateborn-tooltip" v-if="item.tokenType === TokenType.NFT">
                              Description: Transfer {{item.tokenSymbol}} NFT with ID {{item.tokenId}} owned by DAO to
                              address {{item.transferToAddress}}.
                            </q-tooltip>
                          </q-icon>
                        </div>
                      </div>
                      <div class="row text-subtitle2">
                        <div class="col-auto text-bold sectionName">Token</div>
                        <div class="col-grow text-right">{{ item.token }}
                          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                                 @click="goToEtherscan(item.tokenAddress, item.chainId)"/>
                        </div>
                      </div>
                      <div class="row text-subtitle2" v-if="item.tokenType === TokenType.ERC20">
                        <div class="col-auto text-bold sectionName">Transfer amount</div>
                        <div class="col-grow text-right">{{ item.amount }} {{ item.tokenSymbol }}
                        </div>
                      </div>
                      <div class="row text-subtitle2" v-if="item.tokenType === TokenType.NFT">
                        <div class="col-auto text-bold sectionName">NFT ID (token ID)</div>
                        <div class="col-grow text-right">{{ item.tokenId }}
                        </div>
                      </div>
                      <div class="row text-subtitle2" v-if="item.tokenType === TokenType.NFT && item.ipfsNftInfo?.name">
                        <div class="col-auto text-bold sectionName">NFT #{{ item.tokenId }} name</div>
                        <div class="col-grow text-right">{{ item.ipfsNftInfo?.name }}
                        </div>
                      </div>
                      <div class="row text-subtitle2" v-if="item.tokenType === TokenType.NFT && item.ipfsNftInfo?.description">
                        <div class="col-auto text-bold sectionName">NFT #{{ item.tokenId }} description</div>
                        <div class="col-grow text-right">{{ item.ipfsNftInfo?.description.substring(0, 30) }}...
                        </div>
                      </div>
                      <div class="row text-subtitle2">
                        <div class="col-auto text-bold sectionName">Receiver</div>
                        <div class="col-grow text-right" style="  word-wrap: break-word;">{{ item.transferToAddress.substring(0, 30) }}...
                          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                                 @click="goToEtherscan(item.transferToAddress, item.chainId)"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { api } from 'boot/axios';
import { BlockchainProposalDto } from 'src/api/dto/blockchain-proposal-dto';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { goToEtherscan } from 'src/api/services/utils-service';
import { ProposalTransactionType } from 'src/api/model/ipfs/proposal-transaction-type';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';
import { IpfsNftInfo } from 'src/api/model/ipfs-nft-info';
import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';
import CreatedOffchainTransactionsTimelineEntry
  from 'components/proposal/proposal-transactios/CreatedOffchainTransactionsTimelineEntry.vue';
import ProposalRejectedTransactionsTimelineEntry
  from 'components/proposal/proposal-transactios/ProposalRejectedTransactionsTimelineEntry.vue';
import CreatedOnchainTransactionsTimelineEntry
  from 'components/proposal/proposal-transactios/CreatedOnchainTransactionsTimelineEntry.vue';

class TransactionRow {
  description: string;
  transactionType: ProposalTransactionType;
  token: string;
  tokenDecimals: number;
  tokenAddress: string;
  transferToAddress: string;
  amount: string;
  tokenId: number;
  tokenSymbol: string;
  chainId: string;
  tokenType: TokenType;
  ipfsNftInfo: IpfsNftInfo | undefined;

  constructor(description: string,
              transactionType: ProposalTransactionType,
              token: string,
              tokenDecimals: number,
              tokenAddress: string,
              transferToAddress: string,
              amount: string,
              tokenId: number,
              tokenSymbol: string,
              chainId: string,
              tokenType: TokenType,
              ipfsNftInfo: IpfsNftInfo | undefined) {
    this.description = description;
    this.transactionType = transactionType;
    this.token = token;
    this.tokenDecimals = tokenDecimals;
    this.tokenAddress = tokenAddress;
    this.transferToAddress = transferToAddress;
    this.amount = amount;
    this.tokenId = tokenId;
    this.tokenSymbol = tokenSymbol;
    this.chainId = chainId;
    this.tokenType = tokenType;
    this.ipfsNftInfo = ipfsNftInfo;
  }
}
const rows = ref(<TransactionRow[]>[]);
const props = defineProps(['transactions', 'proposalIpfsHash']);
const ethConnectionStore = useEthConnectionStore();
const txHash = ref('');
const chainId = ref('');
const proposalAddress = ref('');
const transactionStatus = ref(BlockchainProposalStatus.CREATED_ON_CHAIN);

const getNftDetails = async (tokenAddress: string, tokenId: number): Promise<IpfsNftInfo | undefined> => {
  try {
    return (await ERC_721_SERVICE.readIpfsTokenInfo(tokenAddress, tokenId));
  } catch (e) {
    return undefined;
  }
}
const fillTable = async () => {
  let i = 1;
  rows.value = [];
  chainId.value = props.transactions[0].data.token.chainId;
  for (const _ of props.transactions) {
    const data = _.data;
    i++;
    let ipfsNftInfo: IpfsNftInfo | undefined;
    if (_.transactionType === ProposalTransactionType.TRANSFER_NFT_TOKEN) {
      ipfsNftInfo = await getNftDetails(data.token.address, data.tokenId);
    }
    rows.value.push(
      new TransactionRow(
        `Transfer #${i - 1}`,
        _.transactionType,
        `${data.token.name} (${data.token.symbol})`,
        data.token.decimals,
        data.token.address,
        data.transferToAddress,
        _.transactionType === ProposalTransactionType.TRANSFER_ERC_20_TOKENS ? data.transferAmount : '',
        _.transactionType === ProposalTransactionType.TRANSFER_NFT_TOKEN ? data.tokenId : '',
        data.token.symbol,
        data.token.chainId,
        data.token.type,
        ipfsNftInfo)
      );
  }
};
const fetchTransactionAggregate = async () => {
  if (props.proposalIpfsHash) {
    const res = await api.get(`/api/rest/v1/proposal/${props.proposalIpfsHash}/blockchain`);
    const blockchainProposalDto: BlockchainProposalDto = <BlockchainProposalDto>res.data;
    txHash.value = blockchainProposalDto.blockchainProposalChainTransactions[0]?.txHash ?? '';
    transactionStatus.value = blockchainProposalDto.status;
    if (BlockchainProposalStatus.CREATED_ON_CHAIN) {
      proposalAddress.value = blockchainProposalDto.address!;
    }
  }
};

watch(() => [props.transactions, ethConnectionStore.isConnected], () => {
  fillTable();
});

watch(() => [props.proposalIpfsHash], () => {
  fetchTransactionAggregate();
});
onMounted(() => {
  fillTable();
  fetchTransactionAggregate();
});

const onChallengeSequencerPeriodEnded = () => {

};


</script>
