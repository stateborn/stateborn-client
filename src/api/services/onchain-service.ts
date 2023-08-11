import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { Contract } from 'ethers';
const daoFactoryAabi =  [
  'function createDao() public',
  'event DAOCreated(address daoAddress)',
];

const proposalAbi = [
  'function getChallengeSequencerEndTime() public view returns (uint256)',
  'function isPassed() public view returns (bool)',
  'function executed() public view returns (bool)',
];
export const createDaoOnChain = (chainId: string): Promise<string> => {
  const contract = new Contract(getDaoFactoryAddress(chainId), daoFactoryAabi, ETH_CONNECTION_SERVICE.getSigner());
  const promise: Promise<string> = new Promise((resolve, reject) => {
    contract.on("DAOCreated", (daoAddress: string) => {
      console.log('DAO created:', daoAddress);
      resolve(daoAddress);
    });
  });
  contract.createDao();
  return promise;
}

export const getChallengeSequencerEndTimeEpoch = async (proposalAddress: string): Promise<number> => {
  console.log('dostlaem taki adres', proposalAddress);
  const contract = new Contract(proposalAddress, proposalAbi, ETH_CONNECTION_SERVICE.getProviderQuickProvider());
  const res = await contract.getChallengeSequencerEndTime()
  return Number(res) * 1000;
}

export const getIsProposalPassed = async (proposalAddress: string): Promise<boolean> => {
  const contract = new Contract(proposalAddress, proposalAbi, ETH_CONNECTION_SERVICE.getProviderQuickProvider());
  return await contract.isPassed();
}

const getDaoFactoryAddress = (chainId: string): string => {
  switch (chainId) {
    case '1':
      return '0x0';
    case '42161':
      return '0x0';
    case '137':
      return '0x0';
    case process.env.DEVELOPMENT_NETWORK_CHAIN_ID:
      return process.env.DEVELOPMENT_NETWORK_DAO_FACTORY_ADDRESS!;
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }
}
