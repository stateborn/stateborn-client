import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { useEthConnectionStore } from 'stores/eth-connection-store';
import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';

export const changeNetwork = async (chainId: string) => {
  const ethConnection = useEthConnectionStore();
  const account = ethConnection.account;
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: TOKEN_SERVICE.getChainIdHex(chainId) }],
  });
  await ETH_CONNECTION_SERVICE.connectWithMetamask();
  let networkName = TOKEN_SERVICE.getNetworkName(chainId);
  let networkIcon = TOKEN_SERVICE.getNetworkIcon(chainId);
  await ethConnection.setConnected(account, chainId, networkName, networkIcon, true);
};

export const networkChanged = async (chainId: string, isMetamask: boolean) => {
  const ethConnection = useEthConnectionStore();
  if (ethConnection.chainId.toLowerCase() !== chainId.toLowerCase()) {
    const account = ethConnection.account;
    let networkName = TOKEN_SERVICE.getNetworkName(chainId);
    let networkIcon = TOKEN_SERVICE.getNetworkIcon(chainId);
    await ethConnection.setConnected(account, chainId, networkName, networkIcon, isMetamask);
  }
};
