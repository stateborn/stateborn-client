<template>
  <q-card class="q-pb-md bodynoise q-pa-xs" flat>
    <q-card-section class="text-center" style="padding-top:0;">
      <div class="text-overline">{{label}}</div>
      <div class="text-h6 ">Token info</div>
    </q-card-section>
    <div class="row q-gutter-col-xs items-center justify-center">
      <div class="col-12">
        <div class="row items-center">
          <div class="col-6" style="border-right: 1px solid #9E9E9E">
            <q-list class="text-left">
              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" size="xs" name="fa-solid fa-circle" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{props.tokenName}}</q-item-label>
                  <q-item-label caption class="text-primary">Token name</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" size="xs" name="fa-regular fa-circle"/>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ props.tokenSymbol }}</q-item-label>
                  <q-item-label caption class="text-primary ">Token symbol</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" size="xs" name="fa-solid fa-circle-half-stroke"/>
                </q-item-section>

                <q-item-section>
                  <q-item-label><q-badge style="padding:5px" :label="TokenType.NFT"
                                         color="secondary"
                                         text-color="black"></q-badge></q-item-label>
                  <q-item-label caption class="text-primary ">Token type</q-item-label>
                </q-item-section>
              </q-item>
              <q-item >
                <q-item-section avatar>
                  <q-icon color="primary" size="xs" name="fa-regular fa-circle"/>
                </q-item-section>

                <q-item-section>
                  <q-item-label>12</q-item-label>
                  <q-item-label caption class="text-primary ">Decimals</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <img :src="networkIcon" style="height: 20px; width: 20px;">
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{props.networkName}}</q-item-label>
                  <q-item-label caption class="text-primary">Token network</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-6" v-if="collectionModeOnly">
            <q-img src='/NFT.svg' :style="props.bigToken ? 'height:150px;width:150px': 'height:100px;width:100px'"/>
          </div>
          <div class="col-6" v-else>
            <div v-if="nftPreviewSupported">
              <div class="text-overline" v-if="nftId && ipfsNftInfo?.imageBase64">#{{nftId}} {{tokenSymbol}} preview </div>
              <div class="text-overline" v-else>NFT preview (loading)</div>
            </div>
            <div v-else>
              <div class="text-overline text-red-8" v-if="!nftId">Please provide NFT ID</div>
              <div class="text-overline text-red-8" v-else>NFT preview not supported</div>
            </div>
            <q-img v-if="ipfsNftInfo?.imageBase64" :src="ipfsNftInfo?.imageBase64" style="height:120px;width:120px; border:1px solid #424242"/>
            <div class="row items-center justify-center" v-else>
              <div class="col-auto">
                <q-skeleton square  style="height:120px;width:120px;"/>
              </div>
            </div>
            <q-list class="text-left">
              <q-item v-if="ipfsNftInfo">
                <q-item-section avatar>
                  <q-icon size="xs"  name="fa-solid fa-hashtag" />
                </q-item-section>

                <q-item-section >
                  <q-item-label>{{ipfsNftInfo.tokenId}}</q-item-label>
                  <q-item-label caption class="text-primary">NFT ID</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-else>
                <q-item-section >
                  <q-skeleton :type="'rect'" />
                </q-item-section>
              </q-item>

              <q-item v-if="ipfsNftInfo">
                <q-item-section avatar>
                  <q-icon size="xs"  name="fa-solid fa-info" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ipfsNftInfo.name}}</q-item-label>
                  <q-item-label caption class="text-primary">NFT name</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-else>
                <q-item-section >
                  <q-skeleton :type="'rect'" />
                </q-item-section>
              </q-item>

              <q-item v-if="ipfsNftInfo">
                <q-item-section avatar>
                  <q-icon size="xs" name="fa-solid fa-comment" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ ipfsNftInfo?.description }}</q-item-label>
                  <q-item-label caption class="text-primary">NFT description</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-else>
                <q-item-section >
                  <q-skeleton :type="'rect'" />
                </q-item-section>
              </q-item>

            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script setup lang="ts">

import { TokenType } from 'src/api/model/ipfs/token-type';
import { onMounted, ref, watch } from 'vue';
import { IpfsNftInfo } from 'src/api/model/ipfs-nft-info';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';

const props = defineProps<{
  label: string,
  tokenName: string,
  tokenSymbol: string,
  decimals: string,
  networkName: string,
  networkIcon: string,
  tokenAddress: string | undefined,
  bigToken: boolean,
  nftId: number | undefined,
  collectionModeOnly: boolean,
}>();
const ipfsNftInfo = ref(<IpfsNftInfo | undefined> undefined);
const nftPreviewSupported = ref(false);
watch(() => [props.nftId, props.tokenAddress], async () => {
  readNftImage();
});

const readNftImage = () => {
  if (props.nftId && props.tokenAddress) {
    ipfsNftInfo.value = undefined;
    nftPreviewSupported.value = true;
    ERC_721_SERVICE.readIpfsTokenInfo(props.tokenAddress!, props.nftId).then(_ => {
      if (_ !== undefined) {
        ipfsNftInfo.value = _;
        nftPreviewSupported.value = true;
      } else {
        ipfsNftInfo.value = undefined;
        nftPreviewSupported.value = false;
      }
    }, (err) => {
        console.log(err);
        ipfsNftInfo.value = undefined;
        nftPreviewSupported.value = false;
    });
  } else if (!props.nftId) {
    ipfsNftInfo.value = undefined;
    nftPreviewSupported.value = false;
  } else {
    nftPreviewSupported.value = true;
  }
}
onMounted(() => {
  readNftImage();
});
</script>
