import React, { useState } from "react";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import Modal from "../components/Modal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.tsx";
import {addEquipment, deleteEquipment} from "../redux/EquipmentSlice.ts";

interface Equipment {
    equipmentId: string;
    name: string;
    type: string;
    status: string;
    assignedStaff: string;
}

export default function EquipmentManagement() {



    /*const [equipments, setEquipments] = useState(sampleEquipments);*/

    const dispatch = useDispatch();
    const equipments = useSelector((state: RootState)=> state.equipment);


    const [newEquipment, setNewEquipment] = useState<Equipment>({
        equipmentId: "",
        name: "",
        type: "",
        status: "",
        assignedStaff: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);


    const handleAddEquipment = (event : React.FormEvent) => {
        event.preventDefault();
        dispatch(addEquipment(newEquipment));
        setNewEquipment({
            equipmentId: "",
            name: "",
            type: "",
            status: "",
            assignedStaff: "",
        });
        clearForm();
    };

    const handleDelete = (equipmentId: string) => {
        dispatch(deleteEquipment(equipmentId));
    };

    const handleSeeMore = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setIsModalOpen(true);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewEquipment({ ...newEquipment, [id]: value });
    };

    const handleEquimpentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewEquipment({ ...newEquipment, type: value });
    };

    const handleEquipmentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewEquipment({ ...newEquipment, status: value });
    };

    const handleAssignedStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewEquipment({ ...newEquipment, assignedStaff: value });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEquipment(null);
    };

    const clearForm = () => {
        setNewEquipment({
            equipmentId: "",
            name: "",
            type: "",
            status: "",
            assignedStaff: "",
        });
    };

    const columns = [
        { header: "Equipment ID", accessor: "equipmentId" },
        { header: "Name", accessor: "name" },
        { header: "Type", accessor: "type" },
        { header: "Status", accessor: "status" },
        { header: "Assigned Staff", accessor: "assignedStaff" },
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Equipment Management</h2>

            <form onSubmit={handleAddEquipment}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        id="equipmentId"
                        label="Equipment ID"
                        value={newEquipment.equipmentId}
                        placeholder="Enter equipment ID"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="name"
                        label="Name"
                        value={newEquipment.name}
                        placeholder="Enter equipment name"
                        onChange={handleInputChange}
                        required
                    />
                    <SelectField
                        id="type"
                        label="Type"
                        value={newEquipment.type}
                        options={["Electrical", "Mechanical", "Hydraulic"]}
                        onChange={handleEquimpentTypeChange}
                        required
                    />
                    <SelectField
                        id="status"
                        label="Status"
                        value={newEquipment.status}
                        options={["Available", "Unavailable"]}
                        onChange={handleEquipmentStatusChange}
                        required
                    />
                    <SelectField
                        id="assignedStaff"
                        label="Assigned Staff"
                        value={newEquipment.assignedStaff}
                        options={["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"]}
                        onChange={handleAssignedStaffChange}
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
                <Table columns={columns} data={equipments} actions={actions} />
            </div>

            {selectedEquipment && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Equipment Details"
                >
                    <div className="space-y-4">
                        <p><strong>Equipment ID:</strong> {selectedEquipment.equipmentId}</p>
                        <p><strong>Name:</strong> {selectedEquipment.name}</p>
                        <p><strong>Type:</strong> {selectedEquipment.type}</p>
                        <p><strong>Status:</strong> {selectedEquipment.status}</p>
                        <p><strong>Assigned Staff:</strong> {selectedEquipment.assignedStaff}</p>
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
