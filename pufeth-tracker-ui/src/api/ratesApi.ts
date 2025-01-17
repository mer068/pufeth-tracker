import axios from 'axios';
import { ConversionRate } from "../types/conversionRate";

const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/rates`;

export const fetchRecentConversionRates = async (latestFetchedDateTimeUtc?: string): Promise<ConversionRate[]> => {
    try {
        const url = latestFetchedDateTimeUtc
            ? `${apiBaseUrl}/latest?after=${encodeURIComponent(latestFetchedDateTimeUtc)}`
            : `${apiBaseUrl}/latest`;

        const response = await axios.get<ConversionRate[]>(url);
        return response.data;
    } catch (error) {
        throw new Error('Could not fetch recent conversion rates');
    }
};

export const fetchConversionRates = async (startDateTimeUtc: string, endDateTimeUtc: string): Promise<ConversionRate[]> => {
    try {
        const response = await axios.get<ConversionRate[]>(`${apiBaseUrl}?start=${encodeURIComponent(startDateTimeUtc)}&end=${encodeURIComponent(endDateTimeUtc)}`);
        return response.data;
    } catch (error) {
        throw new Error('Could not fetch historical conversion rates');
    }
};
