/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface NFTDaoFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "createDao"
      | "defaultChallengePeriodSeconds"
      | "nativeCollateral"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "DaoCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "createDao",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "defaultChallengePeriodSeconds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nativeCollateral",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "createDao", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "defaultChallengePeriodSeconds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nativeCollateral",
    data: BytesLike
  ): Result;
}

export namespace DaoCreatedEvent {
  export type InputTuple = [daoAddress: AddressLike];
  export type OutputTuple = [daoAddress: string];
  export interface OutputObject {
    daoAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface NFTDaoFactory extends BaseContract {
  connect(runner?: ContractRunner | null): NFTDaoFactory;
  waitForDeployment(): Promise<this>;

  interface: NFTDaoFactoryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  createDao: TypedContractMethod<
    [tokenAddress: AddressLike, tokenCollateral: BigNumberish],
    [void],
    "nonpayable"
  >;

  defaultChallengePeriodSeconds: TypedContractMethod<[], [bigint], "view">;

  nativeCollateral: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createDao"
  ): TypedContractMethod<
    [tokenAddress: AddressLike, tokenCollateral: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "defaultChallengePeriodSeconds"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "nativeCollateral"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "DaoCreated"
  ): TypedContractEvent<
    DaoCreatedEvent.InputTuple,
    DaoCreatedEvent.OutputTuple,
    DaoCreatedEvent.OutputObject
  >;

  filters: {
    "DaoCreated(address)": TypedContractEvent<
      DaoCreatedEvent.InputTuple,
      DaoCreatedEvent.OutputTuple,
      DaoCreatedEvent.OutputObject
    >;
    DaoCreated: TypedContractEvent<
      DaoCreatedEvent.InputTuple,
      DaoCreatedEvent.OutputTuple,
      DaoCreatedEvent.OutputObject
    >;
  };
}
