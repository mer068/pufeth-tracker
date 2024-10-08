import React, { useEffect, useState } from 'react';
import { ConversionRate } from "../types/conversionRate";
import { fetchConversionRates } from "../api/trackerApi";


const ConversionRateListComponent: React.FC = () => {
    const [conversionRates, setConversionRates] = useState<ConversionRate[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRates = async () => {
            try {
                const rates = await fetchConversionRates();
                setConversionRates(rates);
            } catch (err) {
                setError('Failed to load conversion rates.');
            }
        };

        getRates();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Conversion Rates</h1>
            <ul>
                {conversionRates.map((rate, index) => (
                    <li key={index}>{rate.rate}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConversionRateListComponent;
