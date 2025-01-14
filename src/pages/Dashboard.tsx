import React from "react";
import CountCard from "../components/CountCard";
import Chart from "../components/Chart";

export default function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="mt-6 mb-8">
                <p className="text-gray-700">Welcome to the Crop Monitoring Dashboard</p>
            </div>

            {/* Count Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <CountCard title="Total Crops" count={120} color="bg-green-500" />
                <CountCard title="Total Logs" count={58} color="bg-blue-500" />
                <CountCard title="Total Staff" count={15} color="bg-yellow-500" />
            </div>

            {/* Chart Section */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Crop Activity Overview</h2>
                <Chart />
            </div>
        </div>
    );
}
