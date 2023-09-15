<template>
  <q-page>
    <div class="row justify-center" :class="$q.platform.is.mobile ? '' : 'q-pa-xs'" >
      <div class="col-lg-8 col-xs-grow justify-center">
        <picture-parallax
          image-src="/3.webp"
          alt="proposal image"
          :text-class="$q.platform.is.mobile ? 'text-h5': undefined"
          title="Create proposal"
          :style="$q.platform.is.mobile ? 'height: 100px !important;' :''"
          :height="$q.platform.is.mobile ? '458': '300'"
        ></picture-parallax>
        <div class="row q-pa-xs" >
          <div class="col-12">
            <q-breadcrumbs class="text-subtitle2 stateborn-card q-pa-xs  text-primary">
              <q-breadcrumbs-el icon="home" to="/">
                <span class="text-underline">Home</span>
              </q-breadcrumbs-el>
              <q-breadcrumbs-el :to="`/${daoIpfsHash}`" >
               <span class="text-underline"> {{dao !== null ? `${$q.platform.is.mobile ? `${dao?.clientDao.name.substring(0, 20)}...` : dao?.clientDao.name}`: ''}}</span>
              </q-breadcrumbs-el>
              <q-breadcrumbs-el>
                Create Proposal
              </q-breadcrumbs-el>
            </q-breadcrumbs>
          </div>
        </div>
        <div class="row" >
          <div class="col-lg-3 col-md-5 col-xs-grow q-pa-xs" >
            <dao-card :is-full="true" :dao="dao"  v-if="dao !== undefined" :full-width="true" :show-required-token-quantity="true" :is-create-proposal-mode="true"></dao-card>
          </div>
          <div class="col-lg-9 col-md-7 col-xs-grow q-pa-xs">
            <CreateProposalCard></CreateProposalCard>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CreateProposalCard from 'components/proposal/CreateProposalCard.vue';
import PictureParallax from 'components/PictureParallax.vue';
import { useRoute } from 'vue-router';
import { DaoBackend } from 'src/api/model/dao-backend';
import { getDao } from 'src/api/services/dao-service';
import DaoCard from 'components/dao-features/DaoCard.vue';

const route = useRoute();
const daoIpfsHash: string = <string>route.params.daoIpfsHash;

const dao = ref(<DaoBackend | undefined>undefined);
getDao(daoIpfsHash).then(_ => {
  dao.value = _;
});

// const proposal = ref({
//   clientProposal: {
//     title: ' ',
//     description: ' ',
//     sequencerAddress: ethConnectionStore.account,
//     startDateUtc: '',
//     endDateUtc: '',
//   },
// });
// watch(() => ethConnectionStore.account, () => {
//   proposal.value.clientProposal.sequencerAddress = ethConnectionStore.account;
// });
// const proposalChanged = (changedProposal: any) => {
//   proposal.value = {
//     clientProposal: {
//       title: changedProposal.title,
//       description: changedProposal.description,
//       sequencerAddress: ethConnectionStore.account,
//       startDateUtc: changedProposal.startDateUtc,
//       endDateUtc: changedProposal.endDateUtc,
//     },
//   };
// };
</script>
