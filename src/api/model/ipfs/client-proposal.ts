import { ProposalType } from 'src/api/model/ipfs/proposal-type';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';

export class ClientProposal {

  creatorAddress: string;
  daoIpfsHash: string;
  title: string;
  description: string;
  proposalType: ProposalType;
  startDateUtc: string;
  endDateUtc: string;
  blockNumber: string;
  data?: any;
  transactions?: ClientProposalTransaction[];

  constructor(creatorAddress: string, daoIpfsHash: string, title: string, description: string, proposalType: ProposalType, startDateUtc: string, endDateUtc: string, blockNumber: string, data?: any, transactions?: ClientProposalTransaction[]) {
    this.creatorAddress = creatorAddress;
    this.daoIpfsHash = daoIpfsHash;
    this.title = title;
    this.description = description;
    this.proposalType = proposalType;
    this.startDateUtc = startDateUtc;
    this.endDateUtc = endDateUtc;
    this.blockNumber = blockNumber;
    this.data = data;
    this.transactions = transactions;
  }
}
