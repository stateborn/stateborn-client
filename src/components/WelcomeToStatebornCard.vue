<template>
  <q-card class="stateborn-card q-ma-xs" >
    <div class="row justify-center text-center items-center q-pt-xs">
      <div class="col-auto justify-center items-center">
        <q-img
          style="height: 100px; width: 100px;"
          src="/stateborn9.png"
        />
      </div>
    </div>
    <q-card-section style="padding: 2px; margin:2px;" horizontal>
      <div class="text-subtitle2 q-pa-md text-left">
        Stateborn is a DAO building platform utilizing decentralized and trustless technology such as blockchain, IPFS and cryptography.
      </div>
    </q-card-section>
    <q-card-section style="padding:0; margin:0; ">

      <q-card-section horizontal style="padding: 2px; margin:2px;">
        <q-btn align="center" class="full-width" color="primary" icon-right="fa-regular fa-square-plus"
               @click="$router.push(`/create-dao`)" label="Create a DAO"/>
      </q-card-section>
    </q-card-section>
    <div class="row justify-center">
      <div class="col-auto">
        <q-btn icon="fa-brands fa-github" round flat/>
        <q-btn icon="fa-brands fa-twitter" round flat/>
      </div>
    </div>
  </q-card>
</template>
<script lang="ts" setup>
</script>
