<template>
  <q-card class="stateborn-card" square>
    <q-card-section style="padding:5px;">
      <div class="row justify-center items-center">
        <div class="col-auto justify-center q-pa-xs">
          <q-icon name="fa-solid fa-square-poll-vertical" style="font-size: 1.5rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <div class="text-h5 text-center">
            Results
          </div>
        </div>
      </div>
      <q-separator class="q-mb-xs q-mt-xs"/>
      <q-linear-progress stripe size="40px" class="q-mb-xs" :color="result.option === result.option ? 'green' : 'grey-8'" :value="result.value"
                         v-for="result of results" v-bind:key="result.label">
        <div class="absolute-full flex flex-center text-subtitle2">
          <q-chip square color="white" text-color="black" :label="result.label"/>
        </div>
      </q-linear-progress>
      <div class="row text-subtitle2">
        <div class="col text-bold">All votes</div>
        <div class="col text-right">{{ props.proposalResultDto.totalVotes }}</div>
      </div>
      <div class="row text-subtitle2" v-for="result of results" v-bind:key="result.label">
        <div class="col text-bold">{{ result.option }} votes</div>
        <div class="col text-right">{{ result.votes }}</div>
      </div>
      <div class="row text-subtitle2">
        <div class="col text-bold">Addresses voted</div>
        <div class="col text-right">{{ props.proposalResultDto.totalVotesQuantity }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue';

const highestResultOption = ref('');
const props = defineProps(['proposalResultDto', 'proposalOptions']);
const results = computed(() => (props.proposalOptions ?? ['YES', 'NO']).map((option: string) => {
  const resultOption = (props.proposalResultDto?.voteResults ?? []).filter((_) => option === _.option)[0];
  if (resultOption !== undefined) {
    const value = (Number(resultOption.votes) / Number(props.proposalResultDto.totalVotes));
    return {
      option: resultOption.option,
      votes: resultOption.votes,
      label: `${resultOption.option} - ${value * 100}%`,
      value,
    };
  }
  return {
    option,
    votes: 0,
    label: `${option} - ${0}%`,
    value: 0,
  };
}));
watch(results, () => {
  const highestResult = results.value.reduce((prev, current) => ((prev.value > current.value) ? prev : current));
  highestResultOption.value = highestResult.option;
});
</script>
