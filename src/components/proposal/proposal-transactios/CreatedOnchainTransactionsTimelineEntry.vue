<template>
  <q-timeline-entry
    :style="[
        BlockchainProposalStatus.CREATED_ON_CHAIN,
        BlockchainProposalStatus.READY_TO_EXECUTE,
        BlockchainProposalStatus.EXECUTED,
        BlockchainProposalStatus.REJECTED_ONCHAIN].includes(transactionStatus) ? '': `${$q.platform.is.mobile  ? 'height:60px' : 'height:40px'}`"
    :class="transactionStatus === BlockchainProposalStatus.CREATED_ON_CHAIN ? 'noisegreen' : ''"
    :icon="[
        BlockchainProposalStatus.CREATED_ON_CHAIN,
        BlockchainProposalStatus.READY_TO_EXECUTE,
        BlockchainProposalStatus.EXECUTED,
        BlockchainProposalStatus.REJECTED_ONCHAIN].includes(transactionStatus) ? 'fa-solid fa-check' : undefined"
    :color="[
        BlockchainProposalStatus.CREATED_ON_CHAIN,
        BlockchainProposalStatus.READY_TO_EXECUTE,
        BlockchainProposalStatus.EXECUTED,
        BlockchainProposalStatus.REJECTED_ONCHAIN].includes(transactionStatus) ? 'green-8': ''"
    subtitle="3. Created on-chain - transfers proposal created on-chain"
    side="left"
  >
    <div v-if="transactionStatus === BlockchainProposalStatus.CREATED_ON_CHAIN && props.onChainProposalDetails !== undefined">
      <div class="row text-subtitle2">
        <div class="col-auto text-bold sectionName">Overview</div>
        <div class="col-grow text-right">Transfers proposal created on-chain.</div>
      </div>
      <span class="text-primary"></span>
<!--      <div class="row text-subtitle2">-->
<!--        <div class="col-auto text-bold sectionName">Tx hash</div>-->
<!--        <div class="col-grow text-right">{{ `${txHash.substring(0, 40)}...` }}-->
<!--          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscanTx(txHash, chainId)"/>-->
<!--        </div>-->
<!--      </div>-->
      <div class="row text-subtitle2">
        <div class="col-auto text-bold sectionName">Proposal address</div>
        <div class="col-grow text-right ">{{ props.onChainProposalDetails.address }}
          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscan(props.onChainProposalDetails.address, chainId)"/>
        </div>
      </div>
      <div class="row text-subtitle2" v-if="transactionStatus === BlockchainProposalStatus.CREATED_ON_CHAIN">
        <div class="col-auto text-bold sectionName">PROPOSAL STATUS</div>

        <div class="col-grow">
<!--          <div class="float-right" style="width:150px; max-width:150px; margin-right:0;"><q-skeleton type="rect" /></div>-->
        </div>
        <div class="col-grow text-right ">
          <q-badge class=q-pa-xs label="CHALLENGE PERIOD"></q-badge>
          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px;padding-right:5px">
            <q-tooltip class="stateborn-tooltip">
              Proposal transfers transaction is currently under challenge period. <br>
              It can be voted for or against by anyone. <br>
              Transfers will be ready to execute if the number of votes for is higher than the number of votes against.
            </q-tooltip>
          </q-icon>
        </div>

      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-auto text-bold sectionName">All Votes</div>
            <div class="col-grow text-right">{{votesNum}}</div>
          </div>
          <q-linear-progress size="40px" :value="forVotes" color="green" track-color="red" stripe>
            <div class="absolute-full flex flex-center">
              <q-badge style="height: 30px" color="primary" text-color="white" :label="votesLabel" />
            </div>
          </q-linear-progress>
        </div>
      </div>

      <div class="row text-subtitle2">
        <div class="col-auto text-bold sectionName">CHALLENGE END DATE</div>
        <div class="col-grow text-right ">{{ formatDateNice(challengeEndDateEpoch) }}</div>

      </div>
      <div class="row text-subtitle2">
        <div class="col-auto text-bold sectionName">CHALLENGE REMAINING TIME</div>
        <div class="col-grow text-right ">
          <vue-countdown class="text-subtitle2"
                         :time="challengeEndDateEpoch - nowEpoch"
                         v-slot="{ days, hours, minutes, seconds }"
                         @end="challengeTimeEnded">
            {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
          </vue-countdown>
        </div>
      </div>
    </div>
    <div v-if="onChainProposalDetails !== undefined && transactionStatus !== BlockchainProposalStatus.CREATED_ON_CHAIN">
      <div class="row text-subtitle2">
        <div class="col-auto text-bold sectionName">Proposal address</div>
        <div class="col-grow text-right ">{{ props.onChainProposalDetails.address }}
          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscan(props.onChainProposalDetails!.address, chainId)"/>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-auto text-bold sectionName">Proposal status</div>
          <div class="col-grow text-right ">
            <q-badge label="PASSED" color="green" v-if="onChainProposalDetails.passed"></q-badge>
            <q-badge label="REJECTED" color="red" v-else></q-badge>
            <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" >
              <q-tooltip class="stateborn-tooltip">
                <div v-if="!onChainProposalDetails.passed">
                  Proposal passed on-chain voting having more votes for than against.
                  Transfers are ready to be executed.
                </div>
                <div v-else>
                  Proposal was rejected during on-chain challenge period.<br>
                  It means there were less for votes than against on-chain proposal.<br>
                  Transfers will not be executed.
                </div>
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-auto text-bold sectionName">For votes</div>
            <div class="col-grow text-right">{{onChainProposalDetails.forVotes}}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-auto text-bold sectionName">Against votes</div>
            <div class="col-grow text-right">{{onChainProposalDetails.againstVotes}}</div>
          </div>
        </div>
      </div>
    </div>
  </q-timeline-entry>
</template>

<script lang="ts" setup>

import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';
import { goToEtherscan } from 'src/api/services/utils-service';
import VueCountdown from '@chenfengyuan/vue-countdown';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { formatDateNice } from 'src/api/services/date-service';
import { onMounted, ref, watch } from 'vue';
import { OnChainProposalDetails } from 'src/api/model/on-chain-proposal-details';
import { sleep } from 'src/api/services/sleep-service';

const ethConnectionStore = useEthConnectionStore();
const nowEpoch = ref(new Date().getTime());
const challengeEndDateEpoch = ref(0);
const forVotes = ref(0);
const votesLabel = ref('');
const votesNum = ref(0);
const emit = defineEmits(['challengeTimeEnded']);

const props = defineProps(
  {
    transactionStatus: {
      type: String,
      required: true,
    },
    onChainProposalDetails: {
      type: OnChainProposalDetails,
      required: false,
    },
    chainId: {
      type: String,
      required: true,
    }
  }
);
const setValues = () => {
  if (props.onChainProposalDetails !== undefined) {
    forVotes.value = props.onChainProposalDetails.forVotes / (props.onChainProposalDetails.forVotes + props.onChainProposalDetails.againstVotes);
    votesNum.value = props.onChainProposalDetails.forVotes + props.onChainProposalDetails.againstVotes;
    votesLabel.value = `FOR ${props.onChainProposalDetails.forVotes} : ${props.onChainProposalDetails.againstVotes} AGAINST`;
    challengeEndDateEpoch.value = props.onChainProposalDetails.endsDate.getTime();
  }
}
onMounted(() => {
  setValues();
});

watch(() => [props.onChainProposalDetails], () => {
    setValues();
});
const challengeTimeEnded = () => {
  sleep(2000).then(() => {
    emit('challengeTimeEnded', true);
  });
}
</script>
