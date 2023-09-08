import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { ERC20DaoFactory__factory, NFTDaoFactory__factory } from 'src/typechain-types/factories/contracts/dao/factory';
import { Dao__factory } from 'src/typechain-types/factories/contracts/dao';
import { Proposal__factory } from 'src/typechain-types/factories/contracts';
import { ethers, ZeroAddress } from 'ethers';
import { OnChainProposalDetails } from 'src/api/model/on-chain-proposal-details';
import { ClientProposalTransaction } from 'src/api/model/ipfs/proposal-transaction/client-proposal-transaction';
import { TransferErc20TransactionData } from 'src/api/model/ipfs/proposal-transaction/transfer-erc-20-transaction-data';
import { ProposalTransactionType } from 'src/api/model/ipfs/proposal-transaction-type';
import { TransferNftTransactionData } from 'src/api/model/ipfs/proposal-transaction/transfer-nft-transaction-data';
import { TokenType } from 'src/api/model/ipfs/token-type';
import { changeNetwork } from 'src/api/services/change-network-service';

export const createDaoOnChain = async (tokenAddress: string, tokenCollateral: bigint, chainId: string, tokenType: TokenType): Promise<string> => {
    if (tokenType === TokenType.ERC20) {
        const daoFactory = ERC20DaoFactory__factory.connect(getErc20DaoFactoryAddress(chainId), ETH_CONNECTION_SERVICE.getSigner());
        const promise: Promise<string> = new Promise((resolve, reject) => {
            // @ts-ignore
            daoFactory.on('DaoCreated', (daoAddress: string) => {
                console.log('DAO created:', daoAddress);
                resolve(daoAddress);
            });
        });
        await daoFactory.createDao(tokenAddress, tokenCollateral);
        return promise;
    } else {
        const daoFactory = NFTDaoFactory__factory.connect(getNftDaoFactoryAddress(chainId), ETH_CONNECTION_SERVICE.getSigner());
        const promise: Promise<string> = new Promise((resolve, reject) => {
            // @ts-ignore
            daoFactory.on('DaoCreated', (daoAddress: string) => {
                console.log('DAO created:', daoAddress);
                resolve(daoAddress);
            });
        });
        await daoFactory.createDao(tokenAddress, tokenCollateral);
        return promise;
    }
}

export const getCreateProposalRequiredCollateral = async (daoAddress: string): Promise<string> => {
    const dao = Dao__factory.connect(daoAddress, ETH_CONNECTION_SERVICE.getProviderQuickProvider());
    const nativeCollateral = await dao.nativeCollateral();
    return ethers.formatEther(nativeCollateral);
}

export const getOnChainProposalDetails = async (proposalId: string, daoAddress: string): Promise<OnChainProposalDetails | undefined> => {
    const dao = Dao__factory.connect(daoAddress, ETH_CONNECTION_SERVICE.getProviderQuickProvider());
    const proposalAddress = await dao.proposals(ethers.toUtf8Bytes(proposalId));
    if (proposalAddress !== ZeroAddress) {
        const proposal = Proposal__factory.connect(proposalAddress, ETH_CONNECTION_SERVICE.getProviderQuickProvider());
        const forVotes = proposal.forVotesCounter();
        const againstVotes = proposal.againstVotesCounter();
        const isPassed = proposal.isPassed();
        const isEnded = proposal.isEnded();
        const executed = proposal.executed();
        const contractCreationTime = proposal.contractCreationTime();
        const challengePeriodSeconds = proposal.challengePeriodSeconds();
        const values = await Promise.all([forVotes, againstVotes, isPassed, isEnded, executed, contractCreationTime, challengePeriodSeconds]);
        const endsDate = new Date((Number(values[5]) + Number(values[6])) * 1000);
        return new OnChainProposalDetails(
            proposalAddress,
            Boolean(values[3]),
            Boolean(values[2]),
            Number(values[0]),
            Number(values[1]),
            Boolean(values[4]),
            endsDate
        );
    } else {
        return undefined;
    }
}

export const createProposalOnChain = async (daoAddress: string, proposalId: string, proposalMerkleRoot: string, transactions: ClientProposalTransaction[], requiredCollateral: string) => {
    const dao = Dao__factory.connect(daoAddress, ETH_CONNECTION_SERVICE.getSigner());
    const promise: Promise<string> = new Promise((resolve, reject) => {
        // @ts-ignore
        dao.on('ProposalCreated', (proposalId: string, proposalAddress: string) => {
            console.log(`Proposal ${proposalId} created on-chain:`, proposalAddress);
            resolve(proposalAddress);
        });
    });
    const onChainTransfers = <string[]>transactions.map(_ => {
        if (_.transactionType === ProposalTransactionType.TRANSFER_ERC_20_TOKENS) {
            return Dao__factory.createInterface().encodeFunctionData('sendErc20', [
                ethers.toUtf8Bytes(proposalId),
                (<TransferErc20TransactionData>_.data).token.address,
                (<TransferErc20TransactionData>_.data).transferToAddress,
                ethers.parseUnits((<TransferErc20TransactionData>_.data).transferAmount, Number((<TransferErc20TransactionData>_.data).token.decimals)),
            ]);
        } else if (_.transactionType === ProposalTransactionType.TRANSFER_NFT_TOKEN) {
            return Dao__factory.createInterface().encodeFunctionData('sendNft', [
                ethers.toUtf8Bytes(proposalId),
                (<TransferNftTransactionData>_.data).token.address,
                (<TransferNftTransactionData>_.data).transferToAddress,
                Number((<TransferNftTransactionData>_.data).tokenId),
            ]);
        } else {
            return undefined;
        }
    }).filter(_ => _ !== undefined);
    const collateral = ethers.parseEther(requiredCollateral);
    if (collateral === BigInt(0)) {
        throw Error('Collateral cannot be 0');
    }
    await dao.createProposal(
        ethers.toUtf8Bytes(proposalId),
        proposalMerkleRoot,
        onChainTransfers,
        {value: collateral}
    );
    return promise;
}

export const executeOnChainProposal = async (proposalAddress: string) => {
    const proposal = Proposal__factory.connect(proposalAddress, ETH_CONNECTION_SERVICE.getSigner());
    const res = await proposal.executeProposal();
    await res.wait();
}

const getErc20DaoFactoryAddress = (chainId: string): string => {
    switch (chainId) {
        case '1':
            return '0x0';
        case '42161':
            return '0x0';
        case '137':
            return process.env.POLYGON_ERC_20_DAO_FACTORY_ADDRESS!;
        case process.env.DEVELOPMENT_NETWORK_CHAIN_ID:
            return process.env.DEVELOPMENT_NETWORK_ERC_20_DAO_FACTORY_ADDRESS!;
        default:
            throw new Error(`Unsupported chainId: ${chainId}`);
    }
}

const getNftDaoFactoryAddress = (chainId: string): string => {
    switch (chainId) {
        case '1':
            return '0x0';
        case '42161':
            return '0x0';
        case '137':
            return process.env.POLYGON_NFT_DAO_FACTORY_ADDRESS!;
        case process.env.DEVELOPMENT_NETWORK_CHAIN_ID:
            return process.env.DEVELOPMENT_NETWORK_NFT_DAO_FACTORY_ADDRESS!;
        default:
            throw new Error(`Unsupported chainId: ${chainId}`);
    }
}

