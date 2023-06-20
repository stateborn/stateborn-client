import { DaoTokenType } from 'src/api/model/ipfs/dao-token-type';
import { ERC_20_SERVICE } from 'src/api/services/erc-20-service';
import { ERC_721_SERVICE } from 'src/api/services/erc-721-service';

export class TokenService {

  async readTokenBalance(userAddress: string, tokenAddress: string, tokenType: DaoTokenType): Promise<string> {
    if (process.env.IS_LOCALHOST) {
      return '800';
    }
    if (tokenType === DaoTokenType.ERC20) {
      return await ERC_20_SERVICE.readTokenBalance(userAddress, tokenAddress);
    } else {
      return await ERC_721_SERVICE.readTokenBalance(userAddress, tokenAddress);
    }
  }
// Define
}
export const TOKEN_SERVICE = new TokenService();
