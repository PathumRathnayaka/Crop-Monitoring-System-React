import React, { useState } from "react";

interface InputTextWithImageUploadProps {
    label: string;
    onImageChange: (imageUrl: string) => void;
}

const InputTextWithImageUpload: React.FC<InputTextWithImageUploadProps> = ({
                                                                               label,
                                                                               onImageChange,
                                                                           }) => {
    const [imageUrl, setImageUrl] = useState("");

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setImageUrl(url);
        onImageChange(url);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            onImageChange(url);
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">{label}</label>
            <input
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL"
                className="border border-gray-300 rounded-md px-4 py-2"
            />
            <div className="flex items-center space-x-4">
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-md"
                    />
                )}
            </div>
        </div>
    );
};

export default InputTextWithImageUpload;
