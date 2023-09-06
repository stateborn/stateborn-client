/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type {
  ERC721,
  ERC721Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC721/ERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
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
  "0x608060405234620003195762001113803803806200001d816200031e565b928339810190604081830312620003195780516001600160401b03908181116200031957836200004f91840162000344565b916020938482015183811162000319576200006b920162000344565b825190828211620003035760008054926001958685811c95168015620002f8575b88861014620002e4578190601f9586811162000291575b5088908683116001146200022d57849262000221575b5050600019600383901b1c191690861b1781555b81519384116200020d5784548581811c9116801562000202575b87821014620001ee57838111620001a6575b50859284116001146200014157839495509262000135575b5050600019600383901b1c191690821b1790555b604051610d5c9081620003b78239f35b01519050388062000111565b9190601f1984169585845280842093905b8782106200018e5750508385961062000174575b505050811b01905562000125565b015160001960f88460031b161c1916905538808062000166565b80878596829496860151815501950193019062000152565b8582528682208480870160051c820192898810620001e4575b0160051c019086905b828110620001d8575050620000f9565b838155018690620001c8565b92508192620001bf565b634e487b7160e01b82526022600452602482fd5b90607f1690620000e7565b634e487b7160e01b81526041600452602490fd5b015190503880620000b9565b8480528985208994509190601f198416865b8c8282106200027a575050841162000260575b505050811b018155620000cd565b015160001960f88460031b161c1916905538808062000252565b8385015186558c979095019493840193016200023f565b9091508380528884208680850160051c8201928b8610620002da575b918a91869594930160051c01915b828110620002cb575050620000a3565b8681558594508a9101620002bb565b92508192620002ad565b634e487b7160e01b83526022600452602483fd5b94607f16946200008c565b634e487b7160e01b600052604160045260246000fd5b600080fd5b6040519190601f01601f191682016001600160401b038111838210176200030357604052565b919080601f84011215620003195782516001600160401b03811162000303576020906200037a601f8201601f191683016200031e565b92818452828287010111620003195760005b818110620003a257508260009394955001015290565b85810183015184820184015282016200038c56fe608060408181526004918236101561001657600080fd5b600092833560e01c91826301ffc9a7146106fe5750816306fdde0314610651578163081812fc14610631578163095ea7b3146104c357816323b872dd1461049957816342842e0e146104705781636352211e1461043f57816370a08231146103a957816395d89b41146102ae578163a22cb465146101e2578163b88d4fde14610155578163c87b56dd14610104575063e985e9c5146100b457600080fd5b3461010057806003193601126101005760ff816020936100d26107a9565b6100da6107c4565b6001600160a01b0391821683526005875283832091168252855220549151911615158152f35b5080fd5b838334610100576020366003190112610100576101246101519335610be0565b8181516101308161080f565b5280519161013d8361080f565b825251918291602083526020830190610769565b0390f35b919050346101de5760803660031901126101de576101716107a9565b6101796107c4565b84606435946001600160401b038611610100573660238701121561010057850135946101b06101a787610861565b95519586610840565b858552366024878301011161010057856101db9660246020930183880137850101526044359161096f565b80f35b8280fd5b919050346101de57806003193601126101de576101fd6107a9565b90602435918215158093036102aa576001600160a01b03169233841461026c5750338452600560205280842083855260205280842060ff1981541660ff8416179055519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a380f35b6020606492519162461bcd60e51b8352820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b6044820152fd5b8480fd5b8284346103a657806003193601126103a6578151918160019283549384811c9181861695861561039c575b6020968785108114610389578899509688969785829a529182600014610362575050600114610325575b5050506101519291610316910385610840565b51928284938452830190610769565b91908693508083528383205b82841061034a5750505082010181610316610151610303565b8054848a018601528895508794909301928101610331565b60ff19168782015293151560051b8601909301935084925061031691506101519050610303565b634e487b7160e01b835260228a52602483fd5b92607f16926102d9565b80fd5b83915034610100576020366003190112610100576001600160a01b036103cd6107a9565b169081156103ea5760208480858581526003845220549051908152f35b608490602085519162461bcd60e51b8352820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152fd5b8284346103a65760203660031901126103a6575061045f602092356108c3565b90516001600160a01b039091168152f35b505034610100576101db90610484366107da565b919251926104918461080f565b85845261096f565b83346103a6576101db6104ab366107da565b916104be6104b98433610a0a565b61090d565b610ad2565b9050346101de57816003193601126101de576104dd6107a9565b6024359290916001600160a01b03919082806104f8876108c3565b169416938085146105e4578033149081156105c5575b501561055d57848652602052842080546001600160a01b03191683179055610535836108c3565b167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258480a480f35b6020608492519162461bcd60e51b8352820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152fd5b90508652600560205281862033875260205260ff82872054163861050e565b506020608492519162461bcd60e51b8352820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152fd5b8284346103a65760203660031901126103a6575061045f602092356108e9565b8284346103a657806003193601126103a65781519181825492600184811c918186169586156106f4575b6020968785108114610389578899509688969785829a5291826000146103625750506001146106b7575050506101519291610316910385610840565b91908693508280528383205b8284106106dc5750505082010181610316610151610303565b8054848a0186015288955087949093019281016106c3565b92607f169261067b565b8491346101de5760203660031901126101de573563ffffffff60e01b81168091036101de57602092506380ac58cd60e01b8114908115610758575b8115610747575b5015158152f35b6301ffc9a760e01b14905083610740565b635b5e139f60e01b81149150610739565b919082519283825260005b848110610795575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201610774565b600435906001600160a01b03821682036107bf57565b600080fd5b602435906001600160a01b03821682036107bf57565b60609060031901126107bf576001600160a01b039060043582811681036107bf579160243590811681036107bf579060443590565b602081019081106001600160401b0382111761082a57604052565b634e487b7160e01b600052604160045260246000fd5b90601f801991011681019081106001600160401b0382111761082a57604052565b6001600160401b03811161082a57601f01601f191660200190565b1561088357565b60405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606490fd5b6000908152600260205260409020546001600160a01b03166108e681151561087c565b90565b6108f281610be0565b6000908152600460205260409020546001600160a01b031690565b1561091457565b60405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b6064820152608490fd5b906109939392916109836104b98433610a0a565b61098e838383610ad2565b610c05565b1561099a57565b60405162461bcd60e51b8152806109b3600482016109b7565b0390fd5b60809060208152603260208201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60608201520190565b906001600160a01b038080610a1e846108c3565b16931691838314938415610a51575b508315610a3b575b50505090565b610a47919293506108e9565b1614388080610a35565b909350600052600560205260406000208260005260205260ff604060002054169238610a2d565b15610a7f57565b60405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608490fd5b90610afa91610ae0846108c3565b6001600160a01b0393918416928492909183168414610a78565b16918215610b8f5781610b1791610b10866108c3565b1614610a78565b7fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600084815260046020526040812060018060a01b03199081815416905583825260036020526040822060001981540190558482526040822060018154019055858252600260205284604083209182541617905580a4565b60405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608490fd5b600090815260026020526040902054610c03906001600160a01b0316151561087c565b565b9293600093909291803b15610d1b57948491610c5f9660405180948193630a85bd0160e11b9788845233600485015260018060a01b0380921660248501526044840152608060648401528260209b8c976084830190610769565b0393165af1849181610cdb575b50610cca575050503d600014610cc2573d610c8681610861565b90610c946040519283610840565b81528091833d92013e5b80519182610cbf5760405162461bcd60e51b8152806109b3600482016109b7565b01fd5b506060610c9e565b6001600160e01b0319161492509050565b9091508581813d8311610d14575b610cf38183610840565b810103126102aa57516001600160e01b0319811681036102aa579038610c6c565b503d610ce9565b50505091505060019056fea2646970667358221220a2a33de50920a2e25bd2a2d79b13f36dfdf8e5489465eafc79d4789165083d7964736f6c63430008120033";

type ERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override deploy(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<
      ERC721 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC721__factory {
    return super.connect(runner) as ERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC721 {
    return new Contract(address, _abi, runner) as unknown as ERC721;
  }
}