<template>
  <q-timeline-entry subtitle="1. Created off-chain - transfers added to proposal"
                    :style="transactionStatus === BlockchainProposalStatus.CREATED_OFFCHAIN ? '': 'height:40px'"
                    :icon="[
                        BlockchainProposalStatus.CREATED_OFFCHAIN,
                        BlockchainProposalStatus.PROPOSAL_REJECTED,
                        BlockchainProposalStatus.READY_TO_DEPLOY_ONCHAIN,
                        BlockchainProposalStatus.CREATED_ON_CHAIN,
                        BlockchainProposalStatus.READY_TO_EXECUTE,
                        BlockchainProposalStatus.EXECUTED].includes(transactionStatus) ? 'fa-solid fa-check' : undefined"
                    color="green-9"
                    :class="transactionStatus === BlockchainProposalStatus.CREATED_OFFCHAIN ? 'noisegreen' : ''"
                    side="left">
    <div v-if="transactionStatus === BlockchainProposalStatus.CREATED_OFFCHAIN">
      <div class="row text-subtitle2">
        <div class="col-12 text-left ">Transaction added to off-chain proposal description
          <q-btn flat round color="primary" size="xs" icon="fa-solid fa-arrow-up-right-from-square"
                 @click="goToIpfs(proposalIpfsHash)"/>
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
