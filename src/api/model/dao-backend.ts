import { ClientDao } from 'src/api/model/ipfs/client-dao';
import { ProposalVerification } from 'src/api/model/proposal-verification';

export class DaoBackend {
  clientDao: ClientDao;
  ipfsHash: string;
  daoVerification?: ProposalVerification;

  constructor(clientDao: ClientDao, ipfsHash: string, daoVerification?: ProposalVerification) {
    this.clientDao = clientDao;
    this.ipfsHash = ipfsHash;
    this.daoVerification = daoVerification;
  }
}
