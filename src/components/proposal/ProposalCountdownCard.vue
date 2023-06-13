<template>
  <q-card class="stateborn-card" square>
    <q-card-section class="text-center" style="padding:5px;">
      <div class="row justify-center items-center">
        <div class="col-auto q-pa-xs justify-center">
          <q-icon name="fa-solid fa-clock"  style="font-size: 1.5rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <div class="text-h5 text-center" >
            Remaining Time
          </div>
        </div>
      </div>
      <q-separator class="q-mb-xs q-mt-xs"/>
      <vue-countdown class="text-bold text-subtitle2" :time="new Date(props.endDateUtc).getTime() - new Date().getTime()" v-slot="{ days, hours, minutes, seconds }" v-if="!isProposalEnded">
        {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
      </vue-countdown>
      <q-banner v-else class="text-white text-bold text-subtitle2 text-center bg-red">
        Voting ended
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import VueCountdown from '@chenfengyuan/vue-countdown';

const props = defineProps(['endDateUtc', 'isProposalEnded']);
</script>
