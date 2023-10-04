import { BlockchainProposalTransactionType } from 'src/api/model/ipfs/blockchain-proposal-transaction-type';
import { ProposalTransactionData } from 'src/api/model/ipfs/proposal-transaction/proposal-transaction-data';

export class ClientProposalTransaction {

  transactionType: BlockchainProposalTransactionType;
  data: ProposalTransactionData;

  constructor(transactionType: BlockchainProposalTransactionType, data: ProposalTransactionData) {
    this.transactionType = transactionType;
    this.data = data;
  }
}
