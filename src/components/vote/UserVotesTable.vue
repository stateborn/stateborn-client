<template>
  <div>
    <div class="row justify-center items-center noise">
      <div class="col-auto q-pa-xs justify-center">
        <q-icon name="fa-solid fa-circle-user" color="primary" style="font-size: 1.2rem !important;"></q-icon>
      </div>
      <div class="col-auto justify-center">
        <div class="col-auto justify-center">
          <q-item-label class=" text-primary text-overline text-bold" style="font-size: 1rem">Your votes</q-item-label>
        </div>
      </div>
    </div>
    <q-table
      square
      :class="thereAreNoInvalidVotes ? (someVotesAreNotVerified ? 'noiseredcard' : 'stateborn-card') : 'noiseredcard'"
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top-right v-if="!isLoading && ethConnectionStore.isConnected">
        <span class="text-bold text-green-9 text-subtitle2" v-if="thereAreNoInvalidVotes && !someVotesAreNotVerified && userVotes.length > 0">Validated</span>
        <span class="text-bold text-orange-10 text-subtitle2" v-if="thereAreNoInvalidVotes && someVotesAreNotVerified && userVotes.length > 0">Not yet verified</span>
        <span class="text-bold text-red" v-if="!thereAreNoInvalidVotes && userVotes.length > 0">Votes invalid</span>
        <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" v-if="userVotes.length > 0">
          <q-tooltip v-if="thereAreNoInvalidVotes && !someVotesAreNotVerified" class="stateborn-tooltip">
            All votes were client-side validated based on IPFS vote document data
            and if available - with client-side saved vote data (IndexedDB).
          </q-tooltip>
          <q-tooltip v-if="thereAreNoInvalidVotes && someVotesAreNotVerified" class="stateborn-tooltip">
            Due to some processing error, not all votes were yet validated. <br>
            It doesn't mean the votes are invalid, they must be validated again. <br>
            Validation process is now running in the background, page will be automatically updated if succeed.<br>
          </q-tooltip>
          <q-tooltip v-if="!thereAreNoInvalidVotes && !someVotesAreNotVerified" class="stateborn-tooltip">
            Some of the votes are invalid.<br>
            Look at the vote validity column for details.<br>
          </q-tooltip>
        </q-icon>
      </template>
      <template v-slot:top-right v-if="isLoading && ethConnectionStore.isConnected">
        <span class="text-subtitle2 text-bold q-pr-xs">Loading</span>
        <q-spinner color="primary"/>
        <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs">
          <q-tooltip class="stateborn-tooltip">
            Votes are loading yet, probably due to <br>
            IPFS node not responding during client-side validation.
          </q-tooltip>
        </q-icon>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" class="text-subtitle1" :class="(props.row.vote === 'YES' || props.row.vote === 'NO') ? (props.row.vote === 'YES' ? 'noisegreen' : 'noisered') : 'bg-white'">
          <q-td key="vote" :props="props"  :class="(props.row.vote === 'YES' || props.row.vote === 'NO') ? (props.row.vote === 'YES' ? 'text-green-9' : 'text-red ') : 'text-black text-bold'">
            {{ props.row.vote }}
          </q-td>
          <q-td key="votingPower" :props="props">
            {{ props.row.votingPower }}
          </q-td>
          <q-td key="ipfsHash" :props="props">
            {{ `${props.row.ipfsHash.substring(0, 5)}...` }}
            <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square" @click="goToIpfs(props.row.ipfsHash)"/>
          </q-td>
          <q-td key="createdAt" :props="props">
            {{ props.row.createdAt }}
          </q-td>
          <q-td key="validity" :props="props">
            <q-icon :color="!props.row.isVerified ? 'orange-10' : (props.row.isValid ? 'green-9' : 'red')" :name="props.row.isValid ? 'fa-solid fa-square-check' : 'fa-solid fa-square-xmark'">
            </q-icon>
            <q-icon
              color="primary"
              name="fa-solid fa-circle-info" class="q-pl-xs">
              <q-tooltip class="stateborn-tooltip" v-if="!props.row.isVerified">
                Due to some processing error, the vote was not validated. <br>
                {{ props.row.validationError !== ''  ? `Validation error: ${props.row.validationError}` : ''}}<br v-if="props.row.validationError !== ''">
                It doesn't mean the vote is invalid, it must be validated again. <br>
                Validation process is now running in the background, page will be automatically updated if succeed.<br>
              </q-tooltip>
              <q-tooltip class="stateborn-tooltip" v-if="props.row.isValid">
                Vote is valid.
              </q-tooltip>
              <q-tooltip class="stateborn-tooltip" v-if="!props.row.isValid && props.row.isVerified">
                Vote is invalid. <br>
                Validation error: {{ props.row.validationError }}
              </q-tooltip>
            </q-icon>
          </q-td>
          <q-td key="voteDataSource" :props="props">
            <q-badge :label="props.row.voteDataSource"></q-badge>
            <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs">
              <q-tooltip class="stateborn-tooltip" v-if="props.row.voteDataSource === VoteDataSource.CLIENT && props.row.isValid">
                Vote data source: {{props.row.voteDataSource}} - <br>
                saved client-side in browser on vote before sending to backend.<br>
                Vote is client-side validated based on <br>
                client-side saved vote data (IndexedDB) <br>
                and IPFS vote document data.
              </q-tooltip>
              <q-tooltip class="stateborn-tooltip" v-if="props.row.voteDataSource === VoteDataSource.IPFS && props.row.isValid">
                Vote data source: {{props.row.voteDataSource}} - read from IPFS.<br>
                Vote is client-side validated based on IPFS vote document data. <br>
                Because client-side saved vote data (IndexedDB) could not be found (cleared browser cache?), the vote was not validated with it.
              </q-tooltip>

              <q-tooltip class="stateborn-tooltip" v-if="props.row.voteDataSource === VoteDataSource.CLIENT && (!props.row.isValid && !props.row.isVerified)">
                Vote data source: {{props.row.voteDataSource}} - <br>
                saved client-side in browser on vote before sending to backend.<br>
                Vote was client-side saved (IndexedDB) before sending to backend, <br>
                but was not yet successfully validated with IPFS vote document data.
              </q-tooltip>
              <q-tooltip class="stateborn-tooltip" v-if="props.row.voteDataSource === VoteDataSource.IPFS && (!props.row.isValid && !props.row.isVerified)">
                Vote data source: {{props.row.voteDataSource}} - read from IPFS.<br>
                Vote was client-side saved (IndexedDB) before sending to backend, <br>
                but was not yet successfully validated with IPFS vote document data.
              </q-tooltip>
              <q-tooltip class="stateborn-tooltip" v-if="props.row.voteDataSource === VoteDataSource.BACKEND && (!props.row.isValid && !props.row.isVerified)">
                Vote data source: {{props.row.voteDataSource}} - read from backend.<br>
                Vote data was read from backend but was not yet successfully validated <br>
                with IPFS vote document data and if available - with client-side saved vote data (IndexedDB).
              </q-tooltip>

              <q-tooltip class="stateborn-tooltip" v-if="props.row.voteDataSource === VoteDataSource.CLIENT && (!props.row.isValid && props.row.isVerified)">
                Vote data source: {{props.row.voteDataSource}} - <br>
                saved client-side in browser on vote before sending to backend.<br>
                Vote was client-side saved (IndexedDB) before sending to backend <br>
                but is invalid based on IPFS vote document data.
              </q-tooltip>
              <q-tooltip class="stateborn-tooltip" v-if="props.row.voteDataSource === VoteDataSource.IPFS && (!props.row.isValid && props.row.isVerified)">
                Vote data source: {{props.row.voteDataSource}} - read from IPFS.<br>
                Vote was read from IPFS but is invalid based on IPFS vote document data.<br>
              </q-tooltip>
            </q-icon>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm text-primary">
        <span>
           No data found
          </span>
          <q-icon name="fa-solid fa-triangle-exclamation" />
        </div>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getAllUserVotes } from 'src/api/services/vote-service';
import { goToIpfs } from 'src/api/services/utils-service';
import { VoteDataSource } from 'src/api/model/vote-data-source';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { abiEncodeVote } from 'src/api/services/signature-service';

const columns = [
  {
    name: 'vote', label: 'Vote', align: 'left', field: 'vote', format: (val) => `${val}`, sortable: false,
  },
  {
    name: 'votingPower', align: 'left', label: 'Voting power', field: 'votingPower', sortable: true,
  },
  {
    name: 'ipfsHash', label: 'Vote IPFS hash', field: 'ipfsHash', align: 'left',
  },
  {
    name: 'createdAt', label: 'Created at', field: 'createdAt', sortable: true, align: 'left',
  },
  {
    name: 'validity', label: 'Is valid', field: 'validity', sortable: false, align: 'center',
  },
  {
    name: 'voteDataSource', label: 'Data source', field: 'voteDataSource', sortable: false, align: 'center',
  },
];
const rows = ref([]);
const thereAreNoInvalidVotes = ref(true);
const someVotesAreNotVerified = ref(false);
const isLoading = ref(true);
const props = defineProps(['userVotes', 'proposalIpfsHash', 'triggerFillTable']);
const ethConnectionStore = useEthConnectionStore();
const fillTable = async () => {
  thereAreNoInvalidVotes.value = true;
  someVotesAreNotVerified.value = false;
  if (props.userVotes.length > 0) {
    //just any address
    const voterAddress = props.userVotes[0].clientVote.voterAddress;
    const allLocalVotes = await getAllUserVotes(props.proposalIpfsHash, voterAddress);
    const localRows = [];
    for (const vote of props.userVotes) {
      let localVote = allLocalVotes.filter((_) => _.voteIpfsHash === vote.ipfsHash)[0];
      // When IPFS validation is happening (long response from IPFS), vote by IPFS hash can not be found because vote IPFS hash is not yet set
      if (!localVote) {
        localVote = allLocalVotes.filter((_) => abiEncodeVote(
          _.clientVote.voterAddress,
          _.clientVote.proposalIpfsHash,
          _.clientVote.vote,
          _.clientVote.votingPower,
          _.clientVote.voteDate,
        ) === abiEncodeVote(
          vote.clientVote.voterAddress,
          vote.clientVote.proposalIpfsHash,
          vote.clientVote.vote,
          vote.clientVote.votingPower,
          vote.clientVote.voteDate,
        ))[0];
      }
      // If vote is found
      if (localVote) {
        if (localVote.voteVerification && localVote.voteVerification.isVerified && !localVote.voteVerification.isValid) {
          thereAreNoInvalidVotes.value = false;
        }
        if (!localVote.voteVerification?.isVerified) {
          someVotesAreNotVerified.value = true;
        }
        localRows.push({
          vote: vote.clientVote.vote,
          votingPower: vote.clientVote.votingPower,
          ipfsHash: vote.ipfsHash,
          createdAt: new Date(vote.createdAt).toLocaleString(),
          isValid: localVote.voteVerification?.isValid,
          validationError: localVote.voteVerification?.verificationError ?? '',
          voteDataSource: localVote.voteDataSource,
          isVerified: localVote.voteVerification?.isVerified,
        });
      } else {
        someVotesAreNotVerified.value = true;
        localRows.push({
          vote: vote.clientVote.vote,
          votingPower: vote.clientVote.votingPower,
          ipfsHash: vote.ipfsHash,
          createdAt: new Date(vote.createdAt).toLocaleString(),
          isValid: false,
          validationError: '',
          voteDataSource: VoteDataSource.BACKEND,
          isVerified: false,
        });
      }
    }
    rows.value = localRows;
  }
  isLoading.value = false;
};
watch(() => [props.userVotes, props.triggerFillTable],  () => {
  fillTable();
});
fillTable();

</script>
