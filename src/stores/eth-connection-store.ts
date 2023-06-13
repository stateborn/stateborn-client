import { defineStore } from 'pinia';

export const useEthConnectionStore = defineStore('ethConnectionStore', {
  state: () => ({
    isConnected: false,
    account: '',
  }),
  actions: {
    async setConnected(account: string) {
      this.isConnected = true;
      this.account = account;
    },
  },
});
