export class ProposalReport {
  ipfsHash: string;
  merkleRootHex: string;
  proposalResult: string;
  constructor(ipfsHash: string, merkleRootHex: string, proposalResult: string) {
    this.ipfsHash = ipfsHash;
    this.merkleRootHex = merkleRootHex;
    this.proposalResult = proposalResult;
  }
}
