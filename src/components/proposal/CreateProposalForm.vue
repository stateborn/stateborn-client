<template>
  <div>
    <span class="text-subtitle2 text-red text-bold" v-if="!ethConnectionStore.isConnected">Please connect first</span>
    <q-input square filled label="Title" v-model="title" maxlength="120" counter class="q-pa-xs"></q-input>
    <q-input type="textarea" filled counter square label="Description" v-model="description" class="q-pa-xs q-pt-lg"></q-input>
    <div>
      <div class="text-left text-subtitle2 q-pa-xs">Description preview</div>
        <proposal-description-markdown
          class="q-pt-md q-pb-md q-ma-xs"
          :description="calculateDescriptionValue()"
          >
        </proposal-description-markdown>
    </div>
    <q-select filled :options="proposalTypeOptions" square v-model="proposalType" label="Proposal type" class="q-pa-xs q-mt-md"></q-select>
    <define-voting-options-card v-if="proposalType.value === 'OPTIONS'" @proposal-option-added="proposalOptionAdded"></define-voting-options-card>
    <div class="row items-center">
      <div class="col-6 q-pa-xs">
        <q-input
          filled
          v-model.number="durationHours"
          type="number"
          label="Duration"
          suffix="hours"
        />
      </div>
      <div class="col-6 q-pa-xs text-subtitle2">
        <span class="text-bold">Duration:</span> {{durationString}}
      </div>
    </div>
    <file-reader class="q-pa-xs" label="Upload proposal attachments" @file-uploaded="onFileUploaded" @file-removed="onFileRemoved" :as-base="true"></file-reader>
    <q-btn class="q-ma-xs old-button" square label="Create" color="primary"
           :disable="!ethConnectionStore.isConnected"
           @click="callCreateProposal"></q-btn>

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

dayjs.extend(dayjsPluginUTC);
const title = ref('New proposal');
const description = ref('This proposal is about...');
const proposalTypeOptions = ref([{ value: 'YES/NO', label: 'YES / NO - vote YES or NO' }, { value: 'OPTIONS', label: 'OPTIONS - vote for one of the options' }]);
const proposalType = ref({ value: 'YES/NO', label: 'YES / NO - vote YES or NO' });
const durationHours = ref(72);
const proposalOptions = ref(<string[]>[]);
const ethConnectionStore = useEthConnectionStore();
const emit = defineEmits(['proposalChanged']);
const imagesMap = new Map();
const startDate = dayjs();
const route = useRoute();
const router = useRouter();

const daoIpfsHash: string = route.params.daoIpfsHash;

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
    title: title.value,
    description: calculateDescriptionValue(),
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
      file: `\n<a href="data:application/pdf;base64,${res.base64File}" download="${res.fileName}">${res.fileName}</a>`,
    });
    description.value += calculateCommentPrefixWithSpace(res.fileName);
  }
};
const onFileRemoved = (fileName: string) => {
  imagesMap.delete(fileName);
  description.value = description.value.replace(calculateCommentPrefix(fileName), '');
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
  const startDateUtcString = startDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const endDateUtcString = startDate.add(durationHours.value, 'h').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const clientProposal = {
    creatorAddress: ethConnectionStore.account,
    title: title.value,
    description: fullDescription,
    daoIpfsHash,
    proposalType: proposalType.value.value,
    startDateUtc: startDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    endDateUtc: startDate.add(durationHours.value, 'h').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    data: getDataObject(),
    blockNumber: latestBlockNumber.toString(),
  };

  const signature = await signProposal(
    ethConnectionStore.account,
    daoIpfsHash,
    title.value,
    fullDescription,
    proposalType.value.value,
    startDateUtcString,
    endDateUtcString,
    latestBlockNumber.toString(),
    proposalOptions.value,
  );
  api.post('/api/rest/v1/proposal', {
    clientProposal,
    creatorSignature: signature,
  }).then((response) => {
    Notify.create({ message: 'Successfuly created proposal!', position: 'top-right', color: 'green' });
    router.push(`/${daoIpfsHash}`);
    console.log('Proposal created!', response);
  }, (error) => {
    Notify.create({ message: 'Creating proposal failed - server problem!', position: 'top-right', color: 'red' });
    console.log(error);
  });
};
</script>
