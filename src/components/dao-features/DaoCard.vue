<template>
  <q-card class="stateborn-card q-ma-xs" >
    <q-card-section style="padding: 2px !important; margin:2px !important;">
      <div class="text-h5 text-center">DAO</div>
    </q-card-section>
    <q-separator class="q-mt-xs q-mb-xs"></q-separator>
    <div class="row justify-center text-center items-center q-pt-xs">
      <div class="col-auto justify-center items-center">
        <div class="text-subtitle2 text-bold q-pa-xs" style="line-height: 1.5rem">
          {{ props.dao.name }}
        </div>
      </div>
    </div>
    <div class="row justify-center text-center items-center q-pt-xs">
      <div class="col-auto justify-center items-center">
        <q-img
          style="height: 120px; width: 120px;"
          :src="props.dao.imageBase64"
        />
      </div>
    </div>
    <q-card-section style="padding: 2px; margin:2px;" horizontal
                    @click="$router.push(`/${props.dao.ipfsHash}`)">
      <div class="text-subtitle2 q-pa-xs">{{ props.dao.description }}</div>
    </q-card-section>
    <q-separator class="q-mt-xs q-mb-xs"></q-separator>
    <q-card-section style="padding:0; margin:0; ">
      <q-list>
        <q-item clickable v-if="props.isFull">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-arrow-up-right-from-square"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.ipfsHash }}</q-item-label>
            <q-item-label caption class="text-primary">IPFS hash</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="props.isFull">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-circle-info"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.tokenName }}</q-item-label>
            <q-item-label caption class="text-primary">Token name</q-item-label>
          </q-item-section>
        </q-item>

        <q-item :dense="!props.isFull">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-circle-info"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.tokenSymbol }}</q-item-label>
            <q-item-label caption class="text-primary">Token symbol</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-circle"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.tokenType }}</q-item-label>
            <q-item-label caption class="text-primary">Token type</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-if="props.isFull">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-arrow-up-right-from-square"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.tokenAddress }}</q-item-label>
            <q-item-label caption class="text-primary">Token address</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="props.isFull">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-circle-exclamation"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.proposalTokenRequiredQuantity }}</q-item-label>
            <q-item-label caption class="text-primary">Required tokens for creating proposal</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar class="text-bold" >
            500
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle2">proposals</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
      <q-card-section horizontal style="padding: 2px; margin:2px;">
        <q-btn align="center" class="full-width" color="primary" icon-right="fa-solid fa-plus"
               @click="$router.push(`/${props.dao.ipfsHash}/create-proposal`)" label="Create proposal"/>
      </q-card-section>

    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps(['dao', 'isFull']);
</script>
