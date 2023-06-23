<template>
  <div class="row justify-center">
    <div class="col-12 justify-center q-pa-xs">
      <q-input label="Add option" v-model="proposalInput" filled maxlength="120" counter :error="
      (!noMoreOptions || proposals.length < 2)
       && proposalInput.trim() === '' || proposals.filter(_ => _ === proposalInput.trim()).length > 0" :disable="noMoreOptions">
        <template v-slot:after>
          <q-btn round flat color="black" @click="addProposal()" :disable="proposalInput.trim() === '' || proposals.filter(_ => _ === proposalInput.trim()).length > 0"
                 icon="fa-solid fa-plus"/>
        </template>
        <template v-slot:error>
          Please provide a valid proposal voting option (no duplicates)
        </template>
      </q-input>
    </div>
  </div>
  <div class="row" v-show="proposals.length > 1">
    <div class="col-auto">
      <div class="col-auto justify-left">
        <q-toggle
          v-model="noMoreOptions"
          label="No more options"
        />
      </div>
    </div>
  </div>
  <div class="text-subtitle2 text-bold q-pt-md" v-if="proposals.length > 0">Proposal voting options</div>
  <div class="row  text-left" v-for="proposal of proposals" v-bind:key="proposal">
    <div class="col-10">
      <q-radio checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="line" :label="proposal"/>
    </div>
    <div class="col-2 text-right">
      <q-btn round icon="fa-solid fa-xmark" size="xs" color="red" text-color="white" :disable="noMoreOptions" @click="removeProposal(proposal)"
             class="cursor-pointer"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

const proposalInput = ref('');
const proposals = ref(<string[]>[]);
const emit = defineEmits(['proposalOptionAdded']);
const addProposal = () => {
  proposals.value.push(proposalInput.value.trim());
  proposalInput.value = '';
  emit('proposalOptionAdded', proposals.value);
};
const noMoreOptions = ref(false);

const removeProposal = (proposal: string) => {
  const index = proposals.value.indexOf(proposal);
  if (index > -1) {
    proposals.value.splice(index, 1);
  }
};
</script>
