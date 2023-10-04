<template>
  <q-card class="stateborn-card " >
    <q-card-section style="padding: 5px !important; margin:5px !important;">
      <q-item-label class=" text-primary text-center text-overline" style="font-size: 1rem">DAO</q-item-label>

    </q-card-section>
    <q-separator class="q-mt-xs q-mb-xs" v-if="!props.isCreateProposalMode"></q-separator>
    <div class="text-overline text-center" v-if="!props.isCreateProposalMode">Actions</div>
    <q-card-section horizontal style="padding: 2px; margin:2px;" v-if="!props.isCreateProposalMode">
      <q-btn square align="center" class="full-width" color="primary" glossy icon-right="fa-solid fa-plus"
             @click="$router.push(`/${props.dao.ipfsHash}/create-proposal`)" label="Create proposal"/>
    </q-card-section>
    <q-separator class="q-mt-xs q-mb-xs"></q-separator>
    <div class="text-overline text-center">Name</div>

    <div class="row  text-center items-center q-pt-xs" >
      <div class="col-grow items-center">
        <div class="text-subtitle2 q-pa-md">
          <q-item-label class=" text-primary text-bold">{{ props.dao.clientDao.name }}</q-item-label>
        </div>
      </div>
    </div>
    <q-separator class="q-ma-xs"></q-separator>
    <div class="text-overline text-center">Description</div>
    <div class="row justify-center text-center items-center q-pt-xs" v-if="props.dao.clientDao.imageBase64 !== ''">
      <div class="col-auto justify-center items-center">
        <q-img
          style="height: 120px; width: 120px;"
          :src="props.dao.clientDao.imageBase64"
        />
      </div>
    </div>
    <q-card-section style="padding: 2px; margin:2px;" >
      <div class="text-subtitle2 q-pa-xs">{{ props.dao.clientDao.description }}</div>
    </q-card-section>

    <q-separator class="q-mt-xs q-mb-xs"></q-separator>

    <q-card-section style="padding:0; margin:0; ">
      <div class="text-overline text-center">Details</div>
      <q-list>
        <q-item v-if="props.isFull">
          <q-item-section avatar>
            <q-img src="/cube2.svg" v-if= "props.dao.clientDao.contractAddress" style="height:24px; width: 24px"></q-img>
            <q-icon color="primary" size="xs" v-else name="fa-solid fa-square"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <BadgeText color="primary"
                         :label="props.dao.clientDao.contractAddress ? 'OFF-CHAIN + ON-CHAIN' : 'OFF-CHAIN'"
                         :text-color="props.dao.clientDao.contractAddress ? 'yellow' : 'white'">
              </BadgeText>

              </q-item-label>
            <q-item-label caption class="text-primary ">DAO type</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="props.isFull" @click="goToIpfs(props.dao.ipfsHash)">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-arrow-up-right-from-square"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.ipfsHash }}</q-item-label>
            <q-item-label caption class="text-primary ">IPFS hash</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="props.isFull && props.dao.clientDao.contractAddress" clickable @click="goToEtherscan(props.dao.clientDao.contractAddress, props.dao.clientDao.token.chainId)">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-arrow-up-right-from-square"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.clientDao.contractAddress }}</q-item-label>
            <q-item-label caption class="text-primary ">DAO contract address (on-chain)</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="props.isFull">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-circle"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.clientDao.token.name }}</q-item-label>
            <q-item-label caption class="text-primary ">Token name</q-item-label>
          </q-item-section>
        </q-item>

        <q-item :dense="!props.isFull">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-regular fa-circle"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.clientDao.token.symbol }}</q-item-label>
            <q-item-label caption class="text-primary ">Token symbol</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-circle-half-stroke"/>
          </q-item-section>

          <q-item-section>
            <q-item-label><q-badge style="padding:5px" :label="props.dao.clientDao.token.type"
                                   :color="props.dao.clientDao.token.type === TokenType.ERC20 ? 'primary' : 'secondary'"
                                   :text-color="props.dao.clientDao.token.type === TokenType.ERC20 ? 'white' : 'black'"></q-badge></q-item-label>
            <q-item-label caption class="text-primary ">Token type</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-img :src="TOKEN_SERVICE.getNetworkIcon(props.dao.clientDao.token.chainId)" style="height: 20px; width:20px;"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ TOKEN_SERVICE.getNetworkName(props.dao.clientDao.token.chainId) }}</q-item-label>
            <q-item-label caption class="text-primary ">Token network</q-item-label>
          </q-item-section>
        </q-item>


        <q-item clickable v-if="props.isFull" @click="goToEtherscan(props.dao.clientDao.token.address, props.dao.clientDao.token.chainId)">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-arrow-up-right-from-square"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.clientDao.token.address }}</q-item-label>
            <q-item-label caption class="text-primary ">Token address</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="props.isFull">
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-circle-exclamation"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ props.dao.clientDao.proposalTokenRequiredQuantity }}</q-item-label>
            <q-item-label caption class="text-primary ">Tokens required for creating proposal</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="!props.isCreateProposalMode">
          <q-item-section avatar class="text-bold" >
            <div style="margin-left: 5px">{{proposalsCount}}</div>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle2 ">proposals</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" size="xs" name="fa-solid fa-circle-info"/>
            <q-tooltip v-if="dao.daoVerification && dao.daoVerification.isVerified && dao.daoVerification.isValid" class="stateborn-tooltip">
              The DAO is client-side validated based on IPFS document data.
            </q-tooltip>
            <q-tooltip v-if="dao.daoVerification === undefined || !dao.daoVerification.isVerified" class="stateborn-tooltip">
              Due to some processing error, the DAO was not yet validated. <br>
              It doesn't mean that the DAO is invalid, it must be validated again. <br>
              Validation error: {{ dao.daoVerification?.verificationError }} <br>
              Validation process is now running in the background, page will be automatically updated if succeed.<br>
            </q-tooltip>
            <q-tooltip v-if="dao.daoVerification && dao.daoVerification.isVerified && !dao.daoVerification.isValid" class="stateborn-tooltip">
              The DAO is invalid based on client-side validation. <br>
              Validation error: {{ dao.daoVerification?.verificationError }}
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="dao.daoVerification && dao.daoVerification.isVerified && dao.daoVerification.isValid">
              <ValidatedBadge></ValidatedBadge>
            </q-item-label>
            <q-item-label v-if="dao.daoVerification === undefined || !dao.daoVerification.isVerified">
              <NotYetValidatedBadge></NotYetValidatedBadge>
            </q-item-label>
            <q-item-label v-if="dao.daoVerification && dao.daoVerification.isVerified && !dao.daoVerification.isValid">
              <InvalidBadge></InvalidBadge>
            </q-item-label>
            <q-item-label caption class="text-primary ">Validity status</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>

import { goToEtherscan, goToIpfs } from 'src/api/services/utils-service';
import { DaoBackend } from 'src/api/model/dao-backend';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { TokenType } from 'src/api/model/ipfs/token-type';
import BadgeText from 'components/BadgeText.vue';
import ValidatedBadge from 'components/utils/ValidatedBadge.vue';
import InvalidBadge from 'components/utils/InvalidBadge.vue';
import NotYetValidatedBadge from 'components/utils/NotYetValidatedBadge.vue';

const props = defineProps<{
  dao: DaoBackend,
  isFull: {
    type: Boolean,
    default: false,
  },
  proposalsCount: {
    type: String,
    default: '',
  },
  isCreateProposalMode: {
    type: Boolean,
    default: false,
  }
}>();
</script>
