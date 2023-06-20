import { ProposalVerification } from 'src/api/model/proposal-verification';
import { ClientProposal } from 'src/api/model/ipfs/client-proposal';

export class BackendProposal {
  clientProposal: ClientProposal;
  ipfsHash: string;
  // proposal verification is updated when user previews the proposal
  proposalVerification?: ProposalVerification;

  constructor(clientProposal: ClientProposal, ipfsHash: string, proposalVerification?: ProposalVerification) {
    this.clientProposal = clientProposal;
    this.ipfsHash = ipfsHash;
    this.proposalVerification = proposalVerification;
  }
}
