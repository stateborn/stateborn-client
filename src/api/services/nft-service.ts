// import { ethers } from 'ethers';
// import * as NFT_CONTRACT_ABI from 'src/api/contracts/NFT_ABI.json';
// import { useEthConnectionStore } from 'stores/eth-connection-store';
// import { toRaw } from 'vue';
// import { Nft } from 'src/api/model/nft/nft';
// import { Buffer } from 'buffer';
//
// export const getNft = async (address: string, tokenId: number): Promise<Nft | undefined> => {
//   const provider = toRaw(useEthConnectionStore().provider);
//   if (useEthConnectionStore().isConnected) {
//     const tokenUri: string = await (new ethers.Contract(
//       address,
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
