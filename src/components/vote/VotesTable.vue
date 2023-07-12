<template>
  <q-table
    square
    class="stateborn-card"
    dense
    title="All votes"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    @request="onTableDataRequest"
    v-model:pagination="initialPagination"
  >
    <template v-slot:top-right>
      <div class="text-subtitle2 text-left">
        All votes: <span class="text-bold">{{votesCount}}</span><br>
        Unique votes: <span class="text-bold">{{props.distinctVotesCount}}</span>
        <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs" style="margin-bottom: 3px">
          <q-tooltip class="stateborn-tooltip">
            All votes - all addresses votes including changed votes<br>
            Unique votes - only final addresses vote (last submitted), 1 vote/address
          </q-tooltip>
        </q-icon>
      </div>
    </template>
      <template v-slot:body="props">
      <q-tr :props="props" class="text-subtitle2"
            :class="(props.row.vote === 'YES' || props.row.vote === 'NO') ? (props.row.vote === 'YES' ? 'noisegreen' : 'noisered') : 'bodynoise'">
        <q-td key="voterAddress" :props="props">
          {{ props.row.voterAddress }}
          <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square"
                 @click="goToEtherscan(props.row.voterAddress, daoTokenChainId)"/>
        </q-td>
        <q-td key="vote" :props="props"
              :class="(props.row.vote === 'YES' || props.row.vote === 'NO') ? (props.row.vote === 'YES' ? 'text-green' : 'text-red') : 'text-black'">
          {{ props.row.vote }}
        </q-td>
        <q-td key="votingPower" :props="props">
          {{ props.row.votingPower }}
        </q-td>
        <q-td key="ipfsHash" :props="props">
          {{ props.row.ipfsHash }}
          <q-btn flat round color="primary" size="xs" class="q-pl-xs" icon="fa-solid fa-arrow-up-right-from-square"
                 @click="goToIpfs(props.row.ipfsHash)"/>
        </q-td>
        <q-td key="createdAt" :props="props">
          {{ props.row.createdAt }}
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
import { onMounted, ref, watch } from 'vue';
import { sleep } from 'src/api/services/sleep-service';
import { goToEtherscan, goToIpfs } from 'src/api/services/utils-service';
import { api } from 'boot/axios';

const columns = [
  {
    name: 'voterAddress', label: 'Voter', field: 'voterAddress', sortable: false, align: 'left',
  },
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
];
const rows = ref([]);
const props = defineProps(['votes', 'votesCount', 'distinctVotesCount', 'daoTokenChainId']);
const emit = defineEmits(['rendered', 'votesTableRequest']);
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  // must match value in ProposalDetailsPage!
  rowsPerPage: 5,
  rowsNumber: 5,
});
const calculateTablePagination = () => {
  initialPagination.value.rowsNumber = Number(props.votesCount);
};
onMounted(() => {
  calculateTablePagination();
});
watch(() => props.votesCount, async () => {
  calculateTablePagination();
});

watch(() => props.votes, async () => {
  rows.value = props.votes.map((vote: any) => {
    const row = {
      voterAddress: vote.clientVote.voterAddress,
      vote: vote.clientVote.vote,
      votingPower: vote.clientVote.votingPower,
      ipfsHash: vote.ipfsHash,
      createdAt: new Date(vote.createdAt).toLocaleString(),
    };
    return row;
  });
  await sleep(200);
  emit('rendered', true);
});

const onTableDataRequest = ({pagination}: any) => {
  emit('votesTableRequest', pagination);
};

</script>
