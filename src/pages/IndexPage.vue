<template>
  <q-page>
    <div class="row q-pa-md">
      <Nft></Nft>
    </div>
    <div class="row q-pa-md">
      <div class="col-4">
        <CreateProposalCard></CreateProposalCard>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Meta, Todo } from 'components/models';
import { defineComponent, ref } from 'vue';
import Nft from 'components/Nft.vue';
import CreateProposalCard from 'components/proposal/CreateProposalCard.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { CreateProposalCard, Nft },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { todos, meta };
  },
});
</script>
