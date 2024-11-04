/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  EngineUtilsV1,
  EngineUtilsV1Interface,
} from "../../contracts/EngineUtilsV1";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "engine_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "taskids_",
        type: "bytes32[]",
      },
    ],
    name: "bulkClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "engine",
    outputs: [
      {
        internalType: "contract IArbius",
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
        name: "addr_",
        type: "address",
      },
    ],
    name: "since",
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
        name: "addr_",
        type: "address",
      },
    ],
    name: "staked",
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
] as const;

const _bytecode =
  "0x60803461007457601f61043c38819003918201601f19168301916001600160401b038311848410176100795780849260209460405283398101031261007457516001600160a01b0381169081900361007457600080546001600160a01b0319169190911790556040516103ac90816100908239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe6040608081526004908136101561001557600080fd5b6000803560e01c80638c40f843146101a757806398807d8414610119578063c9d4623f146100ed5763eaec2b431461004c57600080fd5b346100ea5760203660031901126100ea5782356001600160a01b03818116918290036100e6579060246060928454169585519687938492631f4a58fb60e31b84528301525afa9081156100db5760209384926100ad575b5001519051908152f35b6100ce915060603d81116100d4575b6100c681836102e5565b81019061031d565b386100a3565b503d6100bc565b8251903d90823e3d90fd5b8280fd5b80fd5b509034610115578160031936011261011557905490516001600160a01b039091168152602090f35b5080fd5b5091346100e65760203660031901126100e6576001600160a01b038135818116908190036101a35760246060928654169385519485938492631f4a58fb60e31b84528301525afa9081156101975760209391610179575b50519051908152f35b610191915060603d81116100d4576100c681836102e5565b38610170565b505051903d90823e3d90fd5b8480fd5b509190346100e657602091826003193601126102e15780359267ffffffffffffffff908185116102dd57366023860112156102dd5784830135938285116102d9576024956005368888831b840101116102d5578897985b878110610209578880f35b885484516377286d1760e01b87820190815283851b86018d01358d8301528c82526001600160a01b039092169190606081018181108a8211176102c357918c809e9d949281948a525192620493e0f1503d156102be573d8681116102ac5784519061027d601f8201601f19168801836102e5565b81528a863d92013e5b600019811461029a576001019897986101fe565b634e487b7160e01b8a5260118752888afd5b634e487b7160e01b8b5260418852898bfd5b610286565b634e487b7160e01b8d5260418b528d8dfd5b8880fd5b8680fd5b8580fd5b8380fd5b90601f8019910116810190811067ffffffffffffffff82111761030757604052565b634e487b7160e01b600052604160045260246000fd5b908160609103126103715760405190606082019082821067ffffffffffffffff831117610307576040918252805183526020808201519084015201516001600160a01b038116810361037157604082015290565b600080fdfea2646970667358221220c610f2cc53002f35817ea8b03a1f8f02200a36ede0c4368648572e08636e09b164736f6c63430008130033";

type EngineUtilsV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EngineUtilsV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EngineUtilsV1__factory extends ContractFactory {
  constructor(...args: EngineUtilsV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    engine_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<EngineUtilsV1> {
    return super.deploy(engine_, overrides || {}) as Promise<EngineUtilsV1>;
  }
  override getDeployTransaction(
    engine_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(engine_, overrides || {});
  }
  override attach(address: string): EngineUtilsV1 {
    return super.attach(address) as EngineUtilsV1;
  }
  override connect(signer: Signer): EngineUtilsV1__factory {
    return super.connect(signer) as EngineUtilsV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EngineUtilsV1Interface {
    return new utils.Interface(_abi) as EngineUtilsV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EngineUtilsV1 {
    return new Contract(address, _abi, signerOrProvider) as EngineUtilsV1;
  }
}
