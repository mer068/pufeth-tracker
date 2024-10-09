import { ConversionRate } from "../../types/conversionRate";
import pool from "../../db/poll";
import { GET_MORE_RECENT_THAN_CONVERSION_RATES, GET_RECENT_CONVERSION_RATES } from "../../db/conversionRate.queries";
import logger from "../../middleware/logger";

export const getRecentConversionRates = async (latestDateTimeUtc: string | undefined): Promise<ConversionRate[]> => {
    try {
        if (latestDateTimeUtc) {
            const {rows} = await pool.query<ConversionRate>(GET_MORE_RECENT_THAN_CONVERSION_RATES, [latestDateTimeUtc]);
            return rows;
        } else {
            const {rows} = await pool.query<ConversionRate>(GET_RECENT_CONVERSION_RATES);
            return rows;
        }
    } catch (error) {
        logger.error('Error fetching conversion rates:', error);
        throw error;
    }
};

