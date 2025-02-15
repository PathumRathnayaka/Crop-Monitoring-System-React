import React from "react";

interface Column {
    header: string;
    accessor: string;
}

interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    actions?: {
        label: string;
        onClick: (row: Record<string, any>) => void;
        className?: string;
    }[];
    onRowClick?: (row: Record<string, any>) => void; // Row click handler
}

const Table: React.FC<TableProps> = ({ columns, data, actions, onRowClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    {columns.map((column, index) => (
                        <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                            {column.header}
                        </th>
                    ))}
                    {actions && (
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        onClick={() => onRowClick && onRowClick(row)}
                        className="cursor-pointer hover:bg-gray-100"
                    >
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                {row[column.accessor]}
                            </td>
                        ))}
                        {actions && (
                            <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                                {actions.map((action, actionIndex) => (
                                    <button
                                        key={actionIndex}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering row click
                                            action.onClick(row);
                                        }}
                                        className={`py-1 px-3 rounded-md ${action.className}`}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// ✅ Ensure default export
export default Table;
