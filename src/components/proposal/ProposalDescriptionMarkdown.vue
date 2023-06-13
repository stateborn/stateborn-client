<template>
  <q-markdown :src="props.description" class="my-markdown text-left q-ma-xs">
  </q-markdown>
</template>

<script lang="ts" setup>

const props = defineProps(['description']);
</script>
