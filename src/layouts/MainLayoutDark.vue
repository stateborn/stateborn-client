<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header class="text-primary" style="background: rgb(0, 0, 0, 1) !important;border-bottom: 1px solid   #4d4d4d" >
      <q-toolbar>

        <q-toolbar-title class="text-white">
          <router-link to="/" style="text-decoration: none">
            <span :style="$q.platform.is.mobile ? 'font-size:12px': ''">stateborn - where communities grow</span>
            <q-badge class="q-ma-md" label="alpha"></q-badge>
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ConnectWithWallet from 'components/ConnectWithWallet.vue';
</script>
