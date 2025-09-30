
import React from 'react';
import { ManualPayment, Employee } from '../../types';
import { EditIcon, TrashIcon } from '../icons/Icons';

interface Props {
  payments: ManualPayment[];
  employees: Employee[];
  onEdit: (payment: ManualPayment) => void;
  onDelete: (paymentId: string) => void;
}

const typeStyles = {
    Bonus: 'bg-green-100 text-green-800',
    Reimbursement: 'bg-blue-100 text-blue-800',
    Advance: 'bg-yellow-100 text-yellow-800',
    Other: 'bg-gray-100 text-gray-800',
};

const statusStyles = {
    Paid: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
};

const ManualPaymentsTable: React.FC<Props> = ({ payments, employees, onEdit, onDelete }) => {
  const employeeMap = new Map(employees.map(e => [e.id, e]));
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">Employee</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Amount</th>
                        <th scope="col" className="px-6 py-3">Notes</th>
                        <th scope="col" className="px-6 py-3 text-center">Status</th>
                        <th scope="col" className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => {
                        const employee = employeeMap.get(payment.employeeId) as Employee | undefined;
                        if (!employee) return null;
                        
                        return (
                            <tr key={payment.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <img src={employee.avatar} alt={employee.name} className="w-8 h-8 rounded-full" />
                                        <div>{employee.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{formatDate(payment.date)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeStyles[payment.type]}`}>
                                        {payment.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-semibold text-text-primary dark:text-gray-200">${payment.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-text-secondary dark:text-gray-400 max-w-xs truncate">{payment.notes || '-'}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[payment.status]}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => onEdit(payment)} className="p-2 text-gray-500 hover:text-blue-600"><EditIcon className="w-4 h-4" /></button>
                                        <button onClick={() => onDelete(payment.id)} className="p-2 text-gray-500 hover:text-red-600"><TrashIcon className="w-4 h-4"/></button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
             {payments.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">No Manual Payments</h3>
                    <p className="text-text-secondary dark:text-gray-400 mt-1">No manual payments were recorded for the selected month.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default ManualPaymentsTable;
