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
  BigNumberish,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ERC20Development,
  ERC20DevelopmentInterface,
} from "../../../contracts/dev-tokens/ERC20Development";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60406080815234620003cb5762000cd8803803806200001e81620003d0565b9283398101606082820312620003cb5781516001600160401b039290838111620003cb578262000050918301620003f6565b9260209283830151828111620003cb5786916200006f918501620003f6565b92015193805191808311620002cb5760038054936001938486811c96168015620003c0575b88871014620003aa578190601f9687811162000354575b508890878311600114620002ed57600092620002e1575b505060001982841b1c191690841b1781555b8451918211620002cb5760049485548481811c91168015620002c0575b88821014620002ab5785811162000260575b508690858411600114620001f557938394918492600095620001e9575b50501b92600019911b1c19161782555b3315620001aa5750600254908382018092116200019557506000917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9160025533835282815284832084815401905584519384523393a35161086f9081620004698239f35b601190634e487b7160e01b6000525260246000fd5b60649285519262461bcd60e51b845283015260248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152fd5b01519350388062000120565b9190601f198416928760005284896000209460005b8b898383106200024857505050106200022d575b50505050811b01825562000130565b01519060f884600019921b161c19169055388080806200021e565b8686015189559097019694850194889350016200020a565b86600052876000208680860160051c8201928a8710620002a1575b0160051c019085905b8281106200029457505062000103565b6000815501859062000284565b925081926200027b565b602287634e487b7160e01b6000525260246000fd5b90607f1690620000f1565b634e487b7160e01b600052604160045260246000fd5b015190503880620000c2565b90869350601f19831691856000528a6000209260005b8c8282106200033d575050841162000324575b505050811b018155620000d4565b015160001983861b60f8161c1916905538808062000316565b8385015186558a9790950194938401930162000303565b90915083600052886000208780850160051c8201928b8610620003a0575b918891869594930160051c01915b82811062000390575050620000ab565b6000815585945088910162000380565b9250819262000372565b634e487b7160e01b600052602260045260246000fd5b95607f169562000094565b600080fd5b6040519190601f01601f191682016001600160401b03811183821017620002cb57604052565b919080601f84011215620003cb5782516001600160401b038111620002cb576020906200042c601f8201601f19168301620003d0565b92818452828287010111620003cb5760005b8181106200045457508260009394955001015290565b85810183015184820184015282016200043e56fe608060408181526004918236101561001657600080fd5b600092833560e01c91826306fdde031461049057508163095ea7b31461046657816318160ddd1461044757816323b872dd1461037d578163313ce5671461036157816339509351146102fa57816370a08231146102c357816395d89b41146101c1578163a457c2d71461011957508063a9059cbb146100e95763dd62ed3e1461009e57600080fd5b346100e557806003193601126100e557806020926100ba610598565b6100c26105b3565b6001600160a01b0391821683526001865283832091168252845220549051908152f35b5080fd5b50346100e557806003193601126100e557602090610112610108610598565b60243590336105c9565b5160018152f35b905082346101be57826003193601126101be57610134610598565b918360243592338152600160205281812060018060a01b038616825260205220549082821061016d576020856101128585038733610737565b608490602086519162461bcd60e51b8352820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152fd5b80fd5b8383346100e557816003193601126100e557805190828454600181811c908083169283156102b9575b60209384841081146102a65783885290811561028a5750600114610252575b505050829003601f01601f191682019267ffffffffffffffff84118385101761023f575082918261023b92528261054f565b0390f35b634e487b7160e01b815260418552602490fd5b919250868652828620918387935b8385106102765750505050830101858080610209565b805488860183015293019284908201610260565b60ff1916878501525050151560051b8401019050858080610209565b634e487b7160e01b895260228a52602489fd5b91607f16916101ea565b5050346100e55760203660031901126100e55760209181906001600160a01b036102eb610598565b16815280845220549051908152f35b8284346101be57816003193601126101be57610314610598565b338252600160209081528383206001600160a01b038316845290528282205460243581019290831061034e57602084610112858533610737565b634e487b7160e01b815260118552602490fd5b5050346100e557816003193601126100e5576020905160128152f35b839150346100e55760603660031901126100e557610399610598565b6103a16105b3565b91846044359460018060a01b0384168152600160205281812033825260205220549060001982036103db575b6020866101128787876105c9565b84821061040457509183916103f96020969561011295033383610737565b9193948193506103cd565b606490602087519162461bcd60e51b8352820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152fd5b5050346100e557816003193601126100e5576020906002549051908152f35b5050346100e557806003193601126100e557602090610112610486610598565b6024359033610737565b8490843461054b578260031936011261054b5782600354600181811c90808316928315610541575b60209384841081146102a65783885290811561028a575060011461050857505050829003601f01601f191682019267ffffffffffffffff84118385101761023f575082918261023b92528261054f565b91925060038652828620918387935b83851061052d5750505050830101858080610209565b805488860183015293019284908201610517565b91607f16916104b8565b8280fd5b6020808252825181830181905290939260005b82811061058457505060409293506000838284010152601f8019910116010190565b818101860151848201604001528501610562565b600435906001600160a01b03821682036105ae57565b600080fd5b602435906001600160a01b03821682036105ae57565b6001600160a01b039081169182156106e457169182156106935760008281528060205260408120549180831061063f57604082827fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef958760209652828652038282205586815220818154019055604051908152a3565b60405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608490fd5b60405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608490fd5b60405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608490fd5b6001600160a01b039081169182156107e857169182156107985760207f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925918360005260018252604060002085600052825280604060002055604051908152a3565b60405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608490fd5b60405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608490fdfea2646970667358221220fae7af0b32211f65f1e022326c6cb1261bfc5e9c6f7d72d26addec3609e1f45964736f6c63430008120033";

type ERC20DevelopmentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20DevelopmentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Development__factory extends ContractFactory {
  constructor(...args: ERC20DevelopmentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _name: string,
    _symbol: string,
    _totalSupply: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _totalSupply,
      overrides || {}
    );
  }
  override deploy(
    _name: string,
    _symbol: string,
    _totalSupply: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _name,
      _symbol,
      _totalSupply,
      overrides || {}
    ) as Promise<
      ERC20Development & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC20Development__factory {
    return super.connect(runner) as ERC20Development__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20DevelopmentInterface {
    return new Interface(_abi) as ERC20DevelopmentInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC20Development {
    return new Contract(address, _abi, runner) as unknown as ERC20Development;
  }
}
