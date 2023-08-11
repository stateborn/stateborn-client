<template>
  <q-card class="stateborn-card" square>
    <q-card-section class="text-center" style="padding:0px;">
      <div class="row justify-center items-center q-pa-xs q-pb-md">
        <div class="col-auto q-pa-xs justify-center">
          <q-icon name="fa-solid fa-clock" color="primary" style="font-size: 1.2rem !important;"></q-icon>
        </div>
        <div class="col-auto justify-center">
          <div class="col-auto justify-center">
            <q-item-label class=" text-primary text-overline text-bold" style="font-size: 1rem">Remaining Time</q-item-label>
          </div>
        </div>
      </div>
      <vue-countdown class="text-bold text-subtitle2"
                     :time="new Date(props.endDateUtc).getTime() - new Date().getTime()" v-slot="{ days, hours, minutes, seconds }"
                     v-if="!isProposalEnded">
        <span :class="getTimeCounterColorDependingOTimeLeft(days, hours)">
          {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
        </span>
      </vue-countdown>
      <q-banner v-else class="text-black text-subtitle2 text-center noisered">
        <span class="text-bold">Voting ended</span>
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import VueCountdown from '@chenfengyuan/vue-countdown';
import { getTimeCounterColorDependingOTimeLeft } from 'src/api/services/utils-service';

const props = defineProps(['endDateUtc', 'isProposalEnded']);
</script>
