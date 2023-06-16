<template>
  <div class="row justify-center">
    <div class="col-12 justify-center q-pa-xs">
      <q-input label="Add option" v-model="proposalInput" filled>
        <template v-slot:after>
          <q-btn round flat color="black" @click="addProposal()" :disable="proposalInput.trim() === ''"
                 icon="fa-solid fa-plus"/>
        </template>
      </q-input>
    </div>
  </div>
  <div class="text-subtitle2 text-bold q-pt-md" v-if="proposals.length > 0">Options</div>
  <div class="row  text-left" v-for="proposal of proposals" v-bind:key="proposal">
    <div class="col-10">
      <q-radio checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="line" :label="proposal"/>
    </div>
    <div class="col-2 text-right">
      <q-btn round icon="fa-solid fa-xmark" size="xs" color="red" text-color="white" @click="removeProposal(proposal)"
             class="cursor-pointer"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

const proposalInput = ref('Option number 1');
const proposals = ref([]);
const emit = defineEmits(['proposalOptionAdded']);
const addProposal = () => {
  proposals.value.push(proposalInput.value);
  proposalInput.value = '';
  emit('proposalOptionAdded', proposals.value);
};

const removeProposal = (proposal: string) => {
  const index = proposals.value.indexOf(proposal);
  if (index > -1) {
    proposals.value.splice(index, 1);
  }
};
</script>
