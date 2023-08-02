import { ProposalTransactionType } from 'src/api/model/ipfs/proposal-transaction-type';
import { ProposalTransactionData } from 'src/api/model/ipfs/proposal-transaction/proposal-transaction-data';

export class ClientProposalTransaction {

  transactionType: ProposalTransactionType;
  data: ProposalTransactionData;

  constructor(transactionType: ProposalTransactionType, data: ProposalTransactionData) {
    this.transactionType = transactionType;
    this.data = data;
  }
}
