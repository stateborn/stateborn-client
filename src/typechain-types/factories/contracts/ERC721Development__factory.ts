/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ERC721Development,
  ERC721DevelopmentInterface,
} from "../../contracts/ERC721Development";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "string",
        name: "baseUri",
        type: "string",
      },
    ],
    name: "createNFT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60803462000312576001600160401b039060409080820183811182821017620002fc578252600e81526020926d11195d995b1bdc1b595b9d13919560921b84830152825183810181811083821117620002fc57845260048152631113919560e21b85820152825190828211620002fc5760008054926001958685811c95168015620002f1575b89861014620002dd578190601f958681116200028a575b508990868311600114620002265784926200021a575b5050600019600383901b1c191690861b1781555b8151938411620002065784548581811c91168015620001fb575b88821014620001e7578381116200019f575b508692841160011462000139578394959650926200012d575b5050600019600383901b1c191690821b1790555b51610f739081620003188239f35b0151905038806200010b565b9190601f1984169685845280842093905b8882106200018757505083859697106200016d575b505050811b0190556200011f565b015160001960f88460031b161c191690553880806200015f565b8087859682949686015181550195019301906200014a565b8582528782208480870160051c8201928a8810620001dd575b0160051c019086905b828110620001d1575050620000f2565b838155018690620001c1565b92508192620001b8565b634e487b7160e01b82526022600452602482fd5b90607f1690620000e0565b634e487b7160e01b81526041600452602490fd5b015190503880620000b2565b8480528a85208994509190601f198416865b8d82821062000273575050841162000259575b505050811b018155620000c6565b015160001960f88460031b161c191690553880806200024b565b8385015186558c9790950194938401930162000238565b9091508380528984208680850160051c8201928c8610620002d3575b918a91869594930160051c01915b828110620002c45750506200009c565b8681558594508a9101620002b4565b92508192620002a6565b634e487b7160e01b83526022600452602483fd5b94607f169462000085565b634e487b7160e01b600052604160045260246000fd5b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c91826301ffc9a7146108b25750816306fdde0314610805578163081812fc146107e5578163095ea7b31461067757816323b872dd1461064d57816342842e0e146106005781636352211e146105cf57816370a082311461053957816395d89b411461043e578163a22cb46514610372578163a56140331461024a578163b88d4fde146101e3578163c87b56dd1461010f575063e985e9c5146100bf57600080fd5b3461010b578060031936011261010b5760ff816020936100dd61095d565b6100e5610978565b6001600160a01b0391821683526005875283832091168252855220549151911615158152f35b5080fd5b83833461010b57602036600319011261010b5761013461012f8435610db3565b610a4c565b80519160808301908382106001600160401b038311176101d057506101cc93508152604c82527f697066733a2f2f626166796265696773326765613562617575727534636e656360208301527f3479357162697478336135663733667178336f6f336877646a746d6e69733269818301526b373c979b9b1898173539b7b760a11b60608301525191829160208352602083019061091d565b0390f35b634e487b7160e01b815260418552602490fd5b83903461010b57608036600319011261010b576101fe61095d565b610206610978565b906064356001600160401b0381116102465736602382011215610246576102439381602461023993369301359101610a15565b9160443591610b42565b80f35b8480fd5b8391503461010b578260031936011261010b5761026561095d565b906024356001600160401b03811161036e573660238201121561036e576102959036906024818501359101610a15565b506006805460010190819055916001600160a01b031690811561032b575081906020946102ca6102c484610db3565b15610ef1565b6102d66102c484610db3565b81855260038652808520805460010190558285526002865280852080546001600160a01b0319168317905551937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a48152f35b606490602086519162461bcd60e51b8352820152602060248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152fd5b8380fd5b9190503461043a578060031936011261043a5761038d61095d565b9060243591821515809303610246576001600160a01b0316923384146103fc5750338452600560205280842083855260205280842060ff1981541660ff8416179055519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a380f35b6020606492519162461bcd60e51b8352820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b6044820152fd5b8280fd5b8284346105365780600319360112610536578151918160019283549384811c9181861695861561052c575b6020968785108114610519578899509688969785829a5291826000146104f25750506001146104b5575b5050506101cc92916104a69103856109c3565b5192828493845283019061091d565b91908693508083528383205b8284106104da57505050820101816104a66101cc610493565b8054848a0186015288955087949093019281016104c1565b60ff19168782015293151560051b860190930193508492506104a691506101cc9050610493565b634e487b7160e01b835260228a52602483fd5b92607f1692610469565b80fd5b8391503461010b57602036600319011261010b576001600160a01b0361055d61095d565b1690811561057a5760208480858581526003845220549051908152f35b608490602085519162461bcd60e51b8352820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152fd5b82843461053657602036600319011261053657506105ef60209235610a93565b90516001600160a01b039091168152f35b83833461010b576106103661098e565b9183519360208501908582106001600160401b0383111761063a5761024396975052858452610b42565b634e487b7160e01b875260418852602487fd5b83346105365761024361065f3661098e565b9161067261066d8433610bdd565b610ae0565b610ca5565b90503461043a578160031936011261043a5761069161095d565b6024359290916001600160a01b03919082806106ac87610a93565b1694169380851461079857803314908115610779575b501561071157848652602052842080546001600160a01b031916831790556106e983610a93565b167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258480a480f35b6020608492519162461bcd60e51b8352820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152fd5b90508652600560205281862033875260205260ff8287205416386106c2565b506020608492519162461bcd60e51b8352820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152fd5b82843461053657602036600319011261053657506105ef60209235610ab9565b82843461053657806003193601126105365781519181825492600184811c918186169586156108a8575b6020968785108114610519578899509688969785829a5291826000146104f257505060011461086b575050506101cc92916104a69103856109c3565b91908693508280528383205b82841061089057505050820101816104a66101cc610493565b8054848a018601528895508794909301928101610877565b92607f169261082f565b84913461043a57602036600319011261043a573563ffffffff60e01b811680910361043a57602092506380ac58cd60e01b811490811561090c575b81156108fb575b5015158152f35b6301ffc9a760e01b149050836108f4565b635b5e139f60e01b811491506108ed565b919082519283825260005b848110610949575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201610928565b600435906001600160a01b038216820361097357565b600080fd5b602435906001600160a01b038216820361097357565b6060906003190112610973576001600160a01b0390600435828116810361097357916024359081168103610973579060443590565b90601f801991011681019081106001600160401b038211176109e457604052565b634e487b7160e01b600052604160045260246000fd5b6001600160401b0381116109e457601f01601f191660200190565b929192610a21826109fa565b91610a2f60405193846109c3565b829481845281830111610973578281602093846000960137010152565b15610a5357565b60405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606490fd5b6000908152600260205260409020546001600160a01b0316610ab6811515610a4c565b90565b610ac561012f82610db3565b6000908152600460205260409020546001600160a01b031690565b15610ae757565b60405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b6064820152608490fd5b90610b66939291610b5661066d8433610bdd565b610b61838383610ca5565b610dd0565b15610b6d57565b60405162461bcd60e51b815280610b8660048201610b8a565b0390fd5b60809060208152603260208201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60608201520190565b906001600160a01b038080610bf184610a93565b16931691838314938415610c24575b508315610c0e575b50505090565b610c1a91929350610ab9565b1614388080610c08565b909350600052600560205260406000208260005260205260ff604060002054169238610c00565b15610c5257565b60405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608490fd5b90610ccd91610cb384610a93565b6001600160a01b0393918416928492909183168414610c4b565b16918215610d625781610cea91610ce386610a93565b1614610c4b565b7fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600084815260046020526040812060018060a01b03199081815416905583825260036020526040822060001981540190558482526040822060018154019055858252600260205284604083209182541617905580a4565b60405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608490fd5b6000908152600260205260409020546001600160a01b0316151590565b9293600093909291803b15610ee657948491610e2a9660405180948193630a85bd0160e11b9788845233600485015260018060a01b0380921660248501526044840152608060648401528260209b8c97608483019061091d565b0393165af1849181610ea6575b50610e95575050503d600014610e8d573d610e51816109fa565b90610e5f60405192836109c3565b81528091833d92013e5b80519182610e8a5760405162461bcd60e51b815280610b8660048201610b8a565b01fd5b506060610e69565b6001600160e01b0319161492509050565b9091508581813d8311610edf575b610ebe81836109c3565b8101031261024657516001600160e01b031981168103610246579038610e37565b503d610eb4565b505050915050600190565b15610ef857565b60405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606490fdfea264697066735822122045156680791b414ca96de65e627ba758a02c91d959d3d6e947401fda98e7846864736f6c63430008120033";

type ERC721DevelopmentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721DevelopmentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Development__factory extends ContractFactory {
  constructor(...args: ERC721DevelopmentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721Development> {
    return super.deploy(overrides || {}) as Promise<ERC721Development>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC721Development {
    return super.attach(address) as ERC721Development;
  }
  override connect(signer: Signer): ERC721Development__factory {
    return super.connect(signer) as ERC721Development__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721DevelopmentInterface {
    return new utils.Interface(_abi) as ERC721DevelopmentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Development {
    return new Contract(address, _abi, signerOrProvider) as ERC721Development;
  }
}
