import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { formatEther, parseEther } from 'viem';

export const getLatestBlockNumber = async (): Promise<number> => {
  return await ETH_CONNECTION_SERVICE.getProvider().getBlockNumber();
}

export const getBalance = async (address: string): Promise<bigint> => {
  return await ETH_CONNECTION_SERVICE.getProvider().getBalance(address);
}

export const toEth = (balanceWei: bigint): string => {
  console.log('robie balance wei', balanceWei);
    return formatEther(balanceWei);
}

export const toWei = (ether: string): bigint => {
    return parseEther(Number(ether).toFixed(18));
}

export const toWeiNumber = (ether: number): bigint => {
  const zwrotka = BigInt(ether * 1e18);
  return zwrotka;
}
