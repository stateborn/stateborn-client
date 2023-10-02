<template>
  <q-card class="stateborn-card cursor-pointer veryLightBorder" square>
    <q-badge floating align="top" class="font-one-rem text-subtitle2 text-bold border veryLightBorder sectionName"
             :class="isProposalEnded? 'noisered' : 'noisegreen'"
             :label="isProposalEnded? 'Ended' : 'VOTING ACTIVE'" :text-color="isProposalEnded? 'red' : 'green'"
             style="padding:10px;;"></q-badge>
    <q-card-section>
      <div class="row  items-center">
        <div class="col-lg-1 col-xs-2 text-left">
          <q-img src="/propa.svg" :style="$q.platform.is.mobile ? 'height:25px; width: 25px;' :'height:50px; width: 50px;' "></q-img>
        </div>
        <div class="col-lg-11 col-xs-10">
          <div class="row text-subtitle2"><div class="col-grow text-bold sectionName q-pb-xs">Title</div></div>
          <div class=" text-primary text-h2" :class="$q.platform.is.mobile ? 'break-line-text' :''">{{props.proposal.clientProposal.title}}</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section style="white-space: pre-wrap; word-wrap: break-word; ">
      <q-scroll-area style="height: 200px; width: 100%">
        <div class="row text-subtitle2"><div class="col-grow text-bold sectionName q-pb-xs">Description preview</div></div>

        <proposal-description-markdown :description="props.proposal.clientProposal.description"></proposal-description-markdown>
      </q-scroll-area>
    </q-card-section>
    <q-card-section style="padding:0; margin:0; ">
      <q-list :class="isProposalEnded ? 'noisered' : 'noisegreen'">
        <q-item dense>
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-clock" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <vue-countdown class="text-subtitle2"
                             :time="new Date(props.proposal.clientProposal.endDateUtc).getTime() - new Date().getTime()"
                             v-slot="{ days, hours, minutes, seconds }" v-if="!isProposalEnded">
                <span :class="getTimeCounterColorDependingOTimeLeft(days, hours)">
                  {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
                </span>
              </vue-countdown>
              <div v-else>
                Voting period ended
              </div>
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
import { BackendProposal } from 'src/api/model/backend-proposal';

const props = defineProps<{
  proposal: BackendProposal,
  daoIpfsHash: string,
}>();
const isProposalEnded = computed(() => dayjs().isAfter(props.proposal.clientProposal.endDateUtc));

</script>
