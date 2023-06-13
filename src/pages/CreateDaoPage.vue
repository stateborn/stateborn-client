<template>
  <q-page>
    <div class="row justify-center q-pa-md" >
      <div class="col-6 justify-center q-pa-xs">
        <picture-parallax image-src="statebornnoise.webp" alt="stateborn image" title="Create a DAO" height="600"></picture-parallax>
        <q-card class="stateborn-card" square>
          <q-card-section class="text-center">
            <create-dao-form @proposal-changed="proposalChanged"></create-dao-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import CreateDaoForm from 'components/proposal/CreateDaoForm.vue';
import PictureParallax from 'components/PictureParallax.vue';

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
