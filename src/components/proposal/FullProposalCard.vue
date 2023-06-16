<template>
  <q-card class="stateborn-card" square>
    <picture-parallax
      image-src="/proposalbody2noise.webp"
      alt="proposal body image"
      text-class="text-h5 text-black text-center q-pa-md"
      opacity="0.83"
      line-height="1.5rem"
      :title="props.proposal.title"
      height="150">
    </picture-parallax>
    <q-card-section>
      <div class="row text-subtitle2" v-if="props.proposal.ipfsHash"><div class="col text-bold">IPFS hash</div>{{ props.proposal.ipfsHash }}
        <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square"/>
      </div>
      <div class="row text-subtitle2"><div class="col text-bold">Author</div><div class="col text-right">{{ props.proposal.creatorAddress }}</div>
        <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square"/>
      </div>
      <div class="row text-subtitle2"><div class="col text-bold">Starts</div><div class="col text-right">{{ startDateUtc }}</div></div>
      <div class="row text-subtitle2"><div class="col text-bold">Ends</div><div class="col text-right">{{ endDateUtc }}</div></div>
      <div class="row text-subtitle2"><div class="col text-bold">Block number</div><div class="col text-right">{{ props.proposal.blockNumber }}</div></div>

    </q-card-section>
    <q-card-section>
      <proposal-description-markdown :description="props.proposal.description"></proposal-description-markdown>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import ProposalDescriptionMarkdown from 'components/proposal/ProposalDescriptionMarkdown.vue';
import { computed } from 'vue';
import dayjs from 'dayjs';
import PictureParallax from 'components/PictureParallax.vue';
import { Proposal } from 'src/api/model/proposal';
const props = defineProps<{
  proposal: Proposal
}>();
const startDateUtc = computed(() => dayjs(props.proposal.startDateUtc).format('YYYY-MM-DD HH:mm:ss'));
const endDateUtc = computed(() => dayjs(props.proposal.endDateUtc).format('YYYY-MM-DD HH:mm:ss'));
</script>
