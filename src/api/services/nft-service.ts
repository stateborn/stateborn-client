// import { ethers } from 'ethers';
// import { NFT_CONTRACT_ADDRESS } from 'src/api/properties';
// import * as NFT_CONTRACT_ABI from 'src/api/contracts/NFT_ABI.json';
// import { useEthConnectionStore } from 'stores/eth-connection-store';
// import { toRaw } from 'vue';
// import { getIpfsImage, getIpfsJsonFile, sliceIpfsPrefix } from 'src/api/infrastructure/ipfs-service';
// import { Nft } from 'src/api/model/nft/nft';
// import { Buffer } from 'buffer';
//
// export const getNft = async (tokenId: number): Promise<Nft | undefined> => {
//   const provider = toRaw(useEthConnectionStore().provider);
//   if (useEthConnectionStore().isConnected) {
//     const tokenUri: string = await (new ethers.Contract(
//       NFT_CONTRACT_ADDRESS,
//       NFT_CONTRACT_ABI.abi,
//       provider,
//     )).tokenURI(tokenId);
//     const jsonFile = await getIpfsJsonFile(sliceIpfsPrefix(tokenUri));
//     const image = await getIpfsImage(sliceIpfsPrefix(jsonFile.image));
//     const thumbnail = await getIpfsImage(sliceIpfsPrefix(jsonFile.thumbnail));
//     const nft = new Nft(
//       jsonFile.name,
//       jsonFile.description,
//       jsonFile.attributes,
//       Buffer.from(image).toString('base64'),
//       Buffer.from(thumbnail).toString('base64'),
//     );
//     console.log('nft', nft);
//     return nft;
//   }
//   return undefined;
// };
