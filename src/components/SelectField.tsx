import React from 'react';

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    options: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
                                                     id,
                                                     label,
                                                     value,
                                                     options,
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
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
                <option value="" disabled>
                    Select {label}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
