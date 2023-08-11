<template>
  <q-timeline-entry subtitle="1. Created off-chain - transaction added to proposal"
                    :style="transactionStatus === BlockchainProposalStatus.CREATED_OFFCHAIN ? '': 'height:40px'"
                    :icon="(transactionStatus === BlockchainProposalStatus.CREATED_OFFCHAIN || transactionStatus=== BlockchainProposalStatus.CREATED_ON_CHAIN) ? 'fa-solid fa-check' : undefined"
                    :color="(transactionStatus === BlockchainProposalStatus.CREATED_OFFCHAIN || transactionStatus=== BlockchainProposalStatus.CREATED_ON_CHAIN) ? 'green-9' : ''"
                    :class="transactionStatus === BlockchainProposalStatus.CREATED_OFFCHAIN ? 'noisegreen' : ''"
                    side="left">
    <div v-if="transactionStatus === BlockchainProposalStatus.CREATED_OFFCHAIN">
      <div class="row text-subtitle2">
        <div class="col-2 text-bold sectionName">Overview</div>
        <div class="col-10 text-right ">Transaction added to off-chain proposal description
          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToIpfs(proposalIpfsHash)"/>
          <br> Proposal is now under voting.
        </div>
      </div>
      <span class="text-primary"></span>
    </div>
  </q-timeline-entry>
</template>

<script lang="ts" setup>
import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';
import { goToIpfs } from 'src/api/services/utils-service';


const props = defineProps(
  {
    transactionStatus: {
      type: String,
      required: true,
    },
    proposalIpfsHash: {
      type: String,
      required: true,
    },
  }
);
</script>
