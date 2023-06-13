<template>
  <q-card class="stateborn-card grow" square>
    <q-badge floating align="top" class="font-one-rem text-bold" :label="isProposalEnded? 'Ended' : 'Active'" :color="isProposalEnded? 'red' : 'green'" style="padding: 10px"></q-badge>
    <q-card-section>
      <div class="text-h6">{{ props.proposal.clientProposal.title }}</div>
      <div class="text-subtitle2">Author: {{ props.proposal.clientProposal.creatorAddress }}</div>
    </q-card-section>

    <q-card-section style=" white-space: pre-wrap; word-wrap: break-word; ">
      <proposal-description-markdown :description="props.proposal.clientProposal.description.substring(0, 200)"></proposal-description-markdown>
    </q-card-section>
    <q-separator />

    <q-card-actions>
      <q-space/>
      <q-btn square color="primary" label="Read more"></q-btn>
    </q-card-actions>
  </q-card>
</template>
<script lang="ts" setup>
import ProposalDescriptionMarkdown from 'components/proposal/ProposalDescriptionMarkdown.vue';
import dayjs from 'dayjs';
import { computed } from 'vue';

const props = defineProps(['proposal']);
const isProposalEnded = computed(() => dayjs().isAfter(props.proposal.clientProposal.endDateUtc));

</script>
