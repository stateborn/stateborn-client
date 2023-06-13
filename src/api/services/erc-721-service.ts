import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { ethers, InterfaceAbi } from 'ethers';

export class Erc721Service {
  private readonly abi: InterfaceAbi = [
    // Some details about the token
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function tokenURI(uint256 tokenId) view returns (string)',
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
      await contract.tokenURI(0);
      console.log(`Token ${tokenAddress} data : ${nameRes} ${symbolRes}`);
      return { nameRes, symbolRes };
    } catch (err) {
      console.log(`Error reading token ${tokenAddress} data`, err);
      throw new Error(`Error reading token ${tokenAddress} data`);
    }
  }

// Define
}
export const ERC_721_SERVICE = new Erc721Service();
