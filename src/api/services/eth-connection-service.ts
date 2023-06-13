import { ethers } from 'ethers';

export class EthConnectionService {
  private isConnected: boolean;
  private provider: ethers.BrowserProvider | undefined;
  private signer: ethers.Signer | undefined;
  private account: string;

  constructor() {
    this.isConnected = false;
    this.provider = undefined;
    this.signer = undefined;
    this.account = '';
  }

  async connect(): Promise<string> {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    this.isConnected = true;
    const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.account = accounts[0];
    return this.account;
  }

  getSigner(): ethers.Signer {
    if (!this.isConnected) {
      throw new Error('Not connected');
    }
    return this.signer!;
  }

  getProvider(): ethers.BrowserProvider {
    if (!this.isConnected) {
      throw new Error('Not connected');
    }
    return this.provider!;
  }
}

export const ETH_CONNECTION_SERVICE = new EthConnectionService();
