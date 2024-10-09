import Web3 from 'web3';
import logger from "../middleware/logger";
import vars from "../config/vars";
import Big from "big.js";

const ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "totalAssets",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const infuraUrl = (() => {
    const url = vars.infuraUrl;
    if (!url) {
        logger.error('Infura url missing');
        process.exit(-1);
    }
    return url;
})();

const contractAddress = (() => {
    const address = vars.contractAddress;
    if (!address) {
        logger.error('Contract address missing');
        process.exit(-1);
    }
    return address;
})();

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

const contract = new web3.eth.Contract(ABI, contractAddress);

export const getTotalAssets = async (): Promise<Big> => {
    try {
        const totalAssets: string = await contract.methods.totalAssets().call();
        return Big(totalAssets);
    } catch (error) {
        logger.error('Error fetching totalAssets:', error);
        throw error;
    }
};

export const getTotalSupply = async (): Promise<Big> => {
    try {
        const totalSupply: string = await contract.methods.totalSupply().call();
        return Big(totalSupply);
    } catch (error) {
        logger.error('Error fetching totalSupply:', error);
        throw error;
    }
};
