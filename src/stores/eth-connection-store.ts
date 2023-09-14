import { defineStore } from 'pinia';

export const useEthConnectionStore = defineStore('ethConnectionStore', {
  state: () => ({
    isConnected: false,
    account: '',
    chainId: '',
    networkName: '',
    networkIcon: '',
    isMetamask: false,
  }),
  actions: {
    async setConnected(account: string, chainId: string, networkName: string, networkIcon: string, isMetamask: boolean) {
      this.isConnected = account !== '';
      this.account = account;
      this.chainId = chainId;
      this.networkName = networkName;
      this.networkIcon = networkIcon;
      this.isMetamask = isMetamask;
    },
  },
});
