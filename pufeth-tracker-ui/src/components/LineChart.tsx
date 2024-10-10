import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
    data: number[];
    dataLabels: string[];
    chartLabels: {
        title: string,
        name: string,
        xaxis: string,
        yaxis: string,
    }
}

const LineChart: React.FC<LineChartProps> = ({ data, dataLabels, chartLabels }) => {

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
            categories: dataLabels,
            title: {
                text: chartLabels.xaxis,
            },
            labels: {
                show: false,
            }
        },
        yaxis: {
            title: {
                text: chartLabels.yaxis,
            },
            min: minYValue,
            max: maxYValue,
        },
        title: {
            text: chartLabels.title,
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
            name: chartLabels.name,
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
