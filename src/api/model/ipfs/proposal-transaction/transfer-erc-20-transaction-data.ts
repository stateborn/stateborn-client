import { ProposalTransactionData } from './proposal-transaction-data';
import { ClientToken } from 'src/api/model/ipfs/client-token';

export class TransferErc20TransactionData implements ProposalTransactionData {
  token: ClientToken;
  transferToAddress: string;
  transferAmount: string;

  constructor(token: ClientToken, transferToAddress: string, transferAmount: string) {
    this.token = token;
    this.transferToAddress = transferToAddress;
    this.transferAmount = transferAmount;
  }
}
