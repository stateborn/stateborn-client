<template>
  <q-card class="stateborn-card q-ma-xs" >
    <div class="row justify-center text-center items-center q-pt-xs">
      <div class="col-auto justify-center items-center">
        <q-img
          style="height: 100px; width: 100px;"
          src="/stateborn-logo.webp"
        />
      </div>
    </div>
    <q-card-section style="padding: 2px; margin:2px;">
      <div class="text-subtitle2 q-pa-md text-center">
        Stateborn is a DAO governance platform using decentralized and trustless technology such as blockchain, IPFS and cryptography.
      </div>
      <div class="text-subtitle2 text-center">
        <span class="text-bold">Define your DAO. </span><br>
        <span class="text-bold">Create proposals. </span><br>
        <span class="text-bold">Vote on them.</span><br><br>
        Use simple, free, transparent and trusted governance.
      </div>
    </q-card-section>
    <q-card-section style="padding: 2px; margin:2px;" horizontal>

    </q-card-section>
    <q-card-section style="padding:0; margin:0; ">

      <q-card-section horizontal style="padding: 2px; margin:2px;">
        <q-btn align="center" class="full-width" color="primary" icon-right="fa-regular fa-square-plus"
               @click="$router.push(`/create-dao`)" label="Create a DAO"/>
      </q-card-section>
      <q-card-section horizontal style="padding: 2px; margin:2px;">
        <q-btn align="center" class="full-width" color="primary"
               @click="$router.push(`/about`)" label="About stateborn"/>
      </q-card-section>
    </q-card-section>
    <div class="row justify-center">
      <div class="col-auto">
        <q-btn  round flat @click="goToGithub()">
          <q-avatar size="25px">
            <img src="/brands/icons8-github-50.png">
          </q-avatar>
        </q-btn>
        <q-btn  round flat @click="goToTwitter()">
          <q-avatar size="25px">
            <img src="/brands/icons8-twitter-50.png">
          </q-avatar>
        </q-btn>
      </div>
    </div>
    <q-card-section>
      <q-input dense bottom-slots v-model="ipfsGateway" label="IPFS gateway" :readonly="!editMode"
               :filled="editMode">
        <template v-slot:before>
          <q-icon name="fa-solid fa-server" />
        </template>

        <template v-slot:hint>
          IPFS gateway address
        </template>

        <template v-slot:append>
          <q-btn-dropdown
            ref="dropdown"
            dense
            dropdown-icon="fa-solid fa-caret-down"
            flat
          >
            <div class="row no-wrap q-pa-md bodynoise">
              <div class="column">
                <div class="text-subtitle2 text-center">IPFS gateway</div>
               <q-btn class="q-ma-xs" color="primary" label="EDIT MODE" @click="enterEditMode()" v-if="!editMode" ></q-btn>
               <q-btn class="q-ma-xs" outline label="SAVE" @click="saveNewIpfsGatewayAddress()" v-else></q-btn>
               <q-btn class="q-ma-xs" color="primary" @click="resetIpfsGatewayAddress()">Reset to default</q-btn>
              </div>

            </div>
          </q-btn-dropdown>
        </template>
        <q-tooltip class="stateborn-tooltip">
          IPFS gateway address must be valid URL. <br>
          /api/v0/cat API must be available and is only requirement.
        </q-tooltip>
      </q-input>
    </q-card-section>
    <div class="row justify-center">
      <div class="col-auto">
        <span class="text-subtitle2">Supported networks</span>
        <q-img src="/ethereum.svg" style="height: 25px; width:25px">
          <q-tooltip class="stateborn-tooltip">
            Ethereum Mainnet
          </q-tooltip>
        </q-img>
        <q-img src="/arbitrum.svg" style="height: 25px; width:25px">
          <q-tooltip class="stateborn-tooltip">
            Arbitrum One
          </q-tooltip>
        </q-img>
        <q-img src="/polygon.svg" style="height: 25px; width:25px">
          <q-tooltip class="stateborn-tooltip">
            Polygon Mainnet
          </q-tooltip>
        </q-img>
      </div>
    </div>
    <q-separator ></q-separator>
    <div class="row justify-center text-center">
      <div class="col-auto">
        Data cached in IndexedDB <q-icon color="primary" name="fa-solid fa-circle-info" class="q-pl-xs">
        <q-tooltip class="stateborn-tooltip">
          Stateborn saves data in IndexedDB - your Internet browser database. <br>
          This data is related to DAOs, proposals, votes and data validation process. <br>
          For best experience, please do not clear your browser cache for this site.
        </q-tooltip>
        </q-icon>
      </div>
    </div>
  </q-card>
</template>
<script lang="ts" setup>
import {onMounted, ref } from 'vue';
import { Settings } from 'src/api/model/settings';
import {
  getSettingsFromStorage,
  resetIpfsGatewayAddressToDefault,
  saveSettingsToLocalStorage
} from 'src/api/services/settings-local-storage-service';
import { Notify } from 'quasar';
import { reconnectToIpfs } from 'src/api/services/ipfs-service';
import { goToGithub, goToTwitter } from 'src/api/services/utils-service';

const ipfsGateway = ref('');
const dropdown = ref(null);
const editMode = ref(false);
onMounted(() => {
  const settings: Settings = getSettingsFromStorage();
  ipfsGateway.value = settings.ipfsGateway;
});
const saveNewIpfsGatewayAddress = async () => {
  const settings: Settings = getSettingsFromStorage();
  let newIpfsGateway = ipfsGateway.value.trim();
  if (newIpfsGateway.endsWith('/')) {
    newIpfsGateway = newIpfsGateway.substring(0, newIpfsGateway.length - 1);
  }
  if (!newIpfsGateway.endsWith('api/v0')) {
    newIpfsGateway = `${newIpfsGateway}/api/v0`;
  }
  try {
    await reconnectToIpfs(newIpfsGateway);
    settings.ipfsGateway = newIpfsGateway;
    saveSettingsToLocalStorage(settings);
    ipfsGateway.value = newIpfsGateway;
    editMode.value = false;
    dropdown.value.hide();
    Notify.create({ message: 'Successfully saved new IPFS gateway address', position: 'top-right', color: 'green' });
  } catch (err) {
    Notify.create({ message: 'IPFS gateway address incorrect. Is it valid URL?', position: 'top-right', color: 'red' });
  }
};

const enterEditMode = () => {
  editMode.value = true;
}

const resetIpfsGatewayAddress = async () => {
  resetIpfsGatewayAddressToDefault();
  const settings: Settings = getSettingsFromStorage();
  ipfsGateway.value = settings.ipfsGateway;
  await reconnectToIpfs(ipfsGateway.value);
  editMode.value = false;
  dropdown.value.hide();
  Notify.create({ message: 'Successfully reset IPFS gateway address to default', position: 'top-right', color: 'green' });
};

</script>
