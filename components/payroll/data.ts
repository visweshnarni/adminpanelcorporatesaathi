
import { PayrollRecord, ManualPayment } from '../../types';
import { mockEmployees } from '../projects/data';

const generatePayrollForMonth = (employeeId: number, month: string): PayrollRecord => {
    const basicSalary = 50000 + (employeeId * 1000);
    const allowances = basicSalary * 0.2;
    const deductions = basicSalary * 0.1;
    const netSalary = basicSalary + allowances - deductions;

    return {
        id: `payroll-${employeeId}-${month.replace(' ', '-')}`,
        employeeId,
        month,
        basicSalary,
        allowances,
        deductions,
        netSalary,
        status: 'Paid',
    };
};

const months = [
    "July 2024",
    "June 2024",
    "May 2024",
    "April 2024"
];

export const mockPayroll: PayrollRecord[] = mockEmployees.flatMap(employee => {
    return months.map(month => generatePayrollForMonth(employee.id, month));
});

const today = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const mockManualPayments: ManualPayment[] = [
    {
        id: 'manual-1',
        employeeId: 1, // Jayesh Patel
        amount: 5000,
        date: formatDate(new Date(today.getFullYear(), today.getMonth(), 15)),
        type: 'Bonus',
        notes: 'Q2 Performance Bonus',
        status: 'Paid',
    },
    {
        id: 'manual-2',
        employeeId: 5, // Mike Harper
        amount: 1250,
        date: formatDate(new Date(today.getFullYear(), today.getMonth(), 10)),
        type: 'Reimbursement',
        notes: 'Cloud certification exam fee',
        status: 'Paid',
    },
    {
        id: 'manual-3',
        employeeId: 3, // John Doe
        amount: 10000,
        date: formatDate(new Date(today.getFullYear(), today.getMonth(), 5)),
        type: 'Advance',
        status: 'Paid',
    },
    {
        id: 'manual-4',
        employeeId: 2, // Sarah Smith
        amount: 750,
        date: formatDate(new Date(today.getFullYear(), today.getMonth() - 1, 20)),
        type: 'Reimbursement',
        notes: 'Travel expenses for client meeting',
        status: 'Paid',
    }
];
