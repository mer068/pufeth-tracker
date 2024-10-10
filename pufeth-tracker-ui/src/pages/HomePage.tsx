import React from 'react';
import RecentConversionRatesChart from "../components/RecentConversionRatesChart";
import HistoricalConversionRatesChart from "../components/HistoricalConversionRatesChart";

const HomePage: React.FC = () => {
    return (
        <div className="HomePage">
            <h1 className={"m-20"}>pufETH Conversion Rate Tracker</h1>
            <h4 className={"m-20"}>Simple app showing pufETH conversion rate changes</h4>
            <RecentConversionRatesChart/>
            <HistoricalConversionRatesChart/>
        </div>
    );
};

export default HomePage;
