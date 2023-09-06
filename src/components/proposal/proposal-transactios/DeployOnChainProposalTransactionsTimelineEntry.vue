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
          Collateral of {{requiredCollateral}} {{TOKEN_SERVICE.getNetworkCurrency(props.chainId)}} is required to be provided on creation.
        </q-tooltip>
      </q-icon>

        <div class="row text-subtitle2 q-mt-md">
          <div class="col-auto text-bold sectionName">Collateral required</div>
          <div class="col-grow text-right">{{requiredCollateral}} {{TOKEN_SERVICE.getNetworkCurrency(props.chainId)}}</div>
        </div>
      </div>

        <q-btn color="primary" square class="full-width q-mt-xs" label="CREATE ON-CHAIN PROPOSAL" @click="deployProposalOnChain"></q-btn>
    </div>
  </q-timeline-entry>
</template>

<script lang="ts" setup>

import { createProposalOnChain, getCreateProposalRequiredCollateral } from 'src/api/services/onchain-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { onMounted, ref } from 'vue';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';
import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';

const ethConnectionStore = useEthConnectionStore();

const emit = defineEmits(['challengeSequencerPeriodEnded']);
const deployProposalOnChain = async () => {
  const proposalAddress = await createProposalOnChain(props.daoAddress, props.proposalId, props.proposalMerkleRoot, props.transactions, requiredCollateral.value);
  console.log('proposal deployed to: ', proposalAddress);
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
</script>
