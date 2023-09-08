<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header bordered class="headernoise text-primary" >
      <q-toolbar>

        <q-toolbar-title style="width:50px !important;">
          <router-link to="/" style="text-decoration: none">
            <span :style="$q.platform.is.mobile ? 'font-size:12px': ''">stateborn - minimum trust democracy</span>
            <q-badge class="q-ma-md" label="alpha"></q-badge>
          </router-link>
        </q-toolbar-title>
<!--        <q-tabs v-model="tab" shrink align="right" class="text-bold" active-bg-color="">-->
<!--          <q-tab name="tab1" label="Home" />-->
<!--          <q-tab name="tab2" label="ABOUT STATEBORN" />-->
<!--          <q-tab name="tab3" label="ABOUT STATEBORN PROTOCOL" />-->
<!--        </q-tabs>-->
<!--        <q-space></q-space>-->
        <ConnectWithWallet v-if="!$q.platform.is.mobile"></ConnectWithWallet>
      </q-toolbar>
    </q-header>

    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ConnectWithWallet from 'components/ConnectWithWallet.vue';
import { ref } from 'vue';
const tab = ref('tab1');
</script>
