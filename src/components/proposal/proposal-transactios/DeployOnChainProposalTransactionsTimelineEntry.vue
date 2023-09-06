<template>
  <q-timeline-entry
      :style="transactionStatus === BlockchainProposalStatus.READY_TO_DEPLOY_ONCHAIN ? '': 'height:40px'"
      :icon="[
          BlockchainProposalStatus.READY_TO_DEPLOY_ONCHAIN,
          BlockchainProposalStatus.CREATED_ON_CHAIN,
          BlockchainProposalStatus.READY_TO_EXECUTE,
          BlockchainProposalStatus.EXECUTED].includes(transactionStatus) ? 'fa-solid fa-check' : undefined"
      color="green-9"
      :class="transactionStatus === BlockchainProposalStatus.READY_TO_DEPLOY_ONCHAIN ? 'noisegreen' : ''"
      subtitle="2. Ready to create on-chain"
      side="left">
    <div class="row" v-if="transactionStatus === BlockchainProposalStatus.READY_TO_DEPLOY_ONCHAIN">
      <div class="col-12 text-left ">
        Transfers on-chain proposal is ready to be created
        <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px">
          <q-tooltip class="stateborn-tooltip">
            Proposal transfers proposal is ready to be created on-chain.<br>
            Creation can be done by anyone. <br>
            Collateral of {{ requiredCollateral }} {{ TOKEN_SERVICE.getNetworkCurrency(props.chainId) }} is required to
            be provided on creation.
          </q-tooltip>
        </q-icon>

        <div class="row text-subtitle2 q-mt-md">
          <div class="col-auto text-bold sectionName">Collateral required</div>
          <div class="col-grow text-right">{{ requiredCollateral }}
            {{ TOKEN_SERVICE.getNetworkCurrency(props.chainId) }}
          </div>
        </div>

        <div class="row items-center justify-center" v-if="!connectedToMatchingNetwork"
             :style="$q.platform.is.mobile ? 'height:50px': ``">
          <div class="col-12">
            <div class="row justify-center" v-if="!$q.platform.is.mobile">
              <div class="col-12">
                <q-banner class="text-black text-subtitle2 text-center noisered">
                  <span class="text-bold text-red">Please connect</span>
                </q-banner>
              </div>
            </div>
            <div class="text-center text-subtitle2 text-red" v-else>Please connect</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-btn color="primary"
                   :disable="!connectedToMatchingNetwork || buttonClicked"
                   square class="full-width q-mt-xs" label="CREATE ON-CHAIN PROPOSAL"
                   @click="deployProposalOnChain"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-timeline-entry>
</template>

<script lang="ts" setup>

import { createProposalOnChain, getCreateProposalRequiredCollateral } from 'src/api/services/onchain-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { computed, onMounted, ref } from 'vue';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';
import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';
import { Notify, useQuasar } from 'quasar';
import { sleep } from 'src/api/services/sleep-service';

const ethConnectionStore = useEthConnectionStore();
const $q = useQuasar();
const buttonClicked = ref(false);
const emit = defineEmits(['deployedOnChain']);
const deployProposalOnChain = async () => {
  buttonClicked.value = true;
  $q.loading.show({
    delay: 100, // ms
    message: 'Creating on-chain proposal...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  const proposalAddress = await createProposalOnChain(props.daoAddress, props.proposalId, props.proposalMerkleRoot, props.transactions, requiredCollateral.value);
  await sleep(1000);
  Notify.create({ message: `Successfully created on-chain proposal! Address: ${proposalAddress}`, position: 'top-right', color: 'green' });
  await sleep(500);
  $q.loading.hide();
  emit('deployedOnChain', true);
};

const requiredCollateral = ref('');

onMounted(async () => {
  requiredCollateral.value = await getCreateProposalRequiredCollateral(props.daoAddress);
});

const props = defineProps(
    {
      transactionStatus: {
        type: String,
        required: true,
      },
      daoAddress: {
        type: String,
        required: true,
      },
      proposalId: {
        type: String,
        required: true,
      },
      proposalMerkleRoot: {
        type: String,
        required: true,
      },
      transactions: {
        type: Array<ClientProposalTransaction>,
        required: true,
      },
      chainId: {
        type: String,
        required: true,
      },
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