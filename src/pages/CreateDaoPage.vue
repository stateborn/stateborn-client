<template>
  <q-page>
    <div class="row justify-center " :class="$q.platform.is.mobile ? '': 'q-pa-xs'" >
      <div class="col-lg-8 col-xs-grow justify-center" >
        <picture-parallax image-src="statebornnoise.webp" alt="stateborn image" title="Create a DAO"
                          :style="$q.platform.is.mobile ? 'height: 250px': ''"
                          :text-class="$q.platform.is.mobile ? 'text-h5': 'text-h3 q-pa-md'"
                          :height="$q.platform.is.mobile ? '800' : '600'">
        </picture-parallax>

        <div class="row justify-center q-mt-xs q-mb-xs stateborn-card q-ma-xs">
          <div class="col-12">
            <div class="row justify-center items-center q-pa-xs">
              <div class="col-8 items-center">
                <q-breadcrumbs class="text-subtitle2 ">
                  <q-breadcrumbs-el icon="home" to="/">
                    <span class="text-underline">Home</span>
                  </q-breadcrumbs-el>
                </q-breadcrumbs>
              </div>
            </div>
          </div>
        </div>
        <q-card class="stateborn-card q-ma-xs" square>
          <q-card-section class="text-center" :style="$q.platform.is.mobile ? 'margin:0 !important;padding:0 !important;' :''">
            <div class="row justify-center">
              <div class="col-lg-8 col-md-12 col-xs-12 justify-center">
                <q-tabs v-model="tab" align="justify" dense :style="$q.platform.is.mobile ? 'font-size:12px': ''">
                  <q-tab name="offchain" icon="fa-solid fa-square"  >OFF-CHAIN ONLY</q-tab>
                  <q-tab name="onchain"  >
                    <q-img src="/cube2.svg" style="height:29px; width: 29px"></q-img>
                    OFF-CHAIN + ON-CHAIN
                  </q-tab>
                </q-tabs>
                <q-tab-panels v-model="tab" animated class="stateborn-card" style="border: 0px;">
                  <q-tab-panel name="offchain" :style="$q.platform.is.mobile ? 'margin:0;padding:0;': ''">
                    <create-dao-form :onchain="false"></create-dao-form>
                  </q-tab-panel>
                  <q-tab-panel name="onchain" :style="$q.platform.is.mobile ? 'margin:0;padding:0;': ''">
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
