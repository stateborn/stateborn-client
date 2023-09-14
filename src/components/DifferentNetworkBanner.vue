<template>
    <q-banner class="text-black text-bold text-subtitle2 text-center noisered items-center q-mt-md" v-if="ethConnectionStore.isConnected && !connectedNetworkMatchesTokenNetwork" id="differentNetworkBanner">
        <div class="row items-center">
            <div class="col-xs-grow" :class="differentNetworkBannerTooSmall ? 'col-lg-grow' : 'col-lg-4'">
                <q-icon name="fa-solid fa-triangle-exclamation" color="primary"  size="lg"/>
            </div>
            <div class="col-xs-grow text-left" :class="differentNetworkBannerTooSmall ? 'col-lg-grow' : 'col-lg-8'">
                <q-item-label class="text-overline q-mb-md" :class="($q.platform.is.mobile || differentNetworkBannerTooSmall) ? 'text-center' : ''" style="font-size: 1rem">Different network</q-item-label>
                Your wallet is currently connected to different blockchain network than DAO network.
                <div class="row text-subtitle2 q-mt-md">
                    <div class="col-auto text-bold sectionName">CONNECTED TO</div>
                    <div class="col-grow text-right">
                        {{TOKEN_SERVICE.getNetworkName(ethConnectionStore.chainId)}}<q-img style="width: 20px; height: 20px;" :src="TOKEN_SERVICE.getNetworkIcon(ethConnectionStore.chainId)"/>
                    </div>
                </div>
                <div class="row text-subtitle2">
                    <div class="col-auto text-bold sectionName">EXPECTED NETWORK</div>
                    <div class="col-grow text-right">
                        {{TOKEN_SERVICE.getNetworkName(props.expectedChainId) }}<q-img style="width: 20px; height: 20px;" :src="TOKEN_SERVICE.getNetworkIcon(props.expectedChainId)"/>
                    </div>
                </div>
                <br>
                Please switch your wallet to <b>{{TOKEN_SERVICE.getNetworkName(props.expectedChainId) }}</b>.<br>
                <q-btn
                    v-if="ethConnectionStore.isMetamask"
                    color="primary"  class="q-mt-md full-width" icon="fa-solid fa-shuffle" dense
                    @click="switchNetwork" :label="`Switch to ${TOKEN_SERVICE.getNetworkName(props.expectedChainId)}`"></q-btn>

            </div>
        </div>
    </q-banner>
</template>
<script lang="ts" setup>

import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { changeNetwork } from 'src/api/services/change-network-service';
import { Notify } from 'quasar';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
const ethConnectionStore = useEthConnectionStore();

const props = defineProps(['expectedChainId']);
const switchNetwork = async () => {
  await changeNetwork(props.expectedChainId);
}
const differentNetworkBannerTooSmall = ref(false);
onMounted(() => {
    calculateIfNetworkBannerTooSmall();
});

const calculateIfNetworkBannerTooSmall = () => {
    const el = document.getElementById('differentNetworkBanner')!;
    if (el) {
      if (el.clientWidth < 500) {
          differentNetworkBannerTooSmall.value = true;
      }
    } else {
      return false;
    }
}

const connectedNetworkMatchesTokenNetwork = computed(() => {
    if (ethConnectionStore.isConnected) {
        return ethConnectionStore.chainId === props.expectedChainId;
    } else {
        return true;
    }
});
const resizeListener = () => {
    calculateIfNetworkBannerTooSmall();
}

window.addEventListener('resize', resizeListener, true);

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeListener, true)
});

</script>
