import { defineStore } from 'pinia';

interface Proposal {
  id: string;
  votes: number;
}
export const useProposalStore = defineStore('ethProposalStore', {
  state: (): { proposals: Record<string, Proposal> } => ({
    proposals: {}
  }),

  getters: {
    getProposalVotes: (state) => (id: string) => {
      return state.proposals[id]?.votes || 0
    }
  },

  actions: {
    setProposalVotes(id: string, votes: number) {
      if (!this.proposals[id]) {
        this.proposals[id] = { id, votes }
      } else {
        this.proposals[id].votes = votes
      }
    }
  }
})
