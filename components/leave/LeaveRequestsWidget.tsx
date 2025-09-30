import React, { useMemo } from 'react';

// --- Placeholder Data & Types (Self-contained for immediate use) ---
interface LeaveRequest {
    id: number;
    name: string;
    dates: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    avatar: string; // Placeholder URL
}

const dashboardLeaveData: LeaveRequest[] = [
    { id: 1, name: 'Ava Chen', dates: 'Oct 1 - Oct 5', status: 'Pending', avatar: 'https://placehold.co/40x40/FCD34D/374151?text=AC' },
    { id: 2, name: 'Liam Patel', dates: 'Sep 28', status: 'Approved', avatar: 'https://placehold.co/40x40/6EE7B7/374151?text=LP' },
    { id: 3, name: 'Noah Kim', dates: 'Dec 20 - Jan 2', status: 'Pending', avatar: 'https://placehold.co/40x40/93C5FD/374151?text=NK' },
    { id: 4, name: 'Sophie Lee', dates: 'Nov 10 - Nov 12', status: 'Approved', avatar: 'https://placehold.co/40x40/D8B4FE/374151?text=SL' },
];

// --- Status Styling with Dark Mode Support ---
const statusStyles = {
    // Light mode: default colors, Dark mode: darker background, lighter text
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const LeaveRequestsWidget: React.FC = () => {
    // Use useMemo for statusStyles keys to satisfy TypeScript requirements
    const statusStyleKeys = useMemo(() => Object.keys(statusStyles) as ('Pending' | 'Approved' | 'Rejected')[], []);
    
    return (
        // Added wrapper for card background and shadow, accommodating dark mode
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Leave Requests</h3>
            <div className="flow-root">
                {/* Updated divider class for dark mode visibility */}
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {dashboardLeaveData.map((request) => (
                        <li key={request.id} className="py-3">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    {/* Used w-9 h-9 for better touch targets and visibility */}
                                    <img 
                                        className="h-9 w-9 rounded-full" 
                                        src={request.avatar} 
                                        alt={request.name} 
                                        // Simple error fallback for placeholder image
                                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/40x40/374151/FFFFFF?text=User' }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    {/* Main text updated for dark mode */}
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{request.name}</p>
                                    {/* Secondary text updated for dark mode */}
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{request.dates}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                            statusStyles[request.status as keyof typeof statusStyles]
                                        }`}
                                    >
                                        {request.status}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                    {dashboardLeaveData.length === 0 && (
                        <li className="py-4 text-center text-gray-500 dark:text-gray-400">No recent requests.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default LeaveRequestsWidget;
