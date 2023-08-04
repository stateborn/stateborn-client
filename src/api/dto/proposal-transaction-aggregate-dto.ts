import { ProposalTransactionStatus } from 'src/api/model/proposal-transaction-status';

export class ProposalTransactionAggregateDto {
  transactionStatus: ProposalTransactionStatus;
  txHash?: string;

  constructor(transactionStatus: ProposalTransactionStatus, txHash?: string) {
    this.transactionStatus = transactionStatus;
    this.txHash = txHash;
  }
}
