<template>
  <q-card class="stateborn-card" square>
    <picture-parallax
      image-src="/proposalbody2noise.webp"
      alt="proposal body image"
      :title="cardTitle"
      :height="pictureHeight">
    </picture-parallax>
    <q-card-section>
      <div class="text-h5 q-pb-md text-center text-bold">{{ props.proposal.clientProposal.title }}</div>
      <div class="row text-subtitle2" v-if="props.proposal.ipfsHash"><div class="col text-bold">Proposal hash</div><div class="col text-right"><a href="google.pl">{{ props.proposal.ipfsHash }}</a></div></div>
      <div class="row text-subtitle2"><div class="col text-bold">Author</div><div class="col text-right"><a href="google.pl">{{ props.proposal.clientProposal.creatorAddress }}</a></div></div>
      <div class="row text-subtitle2"><div class="col text-bold">Starts</div><div class="col text-right">{{ startDateUtc }}</div></div>
      <div class="row text-subtitle2"><div class="col text-bold">Ends</div><div class="col text-right">{{ endDateUtc }}</div></div>

    </q-card-section>
    <q-card-section>
      <proposal-description-markdown :description="props.proposal.clientProposal.description"></proposal-description-markdown>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import ProposalDescriptionMarkdown from 'components/proposal/ProposalDescriptionMarkdown.vue';
import { computed } from 'vue';
import dayjs from 'dayjs';
import PictureParallax from 'components/PictureParallax.vue';

const props = defineProps(['proposal', 'cardTitle', 'pictureHeight']);
const startDateUtc = computed(() => dayjs(props.proposal.clientProposal.startDateUtc).format('YYYY-MM-DD HH:mm:ss'));
const endDateUtc = computed(() => dayjs(props.proposal.clientProposal.endDateUtc).format('YYYY-MM-DD HH:mm:ss'));
</script>
