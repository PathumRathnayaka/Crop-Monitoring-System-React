import React from "react";

interface CountCardProps {
    title: string;
    count: number;
    color: string;
}

const CountCard: React.FC<CountCardProps> = ({ title, count, color }) => {
    return (
        <div className={`p-4 rounded-lg shadow-md ${color} text-white`}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold mt-2">{count}</p>
        </div>
    );
};

export default CountCard;
