<template>
  <q-dialog model="icon" :model-value="showPopup" @hide="popupClosed"
            :maximized="true"
            transition-show="slide-up"
            transition-hide="slide-down" >
    <q-card class="stateborn-card dialog-border q-pa-lg" square>
      <q-card-section class="row items-center">
        <span class="text-h5" >Description preview</span>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <hr class="q-ml-md q-mr-md" />
      <q-scroll-area style="height: 600px; width: 100%;;"
      >
        <q-card-section style="padding-top:0;">
          <proposal-description-markdown
              class="q-pt-md"
              :description="description"></proposal-description-markdown>
        </q-card-section>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">

import ProposalDescriptionMarkdown from 'components/proposal/ProposalDescriptionMarkdown.vue';

const props = defineProps({
  showPopup: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['popupClosed']);

const popupClosed = () => {
  emit('popupClosed', false);
};

</script>
