import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
    data: number[];
    labels: string[];
    label: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, labels, label }) => {

    // Adjust the range of y-axis based on data
    const minYValue = Math.min(...data) - 0.01;
    const maxYValue = Math.max(...data) + 0.01;

    const chartOptions: ApexOptions = {
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        xaxis: {
            categories: labels,
            labels: {
                show: false,
            }
        },
        yaxis: {
            title: {
                text: 'Conversion Rate',
            },
            min: minYValue,
            max: maxYValue,
        },
        title: {
            text: 'Conversion Rate Over Time',
            align: 'center',
        },
        stroke: {
            curve: 'smooth',
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    const chartSeries = [
        {
            name: label,
            data,
        },
    ];

    return (
        <div id="chart">
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={350}
            />
        </div>
    );
};

export default LineChart;
