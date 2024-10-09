import axios from 'axios';
import { ConversionRate } from "../types/conversionRate";

const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/api`;

export const fetchConversionRates = async (): Promise<ConversionRate[]> => {
    try {
        const response = await axios.get<ConversionRate[]>(`${apiBaseUrl}/rates`);
        return response.data;
    } catch (error) {
        throw new Error('Could not fetch conversion rates');
    }
};
