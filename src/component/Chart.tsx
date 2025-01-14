import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


/*const sampleData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "Crop Activity",
            data: [40, 55, 70, 85, 100, 120],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
        },
        {
            label: "Log Activity",
            data: [20, 35, 50, 65, 80, 95],
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
        },
        {
            label: "Staff Activity",
            data: [10, 15, 25, 30, 40, 50],
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            fill: true,
        },
    ],
};*/


const Chart: React.FC = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Crop Activity",
                data: [30, 50, 45, 60, 75, 90],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Crop Activity Overview",
            },
        },
    };

    return <Line data={data} options={options} />; //add sample data variable to {data}
};

export default Chart;
