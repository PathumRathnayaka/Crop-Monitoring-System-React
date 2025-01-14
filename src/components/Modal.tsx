import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode; // Accept any child content, such as crop details
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; // If not open, don't render anything

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-full md:w-1/2 max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900"
                        aria-label="Close Modal"
                    >
                        X
                    </button>
                </div>
                <div className="space-y-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
