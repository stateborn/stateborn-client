<template>
  <q-timeline-entry
    v-if="transactionStatus === BlockchainProposalStatus.PROPOSAL_REJECTED"
    :style="transactionStatus === BlockchainProposalStatus.PROPOSAL_REJECTED ? '': 'height:40px'"
    subtitle="1. Rejected - proposal did not pass"
    :icon="transactionStatus === BlockchainProposalStatus.PROPOSAL_REJECTED ? 'fa-solid fa-circle-plus' : undefined"
    :color="transactionStatus === BlockchainProposalStatus.PROPOSAL_REJECTED ? 'green' : ''"
    :class="transactionStatus === BlockchainProposalStatus.PROPOSAL_REJECTED ? 'noisered' : ''"
    side="left">
  </q-timeline-entry>
</template>

<script lang="ts" setup>

import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';

const props = defineProps(
  {
    transactionStatus: {
      type: String,
      required: true,
    },
  }
);
</script>
