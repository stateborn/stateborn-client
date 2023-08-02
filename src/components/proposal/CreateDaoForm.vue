<template>
  <div>
    <q-banner class="text-primary text-subtitle2 text-center noisegreen q-ma-xs" v-if="props.onchain">
      <div class="row items-center">
        <div class="col-4">
          <q-icon name="fa-solid fa-cube" color="primary"  size="lg"/>
        </div>
        <div class="col-8 text-left">
          You create <b>on-chain + off-chain</b> DAO. <br>
          Creation costs <b>transaction fee</b> for on-chain DAO creation.<br>
          DAO definition is stored off-chain (IPFS) and on-chain (smart contract).<br>
          You need to provide the address of your governance token (ERC-20 or NFT).
        </div>
      </div>
    </q-banner>
    <q-banner class="text-primary text-subtitle2 text-center noisegreen q-ma-xs" v-else>
      <div class="row items-center">
        <div class="col-4">
          <q-icon name="fa-solid fa-square" color="primary"  size="lg"/>
        </div>
        <div class="col-8 text-left">
          You create <b>off-chain</b> DAO. Creation is <b>free</b>.<br>
          DAO definition is stored off-chain (IPFS).<br>
          You only need to provide the address of your governance token (ERC-20 or NFT).
        </div>
      </div>
    </q-banner>
    <q-banner class="text-black text-subtitle2 text-center noisered q-ma-xs" v-if="!ethConnectionStore.isConnected">
      <span class="text-bold text-red">Please connect first</span>
    </q-banner>
    <q-input square outlined filled label="DAO name" v-model="name" class="q-pa-xs" maxlength="60" counter :disable="!ethConnectionStore.isConnected"
             :class="(ethConnectionStore.isConnected && flashNameBorder) ? 'flashingBorder' : ''" :error="name.trim() === ''">
      <template v-slot:error>
        Please provide a name for your DAO.
      </template>
    </q-input>
    <q-input counter filled square label="DAO description" v-model="description" maxlength="120" class="q-pa-xs q-pt-lg" :disable="!ethConnectionStore.isConnected"
             :class="(ethConnectionStore.isConnected && flashDescriptionBorder) ? 'flashingBorder' : ''" :error="description.trim() === ''">
      <template v-slot:error>
        Please provide a short description of your DAO.
      </template>

    </q-input>
    <q-banner class="noisegreen text-primary text-center text-subtitle2 q-pa-xs q-mt-lg" v-if="ethConnectionStore.isConnected" dense>
      <div class="row items-center">
        <div class="col-4">
          <q-img :src="ethConnectionStore.networkIcon" style="height: 25px; width:25px"/>
        </div>
        <div class="col-8 text-left">
          You are connected to {{ethConnectionStore.networkName}} network. <br>Please provide {{ethConnectionStore.networkName}} token address. <br>
          <b>Important:</b> your DAO will use a governance token on {{ethConnectionStore.networkName}}.<br>
          Please reconnect wallet if you want to change the blockchain network.
        </div>
      </div>
    </q-banner>
    <q-input square filled label="DAO governance token address" v-model="tokenAddress"
             :error="tokenAddress.trim() === '' && ethConnectionStore.isConnected"
             :class="(ethConnectionStore.isConnected && flashTokenAddressBorder) ? 'flashingBorder' : ''"
             class="q-pa-xs q-pt-lg" :disable="!ethConnectionStore.isConnected">
      <template v-slot:error>
        Please provide address of your DAO governance token (ERC-20 or NFT).
      </template>
    </q-input>
    <div v-if="tokenName !== ''">
      <q-input square dense readonly outlined prefix="Token name:" v-model="tokenName" class="q-pa-xs" debounce="500"></q-input>
      <q-input square dense readonly outlined prefix="Token symbol:" v-model="tokenSymbol" class="q-pa-xs"></q-input>
      <q-input square dense readonly outlined prefix="Token type:" v-model="tokenType" class="q-pa-xs" ></q-input>
      <q-input square dense readonly outlined prefix="Token decimals:" v-model="decimals" v-if="decimals !== ''" class="q-pa-xs"></q-input>
      <q-input square dense readonly outlined prefix="Token network:" v-model="ethConnectionStore.networkName" class="q-pa-xs">
        <template v-slot:append>
          <q-avatar>
            <img :src="ethConnectionStore.networkIcon" style="height: 25px; width: 25px;">
          </q-avatar>
        </template>
      </q-input>
    </div>
    <q-input
      v-if="ethConnectionStore.isConnected && tokenSymbol.trim() !== ''"
      :disable="!ethConnectionStore.isConnected"
      filled
      class="q-pa-xs q-pt-lg"
      v-model.number="minimalTokens"
      :class="(ethConnectionStore.isConnected && flashTokensRequiredBorder) ? 'flashingBorder' : ''"
      type="number"
      :error="minimalTokens <= 0"
      label="Minimal tokens required for proposal creation"
      :suffix="tokenType === 'NFT' ? `${tokenSymbol} NFTs` : `${tokenSymbol} tokens`"
    >
      <template v-slot:error>
        Amount of tokens must be greater than 0.
      </template>
      <q-tooltip class="stateborn-tooltip">
        Provide amount of {{tokenSymbol !== '' ? tokenSymbol : 'DAO governance'}} tokens required to own in order to create
        a public DAO proposal for voting.
      </q-tooltip>
    </q-input>
    <q-input square dense outlined prefix="DAO owner:" readonly v-model="daoOwner" class="q-pa-xs" v-if="ethConnectionStore.isConnected && tokenSymbol.trim() !== ''">
      <q-tooltip class="stateborn-tooltip">
         Your current account {{ethConnectionStore.account}} will be the DAO owner. <br>
         The DAO owner has the possibility to upgrade DAO settings.
      </q-tooltip>
    </q-input>

    <div class="row justify-center items-center q-pt-md" v-if="!skipDaoPicture">
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
        <div class="text-subtitle2 text-bold text-red" v-else>No image</div>
        <q-img
          :src="image"
          spinner-color="white"
          :style="`border: 1px solid ${image !== '' ? '#9E9E9E' : '#F44336'}`"
          style="height: 150px; max-width: 150px; "
        />
      </div>
    </div>
    <div class="row justify-left">
      <div class="col-auto justify-left">
        <q-toggle
          v-model="skipDaoPicture"
          label="I don't want a DAO image"
        />
      </div>
    </div>
    <q-btn class="q-ma-xs old-button" square label="Create" color="primary"
           :disable="!isFormValid"
           @click="callCreateDao"></q-btn>

  </div>
  <q-dialog v-model="showSignDaoDialog">
    <q-card class="noisegreen text-subtitle2">
      <q-card-section class="row items-center">
        <q-avatar icon="fa-solid fa-key" size='md' color="primary" text-color="white" square/>
        <span class="q-ml-lg text-h5" >Sign DAO definition data</span>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section style="padding-top: 0; margin-top:0;">
          Your browser wallet just requested you to digitally sign a data.
          The data contains all the information you just provided in the form.
          This operation is free and doesn't interact with blockchain.
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { api } from 'boot/axios';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { signDao } from 'src/api/services/signature-service';
import FileReader from 'components/proposal/FileReader.vue';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import { Notify, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';
import { ERC_20_SERVICE } from 'src/api/services/erc-20-service';
import { sleep } from 'src/api/services/sleep-service';
import { ClientDao } from 'src/api/model/ipfs/client-dao';
import { ClientToken } from 'src/api/model/ipfs/client-token';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { createDaoOnChain } from 'src/api/services/onchain-service';

dayjs.extend(dayjsPluginUTC);
const ethConnectionStore = useEthConnectionStore();
const name = ref('My new DAO...');
// 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D - bored ape
const description = ref('Description of your DAO...');
const tokenAddress = ref('');
const tokenName = ref('');
const tokenSymbol = ref('');
const tokenType = ref(TokenType.ERC20);
const decimals = ref('');
const image = ref('');
const daoOwner = ref(' ');
const showSignDaoDialog = ref(false);
const proposalType = ref({ value: 'YES/NO', label: 'YES / NO - vote YES or NO' });
const minimalTokens = ref(100);
const skipDaoPicture = ref(false);
const flashNameBorder = ref(true);
const flashDescriptionBorder = ref(true);
const flashTokenAddressBorder = ref(true);
const flashTokensRequiredBorder = ref(true);
const proposalOptions = ref(<string[]>[]);
const emit = defineEmits(['proposalChanged']);
const router = useRouter();
const props = defineProps<{
  onchain: boolean,
}>();
watch(() => name.value, () => {
  flashNameBorder.value = false;
});
watch(() => description.value, () => {
  flashDescriptionBorder.value = false;
});
watch(() => tokenAddress.value, () => {
  flashTokenAddressBorder.value = false;
});
watch(() => minimalTokens.value, () => {
  flashTokensRequiredBorder.value = false;
});

watch(() => ethConnectionStore.account, async () => {
  daoOwner.value = ethConnectionStore.account;
  setTokenAddress();
});
if (ethConnectionStore.isConnected) {
  daoOwner.value = ethConnectionStore.account;
}

const setTokenAddress = () => {
  if (ethConnectionStore.isConnected && process.env.IS_LOCALHOST) {
    if (ethConnectionStore.chainId === '1') {
      tokenAddress.value = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    } else if (ethConnectionStore.chainId === '42161') {
      //Tether Arbitrum
      tokenAddress.value = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
    } else if (ethConnectionStore.chainId === '137') {
      //polygon
      tokenAddress.value = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
    } else {
      // local erc-20
      // NFT: 0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1
      tokenAddress.value = process.env.DEVELOPMENT_NETWORK_ERC_20_TOKEN_ADDRESS!;
    }
  }
}
const $q = useQuasar();
onMounted(() => {
  if (ethConnectionStore.isConnected) {
    setTokenAddress();
  }
});

const isFormValid = computed(() => {
  return ethConnectionStore.isConnected && name.value.trim() !== '' && name.value.trim().length <= 60 && description.value.trim() !== '' && description.value.trim().length <= 120 &&
    tokenAddress.value !== '' && tokenName.value !== '' && tokenAddress.value.trim() !== ''
    && tokenSymbol.value !== '' && minimalTokens.value > 0
  && (skipDaoPicture.value ? true : image.value !== '');
});

watch(() => tokenAddress.value, async () => {
  $q.loading.show({
    delay: 100, // ms
    message: 'Reading token data...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  try {
    const { nameRes, symbolRes, decimalsRes } = await ERC_721_SERVICE.readTokenData(tokenAddress.value);
    tokenName.value = nameRes;
    tokenSymbol.value = symbolRes;
    tokenType.value = TokenType.NFT;
    decimals.value = decimalsRes;
    minimalTokens.value = 1;
    $q.loading.hide();
    Notify.create({ message: 'Successfully fetched NFT token data!', position: 'top-right', color: 'green' });
  } catch (err2) {
    try {
      const { nameRes, symbolRes, decimalsRes } = await ERC_20_SERVICE.readTokenData(tokenAddress.value);
      tokenName.value = nameRes;
      tokenSymbol.value = symbolRes;
      decimals.value = decimalsRes;
      tokenType.value = TokenType.ERC20;
      $q.loading.hide();
      Notify.create({ message: 'Successfully fetched ERC-20 token data!', position: 'top-right', color: 'green' });
    } catch (err) {
      tokenName.value = '';
      tokenSymbol.value = '';
      decimals.value = '';
      $q.loading.hide();
      Notify.create({ message: `Incorrect token address. Is it valid ERC-20/NFT token address on ${ethConnectionStore.networkName}?`, position: 'top-right', color: 'red' });
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

const callCreateDao = async () => {
  let daoContractAddress = '';
  if (props.onchain === true) {
    $q.loading.show({
      delay: 100, // ms
      message: 'Waiting for transaction processing. This may take a while...',
      backgroundColor: 'black',
      messageColor: 'white',
    });
    daoContractAddress = await createDaoOnChain(ethConnectionStore.chainId);
    Notify.create({ message: `DAO created on-chain. Address: ${daoContractAddress}`, position: 'top-right', color: 'green' });
    $q.loading.hide();
  }
  showSignDaoDialog.value = true;
  const creationDateUtc = dayjs().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const clientDao = new ClientDao(
    name.value.trim(),
    description.value.trim(),
    skipDaoPicture.value === true ? '' : image.value,
    [ethConnectionStore.account],
    "1",
    minimalTokens.value.toString(),
    creationDateUtc,
    new ClientToken(
      tokenAddress.value,
      tokenName.value,
      tokenSymbol.value,
      tokenType.value,
      ethConnectionStore.chainId,
      decimals.value,
    ),
    daoContractAddress !== '' ? daoContractAddress : undefined,
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
