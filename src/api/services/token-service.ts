import { DaoTokenType } from 'src/api/model/ipfs/dao-token-type';
import { ERC_20_SERVICE } from 'src/api/services/erc-20-service';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';

interface SupportedNetwork {
  chainId: string;
  name: string;
  icon: string;
  chainIdHex: string;
}
export class TokenService {

  private readonly supportedNetwork: SupportedNetwork[] = process.env.IS_LOCALHOST ?
    [
      {
        chainId: '1',
        name: 'Ethereum Mainnet',
        icon: '/ethereum.svg',
        chainIdHex: '0x1',
      },
      {
        chainId: '42161',
        name: 'Arbitrum One',
        icon: '/arbitrum.svg',
        chainIdHex: '0xA4B1',
      },
      {
        chainId: '137',
        name: 'Polygon Mainnet',
        icon: '/polygon.svg',
        chainIdHex: '0x89',
      },
      {
        chainId: process.env.DEVELOPMENT_NETWORK_CHAIN_ID,
        name: process.env.DEVELOPMENT_NETWORK_NAME,
        icon: process.env.DEVELOPMENT_NETWORK_ICON_NAME,
        chainIdHex: process.env.DEVELOPMENT_NETWORK_CHAIN_ID_HEX,
      },
    ]
      :
    [
    {
      chainId: '1',
      name: 'Ethereum Mainnet',
      icon: '/ethereum.svg',
      chainIdHex: '0x1',
    },
    {
      chainId: '42161',
      name: 'Arbitrum One',
      icon: '/arbitrum.svg',
      chainIdHex: '0xA4B1',
    },
    {
      chainId: '137',
      name: 'Polygon Mainnet',
      icon: '/polygon.svg',
      chainIdHex: '0x89',
    },
  ]

  async readTokenBalance(userAddress: string, tokenAddress: string, tokenType: DaoTokenType, decimals: string): Promise<string> {
    if (tokenType === DaoTokenType.ERC20) {
      return await ERC_20_SERVICE.readTokenBalance(userAddress, tokenAddress, decimals);
    } else {
      return await ERC_721_SERVICE.readTokenBalance(userAddress, tokenAddress, decimals);
    }
  }

  private getProperty(chainId: string, property: string) {
    const network = this.supportedNetwork.filter(_ => _.chainId === chainId)[0];
    if (network !== undefined) {
      return network[property];
    } else {
      throw new Error(`Unsupported chainId ${chainId}`);
    }
  }

  getNetworkName(chainId: string): string {
    return this.getProperty(chainId, 'name');
  }

  getChainIdHex(chainId: string): string {
    return this.getProperty(chainId, 'chainIdHex');
  }


  getNetworkIcon(chainId: string): string {
    return this.getProperty(chainId, 'icon');
  }

  isSupportedNetwork(chainId: string): boolean {
    return  this.supportedNetwork.filter(_ => _.chainId === chainId).length > 0
  }

  getSupportedNetworksListAsString(): string {
    return this.supportedNetwork.map(_ => _.name).join(', ');
  }

}
export const TOKEN_SERVICE = new TokenService();
