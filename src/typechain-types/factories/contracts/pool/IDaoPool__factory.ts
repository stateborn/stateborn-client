/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IDaoPool,
  IDaoPoolInterface,
} from "../../../contracts/pool/IDaoPool";

const _abi = [
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
        name: "proposalAddress",
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
] as const;

export class IDaoPool__factory {
  static readonly abi = _abi;
  static createInterface(): IDaoPoolInterface {
    return new Interface(_abi) as IDaoPoolInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IDaoPool {
    return new Contract(address, _abi, runner) as unknown as IDaoPool;
  }
}
