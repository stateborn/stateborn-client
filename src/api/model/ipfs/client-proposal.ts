import { ProposalType } from 'src/api/model/ipfs/proposal-type';

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

  constructor(creatorAddress: string, daoIpfsHash: string, title: string, description: string, proposalType: ProposalType, startDateUtc: string, endDateUtc: string, blockNumber: string, data?: any) {
    this.creatorAddress = creatorAddress;
    this.daoIpfsHash = daoIpfsHash;
    this.title = title;
    this.description = description;
    this.proposalType = proposalType;
    this.startDateUtc = startDateUtc;
    this.endDateUtc = endDateUtc;
    this.blockNumber = blockNumber;
    this.data = data;
  }
}
