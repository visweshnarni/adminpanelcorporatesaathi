
import React from 'react';
import { Client } from '../../types';

interface Props {
  clients: Client[];
  onViewDetails: (client: Client) => void;
}

const statusStyles = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Inactive: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const ClientTable: React.FC<Props> = ({ clients, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">Client / Organization</th>
                        <th scope="col" className="px-6 py-3">Contact</th>
                        <th scope="col" className="px-6 py-3">First Seen</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                <div>{client.name}</div>
                                <div className="text-xs text-gray-500">{client.organization}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div>{client.email}</div>
                                <div className="text-xs text-gray-500">{client.phone}</div>
                            </td>
                             <td className="px-6 py-4">
                                {new Date(client.firstSeen).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[client.status]}`}>
                                    {client.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button onClick={() => onViewDetails(client)} className="text-primary hover:underline font-medium">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {clients.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">No Clients Found</h3>
                    <p className="text-text-secondary dark:text-gray-400 mt-1">Try adjusting your search criteria.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default ClientTable;
