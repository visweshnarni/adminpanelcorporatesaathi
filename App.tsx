
import React, { useState, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import DashboardView from './components/dashboard/DashboardView';
import ProjectManagementView from './components/projects/ProjectManagementView';
import ServiceManagementView from './components/services/ServiceManagementView';
import EmployeeManagementView from './components/employees/EmployeeManagementView';
import DepartmentManagementView from './components/departments/DepartmentManagementView';
import AttendanceManagementView from './components/attendance/AttendanceManagementView';
import PerformanceManagementView from './components/performance/PerformanceManagementView';
import AnnouncementsView from './components/announcements/AnnouncementsView';
import EmailView from './components/email/EmailView';
import LeaderboardView from './components/leaderboard/LeaderboardView';
import PayrollView from './components/payroll/PayrollView';
import ReportsView from './components/reports/ReportsView';
import AuditLogView from './components/audit/AuditLogView';
import SettingsView from './components/settings/SettingsView';
import { LeaveManagementView } from './components/leave';


export type ViewType = 'dashboard' | 'projects' | 'services' | 'employees' | 'departments' | 'leave' | 'attendance' | 'performance' | 'notifications' | 'email' | 'leaderboard' | 'payroll' | 'reports' | 'audit' | 'settings';
export type Theme = 'light' | 'dark' | 'system';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'system');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(isDark ? 'dark' : 'light');

    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
        // Re-evaluate theme when system preference changes
        if (theme === 'system') {
           const newIsDark = mediaQuery.matches;
           root.classList.remove(newIsDark ? 'light' : 'dark');
           root.classList.add(newIsDark ? 'dark' : 'light');
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
}, [theme]);

  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveTheme = theme === 'system' ? (isSystemDark ? 'dark' : 'light') : theme;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView effectiveTheme={effectiveTheme} setCurrentView={setCurrentView} />;
      case 'projects':
        return <ProjectManagementView searchQuery={searchQuery} />;
      case 'services':
        return <ServiceManagementView searchQuery={searchQuery} />;
      case 'employees':
        return <EmployeeManagementView searchQuery={searchQuery} />;
      case 'departments':
        return <DepartmentManagementView />;
      case 'leave':
        return <LeaveManagementView searchQuery={searchQuery} />;
      case 'attendance':
        return <AttendanceManagementView searchQuery={searchQuery} />;
      case 'performance':
        return <PerformanceManagementView searchQuery={searchQuery} />;
      case 'notifications':
        return <AnnouncementsView />;
      case 'email':
        return <EmailView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'payroll':
        return <PayrollView searchQuery={searchQuery}/>;
      case 'reports':
        return <ReportsView />;
      case 'audit':
        return <AuditLogView searchQuery={searchQuery}/>;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView effectiveTheme={effectiveTheme} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-text-primary dark:text-gray-200">
      <MainLayout 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        setTheme={setTheme}
      >
        {renderView()}
      </MainLayout>
    </div>
  );
};

export default App;
