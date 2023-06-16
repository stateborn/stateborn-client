<template>
  <q-btn color="primary" v-if="ethConnectionStore.account == ''" @click="connectWithMetamask">Connect</q-btn>
  <div v-else class="text-subtitle2">{{ $q.platform.is.mobile ? ethConnectionStore.account.substring(0, 10) : ethConnectionStore.account }}</div>
</template>

<script lang="ts" setup>
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';

const connectWithMetamask = async () => {
  // await window.ethereum.request({ method: 'eth_requestAccounts' })
  //   .catch((err) => {
  //     if (err.code === 4001) {
  //       // EIP-1193 userRejectedRequest error
  //       // If this happens, the user rejected the connection request.
  //       console.log('Please connect to MetaMask.');
  //     } else {
  //       console.error(err);
  //     }
  //   });
  const ethConnection = useEthConnectionStore();
  const account = await ETH_CONNECTION_SERVICE.connect();
  await ethConnection.setConnected(account);
};

const ethConnectionStore = useEthConnectionStore();
</script>
