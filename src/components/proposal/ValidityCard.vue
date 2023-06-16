<template>
  <q-card :class="reportIsValid ? 'noisegreencard' : 'noiseredcard'" square>
    <q-card-section style="padding:0px;">
      <div class="row justify-center items-center">
        <div class="col-auto justify-center q-pa-xs">
          <q-icon name="fa-solid fa-list-check" style="font-size: 1.5rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <div class="text-h5 text-center">
            Result validity
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
        <q-list>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-arrow-up-right-from-square"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ proposalReport.ipfsHash }}</q-item-label>
              <q-item-label caption class="text-primary">Proposal summary IPFS hash</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon size="xs" :color="reportIsValid ? 'green' : 'red'" name="fa-solid fa-square-check"/>
            </q-item-section>

            <q-item-section>
              <q-item-label :class="reportIsValid ? 'text-green-8 text-bold' : 'text-bold text-red'">{{
                  reportIsValid ? 'VALID - your vote is correctly included in the proposal summary' : 'INVALID'
                }}
              </q-item-label>
              <q-item-label caption class="text-primary">Proposal result validity</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon size="xs" name="fa-solid fa-circle-info" color="primary" class="q-pl-xs">
                <q-tooltip class="stateborn-tooltip">
                  Your vote is correctly included in the proposal result report created by stateborn backend.<br>
                  Validation was done client side. <br>
                  Validation includes reading your vote from IPFS and checking if it was signed by you.<br>
                  It was also verified that only your last (final) vote is included in the proposal result report.<br>
                </q-tooltip>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon size="xs" color="primary" name="fa-solid fa-info"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ reportCalculatedMerkleRootHex }}</q-item-label>
              <q-item-label caption class="text-primary">Result merkle root</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="reportError !== ''">
            <q-item-section avatar>
              <q-icon size="xs" color="primary" name="fa-solid fa-circle-exclamation"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ reportError }}</q-item-label>
              <q-item-label caption class="text-primary">Validation error</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { calculateUserVotesAndGetProposalReportStorage } from 'src/api/services/calculate-votes-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { ProposalReport } from 'src/api/model/proposal-report';

const props = defineProps<{
  proposalReport: ProposalReport,
  proposalIpfsHash: string,
}>();

const isLoading = ref(true);
const proposalReportStorage = ref({});
const ethConnectionStore = useEthConnectionStore();
const reportCalculatedMerkleRootHex = ref('');
const reportError = ref('');
const reportIsValid = ref(true);
calculateUserVotesAndGetProposalReportStorage(props.proposalReport.ipfsHash, props.proposalIpfsHash, ethConnectionStore.account).then((result) => {
  proposalReportStorage.value = result;
  // key-value object
  reportError.value = result.error !== undefined ? result.error : '';
  reportCalculatedMerkleRootHex.value = result.merkleRootHex;
  isLoading.value = false;
});
</script>
