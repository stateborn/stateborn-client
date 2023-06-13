<template>
  <q-page>
    <div class="row justify-center" v-if="ethConnectionStore.isConnected">
      <div class="col-8 justify-center">
        <div class="row q-pt-md">
          <div class="col-8">
            <q-scroll-area :style="`height: ${proposalScrollHeight}px; max-width: 100%;`">
              <FullProposalCard
                class="q-ma-md"
                :proposal="proposalWithReport.proposal"
                v-if="proposalWithReport !== undefined"
                picture-height="150"
                card-title="Proposal">
              </FullProposalCard>
            </q-scroll-area>
          </div>
          <div class="col-4" id="other-info-row">
            <dao-card-min :full-width="true" class="q-ma-md" :dao="dao" v-if="dao !== null" ></dao-card-min>
            <VoteCard
              class="q-ma-md"
              :proposal-options="proposalWithReport.proposal.clientProposal.data?.options"
              :token-balance="tokenBalance"
              :proposal-ipfs-hash="proposalIpfsHash"
              :user-votes="userVotes"
              :is-proposal-ended="isProposalEnded"
              @voted="onVoted"
              v-if="proposalWithReport !== undefined">
            </VoteCard>
            <ProposalCountdownCard class="q-ma-md"
                                   :is-proposal-ended="isProposalEnded"
                                   :end-date-utc="proposalWithReport.proposal.clientProposal.endDateUtc"
                                   v-if="proposalWithReport !== undefined"></ProposalCountdownCard>
            <ResultCard class="q-ma-md"
                        :proposal-result-dto="proposalResultDto"
                        :proposal-options="proposalWithReport.proposal.clientProposal.data?.options"
                        v-if="proposalWithReport !== undefined && proposalResultDto !== undefined"></ResultCard>
            <UserVotesTable class="q-ma-md"
                            :proposal-ipfs-hash="proposalIpfsHash"
                            :user-votes="userVotes"
                            v-if="proposalWithReport !== undefined"></UserVotesTable>
            <ValidityCard class="q-ma-md"
                          :proposal-result-dto="proposalResultDto"
                          :proposal-ipfs-hash="proposalIpfsHash"
                          :proposal-report-dto="proposalWithReport.proposalReport"
                          v-if="proposalWithReport !== undefined && proposalWithReport.proposalReport !== undefined && proposalResultDto !== undefined && isProposalEnded"></ValidityCard>
          </div>
        </div>
        <div class="row" id="table-votes-row">
          <div class="col-12">
            <VotesTable class="q-ma-md" :votes="votes" @rendered="onVotesRendered"></VotesTable>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { api } from 'boot/axios';
import FullProposalCard from 'components/proposal/FullProposalCard.vue';
import { useRoute } from 'vue-router';
import VoteCard from 'components/vote/VoteCard.vue';
import { ERC_20_SERVICE } from 'src/api/services/erc-20-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import VotesTable from 'components/vote/VotesTable.vue';
import UserVotesTable from 'components/vote/UserVotesTable.vue';
import ResultCard from 'components/proposal/ResultCard.vue';
import ProposalCountdownCard from 'components/proposal/ProposalCountdownCard.vue';
import ValidityCard from 'components/proposal/ValidityCard.vue';
import { dom } from 'quasar';
import dayjs from 'dayjs';
import {
  fetchAndStoreIpfsVoteInStorage,
  storeVoteCreatedByUser,
} from 'src/api/services/get-and-store-ipfs-vote-service';
import height = dom.height;
import DaoCard from 'components/dao-features/DaoCard.vue';
import DaoCardMin from 'components/dao-features/DaoCardMin.vue';

const route = useRoute();
const proposalWithReport = ref(undefined);
const tokenBalance = ref('');
const proposalResultDto = ref(undefined);
const votes = ref([]);
const userVotes = ref([]);
const proposalIpfsHash = route.params.id;
const daoIpfsHash = route.params.daoIpfsHash;
const ethConnectionStore = useEthConnectionStore();
const isProposalEnded = ref(false);
// eslint-disable-next-line
const proposalScrollHeight = ref(window.innerHeight - 50 - 100);
const onVotesRendered = () => {
  const otherInfoRowHeight = height(document.getElementById('other-info-row')!);
  // eslint-disable-next-line
  const scrollHeight = window.innerHeight - 50 - height(document.getElementById('table-votes-row')!);
  if (otherInfoRowHeight > scrollHeight) {
    proposalScrollHeight.value = otherInfoRowHeight;
  } else {
    proposalScrollHeight.value = scrollHeight;
  }
};
const dao = ref(null);

const getProposal = async () => {
  const response = await api.get(`/api/rest/v1/dao/${daoIpfsHash}`);
  dao.value = {
    name: response.data.clientDao.name,
    description: response.data.clientDao.description,
    imageBase64: response.data.clientDao.imageBase64,
    owners: response.data.clientDao.owners,
    ownersMultisigThreshold: response.data.clientDao.ownersMultisigThreshold,
    proposalTokenRequiredQuantity: response.data.clientDao.proposalTokenRequiredQuantity,
    tokenName: response.data.clientDao.token.name,
    tokenSymbol: response.data.clientDao.token.symbol,
    tokenNetwork: response.data.clientDao.token.network,
    tokenAddress: response.data.clientDao.token.address,
    tokenType: response.data.clientDao.token.type,
    ipfsHash: response.data.ipfsHash,
  };
  console.log('no pięknie kurwa', dao);

  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/votes`).then(async (response) => {
    console.log('votes', response.data);
    votes.value = response.data;
  }, (error) => {
    console.log(error);
  });

  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/${ethConnectionStore.account}/votes`).then(async (res) => {
    console.log('user votes', res.data);
    for (const userVote of res.data) {
      await fetchAndStoreIpfsVoteInStorage(proposalIpfsHash, userVote.ipfsHash);
    }
    userVotes.value = res.data;
  }, (error) => {
    console.log(error);
  });
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/result`).then((res) => {
    console.log('proposal result', res.data);
    proposalResultDto.value = res.data;
  }, (error) => {
    console.log(error);
  });
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}`).then((res) => {
    proposalWithReport.value = res.data;
    console.log('proposal dane', res.data);
    ERC_20_SERVICE.readTokenBalance(ethConnectionStore.account, dao.value.tokenAddress).then((response2) => {
      tokenBalance.value = response2;
    }, (error) => {
      console.log(error);
    });
    isProposalEnded.value = dayjs().isAfter(proposalWithReport.value.proposal.clientProposal.endDateUtc);
  }, (error) => {
    console.log(error);
  });
};

if (ethConnectionStore.isConnected) {
  getProposal();
}

watch(() => ethConnectionStore.isConnected, async () => {
  await getProposal();
});

const onVoted = async (vote: any) => {
  storeVoteCreatedByUser(proposalIpfsHash, vote.clientVote, vote.userSignature);
  await getProposal();
};
</script>
