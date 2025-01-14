import React, { useState } from "react";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import Modal from "../components/Modal";

export default function StaffManagement() {

    /*const sampleStaffData = [
        {
            id: "E001",
            firstName: "John",
            lastName: "Doe",
            designation: "Manager",
            address: "123 Main St, Springfield",
            contact: "123-456-7890",
            gender: "Male",
            joinedDate: "2021-03-15",
            email: "john.doe@example.com",
        },
        {
            id: "E002",
            firstName: "Jane",
            lastName: "Smith",
            designation: "Developer",
            address: "456 Elm St, Springfield",
            contact: "987-654-3210",
            gender: "Female",
            joinedDate: "2020-07-21",
            email: "jane.smith@example.com",
        },
        {
            id: "E003",
            firstName: "Alice",
            lastName: "Johnson",
            designation: "Designer",
            address: "789 Oak St, Springfield",
            contact: "555-123-4567",
            gender: "Female",
            joinedDate: "2019-11-02",
            email: "alice.johnson@example.com",
        },
    ];*/



    const [employeeId, setEmployeeId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [designation, setDesignation] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const [email, setEmail] = useState("");

    // const [employees, setEmployees] = useState(sampleStaffData);

    // *if you need to check using sample data

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        const newEmployee = {
            employeeId,
            firstName,
            lastName,
            designation,
            contact,
            address,
            gender,
            joinedDate,
            email,
        };
        setEmployees((prev) => [...prev, newEmployee]);
        clearForm();
    };

    const handleDelete = (row: Record<string, any>) => {
        setEmployees((prev) => prev.filter((emp) => emp.employeeId !== row.employeeId));
    };

    const handleSeeMore = (row: Record<string, any>) => {
        setSelectedEmployee(row);
        setIsModalOpen(true);
    };

    const clearForm = () => {
        setEmployeeId("");
        setFirstName("");
        setLastName("");
        setDesignation("");
        setContact("");
        setAddress("");
        setGender("");
        setJoinedDate("");
        setEmail("");
    };

    const columns = [
        { header: "Employee ID", accessor: "employeeId" },
        { header: "First Name", accessor: "firstName" },
        { header: "Designation", accessor: "designation" },
        { header: "Contact", accessor: "contact" },
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Staff Management</h2>
            <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        id="employeeId"
                        label="Employee ID"
                        value={employeeId}
                        placeholder="Enter employee ID"
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    />
                    <TextField
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        placeholder="Enter first name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        placeholder="Enter last name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <SelectField
                        id="designation"
                        label="Designation"
                        value={designation}
                        options={["Manager", "Staff", "Intern"]}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    />
                    <TextField
                        id="contact"
                        label="Contact"
                        value={contact}
                        placeholder="Enter contact number"
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                    <TextField
                        id="address"
                        label="Address"
                        value={address}
                        placeholder="Enter address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <SelectField
                        id="gender"
                        label="Gender"
                        value={gender}
                        options={["Male", "Female", "Other"]}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <TextField
                        id="joinedDate"
                        label="Joined Date"
                        value={joinedDate}
                        placeholder="Enter joined date"
                        onChange={(e) => setJoinedDate(e.target.value)}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
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
                <Table columns={columns} data={employees} actions={actions} />
            </div>
            {selectedEmployee && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Employee Details"
                >
                    <div className="space-y-4">
                        <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
                        <p><strong>First Name:</strong> {selectedEmployee.firstName}</p>
                        <p><strong>Last Name:</strong> {selectedEmployee.lastName}</p>
                        <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
                        <p><strong>Contact:</strong> {selectedEmployee.contact}</p>
                        <p><strong>Address:</strong> {selectedEmployee.address}</p>
                        <p><strong>Gender:</strong> {selectedEmployee.gender}</p>
                        <p><strong>Joined Date:</strong> {selectedEmployee.joinedDate}</p>
                        <p><strong>Email:</strong> {selectedEmployee.email}</p>
                    </div>
                </Modal>
            )}
        </div>
    );
}
