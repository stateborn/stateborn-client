<template>
    <q-table
      square
      class="stateborn-card"
      dense
      title="All votes"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props" class="text-subtitle2" :class="(props.row.vote === 'YES' || props.row.vote === 'NO') ? (props.row.vote === 'YES' ? 'noisegreen' : 'noisered') : 'bg-white'">
          <q-td key="voterAddress"  :props="props">
            <a href="google.pl">{{ props.row.voterAddress }}</a>
          </q-td>
          <q-td key="vote" :props="props" :class="(props.row.vote === 'YES' || props.row.vote === 'NO') ? (props.row.vote === 'YES' ? 'text-green' : 'text-red') : 'text-black'">
              {{ props.row.vote }}
          </q-td>
          <q-td key="votingPower" :props="props">
            {{ props.row.votingPower }}
          </q-td>
          <q-td key="ipfsHash" :props="props">
            <a href="google.pl">{{ props.row.ipfsHash }}</a>
          </q-td>
          <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { sleep } from 'src/api/services/sleep-service';

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
const props = defineProps(['votes']);
const emit = defineEmits(['rendered']);
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
</script>
