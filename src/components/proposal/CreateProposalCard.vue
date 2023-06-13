<template>
  <q-card class="stateborn-card" square>
    <q-card-section class="text-center">
     <create-proposal-form @proposal-changed="proposalChanged"></create-proposal-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import CreateProposalForm from 'components/proposal/CreateProposalForm.vue';

const emit = defineEmits(['proposalChanged']);
const proposalChanged = (changedProposal: any) => {
  emit('proposalChanged', changedProposal);
};
</script>
