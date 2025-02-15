import React, { useState } from "react";
import Modal from "../components/Modal";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import InputTextWithImageUpload from "../components/InputTextWithImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addField, deleteField, updateField } from "../redux/FieldSlice";
import Table from "../components/Table"; // Import the Table component

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
    const dispatch = useDispatch();
    const fields = useSelector((state: RootState) => state.field);

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
    const [editingField, setEditingField] = useState<Field | null>(null);

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
            dispatch(addField(newField));
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

    const handleUpdateField = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingField) {
            dispatch(updateField(newField)); // Dispatch update action
            setEditingField(null); // Reset editing state
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

    const handleRowClick = (field: Field) => {
        setNewField(field);
        setEditingField(field); // Store the field being edited
    };

    const handleSeeMore = (field: Field) => {
        setSelectedField(field);
        setIsModalOpen(true);
    };

    const handleDeleteField = (fieldCode: string) => {
        dispatch(deleteField(fieldCode));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedField(null);
    };

    // Sample options for SelectField components
    const cropOptions = ["Wheat", "Rice", "Corn"];
    const staffOptions = ["John Doe", "Jane Smith", "Alice Johnson"];

    // Table Columns
    const columns = [
        { header: "Field Code", accessor: "fieldCode" },
        { header: "Field Name", accessor: "fieldName" },
        { header: "Crops", accessor: "crops" },
        { header: "Staff", accessor: "staff" },
    ];

    // Table Actions
    const actions = [
        {
            label: "See More",
            onClick: (row: Field) => handleSeeMore(row),
            className: "bg-blue-600 text-white py-1 px-3 rounded-md",
        },
        {
            label: "Delete",
            onClick: (row: Field) => handleDeleteField(row.fieldCode),
            className: "bg-red-600 text-white py-1 px-3 rounded-md",
        },
    ];

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
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
                    onClick={handleUpdateField}
                >
                    Update Field
                </button>
            </form>

            {/* Table Section */}
            <Table
                columns={columns}
                data={fields}
                actions={actions}
                onRowClick={handleRowClick} // Handle row clicks for editing
            />

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
                                className="w-32 h-32 object-cover rounded-md mt-2"
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