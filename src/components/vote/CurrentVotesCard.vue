<template>
  <q-card class="stateborn-card" square>
    <q-card-section>
      <q-linear-progress size="25px" :value="Number(currentResults.forPercentage)" color="accent">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="accent" label="YES" />
        </div>
      </q-linear-progress>

      <q-linear-progress size="50px" :value="Number(currentResults.againstPercentage)" color="accent" class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="accent" label="NO" />
        </div>
      </q-linear-progress>    </q-card-section>
    <q-card-actions vertical>
      <q-btn square color="green" label="YES"></q-btn>
      <q-btn square color="red" label="NO"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
const currentResults = defineProps(['currentResults']);
</script>
