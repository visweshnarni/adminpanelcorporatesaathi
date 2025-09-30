
import React from 'react';
import { Service, Employee } from '../../types';
// FIX: Imported UsersIcon to be used in the component.
import { EditIcon, TrashIcon, ServiceIcon, GavelIcon, RocketIcon, AuditIcon, ReceiptIcon, MailIcon, UsersIcon } from '../icons/Icons';

interface Props {
  service: Service;
  employees: Employee[];
  onEdit: () => void;
  onDelete: () => void;
  onViewDocuments: () => void;
}

const statusStyles = {
  'New': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'In Progress': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'Completed': { bg: 'bg-green-100', text: 'text-green-800' },
  'On Hold': { bg: 'bg-gray-100', text: 'text-gray-800' },
};

const categoryConfig: Record<Service['category'], { icon: React.ReactElement, color: string, bg: string }> = {
    'Tax': { icon: <ServiceIcon />, color: 'text-blue-600', bg: 'bg-blue-100' },
    'GST': { icon: <ReceiptIcon />, color: 'text-green-600', bg: 'bg-green-100' },
    'Startup': { icon: <RocketIcon />, color: 'text-red-600', bg: 'bg-red-100' },
    'Legal': { icon: <GavelIcon />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    'Audit': { icon: <AuditIcon />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
};

const ServiceCard: React.FC<Props> = ({ service, employees, onEdit, onDelete, onViewDocuments }) => {
  const assigned = employees.filter(emp => service.assignedEmployeeIds.includes(emp.id));
  const { bg: statusBg, text: statusText } = statusStyles[service.status];
  const { icon, color, bg } = categoryConfig[service.category];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="p-5">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${bg} ${color}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-text-primary dark:text-gray-200 text-lg">{service.title}</h3>
                    <p className="text-sm text-text-secondary dark:text-gray-400">{service.clientName}</p>
                </div>
            </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBg} ${statusText}`}>
            {service.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-text-secondary dark:text-gray-400">
            <div className="flex items-center gap-2 truncate">
                <MailIcon className="w-4 h-4" />
                <span className="truncate">{service.email}</span>
            </div>
             <div className="flex items-center gap-2 truncate">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="truncate">{service.phone}</span>
            </div>
             <div className="flex items-center gap-2 truncate">
                <UsersIcon className="w-4 h-4" />
                <span className="truncate">{service.assignedTeam}</span>
            </div>
            <div className="flex items-center gap-2 truncate">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 <button onClick={onViewDocuments} disabled={service.documents === 0} className="truncate hover:underline disabled:no-underline disabled:cursor-not-allowed disabled:text-text-secondary dark:disabled:text-gray-400">
                    {service.documents} Document(s)
                 </button>
            </div>
        </div>

        <div className="mt-4">
            <div className="flex justify-between text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{service.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className={`${bg.replace("100", "500")} h-2 rounded-full`} style={{ width: `${service.progress}%` }}></div>
            </div>
        </div>
      </div>
      
      <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
                {assigned.slice(0, 4).map(emp => (
                    <img key={emp.id} className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-800" src={emp.avatar} alt={emp.name} title={emp.name} />
                ))}
            </div>
            {assigned.length > 4 && (
                <span className="text-xs font-semibold text-gray-500 bg-gray-200 dark:bg-gray-600 dark:text-gray-300 rounded-full h-8 w-8 flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                    +{assigned.length - 4}
                </span>
            )}
             {assigned.length === 0 && (
                <p className="text-xs text-text-secondary dark:text-gray-400 italic">Awaiting assignment</p>
            )}
        </div>
        <div className="flex items-center gap-2">
            <button onClick={onEdit} className="p-2 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary transition-colors">
              <EditIcon className="w-5 h-5"/>
            </button>
            <button onClick={onDelete} className="p-2 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500 transition-colors">
              <TrashIcon className="w-5 h-5"/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;