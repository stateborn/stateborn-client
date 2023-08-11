import { ETH_CONNECTION_SERVICE } from 'src/api/services/eth-connection-service';
import { ethers, InterfaceAbi } from 'ethers';
import { getIpfsImage, getIpfsJsonFile } from 'src/api/services/ipfs-service';
import { Buffer } from 'buffer';
import { IpfsNftInfo } from 'src/api/model/ipfs-nft-info';
import { isEthAddress } from 'src/api/services/utils-service';

export class Erc721Service {
  private readonly abi: InterfaceAbi = [
    // Some details about the token
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function balanceOf(address) view returns (uint)',
    'function tokenURI(uint256 tokenId) view returns (string)',
    // OPTIONALLY, mostly NFTs will have it as 0
    'function decimals() public view returns (uint8)',
    'function ownerOf(uint256 _tokenId) external view returns (address)'
  ];

  async readTokenBalance(userAddress: string, tokenAddress: string, decimals: string): Promise<string> {
    // Define the ABI for the ERC20 contract
    console.log('user address', userAddress, tokenAddress);

    // Create a new ethers contract with the ERC20 contract address and ABI
    const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProvider());

    // Call the balanceOf function for the user address
    const balance = await contract.balanceOf(userAddress);
    // TODO obtain correct value
    console.log('User balance is: ', ethers.formatUnits(balance, Number(decimals)));
    return ethers.formatUnits(balance, Number(decimals));
  }

  async readTokenData(tokenAddress: string): Promise<any> {
    if (tokenAddress.trim() !== '' && isEthAddress(tokenAddress)) {
      try {
        const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProvider());
        const nameRes = await contract.name();
        const symbolRes = await contract.symbol();
        await contract.tokenURI(1);
        let decimalsRes = '0';
        try {
          decimalsRes = (await contract.decimals()).toString();
        } catch (err) {
          // ignore it, probably will be thrown
        }
        console.log(`Token ${tokenAddress} data : ${nameRes} ${symbolRes} ${decimalsRes}`);
        return {nameRes, symbolRes, decimalsRes};
      } catch (err) {
        console.log(`Error reading token ${tokenAddress} data`, err);
        throw new Error(`Error reading token ${tokenAddress} data`);
      }
    } else {
      throw new Error(`Skip reading token data - invalid (empty/incorrect) token address: ${tokenAddress}`);
    }
  }

  async getOwnerOfNft(tokenAddress: string, tokenId: number): Promise<string> {
    try {
      const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProvider());
      return await contract.ownerOf(tokenId);
    } catch (err) {
      console.log(`Error reading token ${tokenAddress} data`, err);
      throw new Error(`Error reading token ${tokenAddress} data`);
    }
  }


  private sliceIpfxPrefix(uri: string): string {
    const ipfsPrefix = 'ipfs://';
    if (uri.toLowerCase().startsWith(ipfsPrefix)) {
      return uri.toLowerCase().slice(ipfsPrefix.length);
    } else {
      return uri;
    }
  }

  public async readIpfsTokenInfo(tokenAddress: string, tokenId: number): Promise<IpfsNftInfo | undefined> {
    try {
      const contract = new ethers.Contract(tokenAddress, this.abi, ETH_CONNECTION_SERVICE.getProviderQuickProvider());
      let tokenUri = await contract.tokenURI(tokenId);
      console.log(tokenUri);
      if (tokenUri.toLowerCase().startsWith('ipfs')) {
        const jsonFile = await getIpfsJsonFile(this.sliceIpfxPrefix(tokenUri));
        const image = await getIpfsImage(this.sliceIpfxPrefix(jsonFile.image));
        return new IpfsNftInfo(
          jsonFile.name,
          jsonFile.description,
          tokenId,
          `data:image/png;base64,${Buffer.from(image).toString('base64')}`,
        );
      } else {
        return undefined;
      }
    } catch (err) {
      console.log('Fetch NFT image failed: ', err);
      throw err;
    }
  }
}

export const ERC_721_SERVICE = new Erc721Service();
