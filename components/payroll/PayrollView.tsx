
import React, { useState, useMemo } from 'react';
import { PayrollRecord, Employee, ManualPayment } from '../../types';
import { mockPayroll, mockManualPayments } from './data';
import { mockEmployees } from '../projects/data';
import PayrollTable from './PayrollTable';
import SalarySlipModal from './SalarySlipModal';
import KPICard from '../dashboard/KPICard';
import { PayrollIcon, ReportIcon, PlusIcon } from '../icons/Icons';
import ManualPaymentsTable from './ManualPaymentsTable';
import AddManualPaymentModal from './AddManualPaymentModel';

interface Props {
  searchQuery: string;
}

const PayrollView: React.FC<Props> = ({ searchQuery }) => {
    const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayroll);
    const [manualPayments, setManualPayments] = useState<ManualPayment[]>(mockManualPayments);
    const [employees] = useState<Employee[]>(mockEmployees);
    const [selectedSlip, setSelectedSlip] = useState<{ record: PayrollRecord, employee: Employee } | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
    
    const [activeTab, setActiveTab] = useState<'payroll' | 'manual'>('payroll');
    const [isManualPaymentModalOpen, setIsManualPaymentModalOpen] = useState(false);
    const [paymentToEdit, setPaymentToEdit] = useState<ManualPayment | null>(null);

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

    const filteredManualPayments = useMemo(() => {
        const [monthName, year] = currentMonth.split(' ');
        const monthIndex = new Date(Date.parse(monthName +" 1, 2012")).getMonth();
        
        return manualPayments
            .filter(p => {
                const paymentDate = new Date(p.date);
                return paymentDate.getFullYear() === parseInt(year) && paymentDate.getMonth() === monthIndex;
            })
            .filter(p => {
                if (!searchQuery) return true;
                const employee = employeeMap.get(p.employeeId);
                return employee ? employee.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
            });
    }, [manualPayments, currentMonth, searchQuery, employeeMap]);
    
    const payrollStats = useMemo(() => {
        const monthRecords = payrollRecords.filter(r => r.month === currentMonth);
        const totalPaid = monthRecords.reduce((acc, r) => acc + r.netSalary, 0);
        
        const manualTotal = filteredManualPayments.reduce((acc, p) => acc + p.amount, 0);

        return {
            totalPaid,
            employeesPaid: monthRecords.length,
            manualTotal
        };
    }, [payrollRecords, filteredManualPayments, currentMonth]);
    
    const handleViewSlip = (recordId: string) => {
        const record = payrollRecords.find(r => r.id === recordId);
        if (record) {
            const employee = employeeMap.get(record.employeeId);
            if (employee) {
                setSelectedSlip({ record, employee });
            }
        }
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
    
    const handleOpenManualPaymentModal = (payment: ManualPayment | null) => {
        setPaymentToEdit(payment);
        setIsManualPaymentModalOpen(true);
    };

    const handleSaveManualPayment = (payment: ManualPayment) => {
        if (payment.id && manualPayments.some(p => p.id === payment.id)) {
            setManualPayments(manualPayments.map(p => p.id === payment.id ? payment : p));
        } else {
            const newPayment = { ...payment, id: `manual-${Date.now()}`};
            setManualPayments([newPayment, ...manualPayments]);
        }
        setIsManualPaymentModalOpen(false);
        setPaymentToEdit(null);
    };
    
    const handleDeleteManualPayment = (paymentId: string) => {
        if (window.confirm('Are you sure you want to delete this manual payment?')) {
            setManualPayments(manualPayments.filter(p => p.id !== paymentId));
        }
    };
    
    const TabButton: React.FC<{ tabName: 'payroll' | 'manual'; label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none ${
                activeTab === tabName ? 'bg-primary text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Payroll</h2>
                    <p className="text-text-secondary dark:text-gray-400 mt-1">Manage and view employee salary information.</p>
                </div>
                <div className="flex items-center gap-2">
                     <button
                        onClick={() => handleOpenManualPaymentModal(null)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-text-primary dark:text-gray-200 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        <PlusIcon />
                        <span>Add Manual Payment</span>
                    </button>
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
                 <KPICard title="Manual Payments (Month)" value={`$${(payrollStats.manualTotal / 1000).toFixed(1)}k`} icon={<PayrollIcon />} color="teal" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 border dark:border-gray-600 space-x-1">
                        <TabButton tabName="payroll" label="Monthly Payroll" />
                        <TabButton tabName="manual" label="Manual Payments" />
                    </div>
                    <div>
                        <label htmlFor="month-select" className="text-sm font-medium text-text-secondary dark:text-gray-400 mr-2">Select Month:</label>
                        <input 
                            type="month" 
                            id="month-select"
                            value={new Date(currentMonth).toISOString().slice(0, 7)}
                            onChange={(e) => setCurrentMonth(new Date(e.target.value).toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'UTC' }))}
                            className="p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary"
                        />
                    </div>
                 </div>
            </div>

            <div className="animate-fade-in">
                {activeTab === 'payroll' ? (
                    <PayrollTable 
                        records={filteredRecords}
                        employees={employees}
                        onViewSlip={handleViewSlip}
                    />
                ) : (
                    <ManualPaymentsTable
                        payments={filteredManualPayments}
                        employees={employees}
                        onEdit={handleOpenManualPaymentModal}
                        onDelete={handleDeleteManualPayment}
                    />
                )}
            </div>

            {selectedSlip && (
                <SalarySlipModal
                    isOpen={!!selectedSlip}
                    onClose={() => setSelectedSlip(null)}
                    record={selectedSlip.record}
                    employee={selectedSlip.employee}
                />
            )}
            
            {isManualPaymentModalOpen && (
                <AddManualPaymentModal
                    isOpen={isManualPaymentModalOpen}
                    onClose={() => { setIsManualPaymentModalOpen(false); setPaymentToEdit(null); }}
                    onSave={handleSaveManualPayment}
                    paymentToEdit={paymentToEdit}
                    employees={employees}
                />
            )}
        </div>
    );
};

export default PayrollView;
