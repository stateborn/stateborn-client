<template>
  <q-card class="stateborn-card " square>
    <q-card-section>
      <div class="row justify-center items-center">
        <div class="col-lg-1 col-xs-2">
          <q-img src="/propa.svg" :style="$q.platform.is.mobile ? 'height:25px; width: 25px;' :'height:50px; width: 50px;' "></q-img>
        </div>
        <div class="col-lg-11 col-xs-10">
          <div class="row text-subtitle2"><div class="col-grow text-bold sectionName q-pb-xs">Title</div></div>
          <div class=" text-primary text-h2">{{props.proposal.clientProposal.title}}</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section >
      <div class="row text-subtitle2" v-if="props.proposal.ipfsHash">
        <div class="col-auto text-bold sectionName">IPFS hash</div>
        <div class="col-grow text-right">{{ $q.platform.is.mobile ? `${props.proposal.ipfsHash.substring(0, 10)}...` : props.proposal.ipfsHash }}</div>
        <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToIpfs(props.proposal.ipfsHash)"/>
      </div>
      <div class="row text-subtitle2"><div class="col-auto text-bold sectionName ">Author</div>
        <div class="col-grow text-right">
          {{$q.platform.is.mobile ? `${props.proposal.clientProposal.creatorAddress.substring(0, 10)}...` : props.proposal.clientProposal.creatorAddress}}
        </div>
        <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToEtherscan(props.proposal.clientProposal.creatorAddress, props.daoTokenChainId ?? '')"/>
      </div>
      <div class="row text-subtitle2"><div class="col-auto text-bold sectionName">Starts</div><div class="col-grow text-right">{{ startDateUtc }}</div></div>
      <div class="row text-subtitle2"><div class="col-auto text-bold sectionName">Ends</div><div class="col-grow text-right">{{ endDateUtc }}</div></div>
      <div class="row text-subtitle2"><div class="col-auto text-bold sectionName">Block number</div><div class="col-grow text-right">{{ props.proposal.clientProposal.blockNumber }}
        <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px">
          <q-tooltip class="stateborn-tooltip">
            This proposal was created at {{TOKEN_SERVICE.getNetworkName(daoTokenChainId)}} block {{ props.proposal.clientProposal.blockNumber }}. <br>
            Voting power available to be used for voting on this proposal <br>
            will be based on account balance at given block.
          </q-tooltip>
        </q-icon>
      </div></div>
      <div class="row text-subtitle2"><div class="col-auto text-bold sectionName">Validity</div>
        <div class="col-grow text-right" v-if="proposalVerification?.isVerified">
          <ValidatedBadge v-if="proposalVerification?.isValid"></ValidatedBadge>
          <InvalidBadge v-else></InvalidBadge>
          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px">
            <q-tooltip v-if="proposalVerification?.isValid" class="stateborn-tooltip">
              Proposal is client-side validated based on IPFS document data.<br>
            </q-tooltip>
            <q-tooltip v-else class="stateborn-tooltip">
              Proposal is invalid based on client-side validation. <br>
              Look at the error message below.
            </q-tooltip>
          </q-icon>
        </div>
        <div class="col-grow text-right" v-else>
          <NotYetValidatedBadge></NotYetValidatedBadge>
          <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs">
            <q-tooltip class="stateborn-tooltip">
              Due to some processing error, the proposal was not yet validated. <br>
              It doesn't mean that the proposal is invalid, it must be validated again. <br>
              For more details, look at the error message below.<br>
              Validation process is now running in the background, page will be automatically updated if succeed.<br>
            </q-tooltip>
          </q-icon>
        </div>
      </div>
      <div class="row text-subtitle2" v-if="proposalVerification?.verificationError?.trim()">
        <div class="col-auto text-bold sectionName">Validation error</div>
        <div class="col-grow text-right">{{ proposalVerification?.verificationError }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import { computed } from 'vue';
import { BackendProposal } from 'src/api/model/backend-proposal';
import { goToEtherscan, goToIpfs } from 'src/api/services/utils-service';
import { ProposalVerification } from 'src/api/model/proposal-verification';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { formatDateNice } from 'src/api/services/date-service';
import BadgeText from 'components/BadgeText.vue';
import ValidatedBadge from 'components/utils/ValidatedBadge.vue';
import InvalidBadge from 'components/utils/InvalidBadge.vue';
import NotYetValidatedBadge from 'components/utils/NotYetValidatedBadge.vue';

const props = defineProps<{
  proposal: BackendProposal,
  proposalVerification: ProposalVerification | undefined,
  daoTokenChainId: string | undefined,
}>();
const startDateUtc = computed(() => formatDateNice(props.proposal.clientProposal.startDateUtc));
const endDateUtc = computed(() => formatDateNice(props.proposal.clientProposal.endDateUtc));
</script>
