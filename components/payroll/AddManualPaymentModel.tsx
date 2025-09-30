
import React, { useState, useEffect } from 'react';
import { ManualPayment, Employee } from '../../types';
import { XIcon } from '../icons/Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payment: ManualPayment) => void;
  paymentToEdit: ManualPayment | null;
  employees: Employee[];
}

const emptyPayment: Partial<ManualPayment> = {
  employeeId: undefined,
  amount: 0,
  date: new Date().toISOString().split('T')[0],
  type: 'Bonus',
  notes: '',
  status: 'Paid',
};

const AddManualPaymentModal: React.FC<Props> = ({ isOpen, onClose, onSave, paymentToEdit, employees }) => {
  const [payment, setPayment] = useState<Partial<ManualPayment>>(emptyPayment);

  useEffect(() => {
    setPayment(paymentToEdit || emptyPayment);
  }, [paymentToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setPayment(prev => ({ 
        ...prev, 
        [name]: type === 'number' ? parseFloat(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payment.employeeId && payment.amount > 0 && payment.date && payment.type) {
      onSave(payment as ManualPayment);
    } else {
      alert('Please fill in all required fields and ensure the amount is greater than zero.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-text-primary dark:text-gray-200">{paymentToEdit ? 'Edit Manual Payment' : 'Add Manual Payment'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="w-5 h-5 text-text-secondary dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee *</label>
              <select name="employeeId" value={payment.employeeId || ''} onChange={handleChange} required className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" disabled={!!paymentToEdit}>
                <option value="" disabled>Select an employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount *</label>
                    <input type="number" name="amount" value={payment.amount || ''} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" placeholder="0.00" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Date *</label>
                    <input type="date" name="date" value={payment.date} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" required />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Type *</label>
                    <select name="type" value={payment.type} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" required>
                        <option>Bonus</option>
                        <option>Reimbursement</option>
                        <option>Advance</option>
                        <option>Other</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select name="status" value={payment.status} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary">
                        <option>Paid</option>
                        <option>Pending</option>
                    </select>
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes / Reason</label>
              <textarea name="notes" value={payment.notes} onChange={handleChange} rows={2} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" placeholder="e.g., Q2 Performance Bonus"></textarea>
            </div>
          <div className="flex justify-end items-center gap-3 pt-4 border-t dark:border-gray-700">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">Save Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddManualPaymentModal;
