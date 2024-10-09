import { getTotalAssets, getTotalSupply } from './contractService';
import vars from "../config/vars";
import logger from "../middleware/logger";
import { addConversionRate, calculateConversionRate } from "./rateTrackingService";

const pollingInterval = vars.pollingInterval ? Number(vars.pollingInterval) : 30000; // Polls every 30 seconds by default

export const startPolling = () => {
    logger.info('Polling service started...');
    setInterval(async () => {
        try {
            const [totalAssets, totalSupply] = await Promise.all([
                getTotalAssets(),
                getTotalSupply()
            ]);

            if (totalSupply && totalAssets) {
                const conversionRate = calculateConversionRate(totalAssets, totalSupply);

                await addConversionRate(conversionRate, new Date().toISOString());
            }
        } catch (error) {
            logger.error('Error while polling conversion rates:', error);
        }
    }, pollingInterval);
};

