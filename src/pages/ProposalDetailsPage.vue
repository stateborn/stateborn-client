<template>
  <q-page>
    <div class="row justify-center" >
      <div class="col-lg-8 col-xs-grow justify-center">
        <q-breadcrumbs class="text-subtitle2 noise text-primary q-mt-md">
          <q-breadcrumbs-el icon="home" to="/">
            <span class="text-underline">Home</span>
          </q-breadcrumbs-el>
          <q-breadcrumbs-el :to="`/${daoIpfsHash}`" class="text-underline">
            {{ dao !== null ? `${dao.name}` : 'proposals' }}
          </q-breadcrumbs-el>
          <q-breadcrumbs-el
            :label="`${$q.platform.is.mobile ? `${proposalIpfsHash.substring(0, 10)}...` : proposalIpfsHash}`"
            :to="`/${daoIpfsHash}`/proposalIpfsHash"/>
        </q-breadcrumbs>
        <div class="row">
          <div class="col-lg-8 col-xs-grow">
            <q-scroll-area :style="`height: ${proposalScrollHeight}px; max-width: 100%;`" v-if="!$q.platform.is.mobile">
              <FullProposalCard
                class="q-ma-md"
                :proposal="proposal"
                v-if="proposal !== undefined">
              </FullProposalCard>
            </q-scroll-area>
            <FullProposalCard
              v-else
              class="q-ma-md"
              :proposal="proposal"
              v-if="proposal !== undefined">
            </FullProposalCard>
          </div>
          <div class="col-lg-4 col-xs-grow">
            <div id="other-info-row">
              <dao-card-min :full-width="true" class="q-ma-md" :dao="dao" v-if="dao !== null" ></dao-card-min>
              <VoteCard
                class="q-ma-md"
                :proposal-options="proposal.data?.options"
                :token-balance="tokenBalance"
                :proposal-ipfs-hash="proposalIpfsHash"
                :user-votes="userVotes"
                :token-symbol="dao?.tokenSymbol"
                :is-proposal-ended="isProposalEnded"
                @voted="onVoted"
                v-if="proposal !== undefined">
              </VoteCard>
              <ProposalCountdownCard class="q-ma-md"
                                     :is-proposal-ended="isProposalEnded"
                                     :end-date-utc="proposal.endDateUtc"
                                     v-if="proposal !== undefined"></ProposalCountdownCard>
              <ResultCard class="q-ma-md"
                          :token-symbol="dao?.tokenSymbol"
                          :proposal-result-dto="proposalResultDto"
                          :proposal-options="proposal.data?.options"
                          v-if="proposal !== undefined && proposalResultDto !== undefined"></ResultCard>
              <UserVotesTable class="q-ma-md"
                              :proposal-ipfs-hash="proposalIpfsHash"
                              :user-votes="userVotes"
                              v-if="proposal !== undefined"></UserVotesTable>
              <ValidityCard class="q-ma-md"
                            :proposal-ipfs-hash="proposalIpfsHash"
                            :proposal-report="proposalReport"
                            v-if="proposal !== undefined && proposalReport !== undefined && isProposalEnded">
              </ValidityCard>
            </div>
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
import { onMounted, ref, watch } from 'vue';
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
import DaoCardMin from 'components/dao-features/DaoCardMin.vue';
import { getDao } from 'src/api/services/dao-service';
import height = dom.height;
import { Dao } from 'src/api/model/dao';
import { getProposal } from 'src/api/services/proposal-service';
import { ProposalReport } from 'src/api/model/proposal-report';
import { getProposalReportFromStorage } from 'src/api/services/local-storage-service';
import { Proposal } from 'src/api/model/proposal';
import { ProposalResultDto } from 'src/api/dto/proposal-result-dto';

const route = useRoute();
const proposal = ref(<Proposal | undefined> undefined);
const proposalReport = ref(<ProposalReport | undefined> undefined);
const tokenBalance = ref('');
const proposalResultDto = ref(<ProposalResultDto | undefined>undefined);
const votes = ref([]);
const userVotes = ref([]);
const proposalIpfsHash: string = <string>route.params.id;
const daoIpfsHash: string = <string>route.params.daoIpfsHash;
const ethConnectionStore = useEthConnectionStore();
const isProposalEnded = ref(false);
// eslint-disable-next-line
const proposalScrollHeight = ref(window.innerHeight - 50 - 200);
const dao = ref(<Dao | null > null);
const onVotesRendered = () => {
  const otherInfoRowHeight = height(document.getElementById('other-info-row')!);
  // eslint-disable-next-line
  const scrollHeight = window.innerHeight - 90 - height(document.getElementById('table-votes-row')!);
  if (otherInfoRowHeight > scrollHeight) {
    proposalScrollHeight.value = otherInfoRowHeight;
  } else {
    proposalScrollHeight.value = scrollHeight;
  }
};

const fetchProposalData = async () => {
  dao.value = await getDao(daoIpfsHash);
  if (ethConnectionStore.isConnected) {
    getTokenBalance(dao.value.tokenAddress);
    fetchUserVotes();
  }
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/votes`).then(async (response) => {
    console.log('votes', response.data);
    votes.value = response.data;
  }, (error) => {
    console.log(error);
  });
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/result`).then((res) => {
    proposalResultDto.value = res.data;
  }, (error) => {
    console.log(error);
  });
  getProposal(proposalIpfsHash).then((_) => {
    proposal.value = _;
    isProposalEnded.value = dayjs().isAfter(proposal.value.endDateUtc);
    if (isProposalEnded.value) {
      getProposalReportFromStorage(proposalIpfsHash).then((proposalReportFromStorage) => {
        proposalReport.value = proposalReportFromStorage;
      }, (error) => {
        console.log(error);
      });
    }
  }, (error) => {
    console.log(error);
  });
};
fetchProposalData();

const getTokenBalance = async (tokenAddress: string) => {
  ERC_20_SERVICE.readTokenBalance(ethConnectionStore.account, tokenAddress).then((res) => {
    tokenBalance.value = res;
  }, (error) => {
    console.log(error);
  });
};

const fetchUserVotes = async () => {
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/${ethConnectionStore.account}/votes`).then(async (res) => {
    console.log('user votes', res.data);
    for (const userVote of res.data) {
      await fetchAndStoreIpfsVoteInStorage(proposalIpfsHash, userVote.ipfsHash);
    }
    userVotes.value = res.data;
  }, (error) => {
    console.log(error);
  });
}

watch(() => ethConnectionStore.isConnected, async () => {
  getTokenBalance(dao.value.tokenAddress);
  fetchUserVotes();
});

const onVoted = async (vote: any) => {
  await storeVoteCreatedByUser(proposalIpfsHash, vote.clientVote, vote.userSignature);
  await fetchProposalData();
};
</script>
