<template>
  <q-timeline-entry
      :style="transactionStatus === BlockchainProposalStatus.READY_TO_EXECUTE ? '': 'height:40px'"
      :icon="[
            BlockchainProposalStatus.READY_TO_EXECUTE,
            BlockchainProposalStatus.EXECUTED].includes(transactionStatus) ? 'fa-solid fa-check' : undefined"
      :color="[
            BlockchainProposalStatus.READY_TO_EXECUTE,
            BlockchainProposalStatus.EXECUTED].includes(transactionStatus) ? 'green-9' : undefined"
      :class="transactionStatus === BlockchainProposalStatus.READY_TO_EXECUTE ? 'noisegreen' : ''"
      subtitle="4. Ready to execute on-chain"
      side="left">
    <div class="row" v-if="transactionStatus === BlockchainProposalStatus.READY_TO_EXECUTE">
      <div class="col-12 text-left ">
        On-chain proposal passed. Transfers are ready to be executed.
        <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px">
          <q-tooltip class="stateborn-tooltip">
            Proposal transfers proposal is ready to be created on-chain.<br>
            Creation can be done by anyone. <br>
          </q-tooltip>
        </q-icon>
      </div>

      <q-btn color="green-8" square class="full-width q-mt-xs" label="EXECUTE TRANSFERS"
             @click="executeTransfersOnChain"></q-btn>
    </div>
  </q-timeline-entry>
</template>

<script lang="ts" setup>

import { executeOnChainProposal, getCreateProposalRequiredCollateral } from 'src/api/services/onchain-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { onMounted, ref } from 'vue';
import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';
import { Notify, useQuasar } from 'quasar';
import { OnChainProposalDetails } from 'src/api/model/on-chain-proposal-details';

const ethConnectionStore = useEthConnectionStore();

const emit = defineEmits(['challengeSequencerPeriodEnded']);
const $q = useQuasar();
const executeTransfersOnChain = async () => {
  $q.loading.show({
    delay: 100, // ms
    message: 'Executing proposal on-chain transfers...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  await executeOnChainProposal(props.onChainProposalDetails?.address!);
  $q.loading.hide();
  Notify.create({ message: 'Successfully executed on-chain proposal transfers!', position: 'top-right', color: 'green' });
};

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
    }
);
</script>
