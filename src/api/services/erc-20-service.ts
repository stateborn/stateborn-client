import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { ethers, InterfaceAbi } from 'ethers';

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
    // Define the ABI for the ERC20 contract
    console.log('user address', userAddress, tokenAddress);

    // Create a new ethers contract with the ERC20 contract address and ABI
    const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProvider());

    // Call the balanceOf function for the user address
    const balance = await contract.balanceOf(userAddress);

    console.log('User balance is: ', ethers.formatUnits(balance, Number(decimals)));
    console.log('User balance is given: ', balance);
    return ethers.formatUnits(balance, Number(decimals));
  }

  async readTokenData(tokenAddress: string): Promise<any> {
    try {
      const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProvider());
      const nameRes = await contract.name();
      const symbolRes = await contract.symbol();
      const decimalsRes = (await contract.decimals()).toString();
      console.log(`Token ${tokenAddress} data : ${nameRes} ${symbolRes} ${decimalsRes}`);
      return { nameRes, symbolRes, decimalsRes };
    } catch (err) {
      console.log(`Error reading token ${tokenAddress} data`, err);
      throw new Error(`Error reading token ${tokenAddress} data`);
    }
  }

}
export const ERC_20_SERVICE = new Erc20Service();
