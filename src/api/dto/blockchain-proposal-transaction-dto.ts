import { ProposalTransactionData } from 'src/api/model/ipfs/proposal-transaction/proposal-transaction-data';
import { BlockchainProposalTransactionType } from 'src/api/model/blockchain-proposal-transaction-type';

export class BlockchainProposalTransactionDto {
  id: string;
  transactionType: BlockchainProposalTransactionType;
  data: ProposalTransactionData;

  constructor(id: string, transactionType: BlockchainProposalTransactionType, data: ProposalTransactionData) {
    this.id = id;
    this.transactionType = transactionType;
    this.data = data;
  }
}
