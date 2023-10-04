<template>
  <div class="row">
    <div class="col-12">
      <q-card class="stateborn-card">
        <q-card-section horizontal>
          <q-card-section class="col-9 q-pt-xs">
            <div class="text-overline" v-if="isRead">Auto refresh: every <span class="text-bold">{{readTreasuryEverySeconds}} seconds</span></div>
            <div class="text-overline animated flash" v-else>
              <q-spinner color="primary" size="2em"/>
              Loading - please wait
            </div>
            <q-linear-progress :value="progress" :buffer="buffer" v-if="isRead" size="0.15em"/>
            <div class="text-h2 q-mt-sm q-mb-xs">{{ daoName }} treasury</div>
            <div class="text-subtitle2">
              List of <span class="text-bold">{{daoName}}</span> on-chain treasury assets <br>
              <div class="row">
                <div class="col-auto text-bold sectionName" >Network</div><div class="col-grow text-right" v-if="chainId !== ''" >{{ TOKEN_SERVICE.getNetworkName(chainId) }}</div>
              </div>
              <hr>
              <div class="row">
                <div class="col-auto text-bold sectionName" >ERC-20 tokens</div><div class="col-grow text-right" >{{ erc20Count }}</div>
              </div>
              <div class="row">
                <div class="col-auto text-bold sectionName" >NFT collections</div><div class="col-grow text-right" >{{ nftsCollectionsCount }}</div>
              </div>
              <div class="row">
                <div class="col-auto text-bold sectionName" >NFT tokens (sum)</div><div class="col-grow text-right" >{{ nftsCount }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col-3 flex flex-center">
            <q-img
                class="rounded-borders"
                src="/gold.webp"
                :style="$q.platform.is.mobile ? 'height:50px; width:50px;' : 'height:100px; width:100px;'"
            />
          </q-card-section>
        </q-card-section>

        <q-separator/>

        <q-list>
          <q-item v-if="isRead" clickable @click="goToEtherscan(daoAddress, chainId)">
            <q-item-section avatar>
              <q-img :src="TOKEN_SERVICE.getNetworkCurrencyIcon(chainId)" style="height:50px; width: 50px"></q-img>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-black">
                <q-badge style="padding:5px" label="CRYPTOCURRENCY"
                         color="black"
                         text-color="white"></q-badge>
              </q-item-label>
              <q-item-label style="font-size: 1.1rem">{{ TOKEN_SERVICE.getCurrencyName(chainId) }} (network cryptocurrency)
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-black text-subtitle2" style="font-size: 1.1rem !important;">
                {{ cryptoBalanceFormatted }} {{ TOKEN_SERVICE.getNetworkCurrency(chainId) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-for="asset of assets" v-bind:key="asset.assetData.token.address"
                  @click="goToEtherscan(asset.assetData.token.address, asset.assetData.token.chainId)">
            <q-item-section avatar>
              <q-img src="/ERC-20.svg" style="height:50px; width: 50px"
                     v-if="asset.assetData.token.type === TokenType.ERC20"></q-img>
              <q-img :src="`data:image/png;base64,${asset.assetData.nft?.thumbnailImageBase64}`"
                     style="height:50px; width: 50px" v-else></q-img>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-black">
                <q-badge style="padding:5px" label="ERC-20"
                         color="primary"
                         text-color="white" v-if="asset.assetData.token.type === TokenType.ERC20"></q-badge>
                <q-badge style="padding:5px" label="NFT"
                         color="secondary"
                         text-color="black" v-else></q-badge>
              </q-item-label>
              <q-item-label style="font-size: 1.1rem">{{ asset.assetData.token.name }}</q-item-label>
              <q-item-label caption v-if="asset.assetData.token.type === TokenType.NFT"><span
                  class="text-black text-bold">Title: </span><span
                  class="text-black">{{ asset.assetData.nft?.name }}</span></q-item-label>
              <q-item-label caption v-if="asset.assetData.token.type === TokenType.NFT"><span
                  class="text-black text-bold">Description: </span> <span
                  class="text-black">{{ asset.assetData.nft?.description }}</span></q-item-label>
              <q-item-label caption><span class="text-black text-bold">Token address: </span> <span class="text-black">{{ asset.assetData.token.address }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label class="text-black text-subtitle2" style="font-size: 1.1rem !important;"
                            v-if="asset.assetData.token.type === TokenType.ERC20">
                {{ Number(ethers.formatUnits(asset.assetBalance.toFixed(0), Number(asset.assetData.token.decimals))).toFixed(0) }}
                {{ asset.assetData.token.symbol }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!isRead">
            <q-item-section avatar>
              <q-skeleton type="QAvatar"/>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-black">
                <q-skeleton type="QBadge"/>
              </q-item-label>
              <q-item-label style="font-size: 1.1rem">
                <q-skeleton type="text"/>
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text"/>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label class="text-black text-subtitle2">
                <q-skeleton type="QBadge"/>
              </q-item-label>
            </q-item-section>

          </q-item>

        </q-list>
      </q-card>

    </div>
  </div>
</template>
<script setup lang="ts">
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { AssetDto } from 'src/api/dto/assets/asset-dto';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { ethers } from 'ethers';
import { goToEtherscan } from 'src/api/services/utils-service';
import { TOKEN_SERVICE } from '../../api/services/token-service';
import { DaoAssetsDto } from 'src/api/dto/assets/dao-assets-dto';

const route = useRoute();

const daoIpfsHash: string = <string>route.params.daoIpfsHash;
const assets = ref(<AssetDto[]>[]);
const isRead = ref(false);
const chainId = ref('');
const cryptoBalanceFormatted = ref('');
const props = defineProps(['daoName', 'daoAddress']);
const nftsCount = ref(0);
const nftsCollectionsCount = ref(0);
const erc20Count = ref(0);
const progress = ref(1);
const buffer = ref(1);
const readTreasuryEverySeconds = 60;
let counter = 0;
let interval: any;
const router = useRouter();
onMounted(async () => {
  await router.push({ path: route.fullPath, query: { view: 'treasury' }});
  await readTreasury();
  startInterval();
});

const startInterval = (previousInterval?: any) => {
  if (previousInterval) {
    clearInterval(previousInterval);
  }
  progress.value = 1;
  buffer.value = 1;
  interval = setInterval(async () => {
    progress.value -= (1 / readTreasuryEverySeconds);
    counter += 1;
    if (counter === readTreasuryEverySeconds) {
      await readTreasury();
      startInterval(interval);
      counter = 0;
    }
  }, 1000);
}

const readTreasury = async () => {
  isRead.value = false;
  const res = await api.get(`/api/rest/v1/dao/${daoIpfsHash}/treasury`);
  const daoAssetsDto: DaoAssetsDto = res.data;
  console.log('mam chainId', daoAssetsDto);
  assets.value = daoAssetsDto.assets;
  chainId.value = daoAssetsDto.chainId;
  cryptoBalanceFormatted.value = daoAssetsDto.cryptoBalanceFormatted;
  nftsCount.value = daoAssetsDto.assets.filter(_ => _.assetData.nft !== undefined).length;
  erc20Count.value = daoAssetsDto.assets.filter(_ => _.assetData.nft === undefined).length;
  const nftsCollectionsSet = new Set<string>();
  daoAssetsDto.assets.filter(_ => _.assetData.nft !== undefined).forEach(_ => {
    nftsCollectionsSet.add(_.assetData.token.address);
  });
  nftsCollectionsCount.value = nftsCollectionsSet.size;
  isRead.value = true;
}

onBeforeUnmount(() => {
  clearInterval(interval);
  router.push({ path: route.fullPath});
});

</script>
