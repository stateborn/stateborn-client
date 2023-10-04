import { ProposalTransactionData } from './proposal-transaction-data';

export class TransferCryptoTransactionData implements ProposalTransactionData {

  transferToAddress: string;
  // in wei, not in eth
  amount: string;

  constructor(transferToAddress: string, amount: string) {
    this.transferToAddress = transferToAddress;
    this.amount = amount;
  }
}
