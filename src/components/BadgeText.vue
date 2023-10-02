<template>
  <q-badge style="padding:5px"
           :color="color"
           :text-color="textColor">
    <span style="letter-spacing: 1px">{{label}}</span>
  </q-badge>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps(['color', 'textColor', 'label']);

</script>
