<template>
  <q-table
    square
    :class="allVotesValid ? '' : 'bg-red-1'"
    class="stateborn-card "
    dense
    title="Your votes"
    :rows="rows"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:top-right>
      <span class="text-bold text-green-8 text-subtitle2" v-if="allVotesValid && userVotes.length > 0">Validated</span>
      <span class="text-bold text-red" v-if="!allVotesValid && userVotes.length > 0">Votes invalid</span>
      <q-icon v-if="allVotesValid && userVotes.length > 0"
              color="primary"
              name="fa-solid fa-circle-info" class="q-pl-xs">
        <q-tooltip v-if="allVotesValid" class="stateborn-tooltip">
          All votes returned by server are client side validated. <br>
          All votes saved in IPFS decentralized storage matches the votes saved by user.
        </q-tooltip>
        <q-tooltip v-else class="stateborn-tooltip">
          Some of votes returned by server are not valid.
        </q-tooltip>
      </q-icon>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" class="text-subtitle1" :class="(props.row.vote === 'YES' || props.row.vote === 'NO') ? (props.row.vote === 'YES' ? 'noisegreen' : 'noisered') : 'bg-white'">
        <q-td key="vote" :props="props"  :class="(props.row.vote === 'YES' || props.row.vote === 'NO') ? (props.row.vote === 'YES' ? 'text-green-8' : 'text-red ') : 'text-black text-bold'">
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
          <q-icon :color="props.row.isValidated ? 'green-8' : 'red'"
                  :name="props.row.isValidated ? 'fa-solid fa-square-check' : 'fa-solid fa-square-xmark'">
            <q-tooltip>
              The vote was verified client side.
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
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { verifyBackendReceivedVoteWithLocal } from 'src/api/services/get-and-store-ipfs-vote-service';
import { goToIpfs } from 'src/api/services/utils-service';

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
    name: 'validity', label: 'Is valid', field: 'validity', sortable: false, align: 'right',
  },
];
const rows = ref([]);
const allVotesValid = ref(true);
const props = defineProps(['userVotes', 'proposalIpfsHash']);
const fillTable = () => {
  rows.value = props.userVotes.map((vote: any) => {
    const isValid = verifyBackendReceivedVoteWithLocal(props.proposalIpfsHash, vote.ipfsHash, vote.clientVote);
    if (!isValid) {
      allVotesValid.value = false;
    }
    const row = {
      vote: vote.clientVote.vote,
      votingPower: vote.clientVote.votingPower,
      ipfsHash: vote.ipfsHash,
      createdAt: new Date(vote.createdAt).toLocaleString(),
      isValidated: isValid,
    };
    return row;
  });
};
watch(() => props.userVotes, async () => {
  fillTable();
});
fillTable();

</script>
