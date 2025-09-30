
import React, { useState, useMemo } from 'react';
import { Service, Employee, ServiceDocument } from '../../types';
import { mockServices, mockServiceDocuments } from './data';
import { mockEmployees } from '../projects/data';
import { PlusIcon, ServiceIcon, GavelIcon, RocketIcon, AuditIcon, ReceiptIcon, XIcon, DownloadIcon } from '../icons/Icons';
import AddEditServiceModal from './AddEditServiceModal';
import ServiceCard from './ServiceCard';
import KPICard from '../dashboard/KPICard';

interface Props {
  searchQuery: string;
}

const ServiceDocumentsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}> = ({ isOpen, onClose, service }) => {
    if (!isOpen || !service) return null;
    const documents = mockServiceDocuments[service.id] || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-text-primary dark:text-gray-200">Documents for "{service.title}"</h2>
                        <p className="text-sm text-text-secondary dark:text-gray-400">{service.clientName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-5 h-5 text-text-secondary dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
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
                        <div className="text-center py-10">
                            <p className="text-text-secondary dark:text-gray-400">No documents uploaded for this service.</p>
                        </div>
                    )}
                </div>
                <div className="flex justify-end items-center p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">Close</button>
                </div>
            </div>
        </div>
    );
};


const ServiceManagementView: React.FC<Props> = ({ searchQuery }) => {
    const [services, setServices] = useState<Service[]>(mockServices);
    const [employees] = useState<Employee[]>(mockEmployees);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
    const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
    const [selectedServiceForDocs, setSelectedServiceForDocs] = useState<Service | null>(null);

    const [filters, setFilters] = useState({
        category: 'all',
        status: 'all',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredServices = useMemo(() => {
        return services.filter(s => {
            const searchMatch = searchQuery 
                ? s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || s.title.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const categoryMatch = filters.category === 'all' || s.category === filters.category;
            const statusMatch = filters.status === 'all' || s.status === filters.status;
            return searchMatch && categoryMatch && statusMatch;
        });
    }, [services, filters, searchQuery]);
    
    const serviceStats = useMemo(() => {
        return {
            total: services.length,
            inProgress: services.filter(s => s.status === 'In Progress').length,
            completed: services.filter(s => s.status === 'Completed').length,
            new: services.filter(s => s.status === 'New').length,
        }
    }, [services]);


    const handleOpenModal = (service: Service | null) => {
        setServiceToEdit(service);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setServiceToEdit(null);
    };

    const handleSaveService = (serviceData: Service) => {
        if (serviceData.id) {
            setServices(services.map(s => s.id === serviceData.id ? serviceData : s));
        } else {
            const newService = { ...serviceData, id: `serv-${Date.now()}`, progress: serviceData.status === 'Completed' ? 100 : serviceData.progress || 0 };
            setServices([newService, ...services]);
        }
        handleCloseModal();
    };
    
    const handleDeleteService = (serviceId: string) => {
        if(window.confirm('Are you sure you want to delete this service request?')) {
            setServices(services.filter(s => s.id !== serviceId));
        }
    };
    
    const handleOpenDocumentsModal = (service: Service) => {
        setSelectedServiceForDocs(service);
        setIsDocumentsModalOpen(true);
    };

    const handleCloseDocumentsModal = () => {
        setIsDocumentsModalOpen(false);
        setSelectedServiceForDocs(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Services</h2>
                     <p className="text-text-secondary dark:text-gray-400 mt-1">Manage all client service requests and track their status.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal(null)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <PlusIcon />
                    <span>Add Service</span>
                </button>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <KPICard title="Total Services" value={String(serviceStats.total)} icon={<ServiceIcon />} color="blue" />
                 <KPICard title="In Progress" value={String(serviceStats.inProgress)} icon={<RocketIcon />} color="yellow" />
                 <KPICard title="Completed" value={String(serviceStats.completed)} icon={<AuditIcon />} color="green" />
                 <KPICard title="New Requests" value={String(serviceStats.new)} icon={<GavelIcon />} color="indigo" />
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="text-sm font-medium text-text-secondary dark:text-gray-400 block mb-1">Category</label>
                        <select name="category" id="category" value={filters.category} onChange={handleFilterChange} className="w-full p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                            <option value="all">All</option>
                            <option value="Tax">Tax</option>
                            <option value="GST">GST</option>
                            <option value="Startup">Startup</option>
                            <option value="Legal">Legal</option>
                            <option value="Audit">Audit</option>
                        </select>
                    </div>
                    <div>
                         <label htmlFor="status" className="text-sm font-medium text-text-secondary dark:text-gray-400 block mb-1">Status</label>
                        <select name="status" id="status" value={filters.status} onChange={handleFilterChange} className="w-full p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                            <option value="all">All</option>
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <ServiceCard 
                            key={service.id} 
                            service={service} 
                            employees={employees} 
                            onEdit={() => handleOpenModal(service)}
                            onDelete={() => handleDeleteService(service.id)}
                            onViewDocuments={() => handleOpenDocumentsModal(service)}
                        />
                    ))
                ) : (
                    <div className="lg:col-span-2 text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-text-primary dark:text-gray-200">No Services Found</h3>
                        <p className="text-text-secondary dark:text-gray-400 mt-2">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <AddEditServiceModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveService}
                    serviceToEdit={serviceToEdit}
                    employees={employees}
                />
            )}

            <ServiceDocumentsModal
                isOpen={isDocumentsModalOpen}
                onClose={handleCloseDocumentsModal}
                service={selectedServiceForDocs}
            />
        </div>
    );
};

export default ServiceManagementView;