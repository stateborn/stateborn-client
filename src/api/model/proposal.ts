export class Proposal {
  title: string;
  description: string;
  endDateUtc: string;
  startDateUtc: string;
  proposalType: string;
  ipfsHash: string;
  creatorAddress: string;
  data?: any;

  constructor(title: string, description: string, endDateUtc: string, startDateUtc: string, proposalType: string, ipfsHash: string, creatorAddress: string, data?: any) {
    this.title = title;
    this.description = description;
    this.endDateUtc = endDateUtc;
    this.startDateUtc = startDateUtc;
    this.proposalType = proposalType;
    this.ipfsHash = ipfsHash;
    this.creatorAddress = creatorAddress;
    this.data = data;
  }
}
