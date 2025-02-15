import React, { useState } from "react";
import TextField from "../components/TextField";
import DateField from "../components/DateField";
import SelectField from "../components/SelectField";
import InputTextWithImageUpload from "../components/InputTextWithImageUpload";
import Table from "../components/Table";
import Modal from "../components/Modal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.tsx";
import {addLog, deleteLog, updateLog} from "../redux/LogSlice.ts";

interface Log {
    logCode: string;
    logDate: string;
    field: string;
    crop: string;
    staff: string;
    logDetails: string;
    observedImage: string;
}

export default function LogManagement() {

    const dispatch = useDispatch();
    const logs = useSelector((state: RootState) => state.log);

    const [newLog, setNewLog] = useState<Log>({
        logCode: "",
        logDate: "",
        field: "",
        crop: "",
        staff: "",
        logDetails: "",
        observedImage: "",
    });


    // const [logs, setLogs] = useState(sampleLogData); // Initialize with empty array
    const [selectedLog, setSelectedLog] = useState<Log | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState<Log | null>(null);

    const handleAddLog = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(addLog(newLog));
        setNewLog({
            logCode: "",
            logDate: "",
            field: "",
            crop: "",
            staff: "",
            logDetails: "",
            observedImage: "",
        });
        // clearForm();
    };

    const handleUpdateLog = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLog) {
            dispatch(updateLog(newLog));
            setEditingLog(null);
            setNewLog({
                logCode: "",
                logDate: "",
                field: "",
                crop: "",
                staff: "",
                logDetails: "",
                observedImage: "",
            });
        }
    }

    const handleRowClick = (log: Log) => {
        setEditingLog(log);
        setNewLog(log);
    };

    const handleDelete = (logCode: string) => {
        dispatch(deleteLog(logCode));
    };

    const handleSeeMore = (log: Log) => {
        setSelectedLog(log);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLog(null);
    };

    const handkeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setNewLog({ ...newLog, [id]: value });
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewLog({ ...newLog, field: value });
    };

    const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewLog({ ...newLog, crop: value });
    };

    const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewLog({ ...newLog, staff: value });
    };

    const handleImageUrlChange = (imgUrl: string) => {
        setNewLog({ ...newLog, observedImage: imgUrl });
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
            onClick: (log: Log) => handleDelete(log.logCode),
            className: "bg-red-600 text-white hover:bg-red-700",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Log Management</h2>
            <form onSubmit={handleAddLog}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        id="logCode"
                        label="Log Code"
                        value={newLog.logCode}
                        placeholder="Enter log code"
                        onChange={handkeInputChange}
                        required
                    />
                    <DateField
                        id="logDate"
                        label="Log Date"
                        value={newLog.logDate}
                        onChange={handkeInputChange}
                        required
                    />
                    <SelectField
                        id="field"
                        label="Field"
                        value={newLog.field}
                        options={["Field A", "Field B", "Field C"]} // Replace with dynamic options
                        onChange={handleFieldChange}
                        required
                    />
                    <SelectField
                        id="crop"
                        label="Crop"
                        value={newLog.crop}
                        options={["Crop X", "Crop Y", "Crop Z"]} // Replace with dynamic options
                        onChange={handleCropChange}
                        required
                    />
                    <SelectField
                        id="staff"
                        label="Staff"
                        value={newLog.staff}
                        options={["Staff 1", "Staff 2", "Staff 3"]} // Replace with dynamic options
                        onChange={handleStaffChange}
                        required
                    />
                    <TextField
                        id="logDetails"
                        label="Log Details"
                        value={newLog.logDetails}
                        placeholder="Enter log details"
                        onChange={handkeInputChange}
                        required
                    />
                    <InputTextWithImageUpload
                        label="Observed Image"
                        onImageChange={handleImageUrlChange}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md mr-4"
                >
                    Add Log
                </button>
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
                    onClick={handleUpdateLog}
                >
                    Update Log
                </button>
            </form>

            <div className="mt-8">
                <Table columns={columns} data={logs} actions={actions} onRowClick={handleRowClick}/>
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
