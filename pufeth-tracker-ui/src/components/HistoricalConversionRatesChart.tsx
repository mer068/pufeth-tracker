import React, { useState, useEffect, useMemo } from 'react';
import { fetchConversionRates } from '../api/ratesApi';
import LineChart from './LineChart';
import DateRangePicker from './DateRangePicker';
import { ConversionRate } from "../types/conversionRate";

const HistoricalConversionRatesChart: React.FC = () => {
    const [conversionRates, setConversionRates] = useState<ConversionRate[]>([]);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

    const fetchDataAndUpdateChart = async () => {
        try {
            const [startDate, endDate] = dateRange;
            if (startDate && endDate) {
                const newRates = await fetchConversionRates(startDate.toISOString(), endDate.toISOString());
                setConversionRates(newRates);
            } else {
                setConversionRates([]);
            }
        } catch (error) {
            throw new Error('Error fetching conversion rates');
        }
    };

    useEffect(() => {
        fetchDataAndUpdateChart();
    }, [dateRange]);

    const dataLabels = useMemo(() => conversionRates.map(rate => new Date(rate.datetime_utc).toLocaleString()), [conversionRates]);
    const data = useMemo(() => conversionRates.map(rate => rate.rate), [conversionRates]);
    const chartLabels = {
        title: 'Conversion Rates In Specific Range',
        name: 'Conversion Rate',
        xaxis: 'Time',
        yaxis: 'Conversion Rate'
    };

    return (
        <div className="card">
            <DateRangePicker
                dateRange={dateRange}
                onDateChange={(dates: [Date | null, Date | null]) => setDateRange(dates)}
            />
            <LineChart data={data} dataLabels={dataLabels} chartLabels={chartLabels} />
        </div>
    );
};

export default HistoricalConversionRatesChart;
