import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { getSettingsFromStorage } from 'src/api/services/settings-local-storage-service';

const settings = getSettingsFromStorage();
let IPFS_CLIENT: IPFSHTTPClient;
export const reconnectToIpfs = async (address: string) => {
  try {
    IPFS_CLIENT = await create({ url: address, timeout: '10000' });
  } catch (err) {
    throw err;
  }
}
reconnectToIpfs(settings.ipfsGateway);

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
