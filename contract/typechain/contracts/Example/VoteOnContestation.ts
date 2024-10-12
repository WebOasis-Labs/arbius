/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface VoteOnContestationInterface extends utils.Interface {
  functions: {
    "voteOnContestation(bytes32,bool)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "voteOnContestation"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "voteOnContestation",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;

  decodeFunctionResult(
    functionFragment: "voteOnContestation",
    data: BytesLike
  ): Result;

  events: {};
}

export interface VoteOnContestation extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VoteOnContestationInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    voteOnContestation(
      _taskid: PromiseOrValue<BytesLike>,
      _agree: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  voteOnContestation(
    _taskid: PromiseOrValue<BytesLike>,
    _agree: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    voteOnContestation(
      _taskid: PromiseOrValue<BytesLike>,
      _agree: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    voteOnContestation(
      _taskid: PromiseOrValue<BytesLike>,
      _agree: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    voteOnContestation(
      _taskid: PromiseOrValue<BytesLike>,
      _agree: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
