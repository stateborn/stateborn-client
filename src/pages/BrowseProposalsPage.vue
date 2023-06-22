<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <picture-parallax
          image-src="/proposalsnoise.webp"
          alt="proposal image"
          :text-class="$q.platform.is.mobile ? 'text-h5': 'text-h3 text-center q-pa-md'"
          :scroll-target-value="scrollTarget"
          :title="dao !== null ? `${dao.clientDao.name}` :''"
          line-height="1.5rem"
          :style="$q.platform.is.mobile ? 'height: 100px !important;' :''"
          :height="$q.platform.is.mobile ? '325': '200'">
        </picture-parallax>
      </div>
    </div>
    <div class="row justify-center q-mt-md" >
      <div class="col-lg-8 col-xs-grow">
        <q-breadcrumbs class="text-subtitle2 noise text-primary">
          <q-breadcrumbs-el icon="home" to="/">
            <span class="text-underline">Home</span>
          </q-breadcrumbs-el>
          <q-breadcrumbs-el :to="`/${daoIpfsHash}`" >
            {{dao !== null ? `${$q.platform.is.mobile ? `${dao.clientDao.name.substring(0, 20)}...` : dao.clientDao.name}`: ''}}
          </q-breadcrumbs-el>
        </q-breadcrumbs>
        <div class="row">
          <div class="col-lg-3 col-md-5 col-xs-grow">
            <dao-card :dao="dao" v-if="dao !== null" :is-full="true" :proposals-count="proposalsCount"></dao-card>
          </div>
          <div class="col-lg-9 col-md-7 col-xs-grow">
            <q-table
              id="proposalsTable"
              v-if="proposals.length > 0 || hasData"
              flat bordered
              grid
              v-model:pagination="initialPagination"
              title="Proposals"
              :rows="proposals"
              :columns="columns"
              row-key="name"
              :filter="filter"
              @request="onTableDataRequest"
              hide-header
            >
              <template v-slot:top-right>
                <q-input borderless dense debounce="500" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </template>
              <template v-slot:item="props">
                <proposal-card
                  v-show="tableEntryWidth > 0"
                  class="q-ma-xs q-mt-lg"
                  :style="`min-width:${tableEntryWidth}px` "
                  :dao-ipfs-hash="daoIpfsHash"
                  :proposal="props.row"
                  @click="$router.push(`/${daoIpfsHash}/${props.row.ipfsHash}`)"></proposal-card>
              </template>
            </q-table>
            <div class="row items-center justify-center" v-else
                 :style="$q.platform.is.mobile ? 'height:100px': `height:${proposalScrollHeight}px`">
              <div class="row justify-center items-center" v-if="!proposalsLoaded">
                <div class="col-auto justify-center q-pa-xs">
                  <q-spinner
                    class="text-center justify-center"
                    color="primary"
                    size="3em"
                  />
                </div>
              </div>
              <div class="col-lg-12 col-xs-grow justify-center" v-else>
                <div class="row justify-center" v-if="!$q.platform.is.mobile">
                  <div class="col-lg-auto col-xs-12 justify-center">
                    <div class="text-h5" v-if="proposalsLoaded">No proposals yet</div>
                  </div>
                </div>
                <div class="text-center text-subtitle2" v-else>
                  <span v-if="proposalsLoaded">No proposals yet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import ProposalCard from 'components/proposal/ProposalCard.vue';
import PictureParallax from 'components/PictureParallax.vue';
import { useRoute } from 'vue-router';
import DaoCard from 'components/dao-features/DaoCard.vue';
import { dom, useMeta } from 'quasar';
import { sleep } from 'src/api/services/sleep-service';
import { getProposal } from 'src/api/services/proposal-service';
import { getDao } from 'src/api/services/dao-service';
import { DaoBackend } from 'src/api/model/dao-backend';
import width = dom.width;
import { BackendProposal } from 'src/api/model/backend-proposal';

// 200 picture height
const proposalScrollHeight = ref(window.innerHeight - 50 - 200);
const tableEntryWidth = ref(0);
const scrollTarget = ref(null);
const proposals = ref(<BackendProposal[]>[]);
const route = useRoute();
const dao = ref(<DaoBackend | null>null);
const filter = ref('');
const daoIpfsHash: string = <string>route.params.daoIpfsHash;
const hasData = ref(false);
const proposalsCount = ref('');
const proposalsLoaded = ref(false);
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 10
});

const loadProposals = async (limit: number, offset: number, filter?: string) => {
  const res = await api.get(`/api/rest/v1/dao/${daoIpfsHash}/proposals?limit=${limit}&offset=${offset}${filter !== undefined ? `&filter=${filter}` : ''}`);
  const localProposals: BackendProposal[] = [];
  for (const proposalHeader of res.data) {
    const proposal = await getProposal(proposalHeader.ipfsHash);
    localProposals.push(proposal);
  }
  return localProposals;
};

onMounted(async () => {
  proposals.value = await loadProposals(initialPagination.value.rowsPerPage, (initialPagination.value.page - 1) * initialPagination.value.rowsPerPage);
  if (proposals.value.length > 0) {
    hasData.value = true;
    await sleep(50);
    tableEntryWidth.value = width(document.getElementById('proposalsTable')!) - 10;
  }
  proposalsLoaded.value = true;
});

api.get(`/api/rest/v1/dao/${daoIpfsHash}/proposals/count`).then(async (response) => {
  initialPagination.value.rowsNumber = Number(response.data.count);
  proposalsCount.value = response.data.count;
}, (error) => {
  console.log(error);
});

getDao(daoIpfsHash).then(_ => {
  dao.value = _;
});
const onTableDataRequest = async ({ pagination, filter }: any) => {
  proposals.value = await loadProposals(pagination.rowsPerPage, (pagination.page - 1) * pagination.rowsPerPage, filter);
  initialPagination.value.page = pagination.page;
};
const columns = [
  { name: 'title', required: true, align: 'left', sortable: true },
  { name: 'description', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'endDateUtc', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'startDateUtc', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'proposalType', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'ipfsHash', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'creatorAddress', label: 'Fat (g)', field: 'fat', sortable: true },
];
</script>
