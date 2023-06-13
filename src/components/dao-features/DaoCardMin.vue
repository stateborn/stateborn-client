<template>
  <q-card class="stateborn-card grow q-ma-xs" :style="props.fullWidth ? '' : 'width: 330px;'">
    <q-separator class="q-mt-xs q-mb-xs" v-if="props.fullWidth"></q-separator>
    <div class="row justify-center text-center items-center q-pt-xs">
      <div class="col-auto justify-center items-center">
        <div class="text-subtitle1">
          <span v-if="props.fullWidth">DAO:</span><span class="text-bold">{{ props.dao.name }}</span>
        </div>
      </div>
    </div>
    <q-separator class="q-mt-xs q-mb-xs"></q-separator>
    <q-card-section horizontal @click="$router.push(`/${props.dao.ipfsHash}/proposals`)">
      <q-card-section style="padding: 2px; margin:2px;">
        <q-img
          style="height: 120px; width: 120px;opacity: 0.8"
          :src="props.dao.imageBase64"
        />
      </q-card-section>

      <q-card-section style="padding: 2px; margin:2px;">
        <q-list style="padding: 2px; margin:2px;">
          <q-item clickable dense>
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-arrow-up-right-from-square"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.dao.ipfsHash.substring(0, 10) }}...</q-item-label>
              <q-item-label caption class="text-primary">IPFS hash</q-item-label>
            </q-item-section>
          </q-item>

          <q-item dense>
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-circle-info"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.dao.tokenSymbol }}</q-item-label>
              <q-item-label caption class="text-primary">Token symbol</q-item-label>
            </q-item-section>
          </q-item>

          <q-item dense>
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-circle"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.dao.tokenType }}</q-item-label>
              <q-item-label caption class="text-primary">Token type</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-card-section>
    </q-card-section>
    <q-card-section style="padding:2px; margin:2px; ">
      <div class="text-subtitle2" :style="props.fullWidth ? '' : 'min-height: 100px'">{{ props.dao.description }}</div>
    </q-card-section>
    <q-card-section horizontal style="padding:0; margin:0; " v-if="!fullWidth">
      <q-btn align="center" flat  class="full-width" color="primary" icon-right="fa-solid fa-magnifying-glass"
             @click="$router.push(`/${props.dao.ipfsHash}/proposals`)" label="Browse proposals"/>
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>

const props = defineProps(['dao', 'fullWidth']);
</script>
