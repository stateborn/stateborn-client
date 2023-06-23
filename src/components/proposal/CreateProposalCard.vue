<template>
  <q-card class="stateborn-card" square>
    <q-card-section>
     <create-proposal-form @proposal-changed="proposalChanged" class="text-center" :dao="dao" v-if="dao !== undefined"></create-proposal-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import CreateProposalForm from 'components/proposal/CreateProposalForm.vue';
import { getDao } from 'src/api/services/dao-service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { DaoBackend } from 'src/api/model/dao-backend';

const dao = ref(<DaoBackend | undefined>undefined);
const emit = defineEmits(['proposalChanged']);
const route = useRoute();
const daoIpfsHash: string = <string>route.params.daoIpfsHash;

getDao(daoIpfsHash).then(_ => {
  dao.value = _;
});

const proposalChanged = (changedProposal: any) => {
  emit('proposalChanged', changedProposal);
};
</script>
