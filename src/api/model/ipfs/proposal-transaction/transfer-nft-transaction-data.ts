import { ProposalTransactionData } from './proposal-transaction-data';
import { ClientToken } from 'src/api/model/ipfs/client-token';

export class TransferNftTransactionData implements ProposalTransactionData {

  token: ClientToken;
  transferToAddress: string;
  tokenId: string;

  constructor(token: ClientToken, transferToAddress: string, tokenId: string) {
    this.token = token;
    this.transferToAddress = transferToAddress;
    this.tokenId = tokenId;
  }
}
