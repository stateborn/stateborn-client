import { ClientDaoToken } from 'src/api/model/ipfs/client-dao-token';

export class ClientDao {

  name: string;
  description: string;
  imageBase64: string;
  owners: string[];
  ownersMultisigThreshold: string;
  proposalTokenRequiredQuantity: string;
  token: ClientDaoToken;

  constructor(name: string, description: string, imageBase64: string, owners: string[], ownersMultisigThreshold: string, proposalTokenRequiredQuantity: string, token: ClientDaoToken) {
    this.name = name;
    this.description = description;
    this.imageBase64 = imageBase64;
    this.owners = owners;
    this.ownersMultisigThreshold = ownersMultisigThreshold;
    this.proposalTokenRequiredQuantity = proposalTokenRequiredQuantity;
    this.token = token;
  }
}
