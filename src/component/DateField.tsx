import React from 'react';

interface DateFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({
                                                 id,
                                                 label,
                                                 value,
                                                 onChange,
                                                 required = false,
                                             }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <input
                type="date"
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
        </div>
    );
};

export default DateField;
