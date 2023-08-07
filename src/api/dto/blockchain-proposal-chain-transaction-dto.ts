import { BlockchainProposalChainTransactionStatus } from 'src/api/model/blockchain-proposal-chain-transaction-status';

export class BlockchainProposalChainTransactionDto {
  txHash: string;
  transactionStatus: BlockchainProposalChainTransactionStatus;

  constructor(txHash: string, transactionStatus: BlockchainProposalChainTransactionStatus) {
    this.txHash = txHash;
    this.transactionStatus = transactionStatus;
  }
}
