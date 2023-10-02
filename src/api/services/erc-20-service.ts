import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { ethers, getAddress, InterfaceAbi } from 'ethers';
import { isEthAddress } from 'src/api/services/utils-service';
import { ERC20__factory } from 'src/typechain-types/factories/@openzeppelin/contracts/token/ERC20';

export class Erc20Service {
  private readonly abi: InterfaceAbi = [
    // Some details about the token
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() public view returns (uint8)',
    // Get the account balance
    'function balanceOf(address) view returns (uint)',

    // Some details about the token supply
    'function totalSupply() view returns (uint256)',
  ];
  async readTokenBalance(userAddress: string, tokenAddress: string, decimals: string): Promise<string> {
    // Create a new ethers contract with the ERC20 contract address and ABI
    const contract = ERC20__factory.connect(tokenAddress, ETH_CONNECTION_SERVICE.getProvider());
    // Call the balanceOf function for the user address
    const balance = await contract.balanceOf(userAddress);
    return Number(ethers.formatUnits(balance, Number(decimals))).toFixed(0);
  }

  async readTokenData(tokenAddress: string): Promise<any> {
    if (tokenAddress.trim() !== '' && isEthAddress(tokenAddress)) {
      try {
        const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProvider());
        const nameRes = await contract.name();
        const symbolRes = await contract.symbol();
        const decimalsRes = (await contract.decimals()).toString();
        console.log(`Token ${tokenAddress} data : ${nameRes} ${symbolRes} ${decimalsRes}`);
        return {nameRes, symbolRes, decimalsRes};
      } catch (err) {
        console.log(`Error reading token ${tokenAddress} data`, err);
        throw new Error(`Error reading token ${tokenAddress} data`);
      }
    } else {
      console.log()
      throw new Error(`Skip reading token data - invalid (empty/incorrect) token address: ${tokenAddress}`);
    }
  }

}
export const ERC_20_SERVICE = new Erc20Service();
