import React, { useState } from "react";
import TextField from "../components/TextField";
import DateField from "../components/DateField";
import SelectField from "../components/SelectField";
import InputTextWithImageUpload from "../components/InputTextWithImageUpload";
import Table from "../components/Table";
import Modal from "../components/Modal";

export default function LogManagement() {

    const sampleLogData = [
        {
            logCode: "L001",
            logDate: "2025-01-10",
            field: "Field A",
            crop: "Corn",
            staff: "John Doe",
            logDetails: "Inspected for pests; minor infestation noted.",
            observedImage: "https://via.placeholder.com/150", // Placeholder URL
        },
        {
            logCode: "L002",
            logDate: "2025-01-11",
            field: "Field B",
            crop: "Wheat",
            staff: "Jane Smith",
            logDetails: "Fertilizer applied; growth progressing well.",
            observedImage: "https://via.placeholder.com/150",
        },
        {
            logCode: "L003",
            logDate: "2025-01-12",
            field: "Field C",
            crop: "Rice",
            staff: "Alice Johnson",
            logDetails: "Water level monitored; no issues found.",
            observedImage: "https://via.placeholder.com/150",
        },
        {
            logCode: "L004",
            logDate: "2025-01-13",
            field: "Field D",
            crop: "Soybeans",
            staff: "Bob Brown",
            logDetails: "Harvest initiated; quality check in progress.",
            observedImage: "https://www.canr.msu.edu/uploads/236/100167/SaskatoonBerries-DukeElsner-WEB.jpg",
        },
        {
            logCode: "L005",
            logDate: "2025-01-14",
            field: "Field E",
            crop: "Tomatoes",
            staff: "Emily White",
            logDetails: "Checked for fungal infections; none detected.",
            observedImage: "https://www.canr.msu.edu/uploads/236/100167/SaskatoonBerries-DukeElsner-WEB.jpg",
        },
    ];


    // State for log form fields
    const [logCode, setLogCode] = useState("");
    const [logDate, setLogDate] = useState("");
    const [field, setField] = useState("");
    const [crop, setCrop] = useState("");
    const [staff, setStaff] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [observedImage, setObservedImage] = useState("");

    const [logs, setLogs] = useState(sampleLogData); // Initialize with empty array
    const [selectedLog, setSelectedLog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        const newLog = {
            logCode,
            logDate,
            field,
            crop,
            staff,
            logDetails,
            observedImage,
        };
        setLogs((prev) => [...prev, newLog]);
        clearForm();
    };

    const handleDelete = (row: Record<string, any>) => {
        setLogs((prev) => prev.filter((log) => log.logCode !== row.logCode));
    };

    const handleSeeMore = (row: Record<string, any>) => {
        setSelectedLog(row);
        setIsModalOpen(true);
    };

    const clearForm = () => {
        setLogCode("");
        setLogDate("");
        setField("");
        setCrop("");
        setStaff("");
        setLogDetails("");
        setObservedImage("");
    };

    const columns = [
        { header: "Log Code", accessor: "logCode" },
        { header: "Log Date", accessor: "logDate" },
        { header: "Field", accessor: "field" },
        { header: "Crop", accessor: "crop" },
        { header: "Staff", accessor: "staff" },
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Log Management</h2>
            <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        id="logCode"
                        label="Log Code"
                        value={logCode}
                        placeholder="Enter log code"
                        onChange={(e) => setLogCode(e.target.value)}
                        required
                    />
                    <DateField
                        id="logDate"
                        label="Log Date"
                        value={logDate}
                        onChange={(e) => setLogDate(e.target.value)}
                        required
                    />
                    <SelectField
                        id="field"
                        label="Field"
                        value={field}
                        options={["Field A", "Field B", "Field C"]} // Replace with dynamic options
                        onChange={(e) => setField(e.target.value)}
                        required
                    />
                    <SelectField
                        id="crop"
                        label="Crop"
                        value={crop}
                        options={["Crop X", "Crop Y", "Crop Z"]} // Replace with dynamic options
                        onChange={(e) => setCrop(e.target.value)}
                        required
                    />
                    <SelectField
                        id="staff"
                        label="Staff"
                        value={staff}
                        options={["Staff 1", "Staff 2", "Staff 3"]} // Replace with dynamic options
                        onChange={(e) => setStaff(e.target.value)}
                        required
                    />
                    <TextField
                        id="logDetails"
                        label="Log Details"
                        value={logDetails}
                        placeholder="Enter log details"
                        onChange={(e) => setLogDetails(e.target.value)}
                        required
                    />
                    <InputTextWithImageUpload
                        label="Observed Image"
                        onImageChange={(url) => setObservedImage(url)}
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
                <Table columns={columns} data={logs} actions={actions} />
            </div>

            {selectedLog && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Log Details"
                >
                    <div className="space-y-4">
                        <p><strong>Log Code:</strong> {selectedLog.logCode}</p>
                        <p><strong>Log Date:</strong> {selectedLog.logDate}</p>
                        <p><strong>Field:</strong> {selectedLog.field}</p>
                        <p><strong>Crop:</strong> {selectedLog.crop}</p>
                        <p><strong>Staff:</strong> {selectedLog.staff}</p>
                        <p><strong>Log Details:</strong> {selectedLog.logDetails}</p>
                        {selectedLog.observedImage && (
                            <div>
                                <strong>Observed Image:</strong>
                                <img
                                    src={selectedLog.observedImage}
                                    alt="Observed"
                                    className="w-32 h-32 object-cover rounded-md mt-2"
                                />
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
}
