<template>
  <q-parallax :height="Number(height)" :speed="1">
    <template v-slot:media>
        <img :src="imageSrc"
             :alt="alt"
             :style="$q.platform.is.mobile ?
                   'max-width: 100%;' : `opacity: 0.7`"/>
    </template>

    <div class="text-black q-pa-md text-h3" style="background-color: rgba(245, 245, 245, 0.55);">{{title}}</div>
  </q-parallax>
</template>
<script lang="ts" setup>

const props = defineProps(['imageSrc', 'alt', 'title', 'height', 'scrollTargetValue']);
console.log(props.scrollTargetValue);

</script>
