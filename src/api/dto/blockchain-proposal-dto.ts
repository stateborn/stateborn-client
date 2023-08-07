import { BlockchainProposalTransactionDto } from 'src/api/dto/blockchain-proposal-transaction-dto';
import { BlockchainProposalChainTransactionDto } from 'src/api/dto/blockchain-proposal-chain-transaction-dto';
import { BlockchainProposalStatus } from 'src/api/model/blockchain-proposal-status';

export class BlockchainProposalDto {
  proposalIpfsHash: string;
  chainId: string;
  status: BlockchainProposalStatus;
  blockchainProposalTransactions: BlockchainProposalTransactionDto[];
  blockchainProposalChainTransactions: BlockchainProposalChainTransactionDto[];
  address?: string;

  constructor(proposalIpfsHash: string, chainId: string, status: BlockchainProposalStatus, blockchainProposalTransactions: BlockchainProposalTransactionDto[], blockchainProposalChainTransactions: BlockchainProposalChainTransactionDto[], address?: string) {
    this.proposalIpfsHash = proposalIpfsHash;
    this.chainId = chainId;
    this.status = status;
    this.blockchainProposalTransactions = blockchainProposalTransactions;
    this.blockchainProposalChainTransactions = blockchainProposalChainTransactions;
    this.address = address;
  }
}
