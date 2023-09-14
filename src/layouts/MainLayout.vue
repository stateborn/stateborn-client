<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header bordered class="headernoise text-primary" >
      <q-toolbar>

        <q-toolbar-title style="width:50px !important;">
          <router-link to="/" style="text-decoration: none">
            <span v-if="!$q.platform.is.mobile">stateborn - minimum trust democracy</span>
            <span v-else style="font-size:12px" class="text-bold">stateborn</span>
            <q-badge class="q-ma-md" label="alpha"></q-badge>
          </router-link>
        </q-toolbar-title>
<!--        <q-tabs v-model="tab" shrink align="right" class="text-bold" active-bg-color="">-->
<!--          <q-tab name="tab1" label="Home" />-->
<!--          <q-tab name="tab2" label="ABOUT STATEBORN" />-->
<!--          <q-tab name="tab3" label="ABOUT STATEBORN PROTOCOL" />-->
<!--        </q-tabs>-->
<!--        <q-space></q-space>-->
<!--        <ConnectWithWallet></ConnectWithWallet>-->
        <wallet-connect></wallet-connect>
<!--        <wallet></wallet>-->
      </q-toolbar>
    </q-header>

    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WalletConnect from 'src/WalletConnect.vue';

const tab = ref('tab1');

</script>
