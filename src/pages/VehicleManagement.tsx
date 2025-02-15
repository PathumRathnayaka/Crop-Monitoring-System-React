import React, { useState } from "react";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addVehicle, deleteVehicle, updateVehicle } from "../redux/VehicleSlice";

interface Vehicle {
    vehicleCode: string;
    licensePlate: string;
    vehicleCategory: string;
    fuelType: string;
    status: string;
    allocatedStaff: string;
}

export default function VehicleManagement() {
    const dispatch = useDispatch();
    const vehicles = useSelector((state: RootState) => state.vehicle);

    const [newVehicle, setNewVehicle] = useState<Vehicle>({
        vehicleCode: "",
        licensePlate: "",
        vehicleCategory: "",
        fuelType: "",
        status: "",
        allocatedStaff: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

    const handleAddVehicle = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(addVehicle(newVehicle));
        setNewVehicle({
            vehicleCode: "",
            licensePlate: "",
            vehicleCategory: "",
            fuelType: "",
            status: "",
            allocatedStaff: "",
        });
    };

    const handleUpdateVehicle = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingVehicle) {
            dispatch(updateVehicle(newVehicle));
            setEditingVehicle(null);
            setNewVehicle({
                vehicleCode: "",
                licensePlate: "",
                vehicleCategory: "",
                fuelType: "",
                status: "",
                allocatedStaff: "",
            });
        }
    };

    const handleRowClick = (vehicle: Vehicle) => {
        setNewVehicle(vehicle);
        setEditingVehicle(vehicle);
    };

    const handleDelete = (vehicleCode: string) => {
        dispatch(deleteVehicle(vehicleCode));
    };

    const handleSeeMore = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVehicle(null);
    };

    const handleFuelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewVehicle({ ...newVehicle, fuelType: value });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewVehicle({ ...newVehicle, status: value });
    };

    const handleAllocatedStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewVehicle({ ...newVehicle, allocatedStaff: value });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewVehicle({ ...newVehicle, [id]: value });
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
            onClick: (row: Vehicle) => handleSeeMore(row),
            className: "bg-blue-600 text-white hover:bg-blue-700",
        },
        {
            label: "Delete",
            onClick: (row: Vehicle) => handleDelete(row.vehicleCode),
            className: "bg-red-600 text-white hover:bg-red-700",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Management</h2>
            <form onSubmit={handleAddVehicle}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        id="vehicleCode"
                        label="Vehicle Code"
                        value={newVehicle.vehicleCode}
                        placeholder="Enter vehicle code"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="licensePlate"
                        label="License Plate"
                        value={newVehicle.licensePlate}
                        placeholder="Enter license plate"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="vehicleCategory"
                        label="Vehicle Category"
                        value={newVehicle.vehicleCategory}
                        placeholder="Enter vehicle category"
                        onChange={handleInputChange}
                        required
                    />
                    <SelectField
                        id="fuelType"
                        label="Fuel Type"
                        value={newVehicle.fuelType}
                        options={["Petrol", "Diesel", "Electric"]}
                        onChange={handleFuelChange}
                        required
                    />
                    <SelectField
                        id="status"
                        label="Status"
                        value={newVehicle.status}
                        options={["Available", "Out of Service"]}
                        onChange={handleStatusChange}
                        required
                    />
                    <SelectField
                        id="allocatedStaff"
                        label="Allocated Staff"
                        value={newVehicle.allocatedStaff}
                        options={["John Doe", "Jane Smith", "Alice Johnson"]}
                        onChange={handleAllocatedStaffChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md mr-4"
                >
                    Add Vehicle
                </button>
                <button
                    type="button"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
                    onClick={handleUpdateVehicle}
                >
                    Update Vehicle
                </button>
            </form>

            <div className="mt-8">
                <Table columns={columns} data={vehicles} actions={actions} onRowClick={handleRowClick} />
            </div>

            {selectedVehicle && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title="Vehicle Details"
                >
                    <div className="space-y-4">
                        <p><strong>Vehicle Code:</strong> {selectedVehicle.vehicleCode}</p>
                        <p><strong>License Plate:</strong> {selectedVehicle.licensePlate}</p>
                        <p><strong>Vehicle Category:</strong> {selectedVehicle.vehicleCategory}</p>
                        <p><strong>Fuel Type:</strong> {selectedVehicle.fuelType}</p>
                        <p><strong>Status:</strong> {selectedVehicle.status}</p>
                        <p><strong>Allocated Staff:</strong> {selectedVehicle.allocatedStaff}</p>
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