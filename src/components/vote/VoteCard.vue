<template>
  <q-card class="stateborn-card" square >
    <q-card-section style="padding:0;">
      <div class="row justify-center items-center">
        <div class="col-auto q-pa-xs justify-center">
          <q-icon name="fa-solid fa-square-check"  style="font-size: 1.5rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <div class="text-h6 text-center" >
            Vote on proposal
          </div>
        </div>
      </div>
      <q-separator class="q-mb-xs q-mt-xs"/>
      <q-banner class="text-black text-subtitle2 text-center noisered" v-if="isProposalEnded">
        <span class="text-bold">Voting ended</span>
      </q-banner>
      <div v-if="ethConnectionStore.isConnected && !isProposalEnded && connectedNetworkMatchesTokenNetwork">
          <div class="row text-subtitle2" v-if=" (props.userVotes.length === 0 || changeMyVote)"><div class="col text-bold">Your voting power</div><div class="col text-right">{{ props.tokenBalance }} {{tokenSymbol}}</div></div>
          <q-banner :class="userVote === 'NO' ? 'noisered': 'noisegreen'" class="text-black text-bold text-subtitle2 text-center" v-if="props.userVotes.length > 0 && !changeMyVote">
            <span class="text-bold">You already voted: </span><q-chip square color="white" class="text-bold" :text-color="userVote === 'NO' ? 'red': 'green'"> {{ userVote }}</q-chip>
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
            <div class="row justify-center" v-if="!$q.platform.is.mobile">
              <div class="col-lg-auto col-xs-12 justify-center">
                <div class="text-subtitle2 text-bold text-red">Please connect to vote</div>
              </div>
            </div>
            <div class="text-center text-subtitle2 text-red" v-else>Please connect to vote</div>
          </div>
        </div>
      </div>

    </q-card-section>
    <div v-if="connectedNetworkMatchesTokenNetwork">
      <q-card-actions vertical style="padding:0px;"
                      v-if="ethConnectionStore.isConnected && !isProposalEnded && (options.length === 0 && (props.userVotes.length === 0 || changeMyVote))">
            <q-btn square color="green" label="YES" @click="callVote('YES')"></q-btn>
            <q-btn square color="red" label="NO" @click="callVote('NO')"></q-btn>
      </q-card-actions>
      <q-card-actions vertical style="padding:5px;" v-if="ethConnectionStore.isConnected && !isProposalEnded && (options.length > 0 && (props.userVotes.length === 0 || changeMyVote))">
        <div class="text-h6 text-center">Options</div>
        <q-option-group
          :options="options"
          type="radio"
          v-model="option"
        />
        <q-btn square color="green" label="Vote" @click="callVote(option)"></q-btn>
      </q-card-actions>
    </div>
    <div v-else>
      <q-banner class="text-black text-bold text-subtitle2 text-center noisered items-center" >
        <div class="row">
          <div class="col-grow">
            You are connected to: {{TOKEN_SERVICE.getNetworkName(ethConnectionStore.chainId)}}<q-img style="width: 25px; height: 25px;" :src="TOKEN_SERVICE.getNetworkIcon(ethConnectionStore.chainId)"/> <br>
            DAO token network: {{TOKEN_SERVICE.getNetworkName(props.tokenChainId) }}<q-img style="width: 25px; height: 25px;" :src="TOKEN_SERVICE.getNetworkIcon(props.tokenChainId)"/><br>
            Please switch your wallet to {{TOKEN_SERVICE.getNetworkName(props.tokenChainId) }} to vote.
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-grow justify-center text-center">
            <q-btn color="primary" class="q-ma-md" icon="fa-solid fa-shuffle" @click="switchNetwork" :label="`Switch to ${TOKEN_SERVICE.getNetworkName(props.tokenChainId)}`"></q-btn>
          </div>
        </div>
      </q-banner>
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { api } from 'boot/axios';
import { signVote } from 'src/api/services/signature-service';
import { computed, ref, watch } from 'vue';
import { Notify } from 'quasar';
import { TOKEN_SERVICE } from '../../api/services/token-service';
import { changeNetwork } from 'src/api/services/change-network-service';

const props = defineProps<{
  proposalIpfsHash: string,
  tokenBalance: string,
  userVotes: any[],
  proposalOptions: any[],
  isProposalEnded: boolean,
  tokenSymbol: string,
  tokenChainId: string,
}>();
const emit = defineEmits(['voted']);
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

const callVote = async (decision: string) => {
  const signature = await signVote(ethConnectionStore.account, props.proposalIpfsHash, decision, props.tokenBalance);
  const vote = {
    clientVote: {
      voterAddress: ethConnectionStore.account,
      proposalIpfsHash: props.proposalIpfsHash,
      vote: decision,
      votingPower: props.tokenBalance,
    },
    userSignature: signature,
  };
  api.post(`/api/rest/v1/proposal/${props.proposalIpfsHash}/vote`, vote).then((response) => {
    emit('voted', vote);
    Notify.create({ message: 'Successfuly voted on proposal!', position: 'top-right', color: 'green' });
  }, (error) => {
    Notify.create({ message: 'Voting failed - server problem!', position: 'top-right', color: 'red' });
    console.log(error);
  });
};

const switchNetwork = async () => {
  try {
    await changeNetwork(props.tokenChainId);
    Notify.create({ message: `Successfuly changed network to ${TOKEN_SERVICE.getNetworkName(props.tokenChainId)}!`, position: 'top-right', color: 'green' });
  } catch (err) {
    Notify.create({ message: 'Changing network failed. Please change network directly in wallet (e.g. Metamask)', position: 'top-right', color: 'red' });
  }
}
</script>
