import { TokenType } from 'src/api/model/ipfs/token-type';

export class ClientToken {

  address: string;
  name: string;
  symbol: string;
  type: TokenType;
  chainId: string;
  decimals: string;

  constructor(address: string, name: string, symbol: string, type: TokenType, chainId: string, decimals: string) {
    this.address = address;
    this.name = name;
    this.symbol = symbol;
    this.type = type;
    this.chainId = chainId;
    this.decimals = decimals;
  }
}
