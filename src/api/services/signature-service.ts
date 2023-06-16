import { encodeBytes32String, ethers } from 'ethers';
import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';

export const signProposal = async (
  creatorAddress: string,
  daoIpfsHash: string,
  title: string,
  description: string,
  proposalType: string,
  startDateUtc: string,
  endDateUtc: string,
  blockNumber: string,
  data?: any,
): Promise<string> => {
  const types = ['address', 'bytes', 'bytes', 'bytes', 'bytes32', 'bytes32', 'bytes32', 'uint256'];
  const values = [
    creatorAddress,
    ethers.toUtf8Bytes(daoIpfsHash),
    ethers.toUtf8Bytes(title),
    ethers.toUtf8Bytes(description),
    encodeBytes32String(proposalType),
    encodeBytes32String(startDateUtc),
    encodeBytes32String(endDateUtc),
    Number(blockNumber)];
  if (proposalType === 'OPTIONS') {
    types.push('bytes');
    const options = (<[]>data).join('');
    values.push(ethers.toUtf8Bytes(options));
  }
  const abiEncodedProposal = ethers.solidityPacked(types, values);
  const keccak256DataString = ethers.keccak256(abiEncodedProposal);
  // ethers.getBytes -> arrayify
  return ETH_CONNECTION_SERVICE.getSigner().signMessage(ethers.getBytes(keccak256DataString));
};

export const abiEncodeVote = (voterAddress: string, proposalIpfsHash: string, vote: string, votingPower: string) => ethers.solidityPacked(
  ['address', 'bytes', 'bytes32', 'uint32'],
  [
    voterAddress,
    ethers.toUtf8Bytes(proposalIpfsHash),
    encodeBytes32String(vote),
    Number(votingPower),
  ],
);

export const signVote = async (
  voterAddress: string,
  proposalIpfsHash: string,
  vote: string,
  votingPower: string,
): Promise<string> => {
  const keccak256DataString = ethers.keccak256(abiEncodeVote(voterAddress, proposalIpfsHash, vote, votingPower));
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
    ['address', 'bytes', 'bytes32', 'uint32'],
    [
      voterAddress,
      ethers.toUtf8Bytes(proposalIpfsHash),
      encodeBytes32String(vote),
      Number(votingPower),
    ],
  );
  return ethers.keccak256(abiEncodedVote);
};

export const isVoteValid = (clientVoteDto: any, signature: string): boolean => {
  const clientProposalToSign: string = ethers.keccak256(abiEncodeVote(
    clientVoteDto.voterAddress,
    clientVoteDto.proposalIpfsHash,
    clientVoteDto.vote,
    clientVoteDto.votingPower,
  ));
  const derivedAddress = ethers.verifyMessage(ethers.getBytes(clientProposalToSign), signature);
  return derivedAddress.toUpperCase() === clientVoteDto.voterAddress.toUpperCase();
};

export const signDao = async (
  name: string,
  description: string,
  imageBase64: string,
  owners: string[],
  ownersMultisigThreshold: string,
  proposalTokenRequiredQuantity: string,
  tokenAddress: string,
  tokenType: string,
  tokenNetwork: string,
): Promise<string> => {
  const types = ['bytes', 'bytes', 'bytes', 'uint32', 'uint32', 'bytes32', 'address', 'bytes32'];
  const values = [
    ethers.toUtf8Bytes(name),
    ethers.toUtf8Bytes(description),
    ethers.toUtf8Bytes(imageBase64),
    Number(proposalTokenRequiredQuantity),
    Number(ownersMultisigThreshold),
    encodeBytes32String(tokenType),
    tokenAddress,
    encodeBytes32String(tokenNetwork),
  ];
  for (const owner of owners) {
    types.push('address');
    values.push(owner);
  }
  // Same as `abi.encodePacked` in Solidity
  const abiEncodedProposal = ethers.solidityPacked(types, values);
  const keccak256DataString = ethers.keccak256(abiEncodedProposal);
  // ethers.getBytes -> arrayify
  return ETH_CONNECTION_SERVICE.getSigner().signMessage(ethers.getBytes(keccak256DataString));
};
