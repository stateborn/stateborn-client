<template>
  <q-card class="stateborn-card" square>
    <q-card-section style="padding:0px;">
      <div class="row justify-center items-center q-pa-xs">
        <div class="col-auto justify-center q-pa-xs">
          <q-icon name="fa-solid fa-square-poll-vertical" color="primary" style="font-size: 1.4rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <div class="col-auto justify-center">
            <q-item-label class=" text-primary text-overline text-bold" style="font-size: 1rem">Results</q-item-label>
          </div>
        </div>
      </div>
      <q-linear-progress stripe size="40px" class="q-mb-xs" :color="result.option === highestResultOption ? 'green-5' : 'grey-8'" :value="result.value"
                         v-for="result of results" v-bind:key="result.label">
        <div class="absolute-full flex flex-center text-subtitle2">
          <q-chip square color="white" text-color="black" :label="result.label"/>
        </div>
      </q-linear-progress>
      <div class="row text-subtitle2 q-pb-md">
        <div class="col text-bold sectionName">All votes</div>
        <div class="col text-right">{{ props.proposalResultDto.totalVotes }} {{tokenSymbol}}</div>
      </div>
      <div class="row text-subtitle2" v-for="result of results" v-bind:key="result.label">
        <div class="col text-bold sectionName">{{ result.option }}</div>
        <div class="col text-right">{{ result.votes }} {{tokenSymbol}}</div>
      </div>
      <div class="row text-subtitle2 q-pt-md">
        <div class="col text-bold sectionName">Addresses voted</div>
        <div class="col text-right">{{ props.proposalResultDto.totalVotesQuantity }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import { ref, watch } from 'vue';
import { ProposalResultDto } from 'src/api/dto/proposal-result-dto';

class Result {
  option: string;
  votes: number;
  label: string;
  value: number;

  constructor(option: string, votes: number, label: string, value: number) {
    this.option = option;
    this.votes = votes;
    this.label = label;
    this.value = value;
  }
};
const highestResultOption = ref('');
const results = ref(<Result[]>[]);

const props = defineProps<{
  proposalResultDto: ProposalResultDto,
  proposalOptions: string,
  tokenSymbol: string,
}>();
const setHighestResultValue = () => {
  const highestResult = results.value.reduce((prev, current) => ((prev.value > current.value) ? prev : current));
  const duplicatingHighestResults = results.value.filter((_) => _.value === highestResult.value).length > 1;
  if (duplicatingHighestResults) {
    highestResultOption.value = '';
  } else {
    highestResultOption.value = highestResult.option;
  }
}
const setResults = () => {
  results.value = (props.proposalOptions ?? ['YES', 'NO']).map((option: string) => {
    const resultOption = (props.proposalResultDto?.voteResults ?? []).filter((_) => option === _.option)[0];
    if (resultOption !== undefined) {
      const value = Number((Number(resultOption.votes) / Number(props.proposalResultDto.totalVotes)).toPrecision(4));
      return new Result(resultOption.option, resultOption.votes, `${resultOption.option} - ${value * 100}%`, value);
    }
    return new Result(option, 0, `${option} - ${0}%`, 0);
  });
};
setResults();
setHighestResultValue();
watch(() => [props.proposalOptions, props.proposalResultDto], () => {
  setResults();
});
watch(() => results.value, () => {
  setHighestResultValue();
});
</script>
