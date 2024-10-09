import React, { useState, useEffect } from 'react';
import { fetchConversionRates } from '../api/trackerApi';
import LineChart from './LineChart';
import { ConversionRate } from '../types/conversionRate';

const ConversionRateChart: React.FC = () => {
    const [conversionRates, setConversionRates] = useState<ConversionRate[]>([]);

    const fetchDataAndUpdateChart = async () => {
        try {
            const newRates = await fetchConversionRates();

            setConversionRates((prevRates) => {
                const maxDataPoints = 120;
                const updatedRates = [...prevRates, ...newRates].slice(-maxDataPoints);
                return updatedRates;
            });

        } catch (error) {
            throw new Error('Error fetching conversion rates');
        }
    };

    useEffect(() => {
        // Poll the backend every 30 seconds
        const interval = setInterval(fetchDataAndUpdateChart, 3000);

        fetchDataAndUpdateChart();

        return () => {
            clearInterval(interval);
        };
    }, []);

    const labels = conversionRates.map(rate => new Date(rate.datetime_utc).toLocaleTimeString());
    const data = conversionRates.map(rate => rate.rate);

    return (
        <LineChart data={data} labels={labels} label="Conversion Rate" />
    );
};

export default ConversionRateChart;
