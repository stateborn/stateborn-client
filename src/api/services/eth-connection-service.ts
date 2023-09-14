import { BrowserProvider, ethers } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { TOKEN_SERVICE } from 'src/api/services/token-service';
import { networkChanged } from 'src/api/services/change-network-service';
import { Notify } from 'quasar';
import { useEthConnectionStore } from 'stores/eth-connection-store';

export class EthConnectionService {

    private isConnected: boolean;
    // true - walletconnect, false - metamask/rabby
    private isCurrentlyWalletConnect: boolean;
    private walletConnectProvider: any | undefined;
    private provider: ethers.BrowserProvider | undefined;
    private signer: ethers.Signer | undefined;
    private account: string;
    private currentChainIdHex: string;
    private quickProvider: ethers.BrowserProvider | undefined;

    constructor() {
        this.isConnected = false;
        this.isCurrentlyWalletConnect = false;
        this.provider = undefined;
        this.quickProvider = new ethers.BrowserProvider(window.ethereum);
        this.signer = undefined;
        this.account = '';
        this.currentChainIdHex = '';
    }

    public isConnectedViaWalletConnect(): boolean {
        return this.isCurrentlyWalletConnect;
    }

    async connectWithWalletConnect(chainId: string = '1'): Promise<string> {
        const chainIds: number[] = TOKEN_SERVICE.supportedNetworks.map(_ => Number(_.chainId)).filter(_ => _ !== Number(chainId));
        const provider = await EthereumProvider.init({
            projectId: '06171e9ea469757d6ef1526f81d92900', // REQUIRED your projectId
            chains: [Number(chainId)], // REQUIRED supported chains [1, 3, 4, 5, 42, 100, 31337
            optionalChains: chainIds,
            showQrModal: true, // REQUIRED set to "true" to use @walletconnect/modal
            qrModalOptions: {
                themeVariables: {
                    '--wcm-accent-fill-color': 'white',
                    '--wcm-background-color': '#424242',
                }
            }
        });
        this.provider = new ethers.BrowserProvider(provider);
        this.currentChainIdHex = TOKEN_SERVICE.getChainIdHex(chainId);
        console.log('chainId', this.currentChainIdHex);
        if (!TOKEN_SERVICE.isSupportedNetwork(this.currentChainIdHex)) {
            this.isConnected = false;
            this.isCurrentlyWalletConnect = false;
            Notify.create({
                message: `Unsupported blockchain network. Please choose: ${TOKEN_SERVICE.getSupportedNetworksListAsString()}.`,
                position: 'top-right',
                color: 'red-8',
                closeBtn: true
            });
            return '';
        } else {
            this.isConnected = true;
            this.quickProvider = undefined;
            this.isCurrentlyWalletConnect = true;
            this.walletConnectProvider = provider;
            provider.on('chainChanged', (chainIdHex: string) => {
                this.onNetworkChanged(chainIdHex, this.isCurrentlyWalletConnect);
            });
            const promise = new Promise<string>((resolve, reject) => {
                provider.on("accountsChanged", async (accounts: string[]) => {
                    resolve(accounts[0]);
                });
            });
            await provider.connect();
            let networkName = TOKEN_SERVICE.getNetworkName(TOKEN_SERVICE.getChainId(this.currentChainIdHex));
            let networkIcon = TOKEN_SERVICE.getNetworkIcon(TOKEN_SERVICE.getChainId(this.currentChainIdHex));
            const ethConnectionStore = useEthConnectionStore();
            const account = await promise;
            this.signer = await this.provider!.getSigner();
            this.account = account;
            await ethConnectionStore.setConnected(account, TOKEN_SERVICE.getChainId(this.currentChainIdHex), networkName, networkIcon, false);
            return this.account;
        }
    }
    private async onNetworkChanged(chainIdHex: string, isCurrentlyWalletConnect: boolean) {
        if (chainIdHex.toLowerCase() !== this.currentChainIdHex && this.isConnected) {
            const network = TOKEN_SERVICE.supportedNetworks.filter(_ => _.chainIdHex.toLowerCase() === chainIdHex.toLowerCase())[0];
            if (network !== undefined) {
                console.log('zmieniam sie', this.isCurrentlyWalletConnect, this.isConnected);
                this.currentChainIdHex = TOKEN_SERVICE.getChainId(chainIdHex);
                if (this.isCurrentlyWalletConnect) {
                    this.provider = new BrowserProvider(this.walletConnectProvider);
                } else {
                    this.provider = new BrowserProvider(window.ethereum);
                }
                await networkChanged(network.chainId, !isCurrentlyWalletConnect);
                Notify.create({ message: `Changed network to ${TOKEN_SERVICE.getNetworkName(TOKEN_SERVICE.getChainId(chainIdHex))}!`, position: 'top-right', color: 'green-8' });
            } else {
                console.log(`Changed to unsupported network ${chainIdHex}!`);
                Notify.create({ message: `Disconnected. Wallet network changed to unsupported network with chain ID: ${chainIdHex}`, position: 'top-right', color: 'red-8',   });
                await this.disconnect();
            }
        } else {
            console.log('Ignoring on network changed event because chainId is the same as current or is not connected');
        }
    }
    async connectWithMetamask(): Promise<string> {
        if (window.ethereum === undefined) {
          throw new Error('Metamask not installed');
        }
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.currentChainIdHex = window.ethereum.chainId.toString();
        this.quickProvider = undefined;
        //todo problem jest taki ze nawet po zmianie networku w metamasku
        //window.ethereum pokazuje stara, pierwsza siec jaka wladowal na starcie
        console.log('window etehereum zwraca current chain', this.currentChainIdHex, window.ethereum);
        if (!TOKEN_SERVICE.isSupportedNetwork(this.currentChainIdHex)) {
            this.isConnected = false;
            this.isCurrentlyWalletConnect = false;
            Notify.create({
                message: `Unsupported blockchain network. Please choose: ${TOKEN_SERVICE.getSupportedNetworksListAsString()}.`,
                position: 'top-right',
                color: 'red-8',
                closeBtn: true
            });
            return '';
        } else {
            this.isConnected = true;
            this.isCurrentlyWalletConnect = false;
            window.ethereum.on('chainChanged', (chainIdHex: string) => {
                this.onNetworkChanged(chainIdHex, this.isCurrentlyWalletConnect);
            });
            this.signer = await this.provider.getSigner();
            const accounts: string[] = await window.ethereum.request({method: 'eth_requestAccounts'});
            this.account = accounts[0];
            let networkName = TOKEN_SERVICE.getNetworkName(TOKEN_SERVICE.getChainId(this.currentChainIdHex));
            let networkIcon = TOKEN_SERVICE.getNetworkIcon(TOKEN_SERVICE.getChainId(this.currentChainIdHex));
            const ethConnectionStore = useEthConnectionStore();
            await ethConnectionStore.setConnected(this.account, TOKEN_SERVICE.getChainId(this.currentChainIdHex), networkName, networkIcon, true);
            return this.account;
        }
    }

    async disconnect(): Promise<void> {
        this.provider = undefined;
        this.signer = undefined;
        this.isConnected = false;
        this.isCurrentlyWalletConnect = false;
        this.account = '';
        this.quickProvider = new ethers.BrowserProvider(window.ethereum);
        const ethConnectionStore = useEthConnectionStore();
        await ethConnectionStore.setConnected('', '', '', '', ETH_CONNECTION_SERVICE.isConnectedViaWalletConnect());
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
