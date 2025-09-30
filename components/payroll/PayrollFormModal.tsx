import React, { useState, useEffect } from 'react';
import { PayrollRecord, Employee } from '../../types';
import { XIcon } from '../icons/Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recordToEdit?: PayrollRecord | null;
  employees: Employee[];
  currentMonth: string;
  onSave: (record: PayrollRecord) => void;
  isNew: boolean;
}

const PayrollFormModal: React.FC<Props> = ({ isOpen, onClose, recordToEdit, employees, currentMonth, onSave, isNew }) => {
    
    const initialEmployeeId = recordToEdit?.employeeId || employees[0]?.id || 0;
    
    const [formData, setFormData] = useState<Omit<PayrollRecord, 'id' | 'month' | 'status'>>({
        employeeId: initialEmployeeId,
        basicSalary: recordToEdit?.basicSalary || 0,
        allowances: recordToEdit?.allowances || 0,
        deductions: recordToEdit?.deductions || 0,
        netSalary: recordToEdit?.netSalary || 0,
    });
    const [netSalaryError, setNetSalaryError] = useState('');

    useEffect(() => {
        if (recordToEdit) {
            setFormData({
                employeeId: recordToEdit.employeeId,
                basicSalary: recordToEdit.basicSalary,
                allowances: recordToEdit.allowances,
                deductions: recordToEdit.deductions,
                netSalary: recordToEdit.netSalary,
            });
        } else if (employees.length > 0) {
             // Reset for a new record, set to the first employee by default
             setFormData({
                employeeId: employees[0].id,
                basicSalary: 0,
                allowances: 0,
                deductions: 0,
                netSalary: 0,
            });
        }
    }, [recordToEdit, employees, isOpen]);

    useEffect(() => {
        const calculatedNetSalary = formData.basicSalary + formData.allowances - formData.deductions;
        // Automatically update netSalary based on other fields
        setFormData(prev => ({
            ...prev,
            netSalary: Math.max(0, calculatedNetSalary)
        }));
        
        // Optional: Add validation for net salary calculation if needed
        if (formData.netSalary !== 0 && Math.abs(formData.netSalary - calculatedNetSalary) > 0.01) {
            setNetSalaryError('Net Salary should equal Basic + Allowances - Deductions.');
        } else {
            setNetSalaryError('');
        }
    }, [formData.basicSalary, formData.allowances, formData.deductions]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: (type === 'number' && name !== 'employeeId') ? parseFloat(value) || 0 : value,
        }));
    };
    
    const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            employeeId: parseInt(e.target.value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (netSalaryError) {
             alert(netSalaryError);
             return;
        }

        const recordToSave: PayrollRecord = {
            id: recordToEdit?.id || `payroll-${formData.employeeId}-${currentMonth.replace(' ', '-')}-${Date.now()}`,
            employeeId: formData.employeeId,
            month: currentMonth,
            basicSalary: formData.basicSalary,
            allowances: formData.allowances,
            deductions: formData.deductions,
            netSalary: formData.netSalary,
            status: recordToEdit?.status || 'Paid', // Assuming new records are paid
        };

        onSave(recordToSave);
        onClose();
    };

    const modalTitle = isNew ? `Add Payroll for ${currentMonth}` : 'Edit Payroll Record';
    const employee = employees.find(e => e.id === formData.employeeId);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-text-primary">{modalTitle}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                        <XIcon className="w-5 h-5 text-text-secondary" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                    
                    {/* Employee Selector */}
                    <div className='flex items-center gap-4'>
                        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 w-1/3">Employee</label>
                        <select
                            id="employeeId"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleEmployeeChange}
                            required
                            disabled={!!recordToEdit} // Cannot change employee on edit
                            className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
                        >
                            {isNew && <option value="">Select Employee</option>}
                            {employees.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name} ({e.department})
                                </option>
                            ))}
                        </select>
                    </div>

                    {employee && (
                        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                            <p className="font-semibold">{employee.position}</p>
                            <p>{employee.department} Department</p>
                        </div>
                    )}

                    {/* Salary Fields */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Salary Details (in USD)</h3>

                        <div className='flex items-center gap-4'>
                            <label htmlFor="basicSalary" className="block text-sm font-medium text-gray-700 w-1/3">Basic Salary</label>
                            <input
                                type="number"
                                id="basicSalary"
                                name="basicSalary"
                                value={formData.basicSalary}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div className='flex items-center gap-4'>
                            <label htmlFor="allowances" className="block text-sm font-medium text-gray-700 w-1/3">Allowances</label>
                            <input
                                type="number"
                                id="allowances"
                                name="allowances"
                                value={formData.allowances}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div className='flex items-center gap-4'>
                            <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 w-1/3">Deductions</label>
                            <input
                                type="number"
                                id="deductions"
                                name="deductions"
                                value={formData.deductions}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div className='flex items-center gap-4 p-3 bg-blue-50 border-t border-blue-200 rounded-lg'>
                            <label htmlFor="netSalary" className="block text-base font-bold text-primary w-1/3">Net Salary</label>
                            <input
                                type="number"
                                id="netSalary"
                                name="netSalary"
                                value={formData.netSalary.toFixed(2)}
                                readOnly // Read-only as it's calculated
                                className="flex-grow p-2 border border-blue-300 rounded-lg bg-white font-bold text-primary"
                            />
                        </div>
                        {netSalaryError && (
                            <p className="text-red-500 text-sm mt-1">{netSalaryError}</p>
                        )}
                    </div>
                </form>

                <div className="flex justify-end items-center gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">
                        {isNew ? 'Create Payroll Record' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayrollFormModal;