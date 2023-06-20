<template>
  <q-card class="stateborn-card grow q-ma-xs q-pa-xs" :style="props.fullWidth ? '' : `width: ${props.width}px;`">
    <div class="row justify-center text-center items-center q-pt-xs" style="height:50px" >
      <div class="col-auto justify-center items-center">
        <div class="text-subtitle2" style="line-height: 1.5rem">
         <span class="text-bold"> <span v-if="props.fullWidth">DAO:</span> {{ props.dao.clientDao.name }}</span>
        </div>
      </div>
    </div>
    <q-separator class="q-mt-xs q-mb-md"></q-separator>
    <div class="row items-center">
      <div class="col-auto">
        <q-img
          style="height: 120px; width: 120px;opacity: 0.8"
          :src="props.dao.clientDao.imageBase64"
        />
      </div>
      <div class="col-grow" style="padding:0; margin:0;">
        <q-list style="padding: 2px; margin:2px;">
          <q-item dense style="">
            <q-item-section avatar  >
              <q-icon color="primary" size="xs" name="fa-solid fa-circle-info"/>
            </q-item-section>

            <q-item-section >
              <q-item-label>{{ props.dao.clientDao.token.symbol }}</q-item-label>
              <q-item-label caption class="text-primary">Token symbol</q-item-label>
            </q-item-section>
          </q-item>

          <q-item dense style="">
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-circle"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.dao.clientDao.token.type }}</q-item-label>
              <q-item-label caption class="text-primary">Token type</q-item-label>
            </q-item-section>
          </q-item>

          <q-item dense v-if="props.proposalsNumber !== undefined">
            <q-item-section avatar class="text-bold" >
              <div style="margin-left: 5px">{{props.proposalsNumber}}</div>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle2">proposals</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </div>
    </div>
    <q-card-section style="padding:2px; margin:2px; ">
      <div class="text-subtitle2" :style="props.fullWidth ? '' : 'min-height: 100px'">{{ props.dao.clientDao.description }}</div>
    </q-card-section>
    <q-card-section horizontal style="padding:0; margin:0; " v-if="!fullWidth">
      <q-btn align="center"  class="full-width" flat text-color="primary" icon-right="fa-solid fa-magnifying-glass"
             @click="$router.push(`/${props.dao.ipfsHash}`)" label="Proposals"/>
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import { DaoBackend } from 'src/api/model/dao-backend';

const props = defineProps<{
  dao: DaoBackend,
  fullWidth: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: '330',
  },
  proposalsNumber: {
    type: Number,
    default: undefined,
  },
}>();
</script>
