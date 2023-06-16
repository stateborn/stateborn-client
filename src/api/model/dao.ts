export class Dao {
  name: string;
  description: string;
  imageBase64: string;
  owners: string[];
  ownersMultisigThreshold: string;
  proposalTokenRequiredQuantity: string;
  tokenName: string;
  tokenSymbol: string;
  tokenNetwork: string;
  tokenAddress: string;
  tokenType: string;
  ipfsHash: string;

  constructor(name: string, description: string, imageBase64: string, owners: string[], ownersMultisigThreshold: string, proposalTokenRequiredQuantity: string, tokenName: string, tokenSymbol: string, tokenNetwork: string, tokenAddress: string, tokenType: string, ipfsHash: string) {
    this.name = name;
    this.description = description;
    this.imageBase64 = imageBase64;
    this.owners = owners;
    this.ownersMultisigThreshold = ownersMultisigThreshold;
    this.proposalTokenRequiredQuantity = proposalTokenRequiredQuantity;
    this.tokenName = tokenName;
    this.tokenSymbol = tokenSymbol;
    this.tokenNetwork = tokenNetwork;
    this.tokenAddress = tokenAddress;
    this.tokenType = tokenType;
    this.ipfsHash = ipfsHash;
  }
}
