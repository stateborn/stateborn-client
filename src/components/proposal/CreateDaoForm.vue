<template>
  <div>
    <q-input square label="Name" v-model="name" class="q-pa-xs"></q-input>
    <q-input counter square label="Description" v-model="description" class="q-pa-xs"></q-input>
    <q-input square label="Token address" v-model="tokenAddress" class="q-pa-xs"></q-input>
    <div v-if="tokenName !== ''">
      <q-input square dense readonly filled outlined prefix="Token name:" v-model="tokenName" class="q-pa-xs" debounce="500"></q-input>
      <q-input square dense readonly filled prefix="Token symbol:" v-model="tokenSymbol" class="q-pa-xs"></q-input>
      <q-input square dense readonly filled prefix="Token type:" v-model="tokenType" class="q-pa-xs"></q-input>
      <q-input square dense readonly filled prefix="Token supply:" v-model="tokenSupply" v-if="tokenSupply !== ''" class="q-pa-xs"></q-input>
    </div>
    <q-input square label="Owner" readonly v-model="daoOwner" class="q-pa-xs"></q-input>
    <define-voting-options-card v-if="proposalType.value === 'OPTIONS'" @proposal-option-added="proposalOptionAdded"></define-voting-options-card>
    <q-input
      class="q-pa-xs"
      v-model.number="minimalTokens"
      type="number"
      label="Minimal tokens for proposal creation"
      :suffix="tokenType === 'NFT' ? 'NFT tokens' : `${tokenSymbol} tokens`"
    />
    <div class="row justify-center items-center">
      <div class="col-6">
        <file-reader class="q-pa-xs"
                     label="Upload DAO image/logo"
                     @file-uploaded="onFileUploaded"
                     @file-removed="onFileRemoved"
                     :dao-file-mode="true"
                     :as-base="true"></file-reader>
      </div>
      <div class="col-6">
        <div class="text-subtitle2 text-bold" v-if="image !== ''">Image preview</div>
        <div class="text-subtitle2 text-bold" v-else>No image</div>
        <q-img
          :src="image"
          spinner-color="white"
          style="height: 150px; max-width: 150px; border: 1px solid black"
        />
      </div>
    </div>
    <q-btn class="q-ma-xs old-button" square label="Create" color="black" @click="callCreateProposal"></q-btn>

  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
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

dayjs.extend(dayjsPluginUTC);
const ethConnectionStore = useEthConnectionStore();
const name = ref('My new DAO...');
// 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D - bored ape
const description = ref('0xD33526068D116cE69F19A9ee46F0bd304F21A51f');
const tokenAddress = ref('');
const tokenName = ref('');
const tokenSymbol = ref('');
const tokenType = ref('');
const tokenSupply = ref('');
const image = ref('');
const daoOwner = ref(ethConnectionStore.account);
const proposalType = ref({ value: 'YES/NO', label: 'YES / NO - vote YES or NO' });
const minimalTokens = ref(100);
const proposalOptions = ref(<string[]>[]);
const emit = defineEmits(['proposalChanged']);
const imagesMap = new Map();
const startDate = dayjs();
const router = useRouter();
watch(() => ethConnectionStore.account, async () => {
  daoOwner.value = ethConnectionStore.account;
});
const $q = useQuasar();

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
    tokenType.value = 'NFT';
    $q.loading.hide();
    Notify.create({ message: 'Successfully fetched NFT token data!', position: 'top-right', color: 'green' });
  } catch (err2) {
    try {
      const { nameRes, symbolRes, supplyRes } = await ERC_20_SERVICE.readTokenData(tokenAddress.value);
      tokenName.value = nameRes;
      tokenSymbol.value = symbolRes;
      tokenSupply.value = supplyRes;
      tokenType.value = 'ERC-20';
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
const calculateCommentPrefix = (fileName: string) => `// attachment: ${fileName}`;
const calculateDescriptionValue = () => {
  let result = description.value;
  imagesMap.forEach((file) => {
    result = result.replace(calculateCommentPrefix(file.fileName), file.file);
  });
  return result;
};
const emitProposalChanged = () => {
  emit('proposalChanged', {
    title: name.value,
    description: calculateDescriptionValue(),
    durationHours: minimalTokens.value,
    startDateUtc: startDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    endDateUtc: startDate.add(minimalTokens.value, 'h').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  });
};
emitProposalChanged();
watch([name, description, minimalTokens], async () => {
  emitProposalChanged();
});

const onFileUploaded = (res: any) => {
  if (res.fileName.endsWith('.webp') || res.fileName.endsWith('.png') || res.fileName.endsWith('.jpg') || res.fileName.endsWith('.jpeg') || res.fileName.endsWith('.gif')) {
    image.value = `data:image/jpeg;base64, ${res.base64File}`;
  } else {
    Notify.create({ message: 'Incorrect picture format. Try .jpg .jpeg or .gif', position: 'top-right', color: 'red' });
  }
};
const onFileRemoved = () => {
  image.value = '';
};

function getDataObject() {
  switch (proposalType.value.value) {
    case 'YES/NO':
      return undefined;
    case 'OPTIONS':
      return {
        options: proposalOptions.value,
      };
    default:
      throw new Error(`Unknown proposal type ${proposalType.value.value}`);
  }
}

const callCreateProposal = async () => {
  const startDateUtcString = startDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const endDateUtcString = startDate.add(minimalTokens.value, 'h').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const clientDao = {
    name: name.value.trim(),
    description: description.value.trim(),
    imageBase64: image.value,
    owners: [ethConnectionStore.account],
    ownersMultisigThreshold: "1",
    proposalTokenRequiredQuantity: "1",
    token: {
      address: tokenAddress.value,
      name: tokenName.value,
      symbol: tokenSymbol.value,
      type: tokenType.value,
      network: 'mainnet',
    },
    data: getDataObject(),
  };

  const signature = await signDao(
    clientDao.name,
    clientDao.description,
    clientDao.imageBase64,
    clientDao.owners,
    clientDao.ownersMultisigThreshold,
    clientDao.proposalTokenRequiredQuantity,
    clientDao.token.address,
    clientDao.token.type,
    clientDao.token.network,
  );
  api.post('/api/rest/v1/dao', {
    clientDao,
    signature,
    creatorAddress: ethConnectionStore.account,
  }).then((response) => {
    Notify.create({ message: 'Successfully created DAO!', position: 'top-right', color: 'green' });
    router.push('/');
    console.log('Proposal created!', response);
  }, (error) => {
    Notify.create({ message: 'Creating DAO failed - server problem!', position: 'top-right', color: 'red' });
    console.log(error);
  });
};
</script>
