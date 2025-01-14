import React, { useState } from "react";
import Modal from "../components/Modal";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import InputTextWithImageUpload from "../components/InputTextWithImageUpload";

interface Field {
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    size: string;
    crops: string;
    staff: string;
    image: string;
}

export default function FieldManagement() {
    const sampleFields = [
        {
            fieldCode: "F001",
            fieldName: "Field A",
            fieldLocation: "Location A",
            size: "10 acres",
            crops: "Wheat",
            staff: "John Doe",
            image: "https://www.canr.msu.edu/uploads/236/100167/SaskatoonBerries-DukeElsner-WEB.jpg",
        },
        {
            fieldCode: "F002",
            fieldName: "Field B",
            fieldLocation: "Location B",
            size: "15 acres",
            crops: "Rice",
            staff: "Jane Smith",
            image: "https://www.canr.msu.edu/uploads/236/100167/SaskatoonBerries-DukeElsner-WEB.jpg",
        },
        {
            fieldCode: "F003",
            fieldName: "Field C",
            fieldLocation: "Location C",
            size: "20 acres",
            crops: "Corn",
            staff: "Alice Johnson",
            image: "https://www.canr.msu.edu/uploads/236/100167/SaskatoonBerries-DukeElsner-WEB.jpg",
        },
    ];
    const [fields, setFields] = useState<Field[]>(sampleFields); // No sample data

    const [newField, setNewField] = useState<Field>({
        fieldCode: "",
        fieldName: "",
        fieldLocation: "",
        size: "",
        crops: "",
        staff: "",
        image: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState<Field | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewField({ ...newField, [id]: value });
    };

    const handleCropsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewField({ ...newField, crops: value });
    };

    const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewField({ ...newField, staff: value });
    };

    const handleImageChange = (imageUrl: string) => {
        setNewField({ ...newField, image: imageUrl });
    };

    const handleAddField = (e: React.FormEvent) => {
        e.preventDefault();
        if (newField.fieldCode && newField.fieldName) {
            setFields([...fields, newField]);
            setNewField({
                fieldCode: "",
                fieldName: "",
                fieldLocation: "",
                size: "",
                crops: "",
                staff: "",
                image: "",
            });
        }
    };

    const handleSeeMore = (field: Field) => {
        setSelectedField(field);
        setIsModalOpen(true);
    };

    const handleDeleteField = (fieldCode: string) => {
        setFields(fields.filter((field) => field.fieldCode !== fieldCode));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedField(null);
    };

    // Sample options for SelectField components
    const cropOptions = ["Wheat", "Rice", "Corn"];
    const staffOptions = ["John Doe", "Jane Smith", "Alice Johnson"];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Field Management</h2>

            {/* Input Form */}
            <form onSubmit={handleAddField} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        id="fieldCode"
                        label="Field Code"
                        value={newField.fieldCode}
                        placeholder="Enter Field Code"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="fieldName"
                        label="Field Name"
                        value={newField.fieldName}
                        placeholder="Enter Field Name"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="fieldLocation"
                        label="Field Location"
                        value={newField.fieldLocation}
                        placeholder="Enter Field Location"
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="size"
                        label="Size of the Field"
                        value={newField.size}
                        placeholder="Enter Size of the Field"
                        onChange={handleInputChange}
                    />
                    <SelectField
                        id="crops"
                        label="Crops"
                        value={newField.crops}
                        options={cropOptions}
                        onChange={handleCropsChange}
                        required
                    />
                    <SelectField
                        id="staff"
                        label="Staff"
                        value={newField.staff}
                        options={staffOptions}
                        onChange={handleStaffChange}
                        required
                    />
                    <InputTextWithImageUpload
                        label="Field Image"
                        onImageChange={handleImageChange}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md mr-4"
                >
                    Add Field
                </button>
                <button
                    type="button"
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    Update Field
                </button>
            </form>

            {/* Table Section */}
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Field Code</th>
                    <th className="border px-4 py-2">Field Name</th>
                    <th className="border px-4 py-2">Crops</th>
                    <th className="border px-4 py-2">Staff</th>
                    <th className="border px-4 py-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {fields.map((field, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{field.fieldCode}</td>
                        <td className="border px-4 py-2">{field.fieldName}</td>
                        <td className="border px-4 py-2">{field.crops}</td>
                        <td className="border px-4 py-2">{field.staff}</td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => handleSeeMore(field)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                            >
                                See More
                            </button>
                            <button
                                onClick={() => handleDeleteField(field.fieldCode)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && selectedField && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Field Details">
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-4">Field Details</h3>
                        <p><strong>Field Code:</strong> {selectedField.fieldCode}</p>
                        <p><strong>Field Name:</strong> {selectedField.fieldName}</p>
                        <p><strong>Field Location:</strong> {selectedField.fieldLocation}</p>
                        <p><strong>Size:</strong> {selectedField.size}</p>
                        <p><strong>Crops:</strong> {selectedField.crops}</p>
                        <p><strong>Staff:</strong> {selectedField.staff}</p>
                        <div className="my-4">
                            <img
                                src={selectedField.image}
                                alt={selectedField.fieldName}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}