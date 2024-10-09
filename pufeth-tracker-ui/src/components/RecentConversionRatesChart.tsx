import React, { useState, useEffect, useMemo } from 'react';
import { fetchRecentConversionRates } from '../api/trackerApi';
import LineChart from './LineChart';
import { ConversionRate } from '../types/conversionRate';

const RecentConversionRatesChart: React.FC = () => {
    const [conversionRates, setConversionRates] = useState<ConversionRate[]>([]);
    const [latestFetchedDateTimeUtc, setLatestFetchedDateTimeUtc] = useState<string | undefined>();

    const fetchDataAndUpdateChart = async (latestDateTimeUtc?: string | undefined) => {
        try {
            const newRates = await fetchRecentConversionRates(latestDateTimeUtc);

            setConversionRates((prevRates) => {
                const maxDataPoints = 120;
                const updatedRates = [...prevRates, ...newRates].slice(-maxDataPoints);
                return updatedRates;
            });

            if (newRates.length > 0) {
                const latestDateTime = newRates.reduce((max, rate) =>
                    rate.datetime_utc > max ? rate.datetime_utc : max, newRates[0].datetime_utc);
                setLatestFetchedDateTimeUtc(latestDateTime);
            }

        } catch (error) {
            throw new Error('Error fetching conversion rates');
        }
    };

    useEffect(() => {
        // Poll the backend every 30 seconds
        const interval = setInterval(() => {
            fetchDataAndUpdateChart(latestFetchedDateTimeUtc);
        }, 30000);

        fetchDataAndUpdateChart();

        return () => {
            clearInterval(interval);
        };
    }, [latestFetchedDateTimeUtc]);

    const dataLabels = useMemo(() => conversionRates.map(rate => new Date(rate.datetime_utc).toLocaleString()), [conversionRates]);
    const data = useMemo(() => conversionRates.map(rate => rate.rate), [conversionRates]);
    const chartLabels = {
        title: 'Conversion Rate Over Time',
        name: 'Conversion Rate',
        xaxis: '',
        yaxis: 'Conversion Rate'
    };
    return (
        <LineChart data={data} dataLabels={dataLabels} chartLabels={chartLabels}/>
    );
};

export default RecentConversionRatesChart;
