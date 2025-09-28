import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, CheckIcon, XIcon, UserIcon, FilterIcon } from '../icons/Icons';
import LeaveRequestsPage from './LeaveRequestsPage';
import LeaveHistoryPage from './LeaveHistoryPage';
import LeavePolicyPage from './LeavePolicyPage';

type LeaveTab = 'requests' | 'history' | 'policy';

interface LeaveManagementViewProps {
  searchQuery?: string;
}

const LeaveManagementView: React.FC<LeaveManagementViewProps> = ({ searchQuery = '' }) => {
  const [activeTab, setActiveTab] = useState<LeaveTab>('requests');

  const tabs = [
    { id: 'requests' as LeaveTab, label: 'Leave Requests', icon: <ClockIcon className="w-4 h-4" /> },
    { id: 'history' as LeaveTab, label: 'Leave History', icon: <CalendarIcon className="w-4 h-4" /> },
    { id: 'policy' as LeaveTab, label: 'Leave Policy', icon: <UserIcon className="w-4 h-4" /> },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'requests':
        return <LeaveRequestsPage searchQuery={searchQuery} />;
      case 'history':
        return <LeaveHistoryPage searchQuery={searchQuery} />;
      case 'policy':
        return <LeavePolicyPage />;
      default:
        return <LeaveRequestsPage searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-gray-200">Leave Management</h1>
            <p className="text-text-secondary dark:text-gray-400 mt-1">Manage employee leave requests, history, and policies</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <CalendarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagementView;