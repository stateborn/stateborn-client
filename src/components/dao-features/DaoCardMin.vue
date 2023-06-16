<template>
  <q-card class="stateborn-card grow q-ma-xs q-pa-xs" :style="props.fullWidth ? '' : 'width: 330px;'">
    <div class="row justify-center text-center items-center q-pt-xs" style="height:50px" >
      <div class="col-auto justify-center items-center">
        <div class="text-subtitle2" style="line-height: 1.5rem">
         <span class="text-bold"> <span v-if="props.fullWidth">DAO:</span> {{ props.dao.name }}</span>
        </div>
      </div>
    </div>
    <q-separator class="q-mt-xs q-mb-md"></q-separator>
    <div class="row">
      <div class="col-auto">
        <q-img
          style="height: 120px; width: 120px;opacity: 0.8"
          :src="props.dao.imageBase64"
        />
      </div>
      <div class="col-grow" style="padding:0; margin:0;">
        <q-list style="padding: 2px; margin:2px;">
          <q-item dense style="">
            <q-item-section avatar  >
              <q-icon color="primary" size="xs" name="fa-solid fa-circle-info"/>
            </q-item-section>

            <q-item-section >
              <q-item-label>{{ props.dao.tokenSymbol }}</q-item-label>
              <q-item-label caption class="text-primary">Token symbol</q-item-label>
            </q-item-section>
          </q-item>

          <q-item dense style="">
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-circle"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.dao.tokenType }}</q-item-label>
              <q-item-label caption class="text-primary">Token type</q-item-label>
            </q-item-section>
          </q-item>

          <q-item dense style="">
            <q-item-section avatar class="text-bold" >
              500
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle2">proposals</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </div>
    </div>
    <q-card-section style="padding:2px; margin:2px; ">
      <div class="text-subtitle2" :style="props.fullWidth ? '' : 'min-height: 100px'">{{ props.dao.description }}</div>
    </q-card-section>
    <q-card-section horizontal style="padding:0; margin:0; " v-if="!fullWidth">
      <q-btn align="center"  class="full-width" flat text-color="primary" icon-right="fa-solid fa-magnifying-glass"
             @click="$router.push(`/${props.dao.ipfsHash}`)" label="Proposals"/>
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>

const props = defineProps(['dao', 'fullWidth']);
</script>
