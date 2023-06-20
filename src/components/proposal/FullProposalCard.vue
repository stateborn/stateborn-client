<template>
  <q-card class="stateborn-card" square>
    <picture-parallax
      image-src="/proposalbody2noise.webp"
      alt="proposal body image"
      :text-class="$q.platform.is.mobile ? 'text-subtitle2 text-black q-pa-xs': 'text-h5 text-black text-center q-pa-md'"
      opacity="0.83"
      :line-height="$q.platform.is.mobile ? '1.1rem' : '1.5rem'"
      :title="props.proposal.clientProposal.title"
      :style="$q.platform.is.mobile ? 'height: 100px !important;' :''"
      :height="$q.platform.is.mobile ? '406': '150'">
    height="150">
    </picture-parallax>
    <q-card-section>
      <div class="row text-subtitle2" v-if="props.proposal.ipfsHash"><div class="col text-bold">IPFS hash</div>
        <div class="col text-right">{{ $q.platform.is.mobile ? `${props.proposal.ipfsHash.substring(0, 10)}...` : props.proposal.ipfsHash }}</div>
        <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToIpfs(props.proposal.ipfsHash)"/>
      </div>
      <div class="row text-subtitle2"><div class="col text-bold">Author</div>
        <div class="col text-right">
          {{$q.platform.is.mobile ? `${props.proposal.clientProposal.creatorAddress.substring(0, 10)}...` : props.proposal.clientProposal.creatorAddress}}
        </div>
        <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscan(props.proposal.clientProposal.creatorAddress)"/>
      </div>
      <div class="row text-subtitle2"><div class="col text-bold">Starts</div><div class="col text-right">{{ startDateUtc }}</div></div>
      <div class="row text-subtitle2"><div class="col text-bold">Ends</div><div class="col text-right">{{ endDateUtc }}</div></div>
      <div class="row text-subtitle2"><div class="col text-bold">Block number</div><div class="col text-right">{{ props.proposal.clientProposal.blockNumber }}</div></div>
      <div class="row text-subtitle2"><div class="col text-bold">Validity</div>
        <div class="col text-right" v-if="proposalVerification?.isVerified">
          <span class="text-bold text-green-8 text-subtitle2" v-if="proposalVerification?.isValid">Validated</span>
          <span class="text-bold text-red" v-else>Invalid</span>
          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px">
            <q-tooltip v-if="proposalVerification?.isValid" class="stateborn-tooltip">
              Proposal content and validity is confirmed based on IPFS document data.
            </q-tooltip>
            <q-tooltip v-else class="stateborn-tooltip">
              Some of votes returned by server are not valid.
            </q-tooltip>
          </q-icon>
        </div>
        <div class="col text-right" v-else>
          <span class="text-subtitle2">Not yet validated</span>
          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs">
            <q-tooltip class="stateborn-tooltip">
              Proposal content and validity will be automatically verified with IPFS document.
              Refresh the page to trigger validation.
            </q-tooltip>
          </q-icon>
        </div>
      </div>
      <div class="row text-subtitle2" v-if="proposalVerification?.isVerified && !proposalVerification?.isValid">
        <div class="col text-bold">Validation error</div>
        <div class="col text-right">{{ proposalVerification.verificationError }}</div>
      </div>

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
import { BackendProposal } from 'src/api/model/backend-proposal';
import { goToEtherscan, goToIpfs } from 'src/api/services/utils-service';
import { ProposalVerification } from 'src/api/model/proposal-verification';
const props = defineProps<{
  proposal: BackendProposal,
  proposalVerification: ProposalVerification | undefined,
}>();
const startDateUtc = computed(() => dayjs(props.proposal.clientProposal.startDateUtc).format('YYYY-MM-DD HH:mm:ss'));
const endDateUtc = computed(() => dayjs(props.proposal.clientProposal.endDateUtc).format('YYYY-MM-DD HH:mm:ss'));
</script>
