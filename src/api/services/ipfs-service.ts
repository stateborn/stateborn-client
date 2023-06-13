import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { IPFS_GATEWAY_URL } from 'src/api/properties';
import { Buffer } from 'buffer';

export const IPFS_CLIENT: IPFSHTTPClient = create({ url: IPFS_GATEWAY_URL });

export const sliceIpfsPrefix = (hash: string): string => hash.substring(7, hash.length);

export const getIpfsJsonFile = async (hash: string): Promise<any | undefined> => {
  const data = await IPFS_CLIENT.cat(hash);
  let content: any[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of data) {
    content = [...content, ...chunk];
  }
  return JSON.parse(new TextDecoder().decode(Buffer.from(content)).toString());
};

export const getIpfsImage = async (hash: string): Promise<Buffer> => {
  console.log(hash);
  const data = await IPFS_CLIENT.cat(hash);
  let content: any[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of data) {
    content = [...content, ...chunk];
  }
  return Buffer.from(content);
};
