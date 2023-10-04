<template>
  <q-markdown :src="props.description" class="my-markdown text-black text-left text-subtitle2">
  </q-markdown>
</template>

<script lang="ts" setup>

const props = defineProps(['description']);
</script>
