<template>
  <div>
    <q-banner class="text-primary text-subtitle2 text-center noisegreen">
      <div class="row items-center">
        <div class="col-4">
          <q-icon name="fa-solid fa-info" color="primary"  size="lg"/>
        </div>
        <div class="col-8 text-left">
          <q-item-label class="text-overline q-mb-xs" style="font-size: 1rem">OFF-CHAIN + ON-CHAIN</q-item-label>
          <q-item-label class="text-overline text-bold q-pt-xs" style="font-size: 0.9rem">Features:</q-item-label>
          <q-item-label class="text-overline q-mb-md " style="font-size: 0.9rem">All included in off-chain DAO:</q-item-label>
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
          <q-item-label class="text-overline q-mb-md q-mt-md " style="font-size: 0.9rem">on-chain only features:</q-item-label>
          • on-chain (smart-contracts based) DAO with treasury  <q-icon color="primary" name="fa-solid fa-circle-info" style="margin-bottom: 3px;">
          <q-tooltip class="stateborn-tooltip">
            Smart contracts based DAO will be created in blockchain. <br>
            DAO will have a treasury (smart contract based wallet) where funds can be stored. <br>
            Stateborn DAOs are non-permissioned. <br>
            DAO treasury transfers can be proposed and executed by anyone. <br>
            DAO should be managed by DAO community and proposals decisions.
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
        <div class="col-8 text-left">
          NFT address: 0x863AEFeDEb07bF8a9Acc16A45F630c5759B83d44<br>
          DAO proposal creation is <b>free</b>.<br>
          Proposal definition file is stored off-chain (IPFS).<br>
          Total proposal size (with attachments) cannot be greater than 2MB.
        </div>
      </div>
    </q-banner>
    <q-banner class="text-black text-subtitle2 text-center noisered q-mt-md" v-if="!ethConnectionStore.isConnected">
      <span class="text-bold text-red">Please connect first</span>
    </q-banner>
<!--    <q-banner class="text-primary text-subtitle2 text-center bodynoise q-mt-md" v-if="description.length > 0 && ethConnectionStore.isConnected && hasRequiredAmountOfTokens && connectedNetworkMatchesTokenNetwork">-->
<!--      <div>-->
<!--        <div class="text-center text-subtitle2">Description preview</div>-->
<!--        <proposal-description-markdown-->
<!--          class="q-pt-md q-pb-md q-ma-xs"-->
<!--          :description="calculateDescriptionValue()"-->
<!--        >-->
<!--        </proposal-description-markdown>-->
<!--      </div>-->
<!--    </q-banner>-->
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

    <q-select filled :options="proposalTypeOptions" square v-model="proposalType" label="Proposal type" class="q-mt-md">
      <template v-slot:prepend>
        <q-badge style="padding:5px" :label="proposalType.value"
                 color="primary"
                 text-color="white">

        </q-badge>
      </template>
    </q-select>
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
          <template v-slot:prepend>
           <q-icon name="fa-solid fa-clock" color="primary"  size="xs"/>
          </template>
        </q-input>
      </div>
      <div class="col-6 text-subtitle2">
        <span class="text-bold">Duration:</span> {{durationString}}
      </div>
    </div>

    <div class="row justify-left">
      <div class="col-auto">
        <q-toggle
          size="xl"
          icon="fa-solid fa-cube"
          icon-color="yellow"
          :disable="!ethConnectionStore.isConnected"
          v-model="createDaoOnChainTransaction"
        >
          <span class="text-subtitle2">Create DAO <span class="text-bold">on-chain</span> transaction</span>
        </q-toggle>
      </div>
    </div>
    <div class="row" v-for="txIndex in txIndexes" v-bind:key="txIndex.hash">
      <div class="col-12">
        <create-proposal-transaction-row
          v-if="createDaoOnChainTransaction && dao.clientDao.contractAddress"
          :dao-address="dao.clientDao.contractAddress!"
          :tx-index="txIndex.index"
          :previous-transactions="transactions.slice(0, txIndex.index + 1)"
          @proposal-transaction="onProposalTransactionAdded">
        </create-proposal-transaction-row>
        <q-btn color="red-9 q-ma-xs" square @click="removeTransaction(txIndex.index)">REMOVE</q-btn>
        <q-separator class="q-mt-xs q-pa-xs bodynoise"></q-separator>
      </div>
    </div>
    <div class="row q-pt-md" v-if="createDaoOnChainTransaction">
      <div class="col-12">
        <q-btn class="full-width" color="primary" @click="addAnotherTransactionToEdit"
        :disable="notAllTransactionsAreAlreadyEdited">Add another transaction</q-btn>
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
import { generateRandomString } from 'src/api/services/utils-service';
import { TokenType } from 'src/api/model/ipfs/token-type';

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
const transactions = ref(<ClientProposalTransaction[]>[]);
const startDate = dayjs();
const router = useRouter();
class TxIndex {
  index: number;
  hash: string;

  constructor(index: number, hash: string) {
    this.index = index;
    this.hash = hash;
  }
}
const txIndexes = ref(<TxIndex[]>[]);
const transactionsCurrentlyEdited = ref(0);
const props = defineProps<{
  dao: DaoBackend,
}>();

const isFormValid = computed(() => {
  return ethConnectionStore.isConnected && hasRequiredAmountOfTokens.value === true && title.value.trim() !== ''
  && description.value.trim() !== '' && durationHours.value >= 1 &&
    // if chosen to add transaction, then it must be set (is correct)
    ((props.dao.clientDao.contractAddress && createDaoOnChainTransaction.value === true) ? (transactions.value.length > 0) : true)
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
      file: `\n<img src="data:image/jpeg;base64, ${res.base64File}" style="max-width:500px;height:100%"/>`,
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
    transactions.value.length > 0? transactions.value.map((_) => _) : undefined
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

const onProposalTransactionAdded = async (index: number, proposalTransaction?: ClientProposalTransaction | undefined) => {
  const currentTransaction = transactions.value[index];
  if (currentTransaction !== undefined) {
    if (proposalTransaction !== undefined) {
      transactions.value[index] = proposalTransaction!;
    } else {
      transactions.value = transactions.value.filter((_, i) => i !== index);
    }
  } else {
    if (proposalTransaction !== undefined) {
      transactions.value.push(proposalTransaction!);
    }
  }
}

watch(() => createDaoOnChainTransaction.value, () => {
  if (createDaoOnChainTransaction.value && txIndexes.value.length === 0) {
    txIndexes.value.push(new TxIndex(0, generateRandomString(20)));
    transactionsCurrentlyEdited.value = 1;
  } else {
    txIndexes.value = [];
  }
});
const removeTransaction = (index: number) => {
  // remove
  txIndexes.value = txIndexes.value.filter(_ => _.index !== index);
  // reorder current values to be like 0,1,2,3,4...
  txIndexes.value = txIndexes.value.map((_, index) => {
    _.index = index;
    return _;
  });
  if (txIndexes.value.length === 0) {
    createDaoOnChainTransaction.value = false;
  }
  transactions.value.splice(index, 1);
  transactionsCurrentlyEdited.value--;
}

const addAnotherTransactionToEdit = () => {
  txIndexes.value.push(new TxIndex(txIndexes.value.length, generateRandomString(20)));
  transactionsCurrentlyEdited.value++;
}

const notAllTransactionsAreAlreadyEdited = computed(() => {
  return transactions.value.length !== transactionsCurrentlyEdited.value;

});
</script>
