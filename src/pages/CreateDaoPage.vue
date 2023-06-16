<template>
  <q-page>
    <div class="row justify-center q-pa-md" >
      <div class="col-6 justify-center q-pa-xs">
        <picture-parallax image-src="statebornnoise.webp" alt="stateborn image" title="Create a DAO" height="600"></picture-parallax>
        <q-card class="stateborn-card" square>
          <q-card-section class="text-center">
            <div class="row justify-center">
              <div class="col-lg-8 col-md-12 justify-center">
                <q-breadcrumbs class="text-subtitle2 text-primary q-pb-md">
                  <q-breadcrumbs-el icon="home" to="/">
                    <span class="text-underline">Home</span>
                  </q-breadcrumbs-el>
                </q-breadcrumbs>
                <create-dao-form @proposal-changed="proposalChanged"></create-dao-form>
              </div>
            </div>
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
