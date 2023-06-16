export class ProposalReport {
  ipfsHash: string;
  merkleRootHex: string;

  constructor(ipfsHash: string, merkleRootHex: string) {
    this.ipfsHash = ipfsHash;
    this.merkleRootHex = merkleRootHex;
  }
}
