import React from 'react';

interface TextFieldProps {
    id: string;
    label: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
                                                 id,
                                                 label,
                                                 value,
                                                 placeholder,
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
                type="text"
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
        </div>
    );
};

export default TextField;
