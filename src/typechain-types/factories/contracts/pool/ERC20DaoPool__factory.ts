/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ERC20DaoPool,
  ERC20DaoPoolInterface,
} from "../../../contracts/pool/ERC20DaoPool";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "withdrawAddress",
        type: "address",
      },
    ],
    name: "TokensWithdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proposalAddress",
        type: "address",
      },
    ],
    name: "approveProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "approvedProposals",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
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
        name: "",
        type: "address",
      },
    ],
    name: "balances",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proposalAddress",
        type: "address",
      },
    ],
    name: "getProposalAgainstVoters",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proposalAddress",
        type: "address",
      },
    ],
    name: "getProposalForVoters",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proposalAddress",
        type: "address",
      },
    ],
    name: "resolveProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "voteSide",
        type: "bool",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voterActiveProposals",
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
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "withdrawAddress",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080346100a757601f610ebc38819003918201601f19168301916001600160401b038311848410176100ac578084926020946040528339810103126100a757516001600160a01b0390818116908190036100a75760005460018060a01b0319903382821617600055604051933391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a36005541617600555610df990816100c38239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe608060408181526004918236101561001657600080fd5b600092833560e01c918262f714ce1461094c5750816303354faa1461090b57816314ca6a97146108c557816327e235e314610850578163539e580a1461088857816370a0823114610850578163715018a6146107f65781638cc6651f146107be5781638da5cb5b14610796578163b6b55f25146106bf578163bd041c4d1461057b578163d76add1214610216578163ec0d7b27146101bb578163f2fde38b146100f4575063fc0c546a146100c957600080fd5b346100f057816003193601126100f05760055490516001600160a01b039091168152602090f35b5080fd5b9050346101b75760203660031901126101b75761010f610b10565b90610118610b6f565b6001600160a01b0391821692831561016557505082546001600160a01b0319811683178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b906020608492519162461bcd60e51b8352820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152fd5b8280fd5b5050346100f05760203660031901126100f0576102129161020191906102089082906001600160a01b036101ed610b10565b168152600260205220825193848092610cbc565b0383610d02565b5191829182610b2b565b0390f35b9050823461057857602092836003193601126100f0576001600160a01b03938461023e610b10565b169485845284825261025560ff8486205416610bc7565b825163527eb7ab60e11b8152828187818a5afa90811561056e578591610551575b50156105195782516338d7497d60e01b8082529590838183818b5afa9081156104e05790610201929187916104fc575b50156104ea57878652600284526102c58587205b865193848092610cbc565b8597865b83518110156103175780856102e16103129387610d7a565b51169a8b8a526102fa600691828a528a8c205490610caf565b9b8a5287528888812055600387528888812055610c0b565b6102c9565b5096909791508451908152838189818a5afa9081156104e05790610201929187916104c3575b50156104b1578686526001845261035b858720865193848092610cbc565b855b82518110156103ad57836103718285610d7a565b5116875260038552858720805460001981019190821161039a575561039590610c0b565b61035d565b634e487b7160e01b895260118b52602489fd5b8689868861042582878a8f808952600184526103ca868a20610d8e565b808952600284526103dc868a20610d8e565b885286835284882060ff19815416905580600554169088541688865180968195829463a9059cbb60e01b84528c840160209093929193604081019460018060a01b031681520152565b03925af19081156104a757859161047a575b5015610441578380f35b5162461bcd60e51b8152918201526015602482015274151bdad95b881d1c985b9cd9995c8819985a5b1959605a1b604482015260649150fd5b61049a9150833d85116104a0575b6104928183610d02565b810190610d24565b85610437565b503d610488565b82513d87823e3d90fd5b8686526002845261035b8587206102ba565b6104da9150853d87116104a0576104928183610d02565b8961033d565b85513d88823e3d90fd5b878652600184526102c58587206102ba565b6105139150853d87116104a0576104928183610d02565b896102a6565b825162461bcd60e51b81528086018390526012602482015271141c9bdc1bdcd85b081b9bdd08195b99195960721b6044820152606490fd5b6105689150833d85116104a0576104928183610d02565b87610276565b84513d87823e3d90fd5b80fd5b839150346100f057826003193601126100f057610596610b10565b602490813580151581036106bb573385526020918483526105bc60ff8888205416610bc7565b81156106a957338652600183528686209591955b6001600160a01b03828116939092815b83548110156106425785856105f58387610c30565b90549060031b1c16146106105761060b90610c0b565b6105e0565b8a5162461bcd60e51b8152808a01889052600d818a01526c105b1c9958591e481d9bdd1959609a1b6044820152606490fd5b50868a600388888c958e600014610691576106669033895260018452858920610c5e565b865252832090815492600184018094116106805750505580f35b634e487b7160e01b85526011905283fd5b6106a49033895260028452858920610c5e565b610666565b338652600283528686209591956105d0565b8480fd5b9050346101b7576020908160031936011261079257818135338652600682528486206106ec828254610caf565b9055606460018060a01b0360055416938487518481527fcbc4a4091b012bb1329c38bbbb15455f5cac5aa3673da0a7f38cd61a4f495517863392a387875195869485936323b872dd60e01b8552339085015230602485015260448401525af19182156107855761076593508492610768575b5050610d3c565b80f35b61077e9250803d106104a0576104928183610d02565b388061075e565b50505051903d90823e3d90fd5b8380fd5b5050346100f057816003193601126100f057905490516001600160a01b039091168152602090f35b5050346100f05760203660031901126100f05760209181906001600160a01b036107e6610b10565b1681526003845220549051908152f35b833461057857806003193601126105785761080f610b6f565b80546001600160a01b03198116825581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b5050346100f05760203660031901126100f05760209181906001600160a01b03610878610b10565b1681526006845220549051908152f35b9050346101b75760203660031901126101b75760209260ff918391906001600160a01b036108b4610b10565b168252855220541690519015158152f35b5050346100f05760203660031901126100f0576102129161020191906102089082906001600160a01b036108f7610b10565b168152600160205220825193848092610cbc565b9050346101b75760203660031901126101b757610926610b10565b61092e610b6f565b6001600160a01b031683526020528120805460ff1916600117905580f35b849084346101b757806003193601126101b7576001600160a01b03602435818116938635929091858103610b0c573387526020926003845285882054610acf575033875260068352838588205410610a9557600554855163a9059cbb60e01b81526001600160a01b039290921689830190815260208101869052849183918290036040019082908b9087165af1908115610a8b57906109f2918891610a6e575b50610d3c565b33865260068252838620805490848203918211610a5b57907f4e5ba90310f16273bb12f3c33f23905e573b86df58a2895a525285d083bf043f939291553387526006825286858120805415610a53575b50506005541693519283523392a480f35b558688610a42565b634e487b7160e01b885260118952602488fd5b610a859150843d86116104a0576104928183610d02565b896109ec565b85513d89823e3d90fd5b845162461bcd60e51b81528089018490526014602482015273496e73756666696369656e742062616c616e636560601b6044820152606490fd5b62461bcd60e51b815288810184905260196024820152785573657220686173206163746976652070726f706f73616c7360381b6044820152606490fd5b8680fd5b600435906001600160a01b0382168203610b2657565b600080fd5b6020908160408183019282815285518094520193019160005b828110610b52575050505090565b83516001600160a01b031685529381019392810192600101610b44565b6000546001600160a01b03163303610b8357565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b15610bce57565b60405162461bcd60e51b8152602060048201526015602482015274141c9bdc1bdcd85b081b9bdd08185c1c1c9bdd9959605a1b6044820152606490fd5b6000198114610c1a5760010190565b634e487b7160e01b600052601160045260246000fd5b8054821015610c485760005260206000200190600090565b634e487b7160e01b600052603260045260246000fd5b8054600160401b811015610c9957610c7b91600182018155610c30565b819291549060031b9160018060a01b03809116831b921b1916179055565b634e487b7160e01b600052604160045260246000fd5b91908201809211610c1a57565b90815480825260208092019260005281600020916000905b828210610ce2575050505090565b83546001600160a01b031685529384019360019384019390910190610cd4565b90601f8019910116810190811067ffffffffffffffff821117610c9957604052565b90816020910312610b2657518015158103610b265790565b15610d4357565b60405162461bcd60e51b815260206004820152600f60248201526e151c985b9cd9995c8819985a5b1959608a1b6044820152606490fd5b8051821015610c485760209160051b010190565b80549060009081815582610da157505050565b815260208120918201915b828110610db857505050565b818155600101610dac56fea264697066735822122041b40d809ee1d54dc13cf26c095a802cced273dbdd7b0dd93ca68c794cff77cd64736f6c63430008120033";

type ERC20DaoPoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20DaoPoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20DaoPool__factory extends ContractFactory {
  constructor(...args: ERC20DaoPoolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _tokenAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_tokenAddress, overrides || {});
  }
  override deploy(
    _tokenAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_tokenAddress, overrides || {}) as Promise<
      ERC20DaoPool & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC20DaoPool__factory {
    return super.connect(runner) as ERC20DaoPool__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20DaoPoolInterface {
    return new Interface(_abi) as ERC20DaoPoolInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC20DaoPool {
    return new Contract(address, _abi, runner) as unknown as ERC20DaoPool;
  }
}
