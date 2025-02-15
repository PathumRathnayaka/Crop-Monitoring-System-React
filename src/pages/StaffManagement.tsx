import React, { useState } from "react";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import Modal from "../components/Modal";
import {RootState} from "../store/store.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addEmployee, deleteEmployee, updateEmployee} from "../redux/StaffSlice.ts";

interface Employee {
    employeeId: string;
    firstName: string;
    lastName: string;
    designation: string;
    contact: string;
    address: string;
    gender: string;
    joinedDate: string;
    email: string;
}

export default function StaffManagement() {



    // *if you need to check using sample data

    // const [employees, setEmployees] = useState(sampleStaffData);

    const dispatch = useDispatch();
    const employees = useSelector((state: RootState) => state.staff);

    const [newEmployee, setNewEmployee] = useState<Employee>({
        employeeId: "",
        firstName: "",
        lastName: "",
        designation: "",
        contact: "",
        address: "",
        gender: "",
        joinedDate: "",
        email: "",
    });

    const [selectedEmployee, setSelectedEmployee] = useState<Employee|null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const handleAddEmployee =(e: React.FormEvent) => {
        e.preventDefault();
        if (newEmployee.employeeId && newEmployee.firstName && newEmployee.designation && newEmployee.contact) {
            dispatch(addEmployee(newEmployee));
            setNewEmployee({
                employeeId: "",
                firstName: "",
                lastName: "",
                designation: "",
                contact: "",
                address: "",
                gender: "",
                joinedDate: "",
                email: "",
            });
        }
    }

    const handleUpdateEmployee = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingEmployee) {
            dispatch(updateEmployee(newEmployee));
            setEditingEmployee(null);
            setNewEmployee({
                employeeId: "",
                firstName: "",
                lastName: "",
                designation: "",
                contact: "",
                address: "",
                gender: "",
                joinedDate: "",
                email: "",
            })
        }
    };

    const handleDelete = (employeeId: string) => {
        dispatch(deleteEmployee(employeeId));
    };

    const handleSeeMore = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewEmployee({ ...newEmployee, [id]: value });
    };

    const handleDesignationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewEmployee({ ...newEmployee, designation: value });
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewEmployee({ ...newEmployee, gender: value });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    const handleRowClick = (employee: Employee) => {
        setNewEmployee(employee);
        setEditingEmployee(employee); // Store the crop being edited

    };

    /*const clearForm = () => {
        setEmployeeId("");
        setFirstName("");
        setLastName("");
        setDesignation("");
        setContact("");
        setAddress("");
        setGender("");
        setJoinedDate("");
        setEmail("");
    };*/

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
            onClick: (employee: Employee) => handleDelete(employee.employeeId), // Ensure employeeId is passed correctly
            className: "bg-red-600 text-white hover:bg-red-700",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Staff Management</h2>
            <form onSubmit={handleAddEmployee}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        id="employeeId"
                        label="Employee ID"
                        value={newEmployee.employeeId}
                        placeholder="Enter employee ID"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="firstName"
                        label="First Name"
                        value={newEmployee.firstName}
                        placeholder="Enter first name"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        value={newEmployee.lastName}
                        placeholder="Enter last name"
                        onChange={handleInputChange}
                        required
                    />
                    <SelectField
                        id="designation"
                        label="Designation"
                        value={newEmployee.designation}
                        options={["Manager", "Staff", "Intern"]}
                        onChange={handleDesignationChange}
                        required
                    />
                    <TextField
                        id="contact"
                        label="Contact"
                        value={newEmployee.contact}
                        placeholder="Enter contact number"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        id="address"
                        label="Address"
                        value={newEmployee.address}
                        placeholder="Enter address"
                        onChange={handleInputChange}
                    />
                    <SelectField
                        id="gender"
                        label="Gender"
                        value={newEmployee.gender}
                        options={["Male", "Female", "Other"]}
                        onChange={handleGenderChange}
                    />
                    <TextField
                        id="joinedDate"
                        label="Joined Date"
                        value={newEmployee.joinedDate}
                        placeholder="Enter joined date"
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        value={newEmployee.email}
                        placeholder="Enter email"
                        onChange={handleInputChange}
                    />
                </div>

                    <button
                        type="submit"
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md mr-4"
                    >
                        Add Employee
                    </button>
                    <button
                        type="button"
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
                        onClick={handleUpdateEmployee}
                    >
                        Update Employee
                    </button>

            </form>
            <div className="mt-8">
                <Table columns={columns} data={employees} actions={actions} onRowClick={handleRowClick}/>
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
