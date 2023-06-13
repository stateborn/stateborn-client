<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <picture-parallax
          image-src="/proposalsnoise.webp"
          alt="proposal image"
          :scroll-target-value="scrollTarget"
          title="Proposals"
          height="200">
        </picture-parallax>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-8">
        <div class="row">
          <div class="col-4">
            <dao-card class="q-mt-lg" :dao="dao" v-if="dao !== null" :is-full="true"></dao-card>
          </div>
          <div class="col-8">
            <q-scroll-area :style="`height: ${proposalScrollHeight}px; width: 100%;`" ref="proposalScrollArea"
                           v-if="proposals.length > 0">
              <div class="row justify-center" v-for="proposal in proposals" :key="proposal.ipfsHash"
                   style="margin-bottom: 20px; justify-content: center; width: 100%;">
                <div class="col-12 justify-center">
                  <proposal-card :proposal="proposal" @click="$router.push(`/${daoIpfsHash}/proposal/${proposal.ipfsHash}`)"></proposal-card>
                </div>
              </div>
            </q-scroll-area>
            <div class="row items-center justify-center" v-else :style="`height:${proposalScrollHeight}px`">
              <div class="col-12 justify-center">
                <div class="row justify-center">
                  <div class="col-auto">
                    <div class="text-h5 text-center">No proposals yet</div>
                  </div>
                </div>
                <div class="row justify-center q-pt-xs">
                  <div class="col-auto">
                    <q-btn color="primary" @click="$router.push(`/${daoIpfsHash}/create-proposal`)">
                      Create proposal
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.example-item
  width: 800px
</style>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { api } from 'boot/axios';
import ProposalCard from 'components/proposal/ProposalCard.vue';
import PictureParallax from 'components/PictureParallax.vue';
import { useRoute } from 'vue-router';
import DaoCard from 'components/dao-features/DaoCard.vue';

// 200 picture height
const proposalScrollHeight = ref(window.innerHeight - 50 - 200);
const proposalScrollArea = ref(null);
const scrollTarget = ref(null);
const proposals = ref([]);
const route = useRoute();
const dao = ref(null);
const daoIpfsHash: string = route.params.daoIpfsHash;
api.get(`/api/rest/v1/dao/${daoIpfsHash}/proposals`).then((response) => {
  console.log('proposale', response.data);
  proposals.value = response.data;
}, (error) => {
  console.log(error);
});

api.get('/api/rest/v1/dao').then((response) => {
  dao.value = response.data.map((_: any) => {
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
  })[0];
}, (error) => {
  console.log(error);
});


watch(() => proposalScrollArea.value, async () => {
  const target = proposalScrollArea.value.getScrollTarget();
  scrollTarget.value = target;
});
</script>
