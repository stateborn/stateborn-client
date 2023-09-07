<template>
  <div class="row">
    <div class="col-12">
      <q-separator class="q-pa-xs bodynoise"></q-separator>
      <div class="text-h6">
        <q-icon :name="isEverythingFilled ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark'"
                style="margin-bottom:2px"
                :color="isEverythingFilled ? 'green-8' : 'red-8'"/>
        Transfer #{{ txIndex + 1 }}
      </div>
      <q-separator class="q-mb-md"></q-separator>
      <q-banner class="text-primary text-subtitle2 text-center "
                :class="isEverythingFilled ? 'noisegreen' : 'noisered'">
        <div class="row items-center">
          <div class="col-4">
            <q-icon :name="isEverythingFilled ? 'fa-solid fa-info' : 'fa-solid fa-triangle-exclamation'" color="primary" size="lg"/>
          </div>
          <div class="col-8 text-left text-subtitle2 text-black">
            <div v-if="thereIsAlreadyTransactionWithThisToken">
              There is already transfer of {{tokenSymbol}} token. Please choose another token.
            </div>
            <div v-if="tokenName === ''">
              Please provide correct token address which will be send from DAO.
            </div>
            <div v-if="tokenName !== '' && (tokenAddress.trim() === transferToAddress.trim())">
              Receiver address is the same as sender address. Transfer cannot be sent.
            </div>
            <div v-if="tokenName !== '' && (transferToAddress.trim() === daoAddress.trim())">
              DAO cannot be receiver, because DAO is the sender.
            </div>
            <div v-if="tokenName !== '' && Number(daoFunds).toFixed(0) === '0'">
              DAO has 0 {{ tokenSymbol }} tokens. Transfer cannot be sent.
            </div>
            <div v-if="tokenName !== '' && Number(daoFunds).toFixed(0) !== '0' && transferToAddress.trim() === ''">
              Please provide address of {{ tokenSymbol }} tokens receiver.
            </div>
            <div v-if="transactionType.value === TokenType.ERC20 && tokenName !== '' && Number(daoFunds).toFixed(0) !== '0' && transferToAddress.trim() !== '' && (Number(amountOfTokensToSend) <= 0 || Number(amountOfTokensToSend) > Number(daoFunds) || !Number.isInteger(amountOfTokensToSend))">
              Please provide correct amount of tokens to send.
            </div>
            <div v-if="transactionType.value === TokenType.NFT && tokenName !== '' && Number(daoFunds).toFixed(0) !== '0' && transferToAddress.trim() !== '' && !daoOwnsNft">
              Please provide correct NFT id to send.
            </div>
            <div v-if="isEverythingFilled && transactionType.value === TokenType.ERC20">
              Transfer: <b>send {{ amountOfTokensToSend }} {{ tokenSymbol }} tokens owned by DAO to {{ transferToAddress }}.</b><br>
              After the transaction DAO will own {{ (Number(daoFunds) - Number(amountOfTokensToSend)).toFixed(0) }} {{ tokenSymbol }} tokens.
            </div>
            <div v-if="isEverythingFilled && transactionType.value === TokenType.NFT">
              Transaction: <b>send NFT {{ tokenSymbol }} - ID {{nftId}} owned by DAO to {{ transferToAddress }}.</b><br>
              After the transaction DAO will own {{ (Number(daoFunds) - 1).toFixed(0) }} {{tokenSymbol}} NFTs.
            </div>
          </div>
        </div>
      </q-banner>

    </div>
  </div>
  <div class="row justify-left">
    <div class="col-6 q-pa-xs">
      <q-select filled :options="transactionTypes" square v-model="transactionType" label="Transfer type" class="q-mt-md">
        <template v-slot:prepend>
          <q-badge style="padding:5px" :label="transactionType.value"
                            :color="transactionType.value === TokenType.ERC20 ? 'primary' : 'secondary'"
                            :text-color="transactionType.value === TokenType.ERC20 ? 'white' : 'primary'">

          </q-badge>
        </template>
      </q-select>
    </div>
    <div class="col-6 q-pa-xs">
      <q-input square filled :label="transactionType.value === TokenType.ERC20 ? 'ERC-20 token address to transfer' : 'NFT token address to transfer'"
               v-model="tokenAddress"
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
               :error="(transferToAddress.trim() === '') || (!isTransferToCorrectEthAddress)"
               :disable="!ethConnectionStore.isConnected || daoFunds === ''">
        <template v-slot:error>
          <span v-if="transferToAddress.trim() === ''">Please provide the address of tokens receiver.</span>
          <span v-if="!isTransferToCorrectEthAddress">It is not valid address (wrong format).</span>
        </template>
      </q-input>
    </div>
    <div class="col-6 q-pa-xs" v-if="transactionType.value === TokenType.ERC20">
      <q-input
        filled
        square
        :disable="tokenName === ''"
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
    <div class="col-6 q-pa-xs" v-else>
      <q-input
        filled
        square
        :disable="tokenName === ''"
        v-model.number="nftId"
        type="number"
        label="Token (NFT) ID"
        :suffix="tokenSymbol"
        :error="nftId < 0"
      >
        <template v-slot:error>
          <span v-if="nftId < 0">
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
  <div class="row q-mt-md items-center" v-show="tokenName !== ''">
    <div class="col-6 q-pa-xs" id="tokenInfoColumn">
      <token-info-card
        v-if="transactionType.value === TokenType.ERC20"
        :big-token="false"
        label="Transfer asset"
        :token-symbol="tokenSymbol"
        :decimals="decimals"
        :token-name="tokenName"
        :network-name="ethConnectionStore.networkName"
        :network-icon="ethConnectionStore.networkIcon">
      </token-info-card>
      <nft-token-info-card
        v-if="transactionType.value === TokenType.NFT"
        :big-token="false"
        :nft-id="nftId"
        :token-address="tokenAddress"
        label="Transfer asset"
        :token-symbol="tokenSymbol"
        :decimals="decimals"
        :token-name="tokenName"
        :network-name="ethConnectionStore.networkName"
        :network-icon="ethConnectionStore.networkIcon"
        :collection-mode-only="false"
      >
      </nft-token-info-card>
    </div>
    <div class="col-6 q-pa-xs" v-show="tokenName !== ''" :class="Number(daoFunds) > 0 ? 'noisegreencard' : 'noiseredcard'">
      <dao-wallet-card
        v-if="tokenType === TokenType.ERC20"
        :token-symbol="tokenSymbol"
        :dao-funds="daoFunds"
        :amount-of-tokens-to-send="amountOfTokensToSend">
      </dao-wallet-card>
      <dao-nft-wallet-card
        @dao-nft-ownership="onNftOwnershipUpdated"
        v-if="tokenType === TokenType.NFT"
        :token-address="tokenAddress"
        :dao-funds="daoFunds"
        :amount-of-tokens-to-send="1"
        :token-symbol="tokenSymbol"
        :nft-id="nftId"
        :dao-address="daoAddress">
      </dao-nft-wallet-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { dom, Notify, useQuasar } from 'quasar';
import { ERC_20_SERVICE } from 'src/api/services/erc-20-service';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';
import { TransferErc20TransactionData } from 'src/api/model/ipfs/proposal-transaction/transfer-erc-20-transaction-data';
import { ProposalTransactionType } from 'src/api/model/ipfs/proposal-transaction-type';
import { ClientToken } from 'src/api/model/ipfs/client-token';
import TokenInfoCard from 'components/TokenInfoCard.vue';
import DaoWalletCard from 'components/DaoWalletCard.vue';
import { TransferNftTransactionData } from 'src/api/model/ipfs/proposal-transaction/transfer-nft-transaction-data';
import DaoNftWalletCard from 'components/DaoNftWalletCard.vue';
import NftTokenInfoCard from 'components/NftTokenInfoCard.vue';
import { isEthAddress } from 'src/api/services/utils-service';

const transactionTypes = ref([{ value: TokenType.ERC20, label: 'ERC-20 transfer' }, { value: TokenType.NFT, label: 'NFT transfer' }]);
const transactionType = ref({ value: TokenType.ERC20, label: 'ERC-20 transfer' });
const tokenAddress = ref('');
const transferToAddress = ref('0x3d7aEfaeCDb38A32AD6b376397d7BB0aaA9Abf73');
const tokenName = ref('');
const tokenSymbol = ref('');
const daoFunds = ref('');
const tokenType = ref(TokenType.ERC20);
const decimals = ref('');
const amountOfTokensToSend = ref(1);
const nftId = ref(undefined);
const daoOwnsNft = ref(false);
const ethConnectionStore = useEthConnectionStore();
const $q = useQuasar();
const props = defineProps<{
  daoAddress: string,
  txIndex: number,
  previousTransactions: ClientProposalTransaction[],
}>();

const thereIsAlreadyTransactionWithThisToken = computed(() => {
  return props.previousTransactions.filter(_ => (<any>_.data).token.address === tokenAddress.value).length > 0
    //show only to next txs, not first
    && props.txIndex !== 0;
});

const isEverythingFilled = computed(() => {
  if (transactionType.value.value === TokenType.ERC20) {
    // token exists
    return tokenName.value !== '' &&
      //token address is provided
      (tokenAddress.value.trim() !== '') &&
      //transfer to address is provided
      (transferToAddress.value.trim() !== '') &&
      //amount of tokens to send greater than 0
      Number(amountOfTokensToSend.value) > 0 &&
      //amount of tokens is integer
      Number.isInteger(amountOfTokensToSend.value) &&
      // amount of tokens to send is less than funds owned by DAO
      Number(amountOfTokensToSend.value) <= Number(daoFunds.value) &&
      // you cannot send tokens to token
      tokenAddress.value.trim() !== transferToAddress.value.trim() &&
      //receiver is not dao
      transferToAddress.value.trim() !== props.daoAddress.trim() &&
      isTransferToCorrectEthAddress.value === true &&
      !thereIsAlreadyTransactionWithThisToken.value;
  } else if (transactionType.value.value === TokenType.NFT) {
    // token exists
    return tokenName.value !== '' &&
      //token address is provided
      (tokenAddress.value.trim() !== '') &&
      //transfer to address is provided
      (transferToAddress.value.trim() !== '') &&
      //nftId >= 0
      ((nftId.value) && Number(nftId.value) >= 0) &&
      //dao owns nft
      daoOwnsNft.value === true &&
      // you cannot send tokens to token
      tokenAddress.value.trim() !== transferToAddress.value.trim() &&
      //receiver is not dao
      transferToAddress.value.trim() !== props.daoAddress.trim() &&
      isTransferToCorrectEthAddress.value === true &&
      !thereIsAlreadyTransactionWithThisToken.value;
  } else {
    return false;
  }
});
const emit = defineEmits(['proposalTransaction']);
watch(() => [transferToAddress.value, amountOfTokensToSend.value, nftId.value, daoFunds.value, tokenName.value, daoOwnsNft.value], async () => {
  emitProposalTransaction();
});
const emitProposalTransaction = () => {
  if (isEverythingFilled.value) {
    const clientToken = new ClientToken(
      tokenAddress.value,
      tokenName.value,
      tokenSymbol.value,
      tokenType.value,
      ethConnectionStore.chainId,
      decimals.value,
    );
    if (tokenType.value === TokenType.ERC20) {
      emit('proposalTransaction', props.txIndex, new ClientProposalTransaction(
        ProposalTransactionType.TRANSFER_ERC_20_TOKENS,
        new TransferErc20TransactionData(
          clientToken,
          transferToAddress.value,
          amountOfTokensToSend.value.toFixed(0),
        )
      ));
    } else {
      emit('proposalTransaction', props.txIndex, new ClientProposalTransaction(
        ProposalTransactionType.TRANSFER_NFT_TOKEN,
        new TransferNftTransactionData(
          clientToken,
          transferToAddress.value,
          nftId.value.toFixed(0),
        )
      ));
    }
  } else {
    emit('proposalTransaction', props.txIndex, undefined);
  }
}
emitProposalTransaction();
const readErc20 = async () => {
  const {nameRes, symbolRes, decimalsRes} = await ERC_20_SERVICE.readTokenData(tokenAddress.value);
  tokenName.value = nameRes;
  tokenSymbol.value = symbolRes;
  decimals.value = decimalsRes;
  tokenType.value = TokenType.ERC20;
  $q.loading.hide();
  Notify.create({message: 'Successfully fetched ERC-20 token data!', position: 'top-right', color: 'green'});
  daoFunds.value = Number(await ERC_20_SERVICE.readTokenBalance(props.daoAddress, tokenAddress.value, decimals.value)).toFixed(0);
  emitProposalTransaction();
};
const readNft = async () => {
  const { nameRes, symbolRes, decimalsRes } = await ERC_721_SERVICE.readTokenData(tokenAddress.value);
  tokenName.value = nameRes;
  tokenSymbol.value = symbolRes;
  tokenType.value = TokenType.NFT;
  decimals.value = decimalsRes;
  $q.loading.hide();
  Notify.create({ message: 'Successfully fetched NFT token data!', position: 'top-right', color: 'green' });
  daoFunds.value = await ERC_20_SERVICE.readTokenBalance(props.daoAddress, tokenAddress.value, decimals.value);
  emitProposalTransaction();
};
watch(() => [tokenAddress.value, transactionType.value], async () => {
  $q.loading.show({
    delay: 100, // ms
    message: 'Reading token data...',
    backgroundColor: 'black',
    messageColor: 'white',
  });
  if (transactionType.value.value === TokenType.ERC20) {
    try {
      await readErc20();
    } catch (err) {
      tokenName.value = '';
      tokenSymbol.value = '';
      decimals.value = '';
      $q.loading.hide();
      Notify.create({ message: `Incorrect token address. Is it valid ERC-20 token address on ${ethConnectionStore.networkName}?`, position: 'top-right', color: 'red' });
    }
  } else {
    try {
      await readNft();
    } catch (err) {
      tokenName.value = '';
      tokenSymbol.value = '';
      decimals.value = '';
      $q.loading.hide();
      Notify.create({ message: `Incorrect token address. Is it valid ERC-20/NFT token address on ${ethConnectionStore.networkName}?`, position: 'top-right', color: 'red' });
    }
  }
});
const onNftOwnershipUpdated = (owns: boolean) => {
  daoOwnsNft.value = owns;
};

const isTransferToCorrectEthAddress = computed(() => {
  return isEthAddress(transferToAddress.value);
});

tokenAddress.value = process.env.DEVELOPMENT_NETWORK_ERC_20_TOKEN_ADDRESS!;
</script>
