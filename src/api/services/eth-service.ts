import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';

export const getLatestBlockNumber = async (): Promise<number> => {
  return await ETH_CONNECTION_SERVICE.getProvider().getBlockNumber();
}
