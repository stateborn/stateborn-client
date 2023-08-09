<template>
  <q-card class="q-pb-md bodynoise q-pa-xs" flat>
    <q-card-section class="text-center" style="padding-top:0;">
      <div class="text-overline">{{label}}</div>
      <div class="text-h6 ">Token info</div>
    </q-card-section>
    <div class="row justify-center items-center">
      <div class="col-6">
        <q-list class="text-left">
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-circle" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{props.tokenName}}</q-item-label>
              <q-item-label caption class="text-primary">Token name</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-regular fa-circle"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.tokenSymbol }}</q-item-label>
              <q-item-label caption class="text-primary ">Token symbol</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-circle-half-stroke"/>
            </q-item-section>

            <q-item-section>
              <q-item-label><q-badge style="padding:5px" :label="TokenType.ERC20"
                                     color="primary"
                                     text-color="white"></q-badge>
              </q-item-label>
              <q-item-label caption class="text-primary ">Token type</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-regular fa-circle"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.decimals }}</q-item-label>
              <q-item-label caption class="text-primary ">Decimals</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <img :src="networkIcon" style="height: 20px; width: 20px;">
            </q-item-section>

            <q-item-section>
              <q-item-label>{{props.networkName}}</q-item-label>
              <q-item-label caption class="text-primary">Token network</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-6 justify-center">
        <q-img src='/ERC-20.svg' :style="props.bigToken ? 'height:150px;width:150px': 'height:100px;width:100px'"/>
      </div>
    </div>
  </q-card>
</template>
<script setup lang="ts">

import { TokenType } from 'src/api/model/ipfs/token-type';

const props = defineProps<{
  label: string,
  tokenName: string,
  tokenSymbol: string,
  decimals: string,
  networkName: string,
  networkIcon: string,
  bigToken: boolean,
}>();


</script>
