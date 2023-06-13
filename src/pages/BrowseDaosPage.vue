<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <picture-parallax
          image-src="browsepropsnoise.webp"
          alt="proposal image"
          v-if="scrollTarget !== null"
          :scroll-target-value="scrollTarget"
          title="DAOs"
          height="200">
        </picture-parallax>
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <q-scroll-area :style="`height: ${proposalScrollHeight}px; width: 100%;`" ref="proposalScrollArea">
        <div class="row justify-center"
             style="margin-bottom: 20px; justify-content: center; width: 100%;">
          <div class="col-8 justify-center">
            <q-table
              flat bordered
              grid
              title="DAOs"
              :rows="daos"
              :columns="columns"
              row-key="name"
              :filter="filter"
              hide-header
            >
              <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:item="props">
                <dao-card-min :dao="props.row" :is-full="false"></dao-card-min>
              </template>
            </q-table>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { api } from 'boot/axios';
import ProposalCard from 'components/proposal/ProposalCard.vue';
import PictureParallax from 'components/PictureParallax.vue';
import FullProposalCard from 'components/proposal/FullProposalCard.vue';
import DaoCard from 'components/dao-features/DaoCard.vue';
import DaoCardMin from 'components/dao-features/DaoCardMin.vue';

// 200 picture height
const proposalScrollHeight = ref(window.innerHeight - 50 - 200);
const proposalScrollArea = ref(null);
const scrollTarget = ref(null);
const filter = ref('');
const daos = ref([]);
const splitIntoChunks = (array: any[], chunkSize: number) => {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};
api.get('/api/rest/v1/dao').then((response) => {
  daos.value = response.data.map((_: any) => {
    return {
      name: _.clientDao.name,
      description: _.clientDao.description,
      imageBase64: _.clientDao.imageBase64,
      owners: _.clientDao.owners,
      ownersMultisigThreshold: _.clientDao.ownersMultisigThreshold,
      proposalTokenRequiredQuantity: _.clientDao.proposalTokenRequiredQuantity,
      tokenName: _.clientDao.token.name,
      tokenSymbol: _.clientDao.token.symbol,
      tokenNetwork: _.clientDao.token.network,
      tokenAddress: _.clientDao.token.address,
      tokenType: _.clientDao.token.type,
      ipfsHash: _.ipfsHash,
    }
  });
}, (error) => {
  console.log(error);
});

watch(() => proposalScrollArea.value, async () => {
  const target = proposalScrollArea.value.getScrollTarget();
  scrollTarget.value = target;
});

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'description', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'imageBase64', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'owners', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'ownersMultisigThreshold', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'proposalTokenRequiredQuantity', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'tokenName', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'tokenSymbol', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'tokenNetwork', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'tokenAddress', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'tokenType', label: 'Fat (g)', field: 'fat', sortable: true },
]

const rows = []
</script>
