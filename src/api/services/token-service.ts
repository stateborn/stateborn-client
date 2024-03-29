import { TokenType } from 'src/api/model/ipfs/token-type';
import { ERC_20_SERVICE } from 'src/api/services/erc-20-service';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';

interface SupportedNetwork {
  chainId: string;
  name: string;
  icon: string;
  chainIdHex: string;
}
export class TokenService {

  public readonly supportedNetworks: SupportedNetwork[] = process.env.IS_LOCALHOST ?
    [
      {
        chainId: '1',
        name: 'Ethereum Mainnet',
        icon: '/ethereum.svg',
        chainIdHex: '0x1',
        currency: 'ETH',
        currencyName: 'Ether',
        currencyIcon: '/ether.webp',
      },
      {
        chainId: '42161',
        name: 'Arbitrum One',
        icon: '/arbitrum.svg',
        chainIdHex: '0xA4B1',
        currency: 'ETH',
        currencyName: 'Ether',
        currencyIcon: '/ether.webp',
      },
      {
        chainId: '137',
        name: 'Polygon Mainnet',
        icon: '/polygon.svg',
        chainIdHex: '0x89',
        currency: 'MATIC',
        currencyName: 'Matic',
        currencyIcon: '/matic.svg',
      },
      {
        chainId: process.env.DEVELOPMENT_NETWORK_CHAIN_ID!,
        name: process.env.DEVELOPMENT_NETWORK_NAME!,
        icon: process.env.DEVELOPMENT_NETWORK_ICON_NAME!,
        chainIdHex: process.env.DEVELOPMENT_NETWORK_CHAIN_ID_HEX!,
        currencyName: 'Ether',
        currency: 'LOCAL-ETH',
        currencyIcon: '/ether.webp',
      },
    ]
      :
    [
    {
      chainId: '1',
      name: 'Ethereum Mainnet',
      icon: '/ethereum.svg',
      chainIdHex: '0x1',
      currency: 'ETH',
      currencyName: 'Ether',
      currencyIcon: '/ether.webp',
    },
    {
      chainId: '42161',
      name: 'Arbitrum One',
      icon: '/arbitrum.svg',
      chainIdHex: '0xA4B1',
      currency: 'ETH',
      currencyName: 'Ether',
      currencyIcon: '/ether.webp',
    },
    {
      chainId: '137',
      name: 'Polygon Mainnet',
      icon: '/polygon.svg',
      chainIdHex: '0x89',
      currency: 'MATIC',
      currencyName: 'Matic',
      currencyIcon: '/matic.svg',
    },
  ]

  async readTokenBalance(userAddress: string, tokenAddress: string, tokenType: TokenType, decimals: string): Promise<string> {
    if (tokenType === TokenType.ERC20) {
      return await ERC_20_SERVICE.readTokenBalance(userAddress, tokenAddress, decimals);
    } else {
      return await ERC_721_SERVICE.readTokenBalance(userAddress, tokenAddress, decimals);
    }
  }

  private getProperty(chainId: string, property: string) {
    const network: any = this.supportedNetworks.filter(_ => _.chainId === chainId)[0];
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

  getChainId(chainIdHex: string): string {
    return this.supportedNetworks.filter(_ => _.chainIdHex.toLowerCase() === chainIdHex.toLowerCase())[0].chainId;
  }

  getNetworkIcon(chainId: string): string {
    return this.getProperty(chainId, 'icon');
  }

  getNetworkCurrency(chainId: string): string {
    return this.getProperty(chainId, 'currency');
  }

  getNetworkCurrencyIcon(chainId: string): string {
    return this.getProperty(chainId, 'currencyIcon');
  }

  getCurrencyName(chainId: string): string {
    return this.getProperty(chainId, 'currencyName');
  }

  isSupportedNetwork(chainIdHex: string): boolean {
    return  this.supportedNetworks.filter(_ => _.chainIdHex.toLowerCase() === chainIdHex.toLowerCase()).length > 0
  }

  getSupportedNetworksListAsString(): string {
    return this.supportedNetworks.map(_ => _.name).join(', ');
  }

}
export const TOKEN_SERVICE = new TokenService();
