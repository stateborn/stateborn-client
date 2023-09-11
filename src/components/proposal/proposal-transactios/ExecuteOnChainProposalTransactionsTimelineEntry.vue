<template>
  <q-timeline-entry
      :style="transactionStatus === BlockchainProposalStatus.READY_TO_EXECUTE ? '': `${$q.platform.is.mobile  ? 'height:60px' : 'height:40px'}`"
      :icon="[
            BlockchainProposalStatus.READY_TO_EXECUTE,
            BlockchainProposalStatus.EXECUTED,
            BlockchainProposalStatus.REJECTED_ONCHAIN].includes(transactionStatus) ? 'fa-solid fa-check' : undefined"
      :color="[
            BlockchainProposalStatus.READY_TO_EXECUTE,
            BlockchainProposalStatus.EXECUTED,
            BlockchainProposalStatus.REJECTED_ONCHAIN].includes(transactionStatus) ? 'green-8' : undefined"
      :class="transactionStatus === BlockchainProposalStatus.READY_TO_EXECUTE ? 'noisegreen' : ''"
      subtitle="4. Ready to execute on-chain"
      side="left">
    <div class="row" v-if="transactionStatus === BlockchainProposalStatus.READY_TO_EXECUTE">
      <div class="col-12 text-left ">
        On-chain proposal passed. Transfers are ready to be executed.
        <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px">
          <q-tooltip class="stateborn-tooltip">
            Proposal transfers proposal is ready to be executed on-chain.<br>
            Execution can be invoked by anyone. <br>
          </q-tooltip>
        </q-icon>

        <div class="row items-center justify-center" v-if="!connectedToMatchingNetwork"
             :style="$q.platform.is.mobile ? 'height:50px': ``">
          <div class="col-12">
            <div class="row justify-center">
              <div class="col-12">
                <q-banner class="text-black text-subtitle2 text-center noisered">
                  <span class="text-bold text-red-8" v-if="$q.platform.is.mobile">Currently available on DESKTOP only</span>
                  <span class="text-bold text-red-8" v-else>Please connect</span>
                </q-banner>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <q-btn color="green-8"
                   :disable="!connectedToMatchingNetwork || buttonClicked"
                   square class="full-width q-mt-xs" label="EXECUTE TRANSFERS"
                   @click="executeTransfersOnChain"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-timeline-entry>
</template>

<script lang="ts" setup>

import { executeOnChainProposal } from 'src/api/services/onchain-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';
import { Notify, useQuasar } from 'quasar';
import { OnChainProposalDetails } from 'src/api/model/on-chain-proposal-details';
import { sleep } from 'src/api/services/sleep-service';
import { computed, ref } from 'vue';

const ethConnectionStore = useEthConnectionStore();
const buttonClicked = ref(false);

const emit = defineEmits(['onExecuteTransfersOnChain']);
const $q = useQuasar();
const executeTransfersOnChain = async () => {
  buttonClicked.value = true;
  $q.loading.show({
    delay: 100, // ms
    message: 'Executing proposal on-chain transfers...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  await executeOnChainProposal(props.onChainProposalDetails?.address!);
  await sleep(1000);
  Notify.create({message: 'Successfully executed on-chain proposal transfers!', position: 'top-right', color: 'green'});
  await sleep(500);
  $q.loading.hide();
  await sleep(2000);
  emit('onExecuteTransfersOnChain', true);
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
      chainId: {
        type: String,
        required: true,
      }
    }
);

const connectedToMatchingNetwork = computed(() => {
  if (ethConnectionStore.isConnected) {
    return ethConnectionStore.chainId === props.chainId;
  } else {
    return false;
  }
});

</script>
