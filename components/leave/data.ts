// Leave Management Data
export interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approvedBy?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface LeaveHistory {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'approved' | 'rejected';
  submittedDate: string;
  approvedBy: string;
  approvedDate: string;
  year: number;
}

export interface LeaveType {
  id: string;
  name: string;
  daysAllowed: number;
  carryForward: boolean;
  maxCarryForward: number;
  description: string;
  color: string;
  eligibleAfter: number; // months
  requiresApproval: boolean;
  canBeHalfDay: boolean;
  isActive: boolean;
}

export interface LeavePolicy {
  id: string;
  name: string;
  description: string;
  leaveTypes: LeaveType[];
  workingDays: string[];
  holidays: string[];
  probationPeriod: number; // months
  isDefault: boolean;
}

// Mock Data
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeName: 'John Smith',
    employeeId: 'EMP001',
    department: 'Engineering',
    leaveType: 'Annual Leave',
    startDate: '2024-10-15',
    endDate: '2024-10-18',
    days: 4,
    reason: 'Family vacation',
    status: 'pending',
    submittedDate: '2024-10-01',
    priority: 'medium'
  },
  {
    id: '2',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP002',
    department: 'Marketing',
    leaveType: 'Sick Leave',
    startDate: '2024-10-10',
    endDate: '2024-10-12',
    days: 3,
    reason: 'Medical appointment and recovery',
    status: 'pending',
    submittedDate: '2024-10-05',
    priority: 'high'
  },
  {
    id: '3',
    employeeName: 'Mike Wilson',
    employeeId: 'EMP003',
    department: 'Sales',
    leaveType: 'Personal Leave',
    startDate: '2024-10-20',
    endDate: '2024-10-22',
    days: 3,
    reason: 'Personal matters',
    status: 'approved',
    submittedDate: '2024-09-28',
    approvedBy: 'Admin User',
    priority: 'low'
  },
  {
    id: '4',
    employeeName: 'Emma Davis',
    employeeId: 'EMP004',
    department: 'HR',
    leaveType: 'Maternity Leave',
    startDate: '2024-11-01',
    endDate: '2024-12-30',
    days: 60,
    reason: 'Maternity leave',
    status: 'pending',
    submittedDate: '2024-10-02',
    priority: 'high'
  },
  {
    id: '5',
    employeeName: 'David Brown',
    employeeId: 'EMP005',
    department: 'Finance',
    leaveType: 'Annual Leave',
    startDate: '2024-09-15',
    endDate: '2024-09-20',
    days: 6,
    reason: 'Wedding ceremony',
    status: 'rejected',
    submittedDate: '2024-09-01',
    priority: 'medium'
  }
];

export const mockLeaveHistory: LeaveHistory[] = [
  {
    id: '1',
    employeeName: 'John Smith',
    employeeId: 'EMP001',
    department: 'Engineering',
    leaveType: 'Annual Leave',
    startDate: '2024-08-15',
    endDate: '2024-08-18',
    days: 4,
    reason: 'Family vacation',
    status: 'approved',
    submittedDate: '2024-08-01',
    approvedBy: 'Admin User',
    approvedDate: '2024-08-05',
    year: 2024
  },
  {
    id: '2',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP002',
    department: 'Marketing',
    leaveType: 'Sick Leave',
    startDate: '2024-07-10',
    endDate: '2024-07-12',
    days: 3,
    reason: 'Medical appointment',
    status: 'approved',
    submittedDate: '2024-07-05',
    approvedBy: 'HR Manager',
    approvedDate: '2024-07-08',
    year: 2024
  },
  {
    id: '3',
    employeeName: 'Mike Wilson',
    employeeId: 'EMP003',
    department: 'Sales',
    leaveType: 'Personal Leave',
    startDate: '2024-06-20',
    endDate: '2024-06-22',
    days: 3,
    reason: 'Personal matters',
    status: 'approved',
    submittedDate: '2024-06-15',
    approvedBy: 'Admin User',
    approvedDate: '2024-06-18',
    year: 2024
  },
  {
    id: '4',
    employeeName: 'Emma Davis',
    employeeId: 'EMP004',
    department: 'HR',
    leaveType: 'Annual Leave',
    startDate: '2024-05-01',
    endDate: '2024-05-05',
    days: 5,
    reason: 'Spring vacation',
    status: 'approved',
    submittedDate: '2024-04-20',
    approvedBy: 'HR Manager',
    approvedDate: '2024-04-25',
    year: 2024
  },
  {
    id: '5',
    employeeName: 'David Brown',
    employeeId: 'EMP005',
    department: 'Finance',
    leaveType: 'Sick Leave',
    startDate: '2024-04-15',
    endDate: '2024-04-17',
    days: 3,
    reason: 'Flu recovery',
    status: 'approved',
    submittedDate: '2024-04-14',
    approvedBy: 'Finance Manager',
    approvedDate: '2024-04-14',
    year: 2024
  },
  {
    id: '6',
    employeeName: 'Lisa Anderson',
    employeeId: 'EMP006',
    department: 'Design',
    leaveType: 'Personal Leave',
    startDate: '2024-03-10',
    endDate: '2024-03-12',
    days: 3,
    reason: 'Moving house',
    status: 'rejected',
    submittedDate: '2024-03-01',
    approvedBy: 'Admin User',
    approvedDate: '2024-03-05',
    year: 2024
  },
  {
    id: '7',
    employeeName: 'Tom Garcia',
    employeeId: 'EMP007',
    department: 'Engineering',
    leaveType: 'Annual Leave',
    startDate: '2023-12-20',
    endDate: '2023-12-31',
    days: 12,
    reason: 'Holiday vacation',
    status: 'approved',
    submittedDate: '2023-11-15',
    approvedBy: 'Admin User',
    approvedDate: '2023-11-20',
    year: 2023
  },
  {
    id: '8',
    employeeName: 'Rachel White',
    employeeId: 'EMP008',
    department: 'Marketing',
    leaveType: 'Maternity Leave',
    startDate: '2023-09-01',
    endDate: '2023-11-30',
    days: 90,
    reason: 'Maternity leave',
    status: 'approved',
    submittedDate: '2023-07-15',
    approvedBy: 'HR Manager',
    approvedDate: '2023-07-20',
    year: 2023
  }
];

export const mockLeavePolicies: LeavePolicy[] = [
  {
    id: '1',
    name: 'Standard Employee Policy',
    description: 'Default leave policy for all regular employees',
    leaveTypes: [
      {
        id: '1',
        name: 'Annual Leave',
        daysAllowed: 21,
        carryForward: true,
        maxCarryForward: 5,
        description: 'Yearly vacation days for personal use',
        color: '#3B82F6',
        eligibleAfter: 6,
        requiresApproval: true,
        canBeHalfDay: true,
        isActive: true
      },
      {
        id: '2',
        name: 'Sick Leave',
        daysAllowed: 10,
        carryForward: false,
        maxCarryForward: 0,
        description: 'Medical leave for illness or health appointments',
        color: '#EF4444',
        eligibleAfter: 0,
        requiresApproval: false,
        canBeHalfDay: true,
        isActive: true
      },
      {
        id: '3',
        name: 'Personal Leave',
        daysAllowed: 5,
        carryForward: false,
        maxCarryForward: 0,
        description: 'Personal time off for urgent personal matters',
        color: '#8B5CF6',
        eligibleAfter: 3,
        requiresApproval: true,
        canBeHalfDay: false,
        isActive: true
      },
      {
        id: '4',
        name: 'Maternity Leave',
        daysAllowed: 180,
        carryForward: false,
        maxCarryForward: 0,
        description: 'Maternity leave for new mothers',
        color: '#F59E0B',
        eligibleAfter: 12,
        requiresApproval: true,
        canBeHalfDay: false,
        isActive: true
      },
      {
        id: '5',
        name: 'Paternity Leave',
        daysAllowed: 14,
        carryForward: false,
        maxCarryForward: 0,
        description: 'Paternity leave for new fathers',
        color: '#10B981',
        eligibleAfter: 12,
        requiresApproval: true,
        canBeHalfDay: false,
        isActive: true
      }
    ],
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    holidays: ['2024-01-01', '2024-07-04', '2024-12-25'],
    probationPeriod: 3,
    isDefault: true
  },
  {
    id: '2',
    name: 'Senior Management Policy',
    description: 'Enhanced leave policy for senior management',
    leaveTypes: [
      {
        id: '6',
        name: 'Annual Leave',
        daysAllowed: 28,
        carryForward: true,
        maxCarryForward: 10,
        description: 'Extended vacation days for senior staff',
        color: '#3B82F6',
        eligibleAfter: 0,
        requiresApproval: false,
        canBeHalfDay: true,
        isActive: true
      },
      {
        id: '7',
        name: 'Executive Time Off',
        daysAllowed: 10,
        carryForward: true,
        maxCarryForward: 5,
        description: 'Flexible time off for executive responsibilities',
        color: '#6366F1',
        eligibleAfter: 0,
        requiresApproval: false,
        canBeHalfDay: true,
        isActive: true
      }
    ],
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    holidays: ['2024-01-01', '2024-07-04', '2024-12-25'],
    probationPeriod: 0,
    isDefault: false
  }
];

// Dashboard leave data for quick overview
export const dashboardLeaveData = [
  { id: 1, name: 'Smita Sharma', dates: 'Oct 25 - Oct 27', status: 'Pending', avatar: 'https://picsum.photos/seed/6/40/40' },
  { id: 2, name: 'Raj Sharma', dates: 'Nov 1 - Nov 5', status: 'Approved', avatar: 'https://picsum.photos/seed/7/40/40' },
  { id: 3, name: 'Rishabh Patle', dates: 'Nov 10 - Nov 10', status: 'Pending', avatar: 'https://picsum.photos/seed/8/40/40' },
  { id: 4, name: 'Aayush Sharma', dates: 'Nov 15 - Nov 17', status: 'Pending', avatar: 'https://picsum.photos/seed/9/40/40' },
  { id: 5, name: 'Priyanka Patil', dates: 'Dec 1 - Dec 3', status: 'Approved', avatar: 'https://picsum.photos/seed/10/40/40' },
];
