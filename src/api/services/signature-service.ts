import { encodeBytes32String, ethers } from 'ethers';
import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { ClientProposal } from 'src/api/model/ipfs/client-proposal';
import { ProposalType } from 'src/api/model/ipfs/proposal-type';
import { ClientDao } from 'src/api/model/ipfs/client-dao';
import { ClientDaoToken } from 'src/api/model/ipfs/client-dao-token';

export const signProposal = async (clientProposal :ClientProposal): Promise<string> => {
  const abiEncodedProposal = abiEncodeProposal(clientProposal);
  const keccak256DataString = ethers.keccak256(abiEncodedProposal);
  // ethers.getBytes -> arrayify
  return ETH_CONNECTION_SERVICE.getSigner().signMessage(ethers.getBytes(keccak256DataString));
};

export const abiEncodeProposal = (clientProposal: ClientProposal) => {
  const types = ['address', 'bytes', 'bytes', 'bytes', 'bytes32', 'bytes32', 'bytes32', 'uint256'];
  const values = [
    clientProposal.creatorAddress,
    ethers.toUtf8Bytes(clientProposal.daoIpfsHash),
    ethers.toUtf8Bytes(clientProposal.title),
    ethers.toUtf8Bytes(clientProposal.description),
    encodeBytes32String(clientProposal.proposalType),
    encodeBytes32String(clientProposal.startDateUtc),
    encodeBytes32String(clientProposal.endDateUtc),
    Number(clientProposal.blockNumber)];
  if (clientProposal.proposalType === ProposalType.OPTIONS) {
    types.push('bytes');
    const options = (<[]>clientProposal.data.options).join('');
    values.push(ethers.toUtf8Bytes(options));
  }
  return ethers.solidityPacked(types, values);
}

export const abiEncodeVote = (voterAddress: string, proposalIpfsHash: string, vote: string, votingPower: string, voteDate: string) => ethers.solidityPacked(
  ['address', 'bytes', 'bytes32', 'uint256', 'bytes32'],
  [
    voterAddress,
    ethers.toUtf8Bytes(proposalIpfsHash),
    encodeBytes32String(vote),
    Number(votingPower),
    encodeBytes32String(voteDate),
  ],
);

export const signVote = async (
  voterAddress: string,
  proposalIpfsHash: string,
  vote: string,
  votingPower: string,
  voteDate: string,
): Promise<string> => {
  const keccak256DataString = ethers.keccak256(abiEncodeVote(voterAddress, proposalIpfsHash, vote, votingPower, voteDate));
  // ethers.getBytes -> arrayify
  return ETH_CONNECTION_SERVICE.getSigner().signMessage(ethers.getBytes(keccak256DataString));
};

export const getEncodedReportVoteKeccak256 = async (
  voterAddress: string,
  proposalIpfsHash: string,
  vote: string,
  votingPower: string,
): Promise<string> => {
  const abiEncodedVote = ethers.solidityPacked(
    ['address', 'bytes', 'bytes32', 'uint256'],
    [
      voterAddress,
      ethers.toUtf8Bytes(proposalIpfsHash),
      encodeBytes32String(vote),
      Number(votingPower),
    ],
  );
  return ethers.keccak256(abiEncodedVote);
};

export const isProposalValid = (clientProposal: ClientProposal, signature: string): boolean => {
  const abiEncodedProposal: string = abiEncodeProposal(clientProposal);
  const keccak256DataString = ethers.keccak256(abiEncodedProposal);
  const derivedAddress = ethers.verifyMessage(ethers.getBytes(keccak256DataString), signature);
  return derivedAddress.toUpperCase() === clientProposal.creatorAddress.toUpperCase();
};

export const isVoteValid = (clientVoteDto: any, signature: string): boolean => {
  const clientProposalToSign: string = ethers.keccak256(abiEncodeVote(
    clientVoteDto.voterAddress,
    clientVoteDto.proposalIpfsHash,
    clientVoteDto.vote,
    clientVoteDto.votingPower,
    clientVoteDto.voteDate,
  ));
  const derivedAddress = ethers.verifyMessage(ethers.getBytes(clientProposalToSign), signature);
  return derivedAddress.toUpperCase() === clientVoteDto.voterAddress.toUpperCase();
};

export const signDao = async (clientDao: ClientDao): Promise<string> => {
  const abiEncodedDao = abiEncodeDao(clientDao);
  // Same as `abi.encodePacked` in Solidity
  const keccak256DataString = ethers.keccak256(abiEncodedDao);
  // ethers.getBytes -> arrayify
  return ETH_CONNECTION_SERVICE.getSigner().signMessage(ethers.getBytes(keccak256DataString));
};

export const abiEncodeDao = (clientDao: ClientDao) => {
  const types = ['bytes', 'bytes', 'bytes', 'uint256', 'uint256', 'bytes32', 'address', 'bytes32'];
  const values = [
    ethers.toUtf8Bytes(clientDao.name),
    ethers.toUtf8Bytes(clientDao.description),
    ethers.toUtf8Bytes(clientDao.imageBase64),
    Number(clientDao.proposalTokenRequiredQuantity),
    Number(clientDao.ownersMultisigThreshold),
    encodeBytes32String(clientDao.token.type),
    clientDao.token.address,
    encodeBytes32String(clientDao.token.chainId),
  ];
  for (const owner of clientDao.owners) {
    types.push('address');
    values.push(owner);
  }
  return ethers.solidityPacked(types, values);
}

export const isDaoValid = (clientDao: ClientDao, signature: string): boolean => {
  const abiEncodedClientDao: string = abiEncodeDao(clientDao);
  const keccak256DataString = ethers.keccak256(abiEncodedClientDao);
  const derivedAddress = ethers.verifyMessage(ethers.getBytes(keccak256DataString), signature);
  return derivedAddress.toUpperCase() === clientDao.owners[0].toUpperCase();
};
