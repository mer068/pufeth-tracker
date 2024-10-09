import { ConversionRate } from "../../types/conversionRate";
import pool from "../../db/poll";
import { GET_CONVERSION_RATES } from "../../db/conversionRate.queries";

export const getConversionRates = async (): Promise<ConversionRate[]> => {
    try {
        const {rows} = await pool.query<ConversionRate>(GET_CONVERSION_RATES);
        return rows;
    } catch (error) {
        console.error('Error fetching conversion rates:', error);
        throw error;
    }
};
