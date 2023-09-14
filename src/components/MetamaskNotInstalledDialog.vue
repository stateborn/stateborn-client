<template>
  <q-dialog model="icon" :model-value="showPopup" @hide="popupClosed"  >
    <q-card class="noisered text-subtitle2 q-pa-lg dialog-border" square >
      <q-card-section class="row items-center">
        <q-avatar size='xl'  square>
          <q-img src="/metamaskrabby.png"></q-img>
        </q-avatar>
        <span class="q-ml-lg text-h5" >Metamask not detected</span>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section style="padding-top: 0; margin-top:0;">
        Looks like you have not installed <b>Metamask</b> or <b>Rabby</b> web browser extension.
        Please install it if you wish to continue with this connection option.<br>
        Alternatively you can connect through <b>WalletConnect</b>.
      </q-card-section>
    </q-card>

  </q-dialog>
</template>
<script setup lang="ts">

const props = defineProps({
  showPopup: {
    type: Boolean,
    default: false,
  }
});
const emit = defineEmits(['popupClosed']);

const popupClosed = () => {
  emit('popupClosed', false);
};

</script>
