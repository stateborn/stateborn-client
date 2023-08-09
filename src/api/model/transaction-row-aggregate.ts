import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';

export class TransactionRowAggregate {
  index: number;
  clientProposalTransaction?: ClientProposalTransaction;

  constructor(index: number, clientProposalTransaction?: ClientProposalTransaction) {
    this.index = index;
    this.clientProposalTransaction = clientProposalTransaction;
  }
}
