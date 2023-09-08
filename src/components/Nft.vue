<template>
  <q-card class="my-card" flat bordered v-if="ethConnectionStore.isConnected">
    <q-img :src="imageSrc"/>

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ name }}
        </div>
      </div>

    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        {{ description }}
      </div>
      <q-chip v-for="attribute in attributes" v-bind:key="attribute.traitType" square color="orange">
        {{ attribute.value }}
      </q-chip>

      <!--      <div class="text-caption text-grey">-->
      <!--        Small plates, salads & sandwiches in an intimate setting.-->
      <!--      </div>-->
    </q-card-section>

    <q-separator/>

    <q-card-actions>
      <q-btn flat round icon="event"/>
      <q-btn flat color="primary">
        Reserve
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { getNft } from 'src/api/services/nft-service';
import { NftAttribute } from 'src/api/model/nft/nft-attribute';

const imageSrc = ref('');
const description = ref('');
const name = ref('');
const attributes = ref(<NftAttribute[]>[]);

const ethConnectionStore = useEthConnectionStore();

watch(() => ethConnectionStore.account, async () => {
  // Sign the message
  console.log('NFT read successfully');
  const nft = await getNft(0);
  imageSrc.value = `data:image/png;base64,${nft!.thumbnail}`;
  name.value = nft!.name;
  description.value = nft!.description;
  attributes.value = nft!.attributes;
});

</script>
