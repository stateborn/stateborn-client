import { ClientToken } from 'src/api/model/ipfs/client-token';

export class ClientDao {

  name: string;
  description: string;
  imageBase64: string;
  owners: string[];
  ownersMultisigThreshold: string;
  proposalTokenRequiredQuantity: string;
  creationDateUtc: string;
  token: ClientToken;
  contractAddress?: string;

  constructor(name: string, description: string, imageBase64: string, owners: string[], ownersMultisigThreshold: string, proposalTokenRequiredQuantity: string,
              creationDateUtc: string, token: ClientToken, contractAddress?: string) {
    this.name = name;
    this.description = description;
    this.imageBase64 = imageBase64;
    this.owners = owners;
    this.ownersMultisigThreshold = ownersMultisigThreshold;
    this.proposalTokenRequiredQuantity = proposalTokenRequiredQuantity;
    this.creationDateUtc = creationDateUtc;
    this.token = token;
    this.contractAddress = contractAddress;
  }
}
