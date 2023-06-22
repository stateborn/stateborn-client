<template>
  <div>
    <span class="text-subtitle2 text-red text-bold" v-if="!ethConnectionStore.isConnected">Please connect first</span>
    <q-input square outlined filled label="Name" v-model="name" class="q-pa-xs" maxlength="60" counter :disable="!ethConnectionStore.isConnected"></q-input>
    <q-input counter filled square label="Description" v-model="description" maxlength="120" class="q-pa-xs q-pt-lg" :disable="!ethConnectionStore.isConnected"></q-input>
    <q-banner class="noisegreen text-primary text-center text-subtitle2 q-pa-xs q-mt-lg" v-if="ethConnectionStore.isConnected" dense>
      <template v-slot:avatar>
        <q-img :src="ethConnectionStore.networkIcon" style="height: 25px; width:25px; margin-top:27px"/>
      </template>
      You are connected to {{ethConnectionStore.networkName}} network. <br>Please provide {{ethConnectionStore.networkName}} token address. <br>
      <b>Important:</b> your DAO will use a governance token on {{ethConnectionStore.networkName}}.<br>
      Please reconnect wallet if you want to change the blockchain network.

    </q-banner>
    <q-input square filled label="Token address" v-model="tokenAddress" class="q-pa-xs q-pt-lg" :disable="!ethConnectionStore.isConnected"></q-input>
    <div v-if="tokenName !== ''">
      <q-input square dense readonly filled outlined prefix="Token name:" v-model="tokenName" class="q-pa-xs" debounce="500"></q-input>
      <q-input square dense readonly filled prefix="Token symbol:" v-model="tokenSymbol" class="q-pa-xs"></q-input>
      <q-input square dense readonly filled prefix="Token type:" v-model="tokenType" class="q-pa-xs"></q-input>
      <q-input square dense readonly filled prefix="Token supply:" v-model="tokenSupply" v-if="tokenSupply !== ''" class="q-pa-xs"></q-input>
      <q-input square dense readonly filled prefix="Token network:" v-model="ethConnectionStore.networkName" class="q-pa-xs">
        <template v-slot:prepend>
          <q-avatar>
            <img :src="ethConnectionStore.networkIcon" style="height: 25px; width: 25px;">
          </q-avatar>
        </template>
      </q-input>
    </div>
    <q-input square label="DAO owner" readonly v-model="daoOwner" class="q-pa-xs"></q-input>
    <define-voting-options-card v-if="proposalType.value === 'OPTIONS'" @proposal-option-added="proposalOptionAdded" :disable="!ethConnectionStore.isConnected"></define-voting-options-card>
    <q-input
      :disable="!ethConnectionStore.isConnected"
      filled
      class="q-pa-xs"
      v-model.number="minimalTokens"
      type="number"
      label="Minimal tokens required for proposal creation"
      :suffix="tokenType === 'NFT' ? `${tokenSymbol} NFTs` : `${tokenSymbol} tokens`"
    />
    <div class="row justify-center items-center">
      <div class="col-6">
        <file-reader class="q-pa-xs"
                     :disable="!ethConnectionStore.isConnected"
                     label="Upload DAO image/logo"
                     @file-uploaded="onFileUploaded"
                     @file-removed="onFileRemoved"
                     size-kb-limit="500"
                     :dao-file-mode="true"
                     :as-base="true"></file-reader>
      </div>
      <div class="col-6">
        <div class="text-subtitle2 text-bold" v-if="image !== ''">Image preview</div>
        <div class="text-subtitle2 text-bold" v-else>No image</div>
        <q-img
          :src="image"
          spinner-color="white"
          style="height: 150px; max-width: 150px; border: 1px solid #9E9E9E"
        />
      </div>
    </div>
    <q-btn class="q-ma-xs old-button" square label="Create" color="primary"
           :disable="!ethConnectionStore.isConnected"
           @click="callCreateProposal"></q-btn>

  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { api } from 'boot/axios';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { signDao } from 'src/api/services/signature-service';
import FileReader from 'components/proposal/FileReader.vue';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import DefineVotingOptionsCard from 'components/proposal/DefineVotingOptionsCard.vue';
import { Notify, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';
import { ERC_20_SERVICE } from 'src/api/services/erc-20-service';
import { sleep } from 'src/api/services/sleep-service';
import { ClientDao } from 'src/api/model/ipfs/client-dao';
import { ClientDaoToken } from 'src/api/model/ipfs/client-dao-token';
import { DaoTokenType } from 'src/api/model/ipfs/dao-token-type';

dayjs.extend(dayjsPluginUTC);
const ethConnectionStore = useEthConnectionStore();
const name = ref('My new DAO...');
// 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D - bored ape
const description = ref('Description of your DAO...');
const tokenAddress = ref('');
const tokenName = ref('');
const tokenSymbol = ref('');
const tokenType = ref(DaoTokenType.ERC20);
const tokenSupply = ref('');
const image = ref('');
const daoOwner = ref(ethConnectionStore.account);
const proposalType = ref({ value: 'YES/NO', label: 'YES / NO - vote YES or NO' });
const minimalTokens = ref(100);
const proposalOptions = ref(<string[]>[]);
const emit = defineEmits(['proposalChanged']);
const router = useRouter();
watch(() => ethConnectionStore.account, async () => {
  daoOwner.value = ethConnectionStore.account;
  setTokenAddress();
});

const setTokenAddress = () => {
  if (ethConnectionStore.isConnected) {
    if (ethConnectionStore.chainId === '1') {
      tokenAddress.value = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    } else if (ethConnectionStore.chainId === '42161') {
      //Tether Arbitrum
      tokenAddress.value = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
    } else {
      //polygon
      tokenAddress.value = '0x7FFB3d637014488b63fb9858E279385685AFc1e2';
    }
  }
}
const $q = useQuasar();
onMounted(() => {
  if (ethConnectionStore.isConnected) {
    setTokenAddress();
  }
});
watch(() => tokenAddress.value, async () => {
  $q.loading.show({
    delay: 100, // ms
    message: 'Reading token data...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  try {
    const { nameRes, symbolRes } = await ERC_721_SERVICE.readTokenData(tokenAddress.value);
    tokenName.value = nameRes;
    tokenSymbol.value = symbolRes;
    tokenType.value = DaoTokenType.NFT;
    tokenSupply.value = '';
    minimalTokens.value = 1;
    $q.loading.hide();
    Notify.create({ message: 'Successfully fetched NFT token data!', position: 'top-right', color: 'green' });
  } catch (err2) {
    try {
      const { nameRes, symbolRes, supplyRes } = await ERC_20_SERVICE.readTokenData(tokenAddress.value);
      tokenName.value = nameRes;
      tokenSymbol.value = symbolRes;
      tokenSupply.value = supplyRes;
      tokenType.value = DaoTokenType.ERC20;
      $q.loading.hide();
      Notify.create({ message: 'Successfully fetched ERC-20 token data!', position: 'top-right', color: 'green' });
    } catch (err) {
      tokenName.value = '';
      tokenSymbol.value = '';
      tokenSupply.value = '';
      $q.loading.hide();
      Notify.create({ message: 'Incorrect token address', position: 'top-right', color: 'red' });
    }
  }
});
const proposalOptionAdded = (currentProposalOptions: string[]) => {
  proposalOptions.value = currentProposalOptions;
};
const onFileUploaded = (res: any) => {
  if (res.fileName.endsWith('.webp') || res.fileName.endsWith('.png') || res.fileName.endsWith('.jpg') || res.fileName.endsWith('.jpeg') || res.fileName.endsWith('.gif')) {
    image.value = `data:image/svg;base64, ${res.base64File}`;
  } else {
    Notify.create({ message: 'Incorrect picture format. Try .png .jpg .jpeg .webp or .gif', position: 'top-right', color: 'red' });
  }
};
const onFileRemoved = () => {
  image.value = '';
};

const callCreateProposal = async () => {
  const creationDateUtc = dayjs().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const clientDao = new ClientDao(
    name.value.trim(),
    description.value.trim(),
    image.value,
    [ethConnectionStore.account],
    "1",
    "1",
    creationDateUtc,
    new ClientDaoToken(
      tokenAddress.value,
      tokenName.value,
      tokenSymbol.value,
      tokenType.value,
      ethConnectionStore.chainId,
      tokenSupply.value !== '' ? tokenSupply.value : undefined,
    ),
  );

  const signature = await signDao(clientDao);
  $q.loading.show({
    delay: 100, // ms
    message: 'Creating the DAO...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  api.post('/api/rest/v1/dao', {
    clientDao,
    signature,
    creatorAddress: ethConnectionStore.account,
  }).then(async (response) => {
    Notify.create({ message: 'Successfully created DAO!', position: 'top-right', color: 'green' });
    $q.loading.hide();
    await sleep(100);
    router.push('/');
    console.log('BackendProposal created!', response);
  }, async (error) => {
    Notify.create({ message: 'Creating DAO failed - server problem!', position: 'top-right', color: 'red' });
    $q.loading.hide();
    await sleep(100);
    console.log(error);
  });
};
</script>
