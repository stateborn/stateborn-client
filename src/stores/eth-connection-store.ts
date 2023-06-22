import { defineStore } from 'pinia';

export const useEthConnectionStore = defineStore('ethConnectionStore', {
  state: () => ({
    isConnected: false,
    account: '',
    chainId: '',
    networkName: '',
    networkIcon: '',
  }),
  actions: {
    async setConnected(account: string, chainId: string, networkName: string, networkIcon: string) {
      this.isConnected = true;
      this.account = account;
      this.chainId = chainId;
      this.networkName = networkName;
      this.networkIcon = networkIcon;
    },
  },
});
