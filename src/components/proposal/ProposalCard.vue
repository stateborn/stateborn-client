<template>
  <q-card class="stateborn-card" square>
    <q-badge floating align="top" class="font-one-rem text-subtitle2 text-bold"
             :class="isProposalEnded? 'noisered' : 'noisegreen'"
             :label="isProposalEnded? 'Ended' : 'Active'" :text-color="isProposalEnded? 'red' : 'green'"
             style="padding: 5px;"></q-badge>
    <q-card-section>
      <span class="text-h6" style="line-height: 1.5rem;padding-right:10px">{{ props.proposal.title }}</span>
    </q-card-section>
    <q-separator></q-separator>

    <q-card-section style="white-space: pre-wrap; word-wrap: break-word; ">
      <q-scroll-area style="height: 200px; width: 100%">
        <proposal-description-markdown :description="props.proposal.description"></proposal-description-markdown>
      </q-scroll-area>
    </q-card-section>
    <q-card-section style="padding:0; margin:0; " >
      <q-list v-if="(new Date(props.proposal.endDateUtc).getTime() - new Date().getTime()) > 0">
        <q-item dense>
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-clock"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <vue-countdown class="text-subtitle2"
                             :time="new Date(props.proposal.endDateUtc).getTime() - new Date().getTime()"
                             v-slot="{ days, hours, minutes, seconds }" v-if="!isProposalEnded">
                <span :class="getTimeCounterColorDependingOTimeLeft(days, hours)">
                  {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
                </span>
              </vue-countdown>
            </q-item-label>
            <q-item-label caption class="text-primary">Remaining time</q-item-label>
          </q-item-section>
        </q-item>


      </q-list>
      <q-card-section horizontal style="padding: 2px; margin:2px;">
        <q-btn align="center" class="full-width" flat text-color="primary" icon="fa-regular fa-eye" square
               @click="$router.push(`/${props.daoIpfsHash}/${props.proposal.ipfsHash}`)" label="SHOW"/>
      </q-card-section>

    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import ProposalDescriptionMarkdown from 'components/proposal/ProposalDescriptionMarkdown.vue';
import dayjs from 'dayjs';
import { computed } from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
import { getTimeCounterColorDependingOTimeLeft } from 'src/api/services/utils-service';

const props = defineProps(['proposal', 'daoIpfsHash']);
const isProposalEnded = computed(() => dayjs().isAfter(props.proposal.endDateUtc));

</script>
