
import React from 'react';
import { Client, Service, ClientDocument } from '../../types';
import { MailIcon, PhoneIcon, DownloadIcon } from '../icons/Icons';

interface Props {
  client: Client;
  services: Service[];
  documents: ClientDocument[];
  onBack: () => void;
}

const statusStyles: Record<Service['status'], string> = {
  'New': 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-green-100 text-green-800',
  'On Hold': 'bg-gray-100 text-gray-800',
};


const ClientDetailView: React.FC<Props> = ({ client, services, documents, onBack }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <button onClick={onBack} className="text-sm font-medium text-primary dark:text-blue-400 hover:underline">
                &larr; Back to All Clients
            </button>

            {/* Client Header */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-text-primary dark:text-gray-200">{client.name}</h2>
                <p className="text-md text-text-secondary dark:text-gray-400">{client.organization}</p>
                 <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <li className="flex items-center gap-3"><MailIcon className="w-5 h-5 text-primary" /> <span>{client.email}</span></li>
                    <li className="flex items-center gap-3"><PhoneIcon className="w-5 h-5 text-primary" /> <span>{client.phone}</span></li>
                </ul>
            </div>

            {/* Service History */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-text-primary dark:text-gray-200">Service History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-4 py-3">Service Title</th>
                                <th scope="col" className="px-4 py-3">Category</th>
                                <th scope="col" className="px-4 py-3">Date</th>
                                <th scope="col" className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service.id} className="border-b dark:border-gray-700">
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{service.title}</td>
                                    <td className="px-4 py-3">{service.category}</td>
                                    <td className="px-4 py-3">{new Date(service.startDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[service.status]}`}>
                                            {service.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-text-primary dark:text-gray-200">Documents</h3>
                {documents.length > 0 ? (
                    <ul className="space-y-3">
                        {documents.map(doc => (
                            <li key={doc.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                <div>
                                    <p className="font-medium text-text-primary dark:text-gray-200">{doc.name}</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-400">{doc.type} &bull; {doc.size} &bull; Uploaded {doc.uploadDate}</p>
                                </div>
                                <a href={doc.url} download className="flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-md text-sm hover:bg-blue-700">
                                    <DownloadIcon className="w-4 h-4"/> Download
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-text-secondary dark:text-gray-400 text-sm">No documents found for this client.</p>
                )}
            </div>
        </div>
    );
};

export default ClientDetailView;
