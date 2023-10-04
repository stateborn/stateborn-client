<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center" style="background: rgb(0, 0, 0, 0.6) !important;">
        <picture-parallax
          image-src="/2.webp"
          alt="proposal image"
          :text-class="$q.platform.is.mobile ? 'text-h5': 'text-h3 text-center q-pa-md'"
          :scroll-target-value="scrollTarget"
          :title="dao !== null ? `${dao.clientDao.name}` :''"
          :style="$q.platform.is.mobile ? 'height: 100px !important;' :''"
          :height="$q.platform.is.mobile ? '458': '200'">
        </picture-parallax>
      </div>
    </div>
    <div class="row justify-center q-mt-xs" >
      <div class="col-lg-8 col-xs-grow">
        <q-breadcrumbs class="text-subtitle2 stateborn-card q-pt-xs q-pb-xs q-mt-xs q-mb-xs text-primary">
          <q-breadcrumbs-el icon="home" to="/">
            <span class="text-underline">Home</span>
          </q-breadcrumbs-el>
          <q-breadcrumbs-el :to="`/${daoIpfsHash}`" >
            {{dao !== null ? `${$q.platform.is.mobile ? `${dao.clientDao.name.substring(0, 20)}...` : dao.clientDao.name}`: ''}}
          </q-breadcrumbs-el>
        </q-breadcrumbs>
        <div class="row">
          <div class="col-lg-3 col-md-5 col-xs-grow" id="browseProposalsDaoCardRow">
            <dao-card :dao="dao" v-if="dao !== null" :is-full="true" :proposals-count="proposalsCount"></dao-card>
          </div>
          <div class="col-lg-9 col-md-7 col-xs-grow">
            <div class="col-12">
              <q-tabs v-model="tab" align="justify" inline-label :style="$q.platform.is.mobile ? 'font-size:12px': ''" class="noise q-ml-xs ">
                <q-tab name="proposals">
                  <q-img src="/propa.svg" style="height:29px; width: 29px;margin-right:10px"></q-img>
                  Proposals
                </q-tab>
                <q-tab name="treasury">
                  <q-img src="/gold4.png" style="height:35px; width: 35px;margin-right:10px"></q-img>
                  Treasury
                </q-tab>
              </q-tabs>
              <q-tab-panels v-model="tab" animated style="border: 0px;">
                <q-tab-panel name="proposals" style="margin:0;padding:0;" class="bodynoise">
                  <q-scroll-area :style="`height: ${proposalScrollHeight}px; width: 100%; min-width:300px`" ref="proposalScrollArea"
                                 v-if="proposals.length > 0 || hasData">
                    <q-table
                        id="proposalsTable"
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
                      <template v-slot:no-data="{ icon, message, filter }">
                        <div class="full-width row flex-center q-gutter-sm text-primary">
                <span>
                   No data found
                  </span>
                          <q-icon name="fa-solid fa-triangle-exclamation"/>
                        </div>
                      </template>
                    </q-table>
                  </q-scroll-area>
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
                </q-tab-panel>
                <q-tab-panel name="treasury" style="margin:0;padding:0;">
                  <div>
                      <treasury :dao-name="dao?.clientDao.name" :dao-address="dao?.clientDao.contractAddress" class="q-ma-xs"></treasury>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
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
import { dom } from 'quasar';
import { sleep } from 'src/api/services/sleep-service';
import { getProposal } from 'src/api/services/proposal-service';
import { getDao } from 'src/api/services/dao-service';
import { DaoBackend } from 'src/api/model/dao-backend';
import width = dom.width;
import { BackendProposal } from 'src/api/model/backend-proposal';
import { filterImagesAndAttachmentsFromDescription } from 'src/api/services/description-service';
import { useCurrentChainStore } from 'stores/current-chain-store';
import Treasury from 'components/treasury/Treasury.vue';

// 200 picture height, 50 toolbar height, 20 some spaces
const proposalScrollHeight = ref(window.innerHeight - 50  - 200 - 20);
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
const tab = ref('proposals');

const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 10
});

const calculateScrollHeight = () => {
  const ele = document.getElementById('browseProposalsDaoCardRow')!;
  proposalScrollHeight.value = ele.offsetHeight;
}

const loadProposals = async (limit: number, offset: number, filter?: string) => {
  const res = await api.get(`/api/rest/v1/dao/${daoIpfsHash}/proposals?limit=${limit}&offset=${offset}${filter !== undefined ? `&filter=${filter}` : ''}`);
  const localProposals: BackendProposal[] = [];
  for (const proposalHeader of res.data) {
    const proposal = await getProposal(proposalHeader.ipfsHash);
    localProposals.push(proposal);
  }
  localProposals.forEach((_) => {
    _.clientProposal.description = `${filterImagesAndAttachmentsFromDescription(_.clientProposal.description).substring(0, 500)}...`;
  })
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
  calculateScrollHeight();
});

api.get(`/api/rest/v1/dao/${daoIpfsHash}/proposals/count`).then(async (response) => {
  initialPagination.value.rowsNumber = Number(response.data.count);
  proposalsCount.value = response.data.count;
}, (error) => {
  console.log(error);
});

const onValidationDoneCallback = (daoBackend: DaoBackend) => dao.value = daoBackend;

const currentChainStore = useCurrentChainStore();
getDao(daoIpfsHash, onValidationDoneCallback).then(_ => {
  dao.value = _;
  currentChainStore.setChainId(_.clientDao.token.chainId);
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
