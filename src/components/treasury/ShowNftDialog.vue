<!--<template>-->
<!--  <q-dialog model="icon" :model-value="showPopup" @hide="popupClosed"  >-->
<!--    <q-img :src="`data:image/png;base64,${nftBase64}`"  ></q-img>-->
<!--  </q-dialog>-->
<!--</template>-->
<!--<script setup lang="ts">-->

<!--import { ref } from 'vue';-->

<!--const props = defineProps({-->
<!--  showPopup: {-->
<!--    type: Boolean,-->
<!--    default: false,-->
<!--  },-->
<!--  tokenId: {-->
<!--    type: String,-->
<!--    default: '',-->
<!--  },-->
<!--});-->
<!--const emit = defineEmits(['popupClosed']);-->

<!--const nftBase64 = ref('');-->
<!--const popupClosed = () => {-->
<!--  emit('popupClosed', false);-->
<!--};-->

<!--onMounted(async () => {-->
<!--  const response = await api.get(`/nft/${props.tokenId}/image`, { responseType: 'arraybuffer' });-->
<!--  const base64 = btoa(-->
<!--    new Uint8Array(response.data).reduce(-->
<!--      (data, byte) => data + String.fromCharCode(byte),-->
<!--      '',-->
<!--    ),-->
<!--  );-->
<!--  nftBase64.value = base64;-->
<!--});-->

<!--</script>-->
