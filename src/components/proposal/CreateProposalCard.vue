<template>
  <q-card class="stateborn-card " square>
    <q-card-section style="padding: 2px !important; margin:2px !important;">
      <div class="text-h5 text-center">New proposal</div>
    </q-card-section>
      <q-separator class="q-mt-xs q-mb-xs"></q-separator>
    <q-card-section :style="$q.platform.is.mobile ? 'margin:0;padding:0;' : ''">
     <create-proposal-form class="text-center q-pt-md" :dao="dao" v-if="dao !== undefined"></create-proposal-form>
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
</script>
