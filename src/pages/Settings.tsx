import React from 'react';

export default function Settings() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
            <p className="text-gray-600">Manage your preferences and account settings here.</p>
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Notification Settings</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    <option>Enabled</option>
                    <option>Disabled</option>
                </select>
            </div>
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                </select>
            </div>
        </div>
    );
}
