import pool from "../db/poll";
import { SAVE_CONVERSION_RATE } from "../db/conversionRate.queries";
import logger from "../middleware/logger";
import Big from "big.js";

export const calculateConversionRate = (totalAssets: Big, totalSupply: Big): number => {
    return Number(totalAssets.div(totalSupply));
};

export const addConversionRate = async (rate: number, createdAt: Date): Promise<void> => {
    try {
        await pool.query(SAVE_CONVERSION_RATE, [rate, createdAt]);
    } catch (error) {
        logger.error('Error adding conversion rate:', error);
        throw error;
    }
};
