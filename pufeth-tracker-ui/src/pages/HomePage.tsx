import React from 'react';
import RecentConversionRatesChart from "../components/RecentConversionRatesChart";
import HistoricalConversionRatesChart from "../components/HistoricalConversionRatesChart";

const HomePage: React.FC = () => {
    return (
        <div className="HomePage">
            <RecentConversionRatesChart/>
            <HistoricalConversionRatesChart/>
        </div>
    );
};

export default HomePage;
