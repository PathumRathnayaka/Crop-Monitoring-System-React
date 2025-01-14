import React, { useState } from "react";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import Modal from "../components/Modal";

export default function EquipmentManagement() {
    const sampleEquipments = [
        {
            equipmentId: "E001",
            name: "Generator",
            type: "Electrical",
            status: "Available",
            assignedStaff: "John Doe",
        },
        {
            equipmentId: "E002",
            name: "Excavator",
            type: "Mechanical",
            status: "Unavailable",
            assignedStaff: "Jane Smith",
        },
        {
            equipmentId: "E003",
            name: "Hydraulic Press",
            type: "Hydraulic",
            status: "Available",
            assignedStaff: "Alice Johnson",
        },
        {
            equipmentId: "E004",
            name: "Welding Machine",
            type: "Electrical",
            status: "Available",
            assignedStaff: "Bob Brown",
        },
        {
            equipmentId: "E005",
            name: "Forklift",
            type: "Mechanical",
            status: "Unavailable",
            assignedStaff: "Charlie Davis",
        },
    ];

    const [equipments, setEquipments] = useState(sampleEquipments);
    const [newEquipment, setNewEquipment] = useState({
        equipmentId: "",
        name: "",
        type: "",
        status: "",
        assignedStaff: "",
    });
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (event) => {
        event.preventDefault();
        setEquipments((prev) => [...prev, newEquipment]);
        clearForm();
    };

    const handleDelete = (row) => {
        setEquipments((prev) => prev.filter((equipment) => equipment.equipmentId !== row.equipmentId));
    };

    const handleSeeMore = (row) => {
        setSelectedEquipment(row);
        setIsModalOpen(true);
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

            <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        id="equipmentId"
                        label="Equipment ID"
                        value={newEquipment.equipmentId}
                        placeholder="Enter equipment ID"
                        onChange={(e) => setNewEquipment({ ...newEquipment, equipmentId: e.target.value })}
                        required
                    />
                    <TextField
                        id="name"
                        label="Name"
                        value={newEquipment.name}
                        placeholder="Enter equipment name"
                        onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                        required
                    />
                    <SelectField
                        id="type"
                        label="Type"
                        value={newEquipment.type}
                        options={["Electrical", "Mechanical", "Hydraulic"]}
                        onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
                        required
                    />
                    <SelectField
                        id="status"
                        label="Status"
                        value={newEquipment.status}
                        options={["Available", "Unavailable"]}
                        onChange={(e) => setNewEquipment({ ...newEquipment, status: e.target.value })}
                        required
                    />
                    <SelectField
                        id="assignedStaff"
                        label="Assigned Staff"
                        value={newEquipment.assignedStaff}
                        options={["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"]}
                        onChange={(e) => setNewEquipment({ ...newEquipment, assignedStaff: e.target.value })}
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
                    </div>
                </Modal>
            )}
        </div>
    );
}
