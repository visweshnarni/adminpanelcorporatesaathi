import React from 'react';
import { dashboardLeaveData } from './data';

const statusStyles = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
};

const LeaveRequestsWidget: React.FC = () => {
  return (
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200">
        {dashboardLeaveData.map((request) => (
          <li key={request.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img className="h-8 w-8 rounded-full" src={request.avatar} alt={request.name} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{request.name}</p>
                <p className="text-sm text-gray-500 truncate">{request.dates}</p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusStyles[request.status as keyof typeof statusStyles]
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequestsWidget;
