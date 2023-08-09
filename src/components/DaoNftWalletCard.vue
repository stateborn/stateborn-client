<template>
  <q-card class="my-card  q-pb-md"  square :class=" nftId ? (daoOwnsNft ? 'noisegreencard' : 'noiseredcard') : 'stateborn-card2'">
    <q-card-section class="text-center" style="padding-top:0;">
      <div class="text-overline">Current {{tokenSymbol}} holdings</div>
      <div class="text-h6 ">DAO wallet</div>
    </q-card-section>

    <div class="row items-center">
      <div class="col-8">
        <q-list class="text-left">
          <q-item  >
            <q-item-section avatar>
              <q-icon size="xs" :color="daoOwnsNft ? 'green-8' : 'red-8'" :name="daoOwnsNft ? 'fa-solid fa-check' : 'fa-solid fa-circle-xmark'" />
            </q-item-section>
            <q-item-section v-if="nftId " class="text-h6">
              <q-item-label v-if="daoOwnsNft">Confirmed - DAO owns {{tokenSymbol}} #{{nftId}}</q-item-label>
              <q-item-label v-else>Rejected - DAO doesn't own {{tokenSymbol}} #{{nftId}}</q-item-label>
              <q-item-label caption class="text-primary">{{tokenSymbol}} NFT #{{nftId}} ownership status</q-item-label>
            </q-item-section>
            <q-item-section v-else class="text-h6">
              <q-item-label >Please provide NFT ID</q-item-label>
              <q-item-label caption class="text-primary">DAO NFT ownership status</q-item-label>
            </q-item-section>

          </q-item>
          <q-item  >
            <q-item-section avatar>
              <q-icon size="xs" :color="Number(daoFunds) > 0 ? 'green-8' : 'red-8'" name="fa-solid fa-coins" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6">{{daoFunds}} {{tokenSymbol}}</q-item-label>
              <q-item-label caption class="text-primary"> {{tokenSymbol}} NFT tokens owned by DAO</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="daoOwnsNft">
            <q-item-section avatar>
              <q-icon size="xs" color="red-8" name="fa-solid fa-chart-pie" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6">{{Number(daoFunds) - Number(amountOfTokensToSend)}} {{tokenSymbol}}</q-item-label>
              <q-item-label caption class="text-primary">{{tokenSymbol}} NFT tokens owned by DAO after transaction</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-4">
        <q-img src='/wallet2.svg' style="height:100px;width:100px"/>
      </div>
    </div>
  </q-card>
</template>
<script setup lang="ts">

import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';
import { ref, watch } from 'vue';

const props = defineProps<{
  tokenSymbol: string,
  tokenAddress: string,
  daoFunds: string,
  amountOfTokensToSend: number,
  nftId: number,
  daoAddress: string,
}>();

const daoOwnsNft = ref(false);
watch(() => props.nftId, () => {
  verifyNftOwnership();
});

const emit = defineEmits(['daoNftOwnership'])
const verifyNftOwnership = () => {
  ERC_721_SERVICE.getOwnerOfNft(props.tokenAddress, props.nftId).then((_) => {
    daoOwnsNft.value = _.toLowerCase() === props.daoAddress.toLowerCase();
    emit('daoNftOwnership', daoOwnsNft.value);
  }, (err) => {
    daoOwnsNft.value = false;
    emit('daoNftOwnership', daoOwnsNft.value);
  });
}
</script>
