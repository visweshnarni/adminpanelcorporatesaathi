
import React, { useState, useEffect } from 'react';
import { Service, Employee, ServiceCategory, ServiceStatus, ProjectPriority } from '../../types';
import { XIcon } from '../icons/Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
  serviceToEdit: Service | null;
  employees: Employee[];
}

const emptyService: Omit<Service, 'id' | 'progress'> = {
  title: '',
  clientName: '',
  organization: '',
  email: '',
  phone: '',
  category: 'Tax',
  status: 'New',
  priority: 'Medium',
  description: '',
  assignedTeam: 'Unassigned',
  assignedEmployeeIds: [],
  documents: 0,
  startDate: new Date().toISOString().split('T')[0],
};

const AddEditServiceModal: React.FC<Props> = ({ isOpen, onClose, onSave, serviceToEdit, employees }) => {
  const [service, setService] = useState<Omit<Service, 'id' | 'progress'> & { id?: string, progress?: number }>(emptyService);

  useEffect(() => {
    if (serviceToEdit) {
      setService(serviceToEdit);
    } else {
      setService(emptyService);
    }
  }, [serviceToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setService(prev => ({...prev, [name]: value}));
  };
  
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(e.target.selectedOptions as HTMLCollectionOf<HTMLOptionElement>, option => Number(option.value));
    setService(prev => ({...prev, assignedEmployeeIds: selectedIds}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service.clientName && service.email && service.phone && service.title) {
      onSave(service as Service);
    } else {
      alert('Please fill in all required fields (*).');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-text-primary dark:text-gray-200">{serviceToEdit ? 'Edit Service Request' : 'Add New Service Request'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="w-5 h-5 text-text-secondary dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-6">
             
             <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name *</label>
                        <input type="text" name="clientName" value={service.clientName} onChange={handleChange} placeholder="Enter client name" required className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                     <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization</label>
                        <input type="text" name="organization" value={service.organization} onChange={handleChange} placeholder="Company/Organization name" className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                     <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email *</label>
                        <input type="email" name="email" value={service.email} onChange={handleChange} placeholder="client@example.com" required className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                     <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Phone *</label>
                        <input type="tel" name="phone" value={service.phone} onChange={handleChange} placeholder="+91 98765 43210" required className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                </div>
             </div>

             <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Service Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Title *</label>
                        <input type="text" name="title" value={service.title} onChange={handleChange} placeholder="e.g., Annual Tax Filing" required className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                     <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Category *</label>
                        <select name="category" value={service.category} onChange={handleChange} required className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700">
                            <option value="Tax">Tax</option>
                            <option value="GST">GST</option>
                            <option value="Startup">Startup</option>
                            <option value="Legal">Legal</option>
                            <option value="Audit">Audit</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority *</label>
                        <select name="priority" value={service.priority} onChange={handleChange} required className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700">
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                     <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status *</label>
                        <select name="status" value={service.status} onChange={handleChange} required className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700">
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Description</label>
                        <textarea name="description" value={service.description} onChange={handleChange} placeholder="Describe the service..." rows={3} className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary"></textarea>
                    </div>
                </div>
             </div>
            
            <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Team Assignment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign to Team</label>
                         <select
                            name="assignedTeam"
                            value={service.assignedTeam}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary bg-white"
                        >
                            <option value="Unassigned">Unassigned</option>
                            <option value="IT Team">IT Team</option>
                            <option value="Finance Team">Finance Team</option>
                            <option value="HR Team">HR Team</option>
                            <option value="Marketing Team">Marketing Team</option>
                            <option value="Legal Team">Legal Team</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign Team Members</label>
                        <select
                            multiple
                            name="assignedEmployeeIds"
                            value={service.assignedEmployeeIds.map(String)}
                            onChange={handleMultiSelectChange}
                            className="w-full h-32 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary"
                        >
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple members.</p>
                    </div>
                 </div>
            </div>

          </div>
          <div className="flex justify-end items-center gap-3 p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">{serviceToEdit ? 'Save Changes' : 'Create Service'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditServiceModal;