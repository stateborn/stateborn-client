import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { ethers, InterfaceAbi } from 'ethers';

export class Erc20Service {
  private readonly abi: InterfaceAbi = [
    // Some details about the token
    'function name() view returns (string)',
    'function symbol() view returns (string)',

    // Get the account balance
    'function balanceOf(address) view returns (uint)',

    // Some details about the token supply
    'function totalSupply() view returns (uint256)',
  ];
  async readTokenBalance(userAddress: string, tokenAddress: string): Promise<string> {
    // Define the ABI for the ERC20 contract
    console.log('user address', userAddress, tokenAddress);

    // Create a new ethers contract with the ERC20 contract address and ABI
    const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProvider());

    // Call the balanceOf function for the user address
    const balance = await contract.balanceOf(userAddress);

    console.log('User balance is: ', ethers.formatUnits(balance, 18));
    // return ethers.formatUnits(balance, 18);
    return "800";
  }

  async readTokenData(tokenAddress: string): Promise<any> {
    try {
      const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProvider());
      const nameRes = await contract.name();
      const symbolRes = await contract.symbol();
      const supplyRes = await contract.totalSupply();
      console.log(`Token ${tokenAddress} data : ${nameRes} ${symbolRes} ${supplyRes}`);
      return { nameRes, symbolRes, supplyRes };
    } catch (err) {
      console.log(`Error reading token ${tokenAddress} data`, err);
      throw new Error(`Error reading token ${tokenAddress} data`);
    }
  }

// Define
}
export const ERC_20_SERVICE = new Erc20Service();
