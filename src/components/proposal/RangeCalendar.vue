<template>
  <q-dialog model="icon" :model-value="showPopup">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="q-pa-md">
          <div class="q-gutter-sm">
            <q-badge color="teal">
              Model: {{ model }}
            </q-badge>
            <q-badge color="purple" text-color="white" class="q-ma-md">
              Mask: YYYY-MM-DD HH:mm
            </q-badge>
          </div>

            <div class="row">
              <div class="col-6">
                <q-date v-model="model" mask="YYYY-MM-DD HH:mm" color="purple" />
              </div>
              <div class="col-6">
                <q-time v-model="model" mask="YYYY-MM-DD HH:mm" color="purple" />
              </div>
            </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from "dayjs";

const model = ref(dayjs().format('YYYY-MM-DD HH:mm'));
const icon = ref(false);
const showPopup = ref(true);
</script>
