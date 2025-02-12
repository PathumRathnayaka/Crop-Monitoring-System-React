import React, { useState } from "react";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import Modal from "../components/Modal";
import {RootState} from "../store/store.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addVehicle, deleteVehicle} from "../redux/VehicleSlice.ts";


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
    const vehicles =useSelector((state: RootState) => state.vehicle);

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

    const handleDelete = (vehicleCode: string) => {
        dispatch(deleteVehicle(vehicleCode))
    };

    const handleSeeMore = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setIsModalOpen(true);
    };

    /*const clearForm = () => {
        setVehicleCode("");
        setLicensePlate("");
        setVehicleCategory("");
        setFuelType("");
        setStatus("");
        setAllocatedStaff("");
    };*/

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
                        options={["John Doe", "Jane Smith", "Alice Johnson"]} // Example of staff names, replace with dynamic list
                        onChange={handleAllocatedStaffChange}
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
                        /*onClick={clearForm}*/
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
