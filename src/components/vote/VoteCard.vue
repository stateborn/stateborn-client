<template>
  <q-card class="stateborn-card" square >
    <q-card-section style="padding:0;">
      <div class="row justify-center items-center q-pa-xs">
        <div class="col-auto q-pa-xs justify-center">
          <q-icon name="fa-solid fa-square-check"  color="primary" style="font-size: 1.3rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <q-item-label class=" text-primary text-overline text-bold" style="font-size: 1rem">Vote on proposal</q-item-label>
        </div>
      </div>
      <q-banner class="text-black text-subtitle2 text-center noisered" v-if="isProposalEnded">
        <span class="text-bold">Voting ended</span>
      </q-banner>
      <div v-if="ethConnectionStore.isConnected && !isProposalEnded && connectedNetworkMatchesTokenNetwork">
          <div class="row text-subtitle2 items-center" v-if="(props.userVotes.length === 0 || changeMyVote)">
            <div class="col-auto text-bold sectionName" :class="`${tokenBalanceIsPositive ? '' : 'text-red-8'}`">Your voting power</div><div class="col text-right" :class="`${tokenBalanceIsPositive ? '' : 'text-red-8'}`">~{{ props.tokenBalance }} {{tokenSymbol}}</div>
            <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs">
              <q-tooltip  class="stateborn-tooltip">
                This is your voting power based on latest block balance. <br>
                For voting possibility you need to own at least 1 {{tokenSymbol}} token. <br>
                Voting power available for this proposal will be validated <br>
                by backend based on proposal creation block {{props.proposalBlockNumber}}.
              </q-tooltip>
            </q-icon>
          </div>
          <q-banner :class="userVote === 'NO' ? 'noisered': 'noisegreen'" class="text-black text-bold text-subtitle2 text-center" v-if="props.userVotes.length > 0 && !changeMyVote">
            <span class="text-bold">You already voted: </span><q-chip square color="white" class="text-bold" :text-color="userVote === 'NO' ? 'red-8': 'green-8'"> {{ userVote }}</q-chip>
          </q-banner>
          <div class="row justify-center" v-if="props.userVotes.length > 0 && !isProposalEnded">
            <div class="col-auto justify-center">
              <q-option-group
                v-model="changeMyVote"
                :options="[{label: 'I want to change my vote', value: true}]"
                color="black"
                type="toggle"
              />
            </div>
          </div>
      </div>
      <div v-else>
        <div class="row items-center justify-center"
             v-if="!isProposalEnded && connectedNetworkMatchesTokenNetwork"
             :style="$q.platform.is.mobile ? 'height:50px': `height: 100%`">
          <div class="col-lg-12 col-xs-grow justify-center">
            <div class="row justify-center">
              <div class="col-lg-grow col-xs-12 justify-center">
                <q-banner class="text-black text-subtitle2 text-center noisered">
                  <span class="text-bold text-red-8">Please connect to vote</span>
                </q-banner>
              </div>
            </div>
          </div>
        </div>
      </div>

    </q-card-section>
    <div v-if="connectedNetworkMatchesTokenNetwork">
      <q-card-actions vertical style="padding:0px;"
                      v-if="ethConnectionStore.isConnected && !isProposalEnded && (options.length === 0 && (props.userVotes.length === 0 || changeMyVote))">
            <q-btn square glossy color="green-8" label="YES" @click="callVote('YES')" :disable="!tokenBalanceIsPositive"></q-btn>
            <q-btn square glossy color="red-8" label="NO" @click="callVote('NO')" :disable="!tokenBalanceIsPositive"></q-btn>
      </q-card-actions>
      <q-card-actions vertical style="padding:5px;" v-if="ethConnectionStore.isConnected && !isProposalEnded && (options.length > 0 && (props.userVotes.length === 0 || changeMyVote))">
        <div class="text-h6 text-center">Options</div>
        <q-option-group
          :options="options"
          type="radio"
          v-model="option"
        />
        <q-btn glossy square color="green" label="Vote" @click="callVote(option)" :disable="!tokenBalanceIsPositive"></q-btn>
      </q-card-actions>
    </div>
    <div v-else>
      <different-network-banner :expected-chain-id="props.tokenChainId" v-if="!isProposalEnded"></different-network-banner>
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { api } from 'boot/axios';
import { signVote } from 'src/api/services/signature-service';
import { computed, ref, watch } from 'vue';
import { Notify } from 'quasar';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import dayjs from 'dayjs';
import DifferentNetworkBanner from 'components/DifferentNetworkBanner.vue';

dayjs.extend(dayjsPluginUTC);

const props = defineProps<{
  proposalIpfsHash: string,
  tokenBalance: string,
  userVotes: any[],
  proposalOptions: any[],
  isProposalEnded: boolean,
  tokenSymbol: string,
  tokenChainId: string,
  proposalBlockNumber: string,
  triggerVotingAfterDifferentVotingPowerAcceptance: boolean,
  decisionAfterDifferentPowerAcceptance: string,
}>();
const emit = defineEmits(['voted', 'differentVotingPower']);
const ethConnectionStore = useEthConnectionStore();
const changeMyVote = ref(false);
const options = ref([]);
const option = ref('');
const userVote = computed(() => {
  if (props.userVotes.length > 0) {
    return props.userVotes[0].clientVote.vote;
  }
  return '';
});
const tokenBalanceIsPositive = computed(() => {
  return Number(props.tokenBalance).toFixed(2) !== '0.00' && props.tokenBalance.trim() !== '';
});
watch(() => props.userVotes, () => {
  changeMyVote.value = false;
});
const connectedNetworkMatchesTokenNetwork = computed(() => {
  if (ethConnectionStore.isConnected) {
    return ethConnectionStore.chainId === props.tokenChainId;
  } else {
    return true;
  }
});

function setOptions() {
  if (props.proposalOptions !== undefined) {
    options.value = props.proposalOptions.map((opt) => ({ label: opt, value: opt }));
    option.value = options.value[0].value;
  }
}
setOptions();

watch(() => props.proposalOptions, () => {
  setOptions();
});

watch(() => props.triggerVotingAfterDifferentVotingPowerAcceptance, () => {
  if (props.triggerVotingAfterDifferentVotingPowerAcceptance) {
    callVote(props.decisionAfterDifferentPowerAcceptance);
  }
});

const callVote = async (decision: string) => {
  const voteDate = dayjs().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const signature = await signVote(ethConnectionStore.account, props.proposalIpfsHash, decision, props.tokenBalance, voteDate);
  const vote = {
    clientVote: {
      voterAddress: ethConnectionStore.account,
      proposalIpfsHash: props.proposalIpfsHash,
      vote: decision,
      votingPower: props.tokenBalance,
      voteDate,
    },
    userSignature: signature,
  };
  api.post(`/api/rest/v1/proposal/${props.proposalIpfsHash}/vote`, vote).then(() => {
    emit('voted', vote);
    Notify.create({ message: 'Successfully voted on proposal!', position: 'top-right', color: 'green-8' });
  }, (error) => {
    if (error.response.status === 400 && error.response.data?.errorCode === '1') {
      emit('differentVotingPower', {
        votingPower: error.response.data.readVotingPower,
        proposalBlock: error.response.data.proposalBlock,
        decision,
      });
      return;
    } else {
      Notify.create({ message: 'Voting failed - server problem.', position: 'top-right', color: 'red-8' });
      console.log(error);
    }
  });
};
</script>
