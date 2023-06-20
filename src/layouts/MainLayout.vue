<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="noise2 text-primary">
      <q-toolbar>

        <q-toolbar-title>
          <router-link to="/">
            <span :style="$q.platform.is.mobile ? 'font-size:12px': ''">stateborn - minimum trust democracy</span>
          </router-link>
        </q-toolbar-title>
        <ConnectWithWallet></ConnectWithWallet>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ConnectWithWallet from 'components/ConnectWithWallet.vue';
</script>
