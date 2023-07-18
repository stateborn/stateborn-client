# stateborn-client
stateborn-client is a web client for [stateborn.org](https://stateborn.org) project.
It interact with stateborn-backend, IPFS and blockchain (through wallet extension) allowing users to operate daos, proposals and votes.
## Architecutre
![stateborn architecture](stateborn-client.svg)
## Development
Below configuration is located in `quasar.conf.js` file.
1. Client starts at port `8080`
2. Default DEV server address: `http://localhost:8000`
2. Default IPFS API url (`DEFAULT_IPFS_GATEWAY`): `http://localhost:8080/api/v0`

Default local blockchain network settings:
- `DEVELOPMENT_NETWORK_CHAIN_ID: '31337'`
- `DEVELOPMENT_NETWORK_CHAIN_ID_HEX: '0x7A69'`,
- `DEVELOPMENT_NETWORK_NAME: 'Hardhat localhost'`,
- `DEVELOPMENT_NETWORK_ICON_NAME: '/hardhat.png'`,

### Installation & start
1. `nvm use 18.10.0`
2. `npm install`
3. `npm run dev`

## Production
Set IPFS gateway address for production `DEFAULT_IPFS_GATEWAY`. Default: `https://stateborn.org/api/v0`

### Build
1. `nvm use 18.10.0`
2. `npm run build`

Build is generated in `dist` folder.
