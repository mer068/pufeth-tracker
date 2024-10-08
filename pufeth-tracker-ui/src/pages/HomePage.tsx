import React from 'react';
import ConversionRateListComponent from "../components/ConversionRateList";

const HomePage: React.FC = () => {
    return (
        <div className="HomePage">
            <h1>Conversion Rates</h1>
            <ConversionRateListComponent/>
        </div>
    );
};

export default HomePage;
