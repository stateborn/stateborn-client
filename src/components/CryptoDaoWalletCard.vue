<template>
  <q-card class="my-card  q-pb-md"  square :class="daoFundsWei > 0 ? 'noisegreencard' : 'noiseredcard'" >
    <q-card-section class="text-center" style="padding-top:0;">
      <div class="text-overline">{{cryptoSymbol}} treasury holdings</div>
      <div class="text-h6 ">DAO wallet</div>
    </q-card-section>

    <div class="row justify-center items-center">
      <div class="col-8">
        <q-list class="text-left">
          <q-item  >
            <q-item-section avatar>
              <q-icon size="xs" :color="daoFundsWei > 0 ? 'green-8' : 'red-8'" name="fa-solid fa-coins" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6">{{toEth(daoFundsWei)}} {{cryptoSymbol}}</q-item-label>
              <q-item-label caption class="text-primary">Current DAO treasury holdings</q-item-label>
            </q-item-section>
          </q-item>

          <q-item  >
            <q-item-section avatar>
              <q-icon size="xs" color="red-8" name="fa-solid fa-right-left" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6 text-red-8" v-if="amountIsCorrect">{{toEth(amountOfWeiToSend)}} {{cryptoSymbol}}</q-item-label>
              <q-item-label class="text-h6 text-red-8" v-else>-</q-item-label>
              <q-item-label caption class="text-red-8">Transfer amount</q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section avatar>
              <q-icon size="xs" color="primary" name="fa-solid fa-chart-pie" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6" v-if="amountIsCorrect">{{toEth(daoFundsWei - amountOfWeiToSend)}} {{cryptoSymbol}}</q-item-label>
              <q-item-label class="text-h6" v-else>-</q-item-label>
              <q-item-label caption class="text-primary">DAO treasury holdings after transfer</q-item-label>
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

import { computed } from 'vue';
import { toEth } from 'src/api/services/eth-service';

const props = defineProps<{
  cryptoSymbol: string,
  daoFundsWei: bigint,
  amountOfWeiToSend: bigint,
}>();

const amountIsCorrect = computed(() => {
    return (props.amountOfWeiToSend <= props.daoFundsWei) && (props.amountOfWeiToSend > 0);
})
</script>
