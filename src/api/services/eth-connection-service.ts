import { ethers } from 'ethers';

export class EthConnectionService {

  private isConnected: boolean;
  private provider: ethers.BrowserProvider | undefined;
  private signer: ethers.Signer | undefined;
  private account: string;
  private quickProvider: ethers.BrowserProvider | undefined;

  constructor() {
    this.isConnected = false;
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.quickProvider = undefined;
    this.signer = undefined;
    this.account = '';
  }

  async connect(): Promise<string> {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    this.isConnected = true;
    const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.account = accounts[0];
    this.quickProvider = undefined;
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

  getProviderQuickProvider(): ethers.BrowserProvider {
    if (this.provider) {
      return this.provider;
    } else {
      return this.quickProvider!;
    }
  }

}

export const ETH_CONNECTION_SERVICE = new EthConnectionService();
