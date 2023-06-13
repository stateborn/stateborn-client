<template>
  <q-card class="stateborn-card" :class="proposalReportStorage.isValid ? 'bg-green-1' : 'bg-red-1'" square>
    <q-card-section style="padding:5px;">
      <div class="row justify-center items-center">
        <div class="col-auto justify-center q-pa-xs">
          <q-icon name="fa-solid fa-list-check" style="font-size: 1.5rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <div class="text-h5 text-center">
            Proposal Validity
          </div>
        </div>
      </div>
      <q-separator class="q-mb-xs q-mt-xs"/>
      <div class="row justify-center items-center" v-if="isLoading">
        <div class="col-auto justify-center q-pa-xs">
          <q-spinner
            class="text-center justify-center"
            color="primary"
            size="3em"
          />
        </div>
      </div>
      <div v-else>
        <div class="text-bold text-center">Proposal summary IPFS hash</div>
        <div class="text-center"><a href="google.pl">{{ props.proposalReportDto.ipfsHash }}</a></div>
        <q-separator class="q-mb-xs q-mt-xs"/>
        <div class="text-bold text-center">Proposal result validity
          <q-icon name="fa-solid fa-circle-info">
            <q-tooltip class="bg-black text-white">
              Validity of the proposal result was verified client side.<br>
            </q-tooltip>
          </q-icon>
        </div>
        <div class="text-center">
          <q-icon :color="proposalReportStorage.isValid ? 'green' : 'red'"
                  :name="proposalReportStorage.isValid ? 'fa-solid fa-square-check' : 'fa-solid fa-square-xmark'"
                  style="font-size: 2rem !important;">
          </q-icon>
        </div>
        <div v-if="!proposalReportStorage.isValid">
          <div class="text-bold text-center">Validation error</div>
          <div class="text-center">{{ proposalReportStorage.error }}</div>
        </div>
        <q-separator class="q-mb-xs q-mt-xs"/>
        <div class="text-bold text-center">Merkle root</div>
        <div class="text-center">{{ proposalReportStorage.merkleRootHex }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { calculateVotesAndGetProposalReportStorage } from 'src/api/services/calculate-votes-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';

const props = defineProps(['proposalResultDto', 'proposalReportDto', 'proposalIpfsHash']);
const isLoading = ref(true);
const proposalReportStorage = ref({});
const ethConnectionStore = useEthConnectionStore();
calculateVotesAndGetProposalReportStorage(props.proposalReportDto.ipfsHash, props.proposalIpfsHash, ethConnectionStore.account).then((result) => {
  proposalReportStorage.value = result;
  // key-value object
  if (proposalReportStorage.value.isValid) {
    const results = proposalReportStorage.value.results!;
    const resultsSum = Object.values(results).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
    if (Number(resultsSum).toString() !== props.proposalResultDto.totalVotes) {
      proposalReportStorage.value.isValid = false;
      proposalReportStorage.value.error = 'Calculated total votes sum is not equal to expected';
    }
    props.proposalResultDto.voteResults.forEach((voteResult) => {
      if (Number(results[voteResult.option]).toString() !== voteResult.votes) {
        proposalReportStorage.value.isValid = false;
        proposalReportStorage.value.error = `Calculated option ${voteResult.option} votes sum is not equal to expected`;
      }
    });
    props.proposalResultDto.voteResults = result.voteResults;
    isLoading.value = false;
  }
});
</script>
