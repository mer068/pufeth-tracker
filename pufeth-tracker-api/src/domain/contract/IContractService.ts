import Big from "big.js";

export interface IContractService {
    getTotalAssets(): Promise<Big>;
    getTotalSupply(): Promise<Big>;
}
