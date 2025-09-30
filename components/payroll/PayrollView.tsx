import React, { useState, useMemo } from 'react';

// --- 1. PLACEHOLDER TYPES & MOCK DATA (To fix import errors) ---

interface Employee { id: number; name: string; position: string; }
interface PayrollRecord { id: string; employeeId: number; month: string; basicSalary: number; allowances: number; deductions: number; netSalary: number; status: 'Paid' | 'Pending'; }
interface ManualPayment { id: string; employeeId: number; date: string; amount: number; description: string; type: 'Bonus' | 'Reimbursement' | 'Advance'; }

const mockEmployees: Employee[] = [
    { id: 101, name: 'Alice Johnson', position: 'Software Engineer' },
    { id: 102, name: 'Bob Smith', position: 'Data Scientist' },
    { id: 103, name: 'Charlie Brown', position: 'Product Manager' },
    { id: 104, name: 'Diana Prince', position: 'HR Specialist' },
];

const currentMonthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

const generateMockPayroll = (month: string): PayrollRecord[] => {
    return mockEmployees.map(employee => {
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
    });
};

const mockPayroll: PayrollRecord[] = [
    // Add current month payroll for initial load
    ...generateMockPayroll(currentMonthName).map(r => ({...r, netSalary: r.netSalary * 1.05})),
    // Add previous month payroll
    ...generateMockPayroll('August 2025'),
];

const mockManualPayments: ManualPayment[] = [
    { id: 'mp-1', employeeId: 101, date: '2025-09-15', amount: 500, description: 'Wellness Bonus', type: 'Bonus' },
    { id: 'mp-2', employeeId: 103, date: '2025-08-20', amount: 1200, description: 'Travel Reimbursement', type: 'Reimbursement' },
];

// --- 2. PLACEHOLDER ICON COMPONENTS ---

const PayrollIcon = (props: any) => <svg {...props} className={"w-5 h-5 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v8m0-8h.01M19 12a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ReportIcon = (props: any) => <svg {...props} className={"w-5 h-5 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-4m3 4v-6m3 4V7M9 21h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PlusIcon = (props: any) => <svg {...props} className={"w-5 h-5 " + props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>;

// --- 3. PLACEHOLDER UTILITY COMPONENTS ---

// Placeholder KPICard
const KPICard: React.FC<{ title: string; value: string; icon: React.ReactElement; color: 'indigo' | 'teal' | 'green' | 'blue' }> = ({ title, value, icon, color }) => {
    const colorClasses = {
        indigo: 'bg-indigo-500',
        teal: 'bg-teal-500',
        green: 'bg-green-500',
        blue: 'bg-blue-500',
    }[color];
    
    return (
        <div className="p-5 bg-white dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-full text-white ${colorClasses} opacity-80`}>
                {icon}
            </div>
        </div>
    );
};

// Placeholder Modal Backdrop
const ModalBackdrop: React.FC<{ children: React.ReactNode, onClose: () => void, title: string }> = ({ children, onClose, title }) => (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transition-all transform duration-300">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    </div>
);

// --- 4. PLACEHOLDER TABLE & MODAL COMPONENTS ---

// Placeholder SalarySlipModal
const SalarySlipModal: React.FC<{ isOpen: boolean; onClose: () => void; record: PayrollRecord; employee: Employee; }> = ({ isOpen, onClose, record, employee }) => {
    if (!isOpen) return null;
    return (
        <ModalBackdrop onClose={onClose} title={`Salary Slip: ${employee.name}`}>
            <div className="space-y-3 text-sm dark:text-gray-300">
                <p><strong>Month:</strong> {record.month}</p>
                <p><strong>Employee ID:</strong> {employee.id}</p>
                <p><strong>Basic Salary:</strong> ${record.basicSalary.toFixed(2)}</p>
                <p><strong>Net Salary:</strong> <span className="text-lg font-bold text-green-600">${record.netSalary.toFixed(2)}</span></p>
                <button onClick={onClose} className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700">Close</button>
            </div>
        </ModalBackdrop>
    );
};

// Placeholder AddManualPaymentModal
const AddManualPaymentModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (p: ManualPayment) => void; paymentToEdit: ManualPayment | null; employees: Employee[]; }> = ({ isOpen, onClose, onSave, paymentToEdit, employees }) => {
    if (!isOpen) return null;
    const initialPayment = paymentToEdit || { id: '', employeeId: employees[0]?.id || 0, date: new Date().toISOString().slice(0, 10), amount: 0, description: '', type: 'Bonus' as 'Bonus' };
    const [payment, setPayment] = useState(initialPayment);
    
    const handleSubmit = () => {
        if (payment.employeeId && payment.amount > 0 && payment.description) {
            onSave(payment);
        } else {
            console.error("Please fill all required fields.");
        }
    };
    
    return (
        <ModalBackdrop onClose={onClose} title={paymentToEdit ? 'Edit Manual Payment' : 'Add Manual Payment'}>
            <div className="space-y-4">
                <select value={payment.employeeId} onChange={e => setPayment({...payment, employeeId: parseInt(e.target.value)})}>
                    {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                </select>
                <input type="number" placeholder="Amount" value={payment.amount || ''} onChange={e => setPayment({...payment, amount: parseFloat(e.target.value) || 0})} className="w-full p-2 border rounded" />
                <textarea placeholder="Description" value={payment.description} onChange={e => setPayment({...payment, description: e.target.value})} className="w-full p-2 border rounded" />
                <button onClick={handleSubmit} className="w-full bg-green-500 text-white p-2 rounded-lg">Save</button>
            </div>
        </ModalBackdrop>
    );
};

// Placeholder PayrollFormModal
const PayrollFormModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    recordToEdit: PayrollRecord | null; 
    employees: Employee[]; 
    currentMonth: string; 
    onSave: (r: PayrollRecord) => void; 
    isNew: boolean; 
}> = ({ isOpen, onClose, recordToEdit, employees, currentMonth, onSave, isNew }) => {
    if (!isOpen) return null;
    const defaultRecord: PayrollRecord = {
        id: `temp-${Date.now()}`, 
        employeeId: employees[0]?.id || 0, 
        month: currentMonth, 
        basicSalary: 50000, 
        allowances: 10000, 
        deductions: 5000, 
        netSalary: 55000, 
        status: 'Paid',
    };
    const [record, setRecord] = useState(recordToEdit || defaultRecord);

    const handleSubmit = () => {
        const netSalary = record.basicSalary + record.allowances - record.deductions;
        onSave({ ...record, netSalary });
        onClose();
    };

    return (
        <ModalBackdrop onClose={onClose} title={isNew ? 'Add Payroll Record' : 'Edit Payroll Record'}>
            <div className="space-y-4">
                <p><strong>Employee:</strong> {employees.find(e => e.id === record.employeeId)?.name}</p>
                <p><strong>Month:</strong> {record.month}</p>
                <input type="number" placeholder="Basic Salary" value={record.basicSalary} onChange={e => setRecord(p => ({...p, basicSalary: parseFloat(e.target.value) || 0}))} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Allowances" value={record.allowances} onChange={e => setRecord(p => ({...p, allowances: parseFloat(e.target.value) || 0}))} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Deductions" value={record.deductions} onChange={e => setRecord(p => ({...p, deductions: parseFloat(e.target.value) || 0}))} className="w-full p-2 border rounded" />
                <button onClick={handleSubmit} className="w-full bg-indigo-600 text-white p-2 rounded-lg">Save Record (Net: $ {record.basicSalary + record.allowances - record.deductions})</button>
            </div>
        </ModalBackdrop>
    );
};


// Placeholder PayrollTable
const PayrollTable: React.FC<{ 
    records: PayrollRecord[]; 
    employees: Employee[]; 
    onViewSlip: (id: string) => void; 
    onEditRecord: (id: string) => void; 
}> = ({ records, employees, onViewSlip, onEditRecord }) => {
    const employeeMap = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees]);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Monthly Payroll Table ({records.length} records)</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Net Salary</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {records.map(record => (
                        <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{employeeMap.get(record.employeeId)?.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">${record.netSalary.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{record.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button onClick={() => onViewSlip(record.id)} className="text-indigo-600 hover:text-indigo-900">View Slip</button>
                                <button onClick={() => onEditRecord(record.id)} className="text-teal-600 hover:text-teal-900">Edit</button>
                            </td>
                        </tr>
                    ))}
                    {records.length === 0 && (
                        <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No payroll records found for this month.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Placeholder ManualPaymentsTable
const ManualPaymentsTable: React.FC<{ 
    payments: ManualPayment[]; 
    employees: Employee[]; 
    onEdit: (p: ManualPayment) => void; 
    onDelete: (id: string) => void; 
}> = ({ payments, employees, onEdit, onDelete }) => {
    const employeeMap = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees]);
    
    const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Manual Payments Table ({payments.length} records)</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {payments.map(payment => (
                        <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{employeeMap.get(payment.employeeId)?.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{payment.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">{formatCurrency(payment.amount)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(payment.date)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button onClick={() => onEdit(payment)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                <button onClick={() => onDelete(payment.id)} className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {payments.length === 0 && (
                        <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No manual payments found for this month.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// --- 5. MAIN COMPONENT (PayrollView.jsx) ---

interface Props {
    searchQuery: string;
}

const PayrollView: React.FC<Props> = ({ searchQuery }) => {
    // State initialization now uses the local mock data
    const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayroll);
    const [employees] = useState<Employee[]>(mockEmployees);
    const [selectedSlip, setSelectedSlip] = useState<{ record: PayrollRecord, employee: Employee } | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));

    // Payroll Form Modal State
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<PayrollRecord | null>(null);

    // Manual Payments State
    const [manualPayments, setManualPayments] = useState<ManualPayment[]>(mockManualPayments);
    const [activeTab, setActiveTab] = useState<'payroll' | 'manual'>('payroll');
    const [isManualPaymentModalOpen, setIsManualPaymentModalOpen] = useState(false);
    const [paymentToEdit, setPaymentToEdit] = useState<ManualPayment | null>(null);

    const employeeMap = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees]);

    // --- Memoized Filtering and Stats ---

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
        // Safely determine the month index (0-11)
        const monthIndex = new Date(Date.parse(`${monthName} 1, 2012`)).getMonth();
        
        return manualPayments
            .filter(p => {
                // Filter by current month/year selection
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

    // --- Payroll Handlers ---

    const handleViewSlip = (recordId: string) => {
        const record = payrollRecords.find(r => r.id === recordId);
        if (record) {
            const employee = employeeMap.get(record.employeeId);
            if (employee) {
                setSelectedSlip({ record, employee });
            }
        }
    };
    
    const handleEditRecord = (recordId: string) => {
        const record = payrollRecords.find(r => r.id === recordId);
        if (record) {
            setRecordToEdit(record);
            setIsFormModalOpen(true);
        }
    };
    
    const handleAddNewRecord = () => {
        setRecordToEdit(null); // Set to null to indicate a new record
        setIsFormModalOpen(true);
    };

    const handleSavePayrollRecord = (record: PayrollRecord) => {
        setPayrollRecords(prevRecords => {
            const existingIndex = prevRecords.findIndex(r => r.id === record.id);

            if (existingIndex !== -1) {
                const updatedRecords = [...prevRecords];
                updatedRecords[existingIndex] = record;
                console.log(`Successfully updated payroll record for ${employeeMap.get(record.employeeId)?.name}.`);
                return updatedRecords;
            } else {
                console.log(`Successfully added new payroll record for ${employeeMap.get(record.employeeId)?.name} for ${record.month}.`);
                return [...prevRecords, record];
            }
        });
        setIsFormModalOpen(false);
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
            console.warn(`Payroll for ${currentMonth} has already been generated.`);
            return;
        }

        const shouldGenerate = window.confirm(`Are you sure you want to generate payroll for ${currentMonth}?`);
        if (shouldGenerate) {
            const newRecords = employees.map(emp => generatePayrollForMonth(emp, currentMonth));
            // Sort by month (descending)
            setPayrollRecords(prev => [...prev, ...newRecords].sort((a,b) => new Date(b.month).getTime() - new Date(a.month).getTime()));
            console.log(`Successfully generated payroll for ${employees.length} employees for ${currentMonth}.`);
        }
    };

    // --- Manual Payment Handlers ---

    const handleOpenManualPaymentModal = (payment: ManualPayment | null) => {
        setPaymentToEdit(payment);
        setIsManualPaymentModalOpen(true);
    };

    const handleSaveManualPayment = (payment: ManualPayment) => {
        setManualPayments(prevPayments => {
            if (payment.id && prevPayments.some(p => p.id === payment.id)) {
                // Edit existing
                return prevPayments.map(p => p.id === payment.id ? payment : p);
            } else {
                // Add new
                const newPayment = { ...payment, id: `manual-${Date.now()}`};
                return [newPayment, ...prevPayments];
            }
        });
        setIsManualPaymentModalOpen(false);
        setPaymentToEdit(null);
    };
    
    const handleDeleteManualPayment = (paymentId: string) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this manual payment?');
        if (shouldDelete) {
            setManualPayments(manualPayments.filter(p => p.id !== paymentId));
        }
    };
    
    // --- Utility Component (defined here to avoid separate import) ---

    const TabButton: React.FC<{ tabName: 'payroll' | 'manual'; label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none ${
                activeTab === tabName ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {label}
        </button>
    );

    const primaryColorClass = "bg-indigo-600 hover:bg-indigo-700";

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-200">Payroll & Payments</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage monthly salary runs and ad-hoc payments.</p>
                </div>
                
                {/* Unified Action Buttons */}
                <div className="flex flex-wrap gap-3">
                    {/* Add Manual Payment Button */}
                    <button
                        onClick={() => handleOpenManualPaymentModal(null)}
                        className={`flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${activeTab === 'manual' ? 'ring-2 ring-teal-500' : ''}`}
                    >
                        <PlusIcon className="w-5 h-5"/>
                        <span>Add Manual Payment</span>
                    </button>
                    
                    {/* Add Payroll Record Button */}
                    <button
                        onClick={handleAddNewRecord}
                        className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg shadow-md transition-colors bg-green-500 hover:bg-green-600 ${activeTab === 'payroll' ? 'ring-2 ring-green-400' : ''}`}
                    >
                        <PlusIcon className="w-5 h-5"/>
                        <span>Add Payroll Record</span>
                    </button>

                    {/* Generate Payroll Button */}
                    <button
                        onClick={handleGeneratePayroll}
                        className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg shadow-md transition-colors ${primaryColorClass} ${activeTab === 'payroll' ? 'ring-2 ring-indigo-400' : ''}`}
                    >
                        <PayrollIcon />
                        <span>Generate Monthly Payroll</span>
                    </button>
                </div>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Payroll (Month)" value={`$${(payrollStats.totalPaid / 1000).toFixed(1)}k`} icon={<PayrollIcon />} color="indigo" />
                <KPICard title="Manual Payments (Month)" value={`$${(payrollStats.manualTotal / 1000).toFixed(1)}k`} icon={<ReportIcon />} color="teal" />
                <KPICard title="Total Disbursements" value={`$${((payrollStats.totalPaid + payrollStats.manualTotal) / 1000).toFixed(1)}k`} icon={<PayrollIcon />} color="green" />
                <KPICard title="Employees Paid" value={`${payrollStats.employeesPaid}/${employees.length}`} icon={<ReportIcon />} color="blue" />
            </div>

            {/* Tab and Month Selector Section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    {/* Tabs */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 border dark:border-gray-600 space-x-1">
                        <TabButton tabName="payroll" label="Monthly Payroll Records" />
                        <TabButton tabName="manual" label="Manual Payments & Bonuses" />
                    </div>
                    
                    {/* Month Selector */}
                    <div>
                        <label htmlFor="month-select" className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">Viewing Month:</label>
                        <input 
                            type="month" 
                            id="month-select"
                            // Convert long month string back to 'YYYY-MM' format for the input
                            value={new Date(currentMonth).toISOString().slice(0, 7)}
                            // Convert input 'YYYY-MM' value back to 'Month Year' format for display/logic
                            onChange={(e) => setCurrentMonth(new Date(`${e.target.value}-01`).toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'UTC' }))}
                            className="p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Conditional Table Rendering */}
            <div className="animate-fade-in">
                {activeTab === 'payroll' ? (
                    <PayrollTable 
                        records={filteredRecords}
                        employees={employees}
                        onViewSlip={handleViewSlip}
                        onEditRecord={handleEditRecord}
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

            {/* --- Modals --- */}
            
            {/* Salary Slip Modal */}
            {selectedSlip && (
                <SalarySlipModal
                    isOpen={!!selectedSlip}
                    onClose={() => setSelectedSlip(null)}
                    record={selectedSlip.record}
                    employee={selectedSlip.employee}
                />
            )}
            
            {/* Payroll Add/Edit Modal */}
            <PayrollFormModal 
                isOpen={isFormModalOpen}
                onClose={() => {setIsFormModalOpen(false); setRecordToEdit(null);}}
                recordToEdit={recordToEdit}
                employees={employees}
                currentMonth={currentMonth}
                onSave={handleSavePayrollRecord}
                isNew={!recordToEdit}
            />

            {/* Manual Payment Add/Edit Modal */}
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
