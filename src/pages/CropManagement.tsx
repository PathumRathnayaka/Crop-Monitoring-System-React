import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {addCrop, deleteCrop, updateCrop} from "../redux/CropSlice";
import Modal from "../components/Modal";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import InputTextWithImageUpload from "../components/InputTextWithImageUpload";
import Table from "../components/Table";


interface Crop {
    cropCode: string;
    commonName: string;
    scientificName: string;
    image: string;
    category: string;
    season: string;
    field: string;
}

export default function CropManagement() {
    const dispatch = useDispatch();
    const crops = useSelector((state: RootState) => state.crop);

    const [newCrop, setNewCrop] = useState<Crop>({
        cropCode: "",
        commonName: "",
        scientificName: "",
        image: "",
        category: "",
        season: "",
        field: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
    const [editingCrop, setEditingCrop] = useState<Crop | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewCrop({ ...newCrop, [id]: value });
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewCrop({ ...newCrop, field: value });
    };

    const handleImageChange = (imageUrl: string) => {
        setNewCrop({ ...newCrop, image: imageUrl });
    };

    const handleAddCrop = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCrop.cropCode && newCrop.commonName) {
            dispatch(addCrop(newCrop));
            setNewCrop({
                cropCode: "",
                commonName: "",
                scientificName: "",
                image: "",
                category: "",
                season: "",
                field: "",
            });
        }
    };

    const handleUpdateCrop = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCrop) {
            dispatch(updateCrop(newCrop)); // Dispatch update action
            setEditingCrop(null); // Reset editing state
            setNewCrop({
                cropCode: "",
                commonName: "",
                scientificName: "",
                image: "",
                category: "",
                season: "",
                field: "",
            });
        }
    };

    const handleSeeMore = (crop: Crop) => {
        setSelectedCrop(crop);
        setIsModalOpen(true);
    };

    const handleDeleteCrop = (cropCode: string) => {
        dispatch(deleteCrop(cropCode));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCrop(null);
    };

    const handleRowClick = (crop: Crop) => {
        setNewCrop(crop);
        setEditingCrop(crop); // Store the crop being edited

        console.log("Crop Code:", crop.cropCode);
        console.log("Common Name:", crop.commonName);
        console.log("Image URL:", crop.image);
        console.log("Category:", crop.category);
        console.log("Season:", crop.season);
        console.log("Field:", crop.field);
    };

    // Table Columns
    const columns = [
        { header: "Crop Code", accessor: "cropCode" },
        { header: "Crop Common Name", accessor: "commonName" },
        { header: "Category", accessor: "category" },
        { header: "Field", accessor: "field" },
    ];



    // Table Actions
    const actions = [
        {
            label: "See More",
            onClick: (row: Crop) => handleSeeMore(row),
            className: "bg-blue-600 text-white py-1 px-3 rounded-md",
        },
        {
            label: "Delete",
            onClick: (row: Crop) => handleDeleteCrop(row.cropCode),
            className: "bg-red-600 text-white py-1 px-3 rounded-md",
        },
    ];


    const fieldOptions = ["Field 1", "Field 2", "Field 3"];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Crop Management</h2>

            {/* Input Form */}
            <form onSubmit={handleAddCrop} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        id="cropCode"
                        label="Crop Code"
                        value={newCrop.cropCode}
                        placeholder="Enter Crop Code"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="commonName"
                        label="Crop Common Name"
                        value={newCrop.commonName}
                        placeholder="Enter Crop Common Name"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="scientificName"
                        label="Scientific Name"
                        value={newCrop.scientificName}
                        placeholder="Enter Scientific Name"
                        onChange={handleInputChange}
                    />
                    <InputTextWithImageUpload
                        label="Image Upload"
                        onImageChange={handleImageChange}
                    />
                    <TextField
                        id="category"
                        label="Category"
                        value={newCrop.category}
                        placeholder="Enter Category"
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="season"
                        label="Season"
                        value={newCrop.season}
                        placeholder="Enter Season"
                        onChange={handleInputChange}
                    />
                    <SelectField
                        id="field"
                        label="Field"
                        value={newCrop.field}
                        options={fieldOptions}
                        onChange={handleFieldChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md mr-4"
                >
                    Add Crop
                </button>
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
                    onClick={handleUpdateCrop}
                >
                    Update Crop
                </button>
            </form>

            {/* Table Section */}

            <Table columns={columns} data={crops} actions={actions} onRowClick={handleRowClick} />

            {/* Modal */}
            {isModalOpen && selectedCrop && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Crop Details">
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-4">Crop Details</h3>
                        <p><strong>Crop Code:</strong> {selectedCrop.cropCode}</p>
                        <p><strong>Common Name:</strong> {selectedCrop.commonName}</p>
                        <p><strong>Scientific Name:</strong> {selectedCrop.scientificName}</p>
                        <p><strong>Category:</strong> {selectedCrop.category}</p>
                        <p><strong>Season:</strong> {selectedCrop.season}</p>
                        <p><strong>Field:</strong> {selectedCrop.field}</p>
                        <div className="my-4">
                            <img
                                src={selectedCrop.image}
                                alt={selectedCrop.commonName}
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
