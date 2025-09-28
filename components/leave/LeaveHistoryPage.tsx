import React, { useState } from 'react';
import { CalendarIcon, FilterIcon, DownloadIcon, UserIcon, SearchIcon } from '../icons/Icons';
import { formatDistanceToNow } from 'date-fns';
import { LeaveHistory, mockLeaveHistory } from './data';

interface LeaveHistoryPageProps {
  searchQuery: string;
}

const LeaveHistoryPage: React.FC<LeaveHistoryPageProps> = ({ searchQuery }) => {
  const [history, setHistory] = useState<LeaveHistory[]>(mockLeaveHistory);
  const [filterYear, setFilterYear] = useState<number | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'rejected'>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'employee' | 'days'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const departments = Array.from(new Set(history.map(h => h.department)));
  const years = Array.from(new Set(history.map(h => h.year))).sort((a, b) => b - a);

  const filteredHistory = history
    .filter(record => {
      const matchesSearch = record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = filterYear === 'all' || record.year === filterYear;
      const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
      const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
      return matchesSearch && matchesYear && matchesStatus && matchesDepartment;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'employee':
          aValue = a.employeeName;
          bValue = b.employeeName;
          break;
        case 'days':
          aValue = a.days;
          bValue = b.days;
          break;
        case 'date':
        default:
          aValue = new Date(a.startDate);
          bValue = new Date(b.startDate);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Approved</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Rejected</span>;
      default:
        return null;
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Employee Name', 'Employee ID', 'Department', 'Leave Type', 'Start Date', 'End Date', 'Days', 'Status', 'Approved By', 'Approved Date', 'Reason'].join(','),
      ...filteredHistory.map(record => [
        record.employeeName,
        record.employeeId,
        record.department,
        record.leaveType,
        record.startDate,
        record.endDate,
        record.days,
        record.status,
        record.approvedBy,
        record.approvedDate,
        `"${record.reason}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leave-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Statistics
  const totalDays = filteredHistory.reduce((sum, record) => sum + record.days, 0);
  const approvedLeaves = filteredHistory.filter(r => r.status === 'approved').length;
  const rejectedLeaves = filteredHistory.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div className="ml-5">
              <p className="text-blue-100">Total Records</p>
              <p className="text-2xl font-semibold">{filteredHistory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div className="ml-5">
              <p className="text-green-100">Approved</p>
              <p className="text-2xl font-semibold">{approvedLeaves}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div className="ml-5">
              <p className="text-red-100">Rejected</p>
              <p className="text-2xl font-semibold">{rejectedLeaves}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div className="ml-5">
              <p className="text-purple-100">Total Days</p>
              <p className="text-2xl font-semibold">{totalDays}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <FilterIcon className="w-5 h-5 text-gray-400" />
          
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field as any);
              setSortOrder(order as any);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="date-desc">Latest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="employee-asc">Employee A-Z</option>
            <option value="employee-desc">Employee Z-A</option>
            <option value="days-desc">Most Days</option>
            <option value="days-asc">Least Days</option>
          </select>
        </div>

        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <DownloadIcon className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Leave History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Approved By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Approved Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHistory.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{record.employeeName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{record.employeeId} • {record.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{record.leaveType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {new Date(record.startDate).toLocaleDateString()} - {new Date(record.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{record.days} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{record.approvedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(record.approvedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate" title={record.reason}>
                      {record.reason}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No leave history found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveHistoryPage;