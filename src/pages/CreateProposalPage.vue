<template>
  <q-page>
    <div class="row justify-center q-pa-md" >
      <div class="col-6 justify-center q-pa-xs">
        <picture-parallax image-src="/proposal2noise.webp" alt="proposal image" title="Create Proposal" height="330"></picture-parallax>
        <CreateProposalCard @proposal-changed="proposalChanged"></CreateProposalCard>
      </div>
<!--      <div class="col-5 justify-center q-pa-xs">-->
<!--        <FullProposalCard-->
<!--          class="text-left"-->
<!--          :proposal="proposal"-->
<!--          v-if="proposal !== undefined"-->
<!--          card-title="Proposal preview"-->
<!--          picture-height="380"-->
<!--        ></FullProposalCard>-->
<!--      </div>-->
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import CreateProposalCard from 'components/proposal/CreateProposalCard.vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import PictureParallax from 'components/PictureParallax.vue';
import FullProposalCard from 'components/proposal/FullProposalCard.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const daoIpfsHash: string = route.params.daoIpfsHash;

const ethConnectionStore = useEthConnectionStore();
const proposal = ref({
  clientProposal: {
    title: ' ',
    description: ' ',
    sequencerAddress: ethConnectionStore.account,
    startDateUtc: '',
    endDateUtc: '',
  },
});
watch(() => ethConnectionStore.account, () => {
  proposal.value.clientProposal.sequencerAddress = ethConnectionStore.account;
});
const proposalChanged = (changedProposal: any) => {
  proposal.value = {
    clientProposal: {
      title: changedProposal.title,
      description: changedProposal.description,
      sequencerAddress: ethConnectionStore.account,
      startDateUtc: changedProposal.startDateUtc,
      endDateUtc: changedProposal.endDateUtc,
    },
  };
};
</script>
