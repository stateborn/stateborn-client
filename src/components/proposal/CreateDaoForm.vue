<template>
  <div style="margin:0;padding:0;">
    <q-banner class="text-primary text-subtitle2 text-center noisegreen q-ma-xs" v-if="props.onchain">
      <div class="row items-center">
        <div class="col-lg-4 col-xs-grow">
          <q-img class="onchain-icon" src="/cube2.svg" style="height:42px; width: 42px"></q-img>
        </div>
        <div class="col-lg-8 col-xs-grow text-left">
          <q-item-label class="text-overline q-mb-xs" :class="$q.platform.is.mobile ? 'text-center' : ''" style="font-size: 1rem">OFF-CHAIN + ON-CHAIN</q-item-label>
          <q-item-label class="text-overline text-bold q-pt-xs" :class="$q.platform.is.mobile ? 'text-center' : ''" style="font-size: 0.9rem">Features:</q-item-label>
          <q-item-label class="text-overline q-mb-md " :class="$q.platform.is.mobile ? 'text-center' : ''" style="font-size: 0.9rem">All included in off-chain DAO:</q-item-label>
          • NFT/ERC-20 blockchain based token governance
          <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
            <q-tooltip class="stateborn-tooltip">
              Your DAO governance will be based on blockchain NFT/ERC-20 token of your choice.<br>
              Users owning a DAO token will be able to vote on proposals.<br>
            </q-tooltip>
          </q-icon><br>
          • off-chain proposals creation (no cost)
          <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
            <q-tooltip class="stateborn-tooltip">
              Users owning a DAO token can create proposals. <br>
              Proposals are stored off-chain (not in blockchain). <br>
              Users owning a DAO token can vote on proposal. <br>
              Proposal can be about anything and can include attachments (images, documents). <br>
              Proposals creation is free.<br>
              Proposals are transparent, immutable and cryptographically secured and can be verified by anyone.
            </q-tooltip>
          </q-icon>
          <br>
          • voting on proposals
          <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
            <q-tooltip class="stateborn-tooltip">
              Users owning a DAO token can vote on proposals.<br>
              Voting purpose is to pass or reject proposal. <br>
              Voting is free and votes are stored off-chain (not in blockchain).<br>
              Votes are transparent, immutable, cryptographically secured and can be verified by anyone.<br>
            </q-tooltip>
          </q-icon><br>
          <q-item-label class="text-overline q-mb-md q-mt-md " :class="$q.platform.is.mobile ? 'text-center' : ''" style="font-size: 0.9rem">on-chain only features:</q-item-label>
          • on-chain (smart-contracts based) DAO treasury  <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
          <q-tooltip class="stateborn-tooltip">
            Smart contracts based DAO treasury will be created in blockchain. <br>
            It is on-chain wallet which can control assets like ERC-20, NFT tokens or cryptocurrency (e.g. Ether). <br>
            Stateborn DAO treasury is non-permissioned. <br>
            DAO treasury assets transfers can be proposed and executed (if passed on-chain) by anyone. <br>
            DAO treasury should be managed by DAO community and proposals decisions.
          </q-tooltip>
        </q-icon><br>
          • proposals can include on-chain DAO treasury transfers  <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
          <q-tooltip class="stateborn-tooltip">
            Proposals can include transfers of assets (tokens, NFTs) from DAO treasury to any address. <br>
            Transaction execution is based on DAO community voting. <br>
          </q-tooltip>
        </q-icon><br>
          <br>
          on-chain + off-chain DAO creation costs <b>transaction fee</b> for on-chain DAO creation (blockchain transaction).<br>
          DAO definition is stored off-chain (IPFS) and on-chain (smart contracts).<br>
          You need to provide the address of your governance token (ERC-20 or NFT).
        </div>
      </div>
    </q-banner>
    <q-banner class="text-primary text-subtitle2 text-center noisegreen q-ma-xs" v-else>
      <div class="row items-center">
        <div class="col-lg-4 col-xs-grow">
          <q-icon class="offchain-icon" name="fa-solid fa-square" color="primary"  size="lg"/>
        </div>
        <div class="col-lg-8 col-xs-grow text-left ">
          <q-item-label class="text-overline " :class="$q.platform.is.mobile ? 'text-center' : ''" style="font-size: 1.1rem">OFF-CHAIN DAO</q-item-label>
          <q-item-label class="text-overline text-bold q-mb-md q-pt-xs" :class="$q.platform.is.mobile ? 'text-center' : ''" style="font-size: 0.9rem">Features:</q-item-label>
          • NFT/ERC-20 blockchain based token governance
          <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
            <q-tooltip class="stateborn-tooltip">
              Your DAO governance will be based on blockchain NFT/ERC-20 token of your choice.<br>
              Users owning a DAO token will be able to vote on proposals.<br>
            </q-tooltip>
          </q-icon><br>
          • off-chain proposals creation (no cost)
          <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
            <q-tooltip class="stateborn-tooltip">
              Users owning a DAO token can create proposals. <br>
              Proposals are stored off-chain (not in blockchain). <br>
              Users owning a DAO token can vote on proposal. <br>
              Proposal can be about anything and can include attachments (images, documents). <br>
              Proposals creation is free.<br>
              Proposals are transparent, immutable and cryptographically secured and can be verified by anyone.
            </q-tooltip>
          </q-icon><br>
          • voting on proposals
          <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
            <q-tooltip class="stateborn-tooltip">
              Users owning a DAO token can vote on proposals.<br>
              Voting purpose is to pass or reject proposal. <br>
              Voting is free and votes are stored off-chain (not in blockchain).<br>
              Votes are transparent, immutable, cryptographically secured and can be verified by anyone.<br>
            </q-tooltip>
          </q-icon><br>
          <br>
          off-chain DAO creation is <b>free</b>.<br>
          DAO definition is stored off-chain (IPFS).<br>
          You only need to provide the address of your governance token (ERC-20 or NFT).
        </div>
      </div>
    </q-banner>
    <q-banner class="text-black text-subtitle2 text-center noisered q-ma-xs" v-if="!ethConnectionStore.isConnected">
      <span class="text-bold text-red-8" v-if="$q.platform.is.mobile">Currently available on DESKTOP only</span>
      <span class="text-bold text-red-8" v-else>Please connect first</span>
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
    <q-banner class="noisegreen text-primary text-center text-subtitle2 q-pa-xs q-mt-lg" v-if="ethConnectionStore.isConnected && !onchain" dense >
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
    <q-banner class="noisered text-primary text-center text-subtitle2 q-pa-xs q-mt-lg"
              v-if="!isLocalhost && ethConnectionStore.isConnected && onchain && ethConnectionStore.chainId !== '137'" dense >
      <div class="row items-center">
        <div class="col-4">
          <q-img :src="TOKEN_SERVICE.getNetworkIcon('137')" style="height: 25px; width:25px"/>
        </div>
        <div class="col-8 text-left">
          <q-item-label class="text-overline q-mb-md" :class="$q.platform.is.mobile ? 'text-center' : ''" style="font-size: 1rem">Unsupported network</q-item-label>
          Currently off-chain + on-chain DAOs are supported only on <b>Polygon</b>.<br>
          Please switch to Polygon and create your DAO based on this network.
          <div class="row justify-center">
            <div class="col-grow justify-center text-center">
              <q-btn color="primary"  class="q-mt-xs full-width" dense icon="fa-solid fa-shuffle" @click="switchNetwork"
                     :label="`Switch to Polygon`"></q-btn>
            </div>
          </div>
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
    <div class="row q-pa-xs">
      <div class="col-12 bodynoise veryLightBorder">
        <div class="row justify-center">
          <div class="col-8">
            <token-info-card
              v-if="tokenType === TokenType.ERC20 && tokenName !== ''"
              :big-token="true"
              label="DAO governance token"
              :token-symbol="tokenSymbol"
              :decimals="decimals"
              :token-name="tokenName"
              :network-name="ethConnectionStore.networkName"
              :network-icon="ethConnectionStore.networkIcon"
              :token-type="tokenType">
            </token-info-card>
            <nft-token-info-card
              v-if="tokenType === TokenType.NFT && tokenName !== ''"
              :big-token="true"
              :nft-id="undefined"
              :token-address="tokenAddress"
              label="DAO governance token"
              :token-symbol="tokenSymbol"
              :decimals="decimals"
              :token-name="tokenName"
              :network-name="ethConnectionStore.networkName"
              :network-icon="ethConnectionStore.networkIcon"
              :collection-mode-only="true">
            </nft-token-info-card>
          </div>
        </div>
      </div>
    </div>
    <q-input
      v-if="ethConnectionStore.isConnected && tokenSymbol.trim() !== ''"
      :disable="!ethConnectionStore.isConnected"
      filled
      class="q-pa-xs"
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
                     label="Upload DAO logo (120x120 px)"
                     @file-uploaded="onFileUploaded"
                     @file-removed="onFileRemoved"
                     size-kb-limit="500"
                     :dao-file-mode="true"
                     :as-base="true"></file-reader>
      </div>
      <div class="col-6">
        <div class="text-subtitle2 text-bold" v-if="image !== ''">Image preview</div>
        <div class="text-subtitle2 text-bold text-red-8" v-else>No image</div>
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
          This is step of off-chain DAO creation process.
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
import TokenInfoCard from 'components/TokenInfoCard.vue';
import NftTokenInfoCard from 'components/NftTokenInfoCard.vue';
import { animeIcons } from 'src/api/services/anime-service';
import { ethers } from 'ethers';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { changeNetwork } from 'src/api/services/change-network-service';

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
  animeIcons();
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
const isLocalhost = process.env.IS_LOCALHOST;
const callCreateDao = async () => {
  let daoContractAddress = '';
  if (props.onchain === true) {
    $q.loading.show({
      delay: 100, // ms
      message: 'Waiting for transaction processing. This may take a while...',
      backgroundColor: 'black',
      messageColor: 'white',
    });
    daoContractAddress = await createDaoOnChain(
      tokenAddress.value,
      ethers.parseUnits(minimalTokens.value.toString(), Number(decimals.value)),
      ethConnectionStore.chainId,
      tokenType.value);
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

const switchNetwork = async () => {
  try {
    await changeNetwork('137');
    Notify.create({ message: `Successfully changed network to Polygon!`, position: 'top-right', color: 'green' });
  } catch (err) {
    Notify.create({ message: 'Changing network failed. Please change network directly in wallet (e.g. Metamask)', position: 'top-right', color: 'red' });
  }
}

</script>
