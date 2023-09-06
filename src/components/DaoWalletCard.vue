<template>
  <q-card class="my-card  q-pb-md"  square :class="Number(daoFunds) > 0 ? 'noisegreencard' : 'noiseredcard'" >
    <q-card-section class="text-center" style="padding-top:0;">
      <div class="text-overline">{{tokenSymbol}} treasury holdings</div>
      <div class="text-h6 ">DAO wallet</div>
    </q-card-section>

    <div class="row justify-center items-center">
      <div class="col-8">
        <q-list class="text-left">
          <q-item  >
            <q-item-section avatar>
              <q-icon size="xs" :color="Number(daoFunds) > 0 ? 'green-8' : 'red-8'" name="fa-solid fa-coins" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6">{{daoFunds}} {{tokenSymbol}}</q-item-label>
              <q-item-label caption class="text-primary">Current DAO treasury holdings</q-item-label>
            </q-item-section>
          </q-item>

          <q-item  >
            <q-item-section avatar>
              <q-icon size="xs" color="red-8" name="fa-solid fa-right-left" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6 text-red-8" v-if="amountOfTokensToSendIsCorrect">{{Number(amountOfTokensToSend)}} {{tokenSymbol}}</q-item-label>
              <q-item-label class="text-h6 text-red-8" v-else>-</q-item-label>
              <q-item-label caption class="text-red-8">Transfer amount</q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section avatar>
              <q-icon size="xs" color="primary" name="fa-solid fa-chart-pie" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6" v-if="amountOfTokensToSendIsCorrect">{{Number(daoFunds) - Number(amountOfTokensToSend)}} {{tokenSymbol}}</q-item-label>
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

const props = defineProps<{
  tokenSymbol: string,
  daoFunds: string,
  amountOfTokensToSend: number,
}>();

const amountOfTokensToSendIsCorrect = computed(() => {
  return (Number(props.amountOfTokensToSend) <= Number(props.daoFunds)) && (Number(props.amountOfTokensToSend) > 0)
})
</script>
