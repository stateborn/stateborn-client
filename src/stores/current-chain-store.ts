import { defineStore } from 'pinia';

export const useCurrentChainStore = defineStore('currentChainStore', {
    state: () => ({
        // default 1 = ethereum mainnet
        chainId: '1',
    }),
    actions: {
        setChainId(chainId: string) {
            this.chainId = chainId;
        },
    },
});
