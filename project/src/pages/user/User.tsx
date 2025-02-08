import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Edit3, HelpCircle, Home, List, BookOpen } from 'lucide-react';

// Import your components here
import Dashboard from '../Dashboard';
import PersonalisedLoan from './PersonalisedLoan';
import ActiveLoans from './ActiveLoans';
import PastLoans from './PastLoans';
import Help from './Help';
import Notifications from './Notifications';
import UserHome from './UserHome';
import Chatbot from '../Chatbot';

export default function User() {
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  // Sample state data for demo purposes
  const applicationProgress = 65;
  const pendingActions = [
    { id: 1, message: 'Upload additional payslip' },
    { id: 2, message: 'Verify income details' },
  ];

  // Sidebar navigation items
  const menuItems = [
    { name: 'Home', icon: <CheckCircle size={16} />, component: <UserHome /> },
    { name: 'Dashboard', icon: <Home size={16} />, component: <Dashboard /> },
    { name: 'Personalized Loans', icon: <BookOpen size={16} />, component: <PersonalisedLoan /> },
    { name: 'Active Loans', icon: <List size={16} />, component: <ActiveLoans /> },
    { name: 'Past Loans', icon: <List size={16} />, component: <PastLoans /> },
    { name: 'Need Help', icon: <HelpCircle size={16} />, component: <Help /> },
    { name: 'Notifications', icon: <CheckCircle size={16} />, component: <Notifications /> },
  ];

  // Correct Progress component usage
  const LoanProgress = ({ value }: { value: number }) => (
    <Progress 
      value={value} 
      className="h-3 bg-primary/10 [&>div]:bg-primary"
    />
  );

  return (
    <div className="container mx-auto p-6 flex gap-6">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-100 p-4 rounded-lg hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <ul className="space-y-3 text-sm">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition ${
                selectedTab === item.name 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedTab(item.name)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Dynamically Render Selected Component */}
        {menuItems.find((item) => item.name === selectedTab)?.component}
      </div>
      
      {/* Chatbot Integration */}
      <Chatbot />
    </div>
  );
}