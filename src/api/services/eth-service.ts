import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { formatEther } from 'ethers';
import { toPreciseDecimal } from 'src/api/services/decimal-service';

const BIG_INT_ZERO = BigInt(0);
const TEN_POW_18 = toPreciseDecimal(10).pow(18)
const SINGLE_WEI = BigInt(1);

export const getLatestBlockNumber = async (): Promise<number> => {
  return await ETH_CONNECTION_SERVICE.getProvider().getBlockNumber();
}

export const getBalance = async (address: string): Promise<bigint> => {
  return await ETH_CONNECTION_SERVICE.getProvider().getBalance(address);
}

export const toEth = (balanceWei: bigint): string => {
  return formatEther(balanceWei);
}

export const toWei = (ether: string): bigint => {
  if (ether && ether.trim()) {
    return toWeiNumber(Number(ether));
  } else {
    return BIG_INT_ZERO;
  }
}
export const toWeiNumber = (ether?: number): bigint => {
  if (ether) {
    try {
      return BigInt(toPreciseDecimal(ether).mul(TEN_POW_18).toString());
    } catch (error) {
      console.log(`Ether amount is too small to send: less than 1 wei. Returning value: 1 (single wei)`);
      return SINGLE_WEI;
    }
  } else {
    return BIG_INT_ZERO;
  }
}
