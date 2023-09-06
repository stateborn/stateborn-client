<template>
  <q-card class="stateborn-card grow " :style="props.fullWidth ? '' : `width: ${props.width}px;`">
    <div class="row justify-center text-center items-center q-pt-xs" style="height:80px" >
      <div class="col-grow  items-center">
        <div class="text-subtitle2 q-pa-md">
          <q-item-label class=" text-primary text-bold" style="letter-spacing: 1px">{{ props.dao.clientDao.name }}</q-item-label>
        </div>
      </div>
    </div>
    <q-separator class="q-ma-xs"></q-separator>
    <div class="row items-center ">
      <div class="col-4  text-center" v-if="props.dao.clientDao.imageBase64 !== ''">
        <q-img
          style="max-height: 120px; max-width: 120px;"
          :src="props.dao.clientDao.imageBase64"
        />
      </div>
      <div class="col-8 justify-center" style="padding:0; margin:0;">
        <q-list>
          <q-item >
            <q-item-section avatar>
              <q-img src="/cube2.svg" v-if= "props.dao.clientDao.contractAddress" style="height:24px; width: 24px"></q-img>
              <q-icon color="primary" size="xs" v-else name="fa-solid fa-square"/>
            </q-item-section>

            <q-item-section>
              <q-item-label><q-badge style="padding:5px" :label="props.dao.clientDao.contractAddress ? 'OFF-CHAIN + ON-CHAIN' : 'OFF-CHAIN'"
                                     color="primary"
                                     :text-color="props.dao.clientDao.contractAddress ? 'yellow' : 'white'"></q-badge></q-item-label>
              <q-item-label caption class="text-primary ">DAO type</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section avatar  >
              <q-icon color="primary" size="xs" name="fa-solid fa-circle"/>
            </q-item-section>

            <q-item-section >
              <q-item-label>{{ props.dao.clientDao.token.symbol }} | <q-badge style="padding:5px" :label="props.dao.clientDao.token.type"
                                                                              :color="props.dao.clientDao.token.type === TokenType.ERC20 ? 'primary' : 'secondary'"
                                                                              :text-color="props.dao.clientDao.token.type === TokenType.ERC20 ? 'white' : 'black'"></q-badge>
              </q-item-label>
              <q-item-label caption class="text-primary ">Token symbol | type</q-item-label>
            </q-item-section>
          </q-item>


          <q-item >
            <q-item-section avatar>
              <q-img :src="TOKEN_SERVICE.getNetworkIcon(props.dao.clientDao.token.chainId)" style="height: 20px; width: 20px;"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ TOKEN_SERVICE.getNetworkName(props.dao.clientDao.token.chainId) }}</q-item-label>
              <q-item-label caption class="text-primary ">Token network</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="showRequiredTokenQuantity">
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-circle-exclamation"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.dao.clientDao.proposalTokenRequiredQuantity }}</q-item-label>
              <q-item-label caption class="text-primary ">Required tokens for creating proposal</q-item-label>
            </q-item-section>
          </q-item>

          <q-item  clickable v-if="showTokenAddress" @click="goToEtherscan(props.dao.clientDao.token.address, props.dao.clientDao.token.chainId)">
            <q-item-section avatar>
              <q-icon color="primary" size="xs" name="fa-solid fa-arrow-up-right-from-square"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ `${props.dao.clientDao.token.address.substring(0, 14)}...` }}</q-item-label>
              <q-item-label caption class="text-primary ">Token address</q-item-label>
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
    <div class="row items-center justify-center" :style="props.fullWidth ? '' : 'min-height: 100px'">
      <div class="col-auto  q-pa-md">
        <div class="text-subtitle2" >{{ props.dao.clientDao.description }}</div>
      </div>
    </div>
    <q-card-section horizontal style="padding:0; margin:0; " v-if="!fullWidth">
      <q-btn align="center"  class="full-width" flat text-color="primary"
             @click="$router.push(`/${props.dao.ipfsHash}`)" label="Proposals">
        <q-img src="/voting2.svg" style="height:20px; width: 20px"></q-img>
      </q-btn>
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import { DaoBackend } from 'src/api/model/dao-backend';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { goToEtherscan } from 'src/api/services/utils-service';
import { TokenType } from 'src/api/model/ipfs/token-type';

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
  showRequiredTokenQuantity: {
    type: Boolean,
    optional: true,
    default: false,
  },
  showTokenAddress: {
    type: Boolean,
    optional: true,
    default: false,
  },
}>();
</script>
