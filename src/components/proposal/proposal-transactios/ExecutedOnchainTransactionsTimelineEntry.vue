<template>
  <q-timeline-entry
    :style="transactionStatus === BlockchainProposalStatus.EXECUTED ? '': 'height:40px'"
    :class="transactionStatus === BlockchainProposalStatus.EXECUTED ? 'noisegreen' : ''"
    :icon="transactionStatus === BlockchainProposalStatus.EXECUTED ? 'fa-solid fa-check' : undefined"
    :color=" transactionStatus === BlockchainProposalStatus.EXECUTED? 'green-9' : ''"
    subtitle="3. Executed - all proposal transactions were exeucted on-chain"
    side="left"
  >
    <div v-if="transactionStatus === BlockchainProposalStatus.EXECUTED">
      <div class="row text-subtitle2">
        <div class="col-auto text-bold sectionName">Overview</div>
        <div class="col-grow text-right">Proposal passed. Transaction proposal created on-chain.</div>
      </div>
      <span class="text-primary"></span>
      <div class="row text-subtitle2">
        <div class="col-auto text-bold sectionName">Tx hash</div>
        <div class="col-grow text-right">{{ `${txHash.substring(0, 40)}...` }}
          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscanTx(txHash, chainId)"/>
        </div>
      </div>
      <div class="row text-subtitle2">
        <div class="col-auto text-bold sectionName">Proposal address</div>
        <div class="col-grow text-right ">{{ proposalAddress }}
          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscan(proposalAddress, chainId)"/>
        </div>
      </div>
      <div class="row text-subtitle2" v-if="transactionStatus === BlockchainProposalStatus.CREATED_ON_CHAIN">
        <div class="col-auto text-bold sectionName">PROPOSAL STATUS</div>
        <div class="col-grow text-right " v-if="isProposalPassed">
          <q-badge class="q-pa-xs" label="READY TO EXECUTE"></q-badge>
          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px;padding-right:5px">
            <q-tooltip class="stateborn-tooltip">
              Proposal was not challenged and is ready to execute on-chain.
            </q-tooltip>
          </q-icon>
        </div>
        <div class="col-grow text-right " v-if="!isProposalPassed">
          <q-badge class=q-pa-xs label="CHALLENGE PERIOD"></q-badge>
          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px;padding-right:5px">
            <q-tooltip class="stateborn-tooltip">
              Proposal transaction is currently under verification. It is the time when proposal can
              be challenged and dispute process will start. Not challenged proposal will be ready for execution.
            </q-tooltip>
          </q-icon>
        </div>
      </div>
      <div class="row text-subtitle2" v-if="!isProposalPassed">
        <div class="col-auto text-bold sectionName">CHALLENGE END DATE</div>
        <div class="col-grow text-right ">
          {{ formatDateNice(challengeSequencerEndTimeEpoch) }}
        </div>
      </div>
      <div class="row text-subtitle2" v-if="!isProposalPassed">
        <div class="col-auto text-bold sectionName">CHALLENGE REMAINING TIME</div>
        <div class="col-grow text-right ">
          <vue-countdown class="text-subtitle2"
                         :time="challengeSequencerEndTimeEpoch - nowEpoch"
                         v-slot="{ days, hours, minutes, seconds }"
                         v-if="!isChallengeSequencerPeriodEnded"
                         @end="challengeSequencerPeriodEndedCallback">
            {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
          </vue-countdown>
        </div>
      </div>
    </div>
  </q-timeline-entry>
</template>

<script lang="ts" setup>

import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';
import { goToEtherscan, goToEtherscanTx } from 'src/api/services/utils-service';
import VueCountdown from '@chenfengyuan/vue-countdown';
import { getIsProposalPassed, getChallengeSequencerEndTimeEpoch } from 'src/api/services/onchain-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { formatDateNice } from 'src/api/services/date-service';
import { onMounted, ref, watch } from 'vue';
const isProposalPassed = ref(false);
const ethConnectionStore = useEthConnectionStore();
const nowEpoch = ref(new Date().getTime());
const challengeSequencerEndTimeEpoch = ref(0);
const isChallengeSequencerPeriodEnded = ref(false);

const emit = defineEmits(['challengeSequencerPeriodEnded']);
const readIsProposalPassed = () => {
  getIsProposalPassed(props.proposalAddress).then((res: boolean) => {
    isProposalPassed.value = res;
  })
};
onMounted(() => {
  if (props.transactionStatus === BlockchainProposalStatus.CREATED_ON_CHAIN) {
    readProposalSequencerDisputeEndTime();
  }
});
const readProposalSequencerDisputeEndTime = () => {
  getChallengeSequencerEndTimeEpoch(props.proposalAddress).then((res) => {
    challengeSequencerEndTimeEpoch.value = res;
    nowEpoch.value = new Date().getTime();
    isChallengeSequencerPeriodEnded.value = (challengeSequencerEndTimeEpoch.value = nowEpoch.value) < 0;
  });
}
watch(() => [ethConnectionStore.isConnected], () => {
  if (ethConnectionStore.isConnected && props.transactionStatus === BlockchainProposalStatus.CREATED_ON_CHAIN) {
    readProposalSequencerDisputeEndTime();
    readIsProposalPassed();
  }
});

const challengeSequencerPeriodEndedCallback = () => {
  isChallengeSequencerPeriodEnded.value = true;
  emit('challengeSequencerPeriodEnded', true);
}
const props = defineProps(
  {
    transactionStatus: {
      type: String,
      required: true,
    },
    txHash: {
      type: String,
      required: true,
    },
    proposalAddress: {
      type: String,
      required: true,
    },
    chainId: {
      type: String,
      required: true,
    }
  }
);
</script>
