<template>
  <q-page>
    <div class="row justify-center " :class="$q.platform.is.mobile ? '': 'q-pa-lg'" >
      <div class="col-lg-8 col-xs-grow justify-center q-pa-xs">
        <picture-parallax image-src="statebornnoise.webp" alt="stateborn image" title="Create a DAO"
                          :style="$q.platform.is.mobile ? 'height: 100px': ''"
                          :text-class="$q.platform.is.mobile ? 'text-h5': 'text-h3 q-pa-md'"
                          :height="$q.platform.is.mobile ? '979' : '600'">
        </picture-parallax>
        <q-card class="stateborn-card" square>
          <q-card-section class="text-center">
            <div class="row justify-center">
              <div class="col-lg-8 col-md-12 col-xs-grow justify-center">
                <q-breadcrumbs class="text-subtitle2 text-primary q-pb-lg">
                  <q-breadcrumbs-el icon="home" to="/">
                    <span class="text-underline">Home</span>
                  </q-breadcrumbs-el>
                </q-breadcrumbs>
                <q-tabs v-model="tab" align="justify" dense>
                  <q-tab name="offchain" icon="fa-solid fa-square" label="OFF-CHAIN ONLY" />
                  <q-tab name="onchain" icon="fa-solid fa-cube" label="OFF-CHAIN + ON-CHAIN" />
                </q-tabs>
                <q-tab-panels v-model="tab" animated class="stateborn-card">
                  <q-tab-panel name="offchain">
                    <create-dao-form :onchain="false"></create-dao-form>
                  </q-tab-panel>
                  <q-tab-panel name="onchain">
                    <create-dao-form :onchain="true"></create-dao-form>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import CreateDaoForm from 'components/proposal/CreateDaoForm.vue';
import PictureParallax from 'components/PictureParallax.vue';
import { ref } from 'vue';
const tab = ref('offchain')
</script>
