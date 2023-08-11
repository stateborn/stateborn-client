<template>
  <q-btn color="primary" v-if="ethConnectionStore.account == ''" @click="connectWithMetamask">Connect</q-btn>
  <q-chip square v-else class="text-subtitle2 noise veryLightBorder">
    <q-avatar>
      <img :src="networkIcon" style="height: 25px; width:25px">
    </q-avatar>
    {{ $q.platform.is.mobile ? ethConnectionStore.account.substring(0, 10) : ethConnectionStore.account }}
    <q-tooltip class="stateborn-tooltip">
        Address: {{ ethConnectionStore.account }}<br>
        Network: {{networkName}}
    </q-tooltip>
  </q-chip>
</template>

<script lang="ts" setup>
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { computed } from 'vue';
import { Notify } from 'quasar';
import { TOKEN_SERVICE } from 'src/api/services/token-service';

const connectWithMetamask = async () => {
  const ethConnection = useEthConnectionStore();
  const account = await ETH_CONNECTION_SERVICE.connect();
  const network = await ETH_CONNECTION_SERVICE.getProvider().getNetwork();
  const chainId = network.chainId.toString();
  if (!TOKEN_SERVICE.isSupportedNetwork(chainId)) {
    Notify.create({ message: `Unsupported blockchain network. Please choose: ${TOKEN_SERVICE.getSupportedNetworksListAsString()}.`, position: 'top-right', color: 'red', closeBtn: true });
  } else {
    let networkName = TOKEN_SERVICE.getNetworkName(chainId);
    let networkIcon = TOKEN_SERVICE.getNetworkIcon(chainId);
    await ethConnection.setConnected(account, network.chainId.toString(), networkName, networkIcon);
  }
};

const ethConnectionStore = useEthConnectionStore();

const networkName = computed(() =>  TOKEN_SERVICE.getNetworkName(ethConnectionStore.chainId));
const networkIcon = computed(() =>  TOKEN_SERVICE.getNetworkIcon(ethConnectionStore.chainId));
</script>
