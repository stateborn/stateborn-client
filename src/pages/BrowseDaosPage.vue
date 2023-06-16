<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <picture-parallax
          image-src="browsepropsnoise.webp"
          alt="proposal image"
          v-if="scrollTarget !== null"
          :scroll-target-value="scrollTarget"
          title="stateborn"
          height="200">
        </picture-parallax>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-8">
        <div class="row">
          <div class="col-lg-3 col-md-5">
            <welcome-to-stateborn-card :is-full="true"></welcome-to-stateborn-card>
          </div>
          <div class="col-lg-9">
            <q-scroll-area :style="`height: ${proposalScrollHeight}px; width: 100%; min-width:330px`" ref="proposalScrollArea">
              <q-table
                flat bordered
                grid
                v-model:pagination="initialPagination"
                title="DAOs"
                :rows="daos"
                :columns="columns"
                row-key="name"
                :filter="filter"
                hide-header
                @request="onTableDataRequest"
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
            </q-scroll-area>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { api } from 'boot/axios';
import PictureParallax from 'components/PictureParallax.vue';
import DaoCardMin from 'components/dao-features/DaoCardMin.vue';
import WelcomeToStatebornCard from 'components/WelcomeToStatebornCard.vue';
import { getDao } from 'src/api/services/dao-service';
import { Dao } from 'src/api/model/dao';

// 200 picture height, 50 toolbar height, 20 some spaces
const proposalScrollHeight = ref(window.innerHeight - 50  - 200 - 20);
const proposalScrollArea = ref(null);
const scrollTarget = ref(null);
const filter = ref('');
const daos = ref(<Dao[]>[]);
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 2,
  rowsNumber: 10
});
const hasData = ref(false);
onMounted(async () => {
  daos.value = await loadDaos(initialPagination.value.rowsPerPage, (initialPagination.value.page - 1) * initialPagination.value.rowsPerPage);
  if (daos.value.length > 0) {
    hasData.value = true;
  }
});
api.get(`/api/rest/v1/dao/all/count`).then(async (response) => {
  initialPagination.value.rowsNumber = Number(response.data.count);
}, (error) => {
  console.log(error);
});

const loadDaos = async (limit: number, offset: number, filter?: string) => {
  const res = await api.get(`/api/rest/v1/dao?limit=${limit}&offset=${offset}${filter !== undefined ? `&filter=${filter}` : ''}`);
  const localDaos: Dao[] = [];
  console.log(res.data);
  for (const daoRes of res.data) {
    const dao = await getDao(daoRes.ipfsHash);
    localDaos.push(dao);
  }
  return localDaos;
};

const onTableDataRequest = async ({ pagination, filter }: any) => {
  daos.value = await loadDaos(pagination.rowsPerPage, (pagination.page - 1) * pagination.rowsPerPage, filter);
  initialPagination.value.page = pagination.page;
};

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
];

</script>
