import React, { useState } from "react";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import Modal from "../components/Modal";

export default function VehicleManagement() {

    const sampleVehicleData = [
        {
            vehicleCode: "V001",
            licensePlate: "ABC-1234",
            vehicleCategory: "SUV",
            fuelType: "Petrol",
            status: "Available",
            allocatedStaff: "John Doe",
        },
        {
            vehicleCode: "V002",
            licensePlate: "XYZ-5678",
            vehicleCategory: "Sedan",
            fuelType: "Diesel",
            status: "Out of Service",
            allocatedStaff: "Jane Smith",
        },
        {
            vehicleCode: "V003",
            licensePlate: "DEF-9876",
            vehicleCategory: "Truck",
            fuelType: "Electric",
            status: "Available",
            allocatedStaff: "Alice Johnson",
        },
        {
            vehicleCode: "V004",
            licensePlate: "GHI-5432",
            vehicleCategory: "Van",
            fuelType: "Petrol",
            status: "Out of Service",
            allocatedStaff: "Bob Brown",
        },
    ];

    // State for vehicle form fields
    const [vehicleCode, setVehicleCode] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [vehicleCategory, setVehicleCategory] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [status, setStatus] = useState("");
    const [allocatedStaff, setAllocatedStaff] = useState("");

    const [vehicles, setVehicles] = useState(sampleVehicleData);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        const newVehicle = {
            vehicleCode,
            licensePlate,
            vehicleCategory,
            fuelType,
            status,
            allocatedStaff,
        };
        setVehicles((prev) => [...prev, newVehicle]);
        clearForm();
    };

    const handleDelete = (row: Record<string, any>) => {
        setVehicles((prev) => prev.filter((veh) => veh.vehicleCode !== row.vehicleCode));
    };

    const handleSeeMore = (row: Record<string, any>) => {
        setSelectedVehicle(row);
        setIsModalOpen(true);
    };

    const clearForm = () => {
        setVehicleCode("");
        setLicensePlate("");
        setVehicleCategory("");
        setFuelType("");
        setStatus("");
        setAllocatedStaff("");
    };

    const columns = [
        { header: "Vehicle Code", accessor: "vehicleCode" },
        { header: "Vehicle Category", accessor: "vehicleCategory" },
        { header: "Status", accessor: "status" },
        { header: "Allocated Staff", accessor: "allocatedStaff" },
    ];

    const actions = [
        {
            label: "See More",
            onClick: handleSeeMore,
            className: "bg-blue-600 text-white hover:bg-blue-700",
        },
        {
            label: "Delete",
            onClick: handleDelete,
            className: "bg-red-600 text-white hover:bg-red-700",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Management</h2>
            <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        id="vehicleCode"
                        label="Vehicle Code"
                        value={vehicleCode}
                        placeholder="Enter vehicle code"
                        onChange={(e) => setVehicleCode(e.target.value)}
                        required
                    />
                    <TextField
                        id="licensePlate"
                        label="License Plate"
                        value={licensePlate}
                        placeholder="Enter license plate"
                        onChange={(e) => setLicensePlate(e.target.value)}
                        required
                    />
                    <TextField
                        id="vehicleCategory"
                        label="Vehicle Category"
                        value={vehicleCategory}
                        placeholder="Enter vehicle category"
                        onChange={(e) => setVehicleCategory(e.target.value)}
                        required
                    />
                    <SelectField
                        id="fuelType"
                        label="Fuel Type"
                        value={fuelType}
                        options={["Petrol", "Diesel", "Electric"]}
                        onChange={(e) => setFuelType(e.target.value)}
                        required
                    />
                    <SelectField
                        id="status"
                        label="Status"
                        value={status}
                        options={["Available", "Out of Service"]}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                    {/* You can dynamically fetch the staff members from your staff data */}
                    <SelectField
                        id="allocatedStaff"
                        label="Allocated Staff"
                        value={allocatedStaff}
                        options={["John Doe", "Jane Smith", "Alice Johnson"]} // Example of staff names, replace with dynamic list
                        onChange={(e) => setAllocatedStaff(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={clearForm}
                        className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700"
                    >
                        Clear
                    </button>
                </div>
            </form>

            <div className="mt-8">
                <Table columns={columns} data={vehicles} actions={actions} />
            </div>

            {selectedVehicle && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Vehicle Details"
                >
                    <div className="space-y-4">
                        <p><strong>Vehicle Code:</strong> {selectedVehicle.vehicleCode}</p>
                        <p><strong>License Plate:</strong> {selectedVehicle.licensePlate}</p>
                        <p><strong>Vehicle Category:</strong> {selectedVehicle.vehicleCategory}</p>
                        <p><strong>Fuel Type:</strong> {selectedVehicle.fuelType}</p>
                        <p><strong>Status:</strong> {selectedVehicle.status}</p>
                        <p><strong>Allocated Staff:</strong> {selectedVehicle.allocatedStaff}</p>
                    </div>
                </Modal>
            )}
        </div>
    );
}
