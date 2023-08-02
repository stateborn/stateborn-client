<template>
  <div class="row">
    <div class="col-12">
      <q-banner class="text-primary text-subtitle2 text-center " :class="isEverythingFilled ? 'noisegreen' : 'noisered'">
        <div class="row items-center">
          <div class="col-4">
            <q-icon :name="isEverythingFilled ? 'fa-solid fa-info' : 'fa-solid fa-triangle-exclamation'" color="primary"  size="lg"/>
          </div>
          <div class="col-8 text-left">
            <div v-if="tokenName === ''" >
              Please provide token address which will be send from DAO.
            </div>
            <div v-if="tokenName !== '' && Number(daoFunds).toFixed(2) === '0.00'">
              DAO has 0 {{tokenSymbol}} tokens. Transaction cannot be sent.
            </div>
            <div v-if="tokenName !== '' && Number(daoFunds).toFixed(2) !== '0.00' && transferToAddress.trim() === ''">
              Please provide address of {{tokenSymbol}} tokens receiver.
            </div>
            <div v-if="tokenName !== '' && Number(daoFunds).toFixed(2) !== '0.00' && transferToAddress.trim() !== '' && (Number(amountOfTokensToSend) <= 0 || Number(amountOfTokensToSend) > Number(daoFunds) || !Number.isInteger(amountOfTokensToSend))">
              Please provide correct amount of tokens to send.
            </div>
            <div v-if="tokenName !== '' && Number(daoFunds).toFixed(2) !== '0.00' && transferToAddress.trim() !== '' && Number(amountOfTokensToSend) > 0 && Number.isInteger(amountOfTokensToSend) && Number(amountOfTokensToSend) <= Number(daoFunds)">
              Transaction: <b>send {{amountOfTokensToSend}} {{tokenSymbol}} tokens owned by DAO to {{transferToAddress}}.</b><br>
              After the transaction DAO will own {{(Number(daoFunds) - Number(amountOfTokensToSend)).toFixed(0)}} {{tokenSymbol}} tokens.
            </div>
          </div>
        </div>
      </q-banner>

    </div>
  </div>
  <div class="row justify-left" >
    <div class="col-6 q-pa-xs">
      <q-select filled :options="transactionTypes" square v-model="transactionType" label="Transaction type" class="q-mt-md"></q-select>
    </div>
    <div class="col-6 q-pa-xs">
      <q-input square filled label="Token address to transfer" v-model="tokenAddress"
               :error="tokenAddress.trim() === '' && ethConnectionStore.isConnected"
               class="q-pt-md" :disable="!ethConnectionStore.isConnected">
        <template v-slot:error>
          Please provide address of your DAO governance token (ERC-20 or NFT).
        </template>
      </q-input>
    </div>
  </div>
  <div class="row justify-left" >
    <div class="col-6 q-pa-xs">
      <q-input square filled label="Transfer to address" v-model="transferToAddress"
               :error="transferToAddress.trim() === '' && ethConnectionStore.isConnected"
               :disable="!ethConnectionStore.isConnected || daoFunds === ''">
        <template v-slot:error>
          Please provide the address of tokens receiver.
        </template>
      </q-input>
    </div>
    <div class="col-6 q-pa-xs">
      <q-input
        filled
        v-model.number="amountOfTokensToSend"
        type="number"
        label="Amount of tokens to transfer"
        :suffix="tokenSymbol"
        :error="amountOfTokensToSend <= 0 || !Number.isInteger(amountOfTokensToSend) || amountOfTokensToSend > Number(daoFunds)"
      >
        <template v-slot:error>
          <span v-if="amountOfTokensToSend <= 0">
            Amount of tokens must be greater than 0.
          </span>
          <span v-if="!Number.isInteger(amountOfTokensToSend)">
            Amount of tokens must be integer (no decimals).
          </span>
          <span v-if="amountOfTokensToSend > Number(daoFunds)">
            Amount of tokens to send is greater than funds owned by DAO ({{Number(daoFunds).toFixed(0)}} {{tokenSymbol}}).
          </span>
        </template>
      </q-input>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div v-if="tokenName !== ''">
        <div class="text-left text-h5 q-pt-md q-pb-md">Token info:</div>
        <q-input square readonly outlined prefix="DAO token funds:"  input-class="text-bold" v-model="daoFunds" class="q-pa-xs" :class="Number(daoFunds) > 0 ? 'noisegreen' : 'noisered'" :suffix="tokenSymbol">
          <template v-slot:prepend>
            <q-avatar>
              <q-icon name="fa-solid fa-wallet" color="primary" />
            </q-avatar>
          </template>
        </q-input>
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
    </div>
  </div>

</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { Notify, useQuasar } from 'quasar';
import { ERC_20_SERVICE } from 'src/api/services/erc-20-service';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';
import { TransferErc20TransactionData } from 'src/api/model/ipfs/proposal-transaction/transfer-erc-20-transaction-data';
import { ProposalTransactionType } from 'src/api/model/ipfs/proposal-transaction-type';
import { ClientToken } from 'src/api/model/ipfs/client-token';

const transactionTypes = ref([{ value: 'erc20', label: 'ERC-20 transfer' }, { value: 'nft', label: 'NFT transfer' }]);
const transactionType = ref({ value: 'erc20', label: 'ERC-20 transfer' });
const tokenAddress = ref('');
const transferToAddress = ref('0x12613538A1074D34968aB41137ed628e7c452B04');
const tokenName = ref('');
const tokenSymbol = ref('');
const daoFunds = ref('');
const tokenType = ref(TokenType.ERC20);
const decimals = ref('');
const amountOfTokensToSend = ref(0);
const ethConnectionStore = useEthConnectionStore();
const $q = useQuasar();
const props = defineProps<{
  daoAddress: string,
}>();
const isEverythingFilled = computed(() => {
  return tokenAddress.value.trim() !== '' && transferToAddress.value.trim() !== '' && Number(amountOfTokensToSend.value) > 0 && Number.isInteger(amountOfTokensToSend.value) && Number(amountOfTokensToSend.value) <= Number(daoFunds.value);
});
const emit = defineEmits(['proposalTransaction']);
watch(() => [tokenAddress.value, transactionType.value, transferToAddress.value, amountOfTokensToSend.value], async () => {
  if (isEverythingFilled.value) {
    emit('proposalTransaction', new ClientProposalTransaction(
      transactionType.value.value === 'erc20' ? ProposalTransactionType.TRANSFER_ERC_20_TOKENS : ProposalTransactionType.TRANSFER_NFT_TOKEN,
      new TransferErc20TransactionData(
        new ClientToken(
          tokenAddress.value,
          tokenName.value,
          tokenSymbol.value,
          TokenType.ERC20,
          ethConnectionStore.chainId,
          decimals.value,
        ),
        transferToAddress.value,
        amountOfTokensToSend.value.toFixed(0),
      )
    ));
  } else {
    emit('proposalTransaction', undefined);
  }
});
watch(() => [tokenAddress.value, transactionType.value], async () => {
  $q.loading.show({
    delay: 100, // ms
    message: 'Reading token data...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  if (transactionType.value.value === 'erc20') {
    try {
      const { nameRes, symbolRes, decimalsRes } = await ERC_20_SERVICE.readTokenData(tokenAddress.value);
      tokenName.value = nameRes;
      tokenSymbol.value = symbolRes;
      decimals.value = decimalsRes;
      tokenType.value = TokenType.ERC20;
      $q.loading.hide();
      Notify.create({ message: 'Successfully fetched ERC-20 token data!', position: 'top-right', color: 'green' });
      daoFunds.value = Number(await ERC_20_SERVICE.readTokenBalance(props.daoAddress, tokenAddress.value, decimals.value)).toFixed(0);
    } catch (err) {
      tokenName.value = '';
      tokenSymbol.value = '';
      decimals.value = '';
      $q.loading.hide();
      Notify.create({ message: `Incorrect token address. Is it valid ERC-20 token address on ${ethConnectionStore.networkName}?`, position: 'top-right', color: 'red' });
    }
  } else {
    try {
      const { nameRes, symbolRes, decimalsRes } = await ERC_721_SERVICE.readTokenData(tokenAddress.value);
      tokenName.value = nameRes;
      tokenSymbol.value = symbolRes;
      tokenType.value = TokenType.NFT;
      decimals.value = decimalsRes;
      $q.loading.hide();
      Notify.create({ message: 'Successfully fetched NFT token data!', position: 'top-right', color: 'green' });
      daoFunds.value = await ERC_20_SERVICE.readTokenBalance(props.daoAddress, tokenAddress.value, decimals.value);
    } catch (err) {
      tokenName.value = '';
      tokenSymbol.value = '';
      decimals.value = '';
      $q.loading.hide();
      Notify.create({ message: `Incorrect token address. Is it valid ERC-20/NFT token address on ${ethConnectionStore.networkName}?`, position: 'top-right', color: 'red' });
    }
  }
});
tokenAddress.value = process.env.DEVELOPMENT_NETWORK_ERC_20_TOKEN_ADDRESS!;



</script>
