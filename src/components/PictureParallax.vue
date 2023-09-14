<template>
  <q-parallax :speed="speed === undefined ? 1 : speed " :height="Number(height)">
    <template v-slot:media>
        <img :src="imageSrc"
             :alt="alt"
             :style="$q.platform.is.mobile ?
                   'max-width: 100%;' : `${opacity === undefined ? 'opacity: 0.8; ': `opacity: ${opacity}`}`"/>
    </template>

    <div class="text-grey-9" :class="textClass === undefined ? 'text-h3 q-pa-md': textClass"
         style="white-space: pre-wrap; word-wrap: break-word; "
         :style="`background-color: rgba(245, 245, 245, ${opacity !== undefined ? opacity : '0.65'}); ${lineHeight !== undefined ? `line-height: ${lineHeight}` :''}`">
      {{title}}
    </div>
  </q-parallax>
</template>
<script lang="ts" setup>

const props = defineProps(['imageSrc', 'alt', 'title', 'height', 'textClass', 'opacity', 'lineHeight', 'speed']);

</script>
