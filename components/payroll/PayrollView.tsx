import React, { useState, useMemo } from 'react';
import { PayrollRecord, Employee } from '../../types';
import { mockPayroll } from './data';
import { mockEmployees } from '../projects/data';
import PayrollTable from './PayrollTable';
import SalarySlipModal from './SalarySlipModal';
import KPICard from '../dashboard/KPICard';
import { PayrollIcon, ReportIcon, PlusIcon } from '../icons/Icons'; // Import PlusIcon
import PayrollFormModal from './PayrollFormModal'; // Import the new modal

interface Props {
  searchQuery: string;
}

const PayrollView: React.FC<Props> = ({ searchQuery }) => {
    const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayroll);
    const [employees] = useState<Employee[]>(mockEmployees);
    const [selectedSlip, setSelectedSlip] = useState<{ record: PayrollRecord, employee: Employee } | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
    
    // New state for Add/Edit Modal
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<PayrollRecord | null>(null); // null for Add, record for Edit
    
    const employeeMap = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees]);

    const filteredRecords = useMemo(() => {
        return payrollRecords
            .filter(r => r.month === currentMonth)
            .filter(r => {
                if (!searchQuery) return true;
                const employee = employeeMap.get(r.employeeId);
                return employee ? employee.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
            });
    }, [payrollRecords, currentMonth, searchQuery, employeeMap]);
    
    const payrollStats = useMemo(() => {
        const monthRecords = payrollRecords.filter(r => r.month === currentMonth);
        const totalPaid = monthRecords.reduce((acc, r) => acc + r.netSalary, 0);
        return {
            totalPaid,
            employeesPaid: monthRecords.length
        };
    }, [payrollRecords, currentMonth]);
    
    const handleViewSlip = (recordId: string) => {
        const record = payrollRecords.find(r => r.id === recordId);
        if (record) {
            const employee = employeeMap.get(record.employeeId);
            if (employee) {
                setSelectedSlip({ record, employee });
            }
        }
    };
    
    // Handler to open the modal for editing
    const handleEditRecord = (recordId: string) => {
        const record = payrollRecords.find(r => r.id === recordId);
        if (record) {
            setRecordToEdit(record);
            setIsFormModalOpen(true);
        }
    };
    
    // Handler to open the modal for adding a new record
    const handleAddNewRecord = () => {
        setRecordToEdit(null); // Set to null to indicate a new record
        setIsFormModalOpen(true);
    };

    // Handler for saving/updating the record
    const handleSavePayrollRecord = (record: PayrollRecord) => {
        setPayrollRecords(prevRecords => {
            const existingIndex = prevRecords.findIndex(r => r.id === record.id);

            if (existingIndex !== -1) {
                // Edit existing record
                const updatedRecords = [...prevRecords];
                updatedRecords[existingIndex] = record;
                alert(`Successfully updated payroll record for ${employeeMap.get(record.employeeId)?.name}.`);
                return updatedRecords;
            } else {
                // Add new record
                alert(`Successfully added new payroll record for ${employeeMap.get(record.employeeId)?.name} for ${record.month}.`);
                return [...prevRecords, record];
            }
        });
    };
    
    const generatePayrollForMonth = (employee: Employee, month: string): PayrollRecord => {
        const basicSalary = 50000 + (employee.id * 1000);
        const allowances = basicSalary * 0.2;
        const deductions = basicSalary * 0.1;
        const netSalary = basicSalary + allowances - deductions;

        return {
            id: `payroll-${employee.id}-${month.replace(' ', '-')}`,
            employeeId: employee.id,
            month,
            basicSalary,
            allowances,
            deductions,
            netSalary,
            status: 'Paid',
        };
    };

    const handleGeneratePayroll = () => {
        const recordsExist = payrollRecords.some(r => r.month === currentMonth);
        if (recordsExist) {
            alert(`Payroll for ${currentMonth} has already been generated.`);
            return;
        }

        if (window.confirm(`Are you sure you want to generate payroll for ${currentMonth}?`)) {
            const newRecords = employees.map(emp => generatePayrollForMonth(emp, currentMonth));
            setPayrollRecords(prev => [...prev, ...newRecords].sort((a,b) => new Date(b.month).getTime() - new Date(a.month).getTime()));
            alert(`Successfully generated payroll for ${employees.length} employees for ${currentMonth}.`);
        }
    };


    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Payroll</h2>
                    <p className="text-text-secondary dark:text-gray-400 mt-1">Manage and view employee salary information.</p>
                </div>
                
                <div className="flex gap-3">
                    {/* NEW BUTTON: Add Payroll */}
                    <button
                        onClick={handleAddNewRecord}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5"/>
                        <span>Add Payroll</span>
                    </button>

                    {/* EXISTING BUTTON: Generate Payroll */}
                    <button
                        onClick={handleGeneratePayroll}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        <PayrollIcon />
                        <span>Generate Payroll</span>
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <KPICard title="Total Payroll (Current Month)" value={`$${(payrollStats.totalPaid / 1000).toFixed(1)}k`} icon={<PayrollIcon />} color="green" />
                 <KPICard title="Employees Paid" value={`${payrollStats.employeesPaid}/${employees.length}`} icon={<ReportIcon />} color="blue" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-4">
                    <label htmlFor="month-select" className="text-sm font-medium text-text-secondary dark:text-gray-400">Select Month:</label>
                    <input 
                        type="month" 
                        id="month-select"
                        value={new Date(currentMonth).toISOString().slice(0, 7)}
                        onChange={(e) => setCurrentMonth(new Date(e.target.value).toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'UTC' }))}
                        className="p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary"
                    />
                </div>
            </div>

            <PayrollTable 
                records={filteredRecords}
                employees={employees}
                onViewSlip={handleViewSlip}
                onEditRecord={handleEditRecord} // <-- Pass the new handler
            />

            {selectedSlip && (
                <SalarySlipModal
                    isOpen={!!selectedSlip}
                    onClose={() => setSelectedSlip(null)}
                    record={selectedSlip.record}
                    employee={selectedSlip.employee}
                />
            )}
            
            {/* NEW MODAL INTEGRATION */}
            <PayrollFormModal 
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                recordToEdit={recordToEdit}
                employees={employees}
                currentMonth={currentMonth}
                onSave={handleSavePayrollRecord}
                isNew={!recordToEdit}
            />
        </div>
    );
};

export default PayrollView;