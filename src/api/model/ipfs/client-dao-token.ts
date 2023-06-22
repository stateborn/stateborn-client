import { DaoTokenType } from 'src/api/model/ipfs/dao-token-type';

export class ClientDaoToken {

  address: string;
  name: string;
  symbol: string;
  type: DaoTokenType;
  chainId: string;
  // only for ERC-20
  totalSupply?: string;

  constructor(address: string, name: string, symbol: string, type: DaoTokenType, chainId: string, totalSupply?: string) {
    this.address = address;
    this.name = name;
    this.symbol = symbol;
    this.type = type;
    this.chainId = chainId;
    this.totalSupply = totalSupply;
  }
}
