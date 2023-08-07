<template>
  <div>
    <q-banner class="text-primary text-subtitle2 text-center noisegreen">
      <div class="row items-center">
        <div class="col-4">
          <q-icon name="fa-solid fa-info" color="primary"  size="lg"/>
        </div>
        <div class="col-8 text-left">
          DAO proposal creation is <b>free</b>.<br>
          Proposal definition file is stored off-chain (IPFS).<br>
          Total proposal size (with attachments) cannot be greater than 2MB.
        </div>
      </div>
    </q-banner>
    <q-banner class="text-black text-subtitle2 text-center noisered q-mt-md" v-if="!ethConnectionStore.isConnected">
      <span class="text-bold text-red">Please connect first</span>
    </q-banner>
    <q-banner class="text-primary text-subtitle2 text-center bodynoise q-mt-md" v-if="description.length > 0 && ethConnectionStore.isConnected && hasRequiredAmountOfTokens && connectedNetworkMatchesTokenNetwork">
      <div>
        <div class="text-center text-subtitle2">Description preview</div>
        <proposal-description-markdown
          class="q-pt-md q-pb-md q-ma-xs"
          :description="calculateDescriptionValue()"
        >
        </proposal-description-markdown>
      </div>
    </q-banner>
    <q-banner class="text-black text-subtitle2 text-center noisered q-mt-md" v-if="ethConnectionStore.isConnected && !hasRequiredAmountOfTokens">
      <div class="row items-center">
        <div class="col-4">
          <q-icon name="fa-solid fa-triangle-exclamation" color="primary"  size="lg"/>
        </div>
        <div class="col-8 text-left">
          You need at least <span class="text-bold">{{props.dao.clientDao.proposalTokenRequiredQuantity}} {{props.dao.clientDao.token.symbol}}</span> to create a proposal <br>
          You have: <span class="text-bold">{{tokenBalance}} {{props.dao.clientDao.token.symbol}}</span>
        </div>
      </div>

    </q-banner>
    <q-banner class="text-black text-bold text-subtitle2 text-center noisered items-center q-mt-md" v-if="ethConnectionStore.isConnected && !connectedNetworkMatchesTokenNetwork">
      <div class="row items-center">
        <div class="col-4">
          <q-icon name="fa-solid fa-triangle-exclamation" color="primary"  size="lg"/>
        </div>
        <div class="col-8 text-left">
          You are connected to: {{TOKEN_SERVICE.getNetworkName(ethConnectionStore.chainId)}}<q-img style="width: 25px; height: 25px;" :src="TOKEN_SERVICE.getNetworkIcon(ethConnectionStore.chainId)"/> <br>
          DAO token network: {{TOKEN_SERVICE.getNetworkName(props.dao.clientDao.token.chainId) }}<q-img style="width: 25px; height: 25px;" :src="TOKEN_SERVICE.getNetworkIcon(props.dao.clientDao.token.chainId)"/><br>
          Please switch your wallet to {{TOKEN_SERVICE.getNetworkName(props.dao.clientDao.token.chainId) }} to create proposal.<br>
          <q-btn color="primary"  class="q-mt-xs" icon="fa-solid fa-shuffle" @click="switchNetwork" :label="`Switch to ${TOKEN_SERVICE.getNetworkName(props.dao.clientDao.token.chainId)}`"></q-btn>

        </div>
      </div>
    </q-banner>
    <q-input square filled label="Title" v-model="title" maxlength="120" counter :error="title.trim() === ''" class="q-mt-md">
      <template v-slot:error>
        Proposal title is required.
      </template>
    </q-input>
    <q-input type="textarea" filled counter square label="Description" v-model="description" class="q-pt-xs" :error="description.trim() === ''">
      <template v-slot:error>
        Proposal description is required.
      </template>
    </q-input>
    <file-reader label="Upload proposal attachments" class="q-mt-xs" @file-uploaded="onFileUploaded" @file-removed="onFileRemoved" :as-base="true" size-kb-limit="1000"></file-reader>

    <q-select filled :options="proposalTypeOptions" square v-model="proposalType" label="BackendProposal type" class="q-mt-md"></q-select>
    <define-voting-options-card v-if="proposalType.value === 'OPTIONS'" @proposal-option-added="proposalOptionAdded"></define-voting-options-card>
    <div class="row items-center q-pt-md">
      <div class="col-6">
        <q-input
          filled
          v-model.number="durationHours"
          type="number"
          label="Duration (time for voting)"
          suffix="hours"
          :error="durationHours < 1"
        >
          <template v-slot:error>
            Proposal duration must be at least 1 hour.
          </template>
        </q-input>
      </div>
      <div class="col-6 text-subtitle2">
        <span class="text-bold">Duration:</span> {{durationString}}
      </div>
    </div>

    <div class="row justify-left" v-if="ethConnectionStore.isConnected">
      <div class="col-auto">
        <q-toggle
          v-model="createDaoOnChainTransaction"
          label="Create DAO on-chain transaction"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <create-proposal-transaction-row v-if="createDaoOnChainTransaction && dao.clientDao.contractAddress" :dao-address="dao.clientDao.contractAddress!"
        @proposal-transaction="onProposalTransactionAdded"></create-proposal-transaction-row>
      </div>
    </div>

    <q-btn class="q-ma-xs q-mt-lg" square label="Create" color="primary"
           :disable="!isFormValid"
           @click="callCreateProposal"></q-btn>
    <q-dialog v-model="showSignProposalDialog">
      <q-card class="noisegreen text-subtitle2">
        <q-card-section class="row items-center">
          <q-avatar icon="fa-solid fa-key" size='md' color="primary" text-color="white" square/>
          <span class="q-ml-lg text-h5" >Sign proposal data</span>
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
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { api } from 'boot/axios';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { signProposal } from 'src/api/services/signature-service';
import FileReader from 'components/proposal/FileReader.vue';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import DefineVotingOptionsCard from 'components/proposal/DefineVotingOptionsCard.vue';
import { Notify, useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import ProposalDescriptionMarkdown from 'components/proposal/ProposalDescriptionMarkdown.vue';
import { getLatestBlockNumber } from 'src/api/services/eth-service';
import { ClientProposal } from 'src/api/model/ipfs/client-proposal';
import { ProposalType } from 'src/api/model/ipfs/proposal-type';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { changeNetwork } from 'src/api/services/change-network-service';
import { DaoBackend } from 'src/api/model/dao-backend';
import CreateProposalTransactionRow from 'components/proposal/CreateProposalTransactionRow.vue';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';

dayjs.extend(dayjsPluginUTC);
const title = ref('New proposal');
const description = ref('This proposal is about...');
const proposalTypeOptions = ref([{ value: 'YES/NO', label: 'YES / NO - vote YES or NO' }, { value: 'OPTIONS', label: 'OPTIONS - vote for one of the options' }]);
const proposalType = ref({ value: 'YES/NO', label: 'YES / NO - vote YES or NO' });
const durationHours = ref(72);
const tokenBalance = ref('');
const hasRequiredAmountOfTokens = ref(true);
const proposalOptions = ref(<string[]>[]);
const ethConnectionStore = useEthConnectionStore();
const emit = defineEmits(['proposalChanged']);
const imagesMap = new Map();
const showSignProposalDialog = ref(false);
const createDaoOnChainTransaction = ref(false);
const transaction = ref(<ClientProposalTransaction | undefined>undefined);
const startDate = dayjs();
const router = useRouter();

const props = defineProps<{
  dao: DaoBackend,
}>();

const isFormValid = computed(() => {
  return ethConnectionStore.isConnected && hasRequiredAmountOfTokens.value === true && title.value.trim() !== ''
  && description.value.trim() !== '' && durationHours.value >= 1 &&
    // if chosen to add transaction, then it must be set (is correct)
    ((props.dao.clientDao.contractAddress && createDaoOnChainTransaction.value === true) ? (transaction.value !== undefined) : true)
});

const proposalOptionAdded = (currentProposalOptions: string[]) => {
  proposalOptions.value = currentProposalOptions;
};
const calculateCommentPrefix = (fileName: string) => `// attachment: ${fileName}`;
const calculateCommentPrefixWithSpace = (fileName: string) => `\n// attachment: ${fileName}`;
const calculateDescriptionValue = () => {
  let result = description.value;
  imagesMap.forEach((file) => {
    result = result.replace(calculateCommentPrefix(file.fileName), file.file);
  });
  return result;
};
const durationString = computed(() => {
  const now = dayjs();
  const to = now.add(durationHours.value, 'h');
  const diffDays = to.diff(now, 'day');
  const date1PlusDays = now.add(diffDays, 'day');
  const diffHours = to.diff(date1PlusDays, 'hour');
  return `${diffDays} days and ${diffHours} hours`;
});
const emitProposalChanged = () => {
  emit('proposalChanged', {
    title: title.value.trim(),
    description: calculateDescriptionValue().trim(),
    durationHours: durationHours.value,
    startDateUtc: startDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    endDateUtc: startDate.add(durationHours.value, 'h').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  });
};
emitProposalChanged();
watch([title, description, durationHours], async () => {
  emitProposalChanged();
});

const onFileUploaded = (res: any) => {
  if (res.fileName.endsWith('.png') || res.fileName.endsWith('.jpg') || res.fileName.endsWith('.jpeg') || res.fileName.endsWith('.gif') || res.fileName.endsWith('.webp')) {
    imagesMap.set(res.fileName, {
      fileName: res.fileName,
      file: `\n<img src="data:image/jpeg;base64, ${res.base64File}" style="max-width:80%;height:100%"/>`,
    });
    description.value += calculateCommentPrefixWithSpace(res.fileName);
  } else {
    imagesMap.set(res.fileName, {
      fileName: res.fileName,
      file: `\n<a href="data:application/pdf;base64,${res.base64File}" download="${res.fileName}" style='text-decoration: underline;'>${res.fileName}</a>`,
    });
    description.value += calculateCommentPrefixWithSpace(res.fileName);
  }
};
const onFileRemoved = (fileName: string) => {
  imagesMap.delete(fileName);
  description.value = description.value.replace(calculateCommentPrefix(fileName), '');
};

const readTokenBalance = async () => {
  if (ethConnectionStore.isConnected) {
    TOKEN_SERVICE.readTokenBalance(ethConnectionStore.account,
      props.dao.clientDao.token.address,
      props.dao.clientDao.token.type,
      props.dao.clientDao.token.decimals).then((res) => {
      tokenBalance.value = res;
      console.log('token balance', tokenBalance.value);
    }, (error) => {
      console.log(error);
    });
  }
};
readTokenBalance();

watch(() => [ethConnectionStore.isConnected, ethConnectionStore.chainId], () => {
  readTokenBalance();
});

watch(() => tokenBalance.value, () => {
  hasRequiredAmountOfTokens.value = Number(tokenBalance.value) >= Number(props.dao.clientDao.proposalTokenRequiredQuantity);
});


const connectedNetworkMatchesTokenNetwork = computed(() => {
  if (ethConnectionStore.isConnected) {
    return ethConnectionStore.chainId === props.dao.clientDao.token.chainId;
  } else {
    return true;
  }
});


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
const $q = useQuasar();

const callCreateProposal = async () => {
  $q.loading.show({
    delay: 100, // ms
    message: 'Reading latest block number...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  const latestBlockNumber = await getLatestBlockNumber();
  $q.loading.hide();
  Notify.create({ message: `Latest block number: ${latestBlockNumber}`, position: 'top', color: 'primary' });
  const fullDescription = calculateDescriptionValue();
  const clientProposal: ClientProposal = new ClientProposal(
    ethConnectionStore.account,
    props.dao.ipfsHash,
    title.value,
    fullDescription,
    <ProposalType>proposalType.value.value,
    startDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    startDate.add(durationHours.value, 'h').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    latestBlockNumber.toString(),
    getDataObject(),
    transaction.value !== undefined ? [transaction.value] : undefined
);
  showSignProposalDialog.value = true;
  const signature = await signProposal(clientProposal);
  api.post('/api/rest/v1/proposal', {
    clientProposal,
    creatorSignature: signature,
  }).then((response) => {
    Notify.create({ message: 'Successfuly created proposal!', position: 'top-right', color: 'green' });
    router.push(`/${props.dao.ipfsHash}`);
    console.log('BackendProposal created!', response);
  }, (error) => {
    Notify.create({ message: 'Creating proposal failed - server problem!', position: 'top-right', color: 'red' });
    console.log(error);
  });
};

const switchNetwork = async () => {
  try {
    await changeNetwork(props.dao.clientDao.token.chainId);
    Notify.create({ message: `Successfuly changed network to ${TOKEN_SERVICE.getNetworkName(props.dao.clientDao.token.chainId)}!`, position: 'top-right', color: 'green' });
  } catch (err) {
    Notify.create({ message: 'Changing network failed. Please change network directly in wallet (e.g. Metamask)', position: 'top-right', color: 'red' });
  }
}

const onProposalTransactionAdded = async (proposalTransaction?: ClientProposalTransaction | undefined) => {
  transaction.value = proposalTransaction;
}
</script>
