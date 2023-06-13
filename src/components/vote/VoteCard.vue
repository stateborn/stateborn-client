<template>
  <q-card class="stateborn-card" square>
    <q-card-section style="padding:5px;">
      <div class="row justify-center items-center">
        <div class="col-auto q-pa-xs justify-center">
          <q-icon name="fa-solid fa-square-check"  style="font-size: 1.5rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <div class="text-h5 text-center" >
            Vote on proposal
          </div>
        </div>
      </div>
      <q-separator class="q-mb-xs q-mt-xs"/>
      <div class="row text-subtitle2" v-if="props.userVotes.length === 0 || changeMyVote"><div class="col text-bold">Your voting power</div><div class="col text-right">{{ props.tokenBalance }}</div></div>
      <q-banner :class="userVote === 'NO' ? 'bg-red': 'bg-green'" class="text-white text-bold text-subtitle2 text-center" v-if="props.userVotes.length > 0 && !changeMyVote">
        You already voted: <q-chip square color="white" class="text-bold"> {{ userVote }}</q-chip>
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
    </q-card-section>
    <q-card-actions vertical style="padding:5px;" v-if="options.length === 0 && (props.userVotes.length === 0 || changeMyVote)">
          <q-btn square color="green" label="YES" @click="callVote('YES')"></q-btn>
          <q-btn square color="red" label="NO" @click="callVote('NO')"></q-btn>
    </q-card-actions>
    <q-card-actions vertical style="padding:5px;" v-if="options.length > 0 && (props.userVotes.length === 0 || changeMyVote)">
      <div class="text-h6 text-center">Options</div>
      <q-option-group
        :options="options"
        type="radio"
        v-model="option"
      />
      <q-btn square color="green" label="Vote" @click="callVote(option)"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { api } from 'boot/axios';
import { signVote } from 'src/api/services/signature-service';
import { computed, ref, watch } from 'vue';

const props = defineProps(['tokenBalance', 'proposalIpfsHash', 'blockNumber', 'userVotes', 'proposalOptions', 'isProposalEnded']);
const emit = defineEmits(['voted']);
const ethConnectionStore = useEthConnectionStore();
const changeMyVote = ref(false);
const options = ref([]);
const option = ref('');
import { Notify } from 'quasar';

const userVote = computed(() => {
  if (props.userVotes.length > 0) {
    return props.userVotes[0].clientVote.vote;
  }
  return '';
});
watch(() => props.userVotes, () => {
  changeMyVote.value = false;
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
</script>
