<template>
  <div v-if="ethConnectionStore.account == ''">
    <q-btn v-if="$q.platform.is.mobile" class="q-ma-xs" glossy color="primary" @click="connectWithWalletConnect()"
           square dense>
      <q-img src="/walletconnect.png" style="height: 10px; width:20px; margin-right: 2px"></q-img>
      Connect
    </q-btn>
    <q-btn-dropdown
      v-else
      ref="dropdown"
      glossy
      auto-close
      label="Connect"
      color="primary"
      dropdown-icon="fa-solid fa-caret-down"
      square
    >
      <div class="row q-pa-xs bodynoise no-wrap text-subtitle2">
        <div class="column">
          <div class="text-subtitle1 text-center q-pa-md">Connection options</div>
          <q-btn class="q-ma-xs" color="primary" @click="connectWithMetamask()" glossy square>
            <q-img src="/metamaskrabby.png" style="height: 20px; width:50px; margin-right: 10px"></q-img>
            Metamask / Rabby
          </q-btn>
          <q-btn class="q-ma-xs" color="primary" @click="connectWithWalletConnect()" glossy square>
            <q-img src="/walletconnect.png" style="height: 20px; width:30px; margin-right: 10px"></q-img>
            WalletConnect
          </q-btn>
        </div>

      </div>
    </q-btn-dropdown>

  </div>
  <div v-else>
    <q-chip square class="text-subtitle2 noise veryLightBorder">
      <q-avatar>
        <img :src="networkIcon" style="height: 25px; width:25px">
      </q-avatar>
      {{ $q.platform.is.mobile ? ethConnectionStore.account.substring(0, 10) : ethConnectionStore.account }}
      <q-tooltip class="stateborn-tooltip">
        Address: {{ ethConnectionStore.account }}<br>
        Network: {{ networkName }}
      </q-tooltip>
    </q-chip>
    <q-btn color="black" square flat glossy
           dense icon="fa-solid fa-arrow-right-from-bracket" @click="disconnect()">
      <q-tooltip class="stateborn-tooltip text-subtitle2">
        Disconnect
      </q-tooltip>
    </q-btn>
  </div>
  <metamask-not-installed-dialog :showPopup="showMetamaskNotInstalledPopup" @popup-closed="onMetamaskNotInstalledPopupClosed"></metamask-not-installed-dialog>


</template>
<script setup lang="ts">
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { computed, ref } from 'vue';
import { useCurrentChainStore } from 'stores/current-chain-store';
import MetamaskNotInstalledDialog from 'components/MetamaskNotInstalledDialog.vue';

const showMetamaskNotInstalledPopup = ref(false);

const disconnect = async () => {
  await ETH_CONNECTION_SERVICE.disconnect();
}

const currentChainStore = useCurrentChainStore();
const connectWithMetamask = async () => {
  try {
    await ETH_CONNECTION_SERVICE.connectWithMetamask();
  } catch (err: any) {
    if (err.message === 'Metamask not installed') {
      showMetamaskNotInstalledPopup.value = true;
    }
  }
};

const onMetamaskNotInstalledPopupClosed = () => {
    showMetamaskNotInstalledPopup.value = false;
}

const connectWithWalletConnect = async () => {
  await ETH_CONNECTION_SERVICE.connectWithWalletConnect(currentChainStore.chainId);
};


const ethConnectionStore = useEthConnectionStore();


const networkName = computed(() => TOKEN_SERVICE.getNetworkName(ethConnectionStore.chainId));
const networkIcon = computed(() => TOKEN_SERVICE.getNetworkIcon(ethConnectionStore.chainId));
</script>
