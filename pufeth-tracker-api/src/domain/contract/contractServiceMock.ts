import { IContractService } from "./IContractService";
import Big from "big.js";

function generateRandomBig(lower_bound: Big = new Big('1000000000000000000000000'), upper_bound: Big = new Big('1022000000000000000000000')): Big {
    const range = upper_bound.minus(lower_bound);
    const randomValue = new Big(Math.random()).times(range);

    return lower_bound.plus(randomValue);
};

export class MockContractService implements IContractService {
    async getTotalAssets(): Promise<Big> {
        return generateRandomBig();
    }

    async getTotalSupply(): Promise<Big> {
        return generateRandomBig();
    }
}
