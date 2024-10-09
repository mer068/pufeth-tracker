import axios from 'axios';
import { ConversionRate } from "../types/conversionRate";

const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/api`;

export const fetchRecentConversionRates = async (latestFetchedDateTimeUtc?: string): Promise<ConversionRate[]> => {
    try {
        const url = latestFetchedDateTimeUtc
            ? `${apiBaseUrl}/rates/latest?from=${encodeURIComponent(latestFetchedDateTimeUtc)}`
            : `${apiBaseUrl}/rates/latest`;

        const response = await axios.get<ConversionRate[]>(url);
        return response.data;
    } catch (error) {
        throw new Error('Could not fetch recent conversion rates');
    }
};
