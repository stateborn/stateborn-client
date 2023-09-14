<template>
  <q-page>
    <div class="row justify-center" >
      <div class="col-lg-8 col-xs-grow justify-center">
        <q-breadcrumbs class="text-subtitle2 stateborn-card q-pa-xs text-primary q-mt-xs">
          <q-breadcrumbs-el icon="home" to="/">
            <span class="text-underline">Home</span>
          </q-breadcrumbs-el>
          <q-breadcrumbs-el :to="`/${daoIpfsHash}`" class="text-underline">
            {{ dao !== undefined ? `${dao.clientDao.name}` : 'proposals' }}
          </q-breadcrumbs-el>
          <q-breadcrumbs-el
            :label="`${$q.platform.is.mobile ? `${proposalIpfsHash.substring(0, 10)}...` : proposalIpfsHash}`"
            :to="`/${daoIpfsHash}`/proposalIpfsHash"/>
        </q-breadcrumbs>
        <div class="row q-col-gutter-x-sm q-mt-xs">
          <div class="col-lg-8 col-xs-grow">
            <ProposalDetailsCard
              id="fullProposalCard"
              :dao-token-chain-id="dao?.clientDao?.token?.chainId"
              :proposal-verification="proposal?.proposalVerification"
              :proposal="proposal"
              v-if="proposal !== undefined">
            </ProposalDetailsCard>
            <q-card class="stateborn-card q-mt-md " square>
              <q-card-section style="padding-bottom:0;">
                <div class="row text-subtitle2 text-bold">
                  <div class="col-grow text-bold sectionName">Description</div>
                </div>
              </q-card-section>
              <q-scroll-area
                v-show="canShowScrollArea"
                :style="`height: ${proposalScrollHeight}px; max-width: 100%; min-width:100px;margin-top:10px`"
              >
                <q-card-section style="padding-top:0;">
                  <proposal-description-markdown
                      class="q-pt-md"
                      :description="proposalDescription"></proposal-description-markdown>
                </q-card-section>
              </q-scroll-area>
            </q-card>
<!--            <ProposalDetailsCard-->
<!--              v-else-->
<!--              class="q-mt-md"-->
<!--              :dao-token-chain-id="dao?.clientDao?.token?.chainId"-->
<!--              :proposal-verification="proposal.proposalVerification"-->
<!--              :proposal="proposal"-->
<!--              v-if="proposal !== undefined">-->
<!--            </ProposalDetailsCard>-->
          </div>
          <div class="col-lg-4 col-xs-grow">
            <div id="other-info-row">
              <DaoCardMin :full-width="true" class="" :dao="dao" v-if="dao !== undefined" :show-token-address="true" :class="$q.platform.is.mobile ? 'q-mt-md' : ''"></DaoCardMin>
              <VoteCard
                class="q-mt-md"
                :trigger-voting-after-different-voting-power-acceptance="triggerVotingAfterDifferentVotingPowerAcceptance"
                :decision-after-different-power-acceptance="decisionAfterDifferentPowerAcceptance"
                :proposal-options="proposal.clientProposal.data?.options"
                :proposal-block-number="proposal.clientProposal.blockNumber"
                :token-balance="tokenBalance"
                :token-chain-id="dao !== undefined ? dao.clientDao.token.chainId : ''"
                :proposal-ipfs-hash="proposalIpfsHash"
                :user-votes="userVotes"
                :token-symbol="dao !== undefined ? dao.clientDao.token.symbol : ''"
                :is-proposal-ended="isProposalEnded"
                @voted="onVoted"
                @different-voting-power="onDifferentVotingPower"
                v-if="proposal !== undefined">
              </VoteCard>
              <ProposalCountdownCard class="q-mt-md"
                                     :is-proposal-ended="isProposalEnded"
                                     :end-date-utc="proposal.clientProposal.endDateUtc"
                                     v-if="proposal !== undefined"
                                    @voting-time-ended="onVotingTimeEnded">
              </ProposalCountdownCard>
              <ResultCard class="q-mt-md"
                          :is-proposal-ended="isProposalEnded"
                          :token-symbol="dao !== undefined ? dao.clientDao.token.symbol : ''"
                          :proposal-result-dto="proposalResultDto"
                          :proposal-options="proposal.clientProposal.data?.options"
                          v-if="proposal !== undefined && proposalResultDto !== undefined"></ResultCard>
              <UserVotesTable class="q-mt-md"
                              :trigger-fill-table="triggerFillUserVotesTable"
                              :proposal-ipfs-hash="proposalIpfsHash"
                              :user-votes="userVotes"
                              v-if="proposal !== undefined">
              </UserVotesTable>
              <ValidityCard class="q-mt-md"
                            :proposal-ipfs-hash="proposalIpfsHash"
                            :token-chain-id="dao !== undefined ? dao.clientDao.token.chainId : ''"
                            :proposal-report="proposalReport"
                            v-if="proposal !== undefined && proposalReport !== undefined && isProposalEnded">
              </ValidityCard>
            </div>
          </div>
        </div>
        <div class="row noise q-mt-md" id="transactions-row">
          <div class="col-12 ">
            <ProposalTransactionsCard
              :dao="dao"
              :refresh-transactions="triggerRefreshingTransactions"
              id="proposalTransactionsCard"
              :transactions="proposal.clientProposal.transactions"
              v-if="dao !== undefined && proposal !== undefined && proposal.clientProposal.transactions && proposal.clientProposal.transactions.length > 0"
              :proposal="proposal">
            </ProposalTransactionsCard>

          </div>
        </div>
        <div class="row q-mt-xs q-mb-lg" id="table-votes-row">
          <div class="col-12">
            <VotesTable :votes-count="votesCount"
                        :distinct-votes-count="distinctVotesCount"
                        :dao-token-chain-id="dao?.clientDao?.token?.chainId"
                        :votes="votes" @rendered="onVotesRendered" @votesTableRequest="onVotesTableRequest">
            </VotesTable>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="showDifferentVotingPowerDialog">
      <q-card class="noisered text-subtitle2 q-pa-lg dialog-border" square>
        <q-card-section class="row items-center">
          <q-avatar icon="fa-solid fa-info" size='md' color="primary" text-color="white" square/>
          <span class="q-ml-lg text-h5" >Confirm vote</span>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section style="padding-top: 0; margin-top:0;">
          Your voting power is different than previously estimated. <br>
          Your token balance at proposal block <b>{{readProposalBlock}}</b> is <b>{{tokenBalance}}</b>. <br>
          This value will be used as your voting power for proposal vote.
          Please confirm the value and vote or cancel.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="red" v-close-popup />
          <q-btn label="Vote" color="primary" @click="triggerVotingAfterDifferentVotingPowerAcceptance = true" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { api } from 'boot/axios';
import ProposalDetailsCard from 'components/proposal/ProposalDetailsCard.vue';
import { useRoute } from 'vue-router';
import VoteCard from 'components/vote/VoteCard.vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import VotesTable from 'components/vote/VotesTable.vue';
import UserVotesTable from 'components/vote/UserVotesTable.vue';
import ResultCard from 'components/proposal/ResultCard.vue';
import ProposalCountdownCard from 'components/proposal/ProposalCountdownCard.vue';
import ValidityCard from 'components/proposal/ValidityCard.vue';
import { dom, useQuasar } from 'quasar';
import dayjs from 'dayjs';
import { storeVoteCreatedByUser, validateVoteAndUpdateInStorage, } from 'src/api/services/vote-service';
import DaoCardMin from 'components/dao-features/DaoCardMin.vue';
import { getDao } from 'src/api/services/dao-service';
import { DaoBackend } from 'src/api/model/dao-backend';
import { getProposal } from 'src/api/services/proposal-service';
import { ProposalReport } from 'src/api/model/proposal-report';
import { BackendProposal } from 'src/api/model/backend-proposal';
import { ProposalResultDto } from 'src/api/dto/proposal-result-dto';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { sleep } from 'src/api/services/sleep-service';
import { getProposalReport } from 'src/api/services/proposal-report-service';
import ProposalTransactionsCard from 'components/proposal/proposal-transactios/ProposalTransactionsCard.vue';
import ProposalDescriptionMarkdown from 'components/proposal/ProposalDescriptionMarkdown.vue';
import height = dom.height;
import { useCurrentChainStore } from 'stores/current-chain-store';

const route = useRoute();
const proposal = ref(<BackendProposal | undefined> undefined);
const proposalReport = ref(<ProposalReport | undefined> undefined);
const tokenBalance = ref('');
const proposalResultDto = ref(<ProposalResultDto | undefined>undefined);
const votes = ref([]);
const userVotes = ref([]);
const proposalIpfsHash: string = <string>route.params.id;
const daoIpfsHash: string = <string>route.params.daoIpfsHash;
const ethConnectionStore = useEthConnectionStore();
const currentChainStore = useCurrentChainStore();
const isProposalEnded = ref(false);
const canShowScrollArea = ref(false);
const triggerFillUserVotesTable = ref(false);
const votesCount = ref('1');
const distinctVotesCount = ref('1');
const proposalDescription = ref('');
const showDifferentVotingPowerDialog = ref(false);
const readProposalBlock = ref('0');
const triggerVotingAfterDifferentVotingPowerAcceptance = ref(false);
const decisionAfterDifferentPowerAcceptance = ref('');
// eslint-disable-next-line
const proposalScrollHeight = ref(0);
const dao = ref(<DaoBackend | undefined > undefined);

const adjustDescriptionHeight = () => {
  sleep(100).then(() => {
    const otherInfoRowHeight = height(document.getElementById('other-info-row')!);
    const a = height(document.getElementById('fullProposalCard')!);
    // the goal is to have description the same length as right columns row, to finish on the same line
    proposalScrollHeight.value = otherInfoRowHeight - a - 64;
    canShowScrollArea.value = true;
    $q.loading.hide();
  });
}
const onVotesRendered = async () => {
  adjustDescriptionHeight();
};
const fetchTableVotes = (limit: number, offset: number) => {
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/votes?limit=${limit}&offset=${offset}`).then(async (response) => {
    console.log('votes', response.data);
    votes.value = response.data;
  }, (error) => {
    console.log(error);
  });
};
const $q = useQuasar();
$q.loading.show({
  delay: 100, // ms
  message: 'Reading proposal details...',
  backgroundColor: 'black',
  messageColor: 'white',
});
const fetchProposalData = async () => {
  dao.value = await getDao(daoIpfsHash);
  currentChainStore.setChainId(dao.value.clientDao.token.chainId);
  if (ethConnectionStore.isConnected) {
    getTokenBalance(dao.value.clientDao.token.address, dao.value.clientDao.token.type, dao.value.clientDao.token.decimals);
    fetchUserVotes();
  }
  // 5 comes from VotesTable.vue
  fetchTableVotes(5, 0);
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/result`).then((res) => {
    proposalResultDto.value = res.data;
  }, (error) => {
    console.log(error);
  });
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/votes/all/count`).then(async (response) => {
    votesCount.value = response.data.count;
  }, (error) => {
    console.log(error);
  });

  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/votes/all/count/distinct`).then(async (response) => {
    distinctVotesCount.value = response.data.count;
  }, (error) => {
    console.log(error);
  });
  const onProposalValidationDoneCallback = (backendProposal: BackendProposal) => {
    proposal.value = backendProposal;
  };
  getProposal(proposalIpfsHash, onProposalValidationDoneCallback).then((_) => {
    proposal.value = _;
    proposalDescription.value = _.clientProposal.description;
    isProposalEnded.value = dayjs().isAfter(proposal.value.clientProposal.endDateUtc);
    if (isProposalEnded.value === true) {
      getProposalReport(proposalIpfsHash).then((_) => {
        console.log(_);
        proposalReport.value = _;
      }, (error) => {
        console.log(error);
      });
    }
  }, (error) => {
    console.log(error);
  });
};
fetchProposalData();

const getTokenBalance = async (tokenAddress: string, tokenType: TokenType, decimals?: string) => {

  TOKEN_SERVICE.readTokenBalance(ethConnectionStore.account, tokenAddress, tokenType, decimals).then((res) => {
    console.log('ale mam token balance ziomek', res);
    tokenBalance.value = res;
  }, (error) => {
    console.log(error);
  });
};

const fetchUserVotes = async () => {
  api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/${ethConnectionStore.account}/votes`).then(async (res) => {
    console.log('user votes', res.data);
    userVotes.value = res.data;
    for (const _ of res.data) {
      await validateVoteAndUpdateInStorage(proposalIpfsHash, _.ipfsHash, _.clientVote.voterAddress, _.clientVote, _.userSignature);
      triggerFillUserVotesTable.value = !triggerFillUserVotesTable.value;
    }
  }, (error) => {
    console.log(error);
  });
}

watch(() => [ethConnectionStore.isConnected, ethConnectionStore.networkName], async () => {
  adjustDescriptionHeight();
  console.log('trigger na watch', ethConnectionStore.isConnected, ethConnectionStore.networkName);
  if (ethConnectionStore.isConnected) {
    getTokenBalance(dao.value.clientDao.token.address,dao.value.clientDao.token.type, dao.value.clientDao.token.decimals);
    fetchUserVotes();
  }
});

const onVoted = async (vote: any) => {
  await storeVoteCreatedByUser(proposalIpfsHash, vote.clientVote, vote.userSignature, ethConnectionStore.account);
  await fetchProposalData();
};

const onVotesTableRequest = (pagination: any) => {
  fetchTableVotes(pagination.rowsPerPage, (pagination.page - 1) * pagination.rowsPerPage);
};

const onDifferentVotingPower = (data: any) => {
  tokenBalance.value = data.votingPower;
  readProposalBlock.value = data.proposalBlock;
  decisionAfterDifferentPowerAcceptance.value = data.decision;
  showDifferentVotingPowerDialog.value = true;
};

const triggerRefreshingTransactions = ref(false);
const onVotingTimeEnded = () => {
  sleep(100).then(() => {
    triggerRefreshingTransactions.value = true;
  });
}
</script>
