import { MockContractService } from './contractServiceMock';
import { ContractService } from "./contractService";
import vars from "../../config/vars";
import { IContractService } from "./IContractService";

export class ContractServiceFactory {
    static getService(): IContractService {
        if (vars.nodeEnv === 'production') {
            return new ContractService();
        } else {
            return new MockContractService();
        }
    }
}
