<template>
  <q-page>
    <div class="row justify-center" :class="$q.platform.is.mobile ? '' : 'q-pa-md'" >
      <div class="col-lg-6 col-xs-grow justify-center q-pa-xs">
        <picture-parallax
          image-src="/proposal2noise.webp"
          alt="proposal image"
          :text-class="$q.platform.is.mobile ? 'text-h5': undefined"
          title="Create Proposal"
          :style="$q.platform.is.mobile ? 'height: 100px !important;' :''"
          :height="$q.platform.is.mobile ? '323': '300'"
        ></picture-parallax>
        <CreateProposalCard @proposal-changed="proposalChanged"></CreateProposalCard>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import CreateProposalCard from 'components/proposal/CreateProposalCard.vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import PictureParallax from 'components/PictureParallax.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const daoIpfsHash: string = <string>route.params.daoIpfsHash;

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
