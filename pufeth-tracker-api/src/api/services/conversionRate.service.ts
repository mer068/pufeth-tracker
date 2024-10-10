import { ConversionRate } from "../../types/conversionRate";
import pool from "../../db/poll";
import { GET_MORE_RECENT_THAN_CONVERSION_RATES, GET_RECENT_CONVERSION_RATES } from "../../db/conversionRate.queries";
import logger from "../../middleware/logger";
import { GET_CONVERSION_RATES } from "../../db/conversionRateAverage.queries";

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
        logger.error('Error fetching recent conversion rates:', error);
        throw error;
    }
};

export const getConversionRates = async (startDateTimeUtc: string, endDateTimeUtc: string): Promise<ConversionRate[]> => {
    try {
        const {rows} = await pool.query<ConversionRate>(GET_CONVERSION_RATES, [startDateTimeUtc, endDateTimeUtc]);
        return rows;
    } catch (error) {
        logger.error('Error fetching conversion rates:', error);
        throw error;
    }
};

