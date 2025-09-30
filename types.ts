
export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: 'IT' | 'Finance' | 'HR' | 'Marketing';
  avatar: string;
  performanceScore?: number;
  joiningDate: string; // YYYY-MM-DD
  dob: string; // YYYY-MM-DD
  address: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

export type ProjectStatus = 'Active' | 'Pending' | 'Completed';
export type ProjectPriority = 'High' | 'Medium' | 'Low';
export type Department = 'IT' | 'Finance' | 'HR' | 'Marketing';
export type ITSubDepartment = 'Web Development' | 'App Development' | 'Server Development';


export interface Project {
  id: string;
  name: string;
  department: Department;
  subDepartment?: ITSubDepartment;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  description: string;
  startDate: string;
  endDate: string;
  assignedEmployees: number[];
}

export type ServiceCategory = 'Tax' | 'GST' | 'Startup' | 'Legal' | 'Audit';
export type ServiceStatus = 'New' | 'In Progress' | 'Completed' | 'On Hold';

export interface Service {
  id: string;
  title: string;
  clientName: string;
  organization: string;
  email: string;
  phone: string;
  category: ServiceCategory;
  status: ServiceStatus;
  priority: ProjectPriority;
  description: string;
  progress: number;
  assignedTeam: string;
  assignedEmployeeIds: number[];
  documents: number;
  startDate: string;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Half-day' | 'On Leave' | 'Holiday';

export interface AttendanceRecord {
  id: string;
  employeeId: number;
  date: string; // YYYY-MM-DD
  checkIn: string | null; // HH:mm
  checkOut: string | null; // HH:mm
  status: AttendanceStatus;
  notes?: string;
}

export type PerformanceStatus = 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' | 'Pending Review';

export interface KPI {
  name: string;
  rating: number; // e.g., 1-5
  comment: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: number;
  reviewPeriod: string;
  reviewDate: string; // YYYY-MM-DD
  overallRating: number; // e.g., 1-5
  status: PerformanceStatus;
  kpis: KPI[];
  managerComments: string;
  employeeComments: string;
  improvementPlan?: string;
  historicalData: { period: string, rating: number }[];
}

export type NotificationType = 'service' | 'project' | 'leave' | 'announcement' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  link?: string;
  priority?: 'Normal' | 'Urgent';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorPosition: string;
  authorAvatar: string;
  date: string; // ISO string
  audience: 'Company-Wide' | Department;
  priority: 'Normal' | 'Urgent';
}

export interface Email {
  id: string;
  from: { name: string, email: string, avatar: string };
  to: { name: string, email: string };
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  tag?: 'work' | 'personal' | 'important';
}

export interface PayrollRecord {
    id: string;
    employeeId: number;
    month: string; // e.g., "July 2024"
    basicSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
    status: 'Paid' | 'Pending';
}

export interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    userAvatar: string;
    action: string;
    details: string;
}

export interface EmployeeDocument {
    id: string;
    name: string;
    type: 'Offer Letter' | 'ID Proof' | 'Contract';
    url: string;
    size: string;
    uploadDate: string;
}

export interface DepartmentInfo {
  id: string;
  name: Department;
  managerId: number | null;
  description: string;
}


export interface Client {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  firstSeen: string; // YYYY-MM-DD
  status: 'Active' | 'Inactive';
}

export interface ClientDocument {
    id: string;
    clientId: string;
    name: string;
    type: 'Contract' | 'ID Proof' | 'Service Agreement';
    url: string;
    size: string;
    uploadDate: string;
}