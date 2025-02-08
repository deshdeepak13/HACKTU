import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Edit3, HelpCircle, Home, List, BookOpen } from 'lucide-react';

export default function UserHome() {
  // Sample state data to simulate different sections
  const applicationProgress = 65; // percent completion of the loan application
  const pendingActions = [
    { id: 1, message: 'Upload additional payslip' },
    { id: 2, message: 'Verify income details' },
  ];
  const activeLoan = {
    amount: '$10,000',
    emi: '$300/month',
    repaymentProgress: 40, // percent repaid
    dueDate: '2025-03-10',
  };
  const rejectedLoan = {
    reason: 'Insufficient credit history',
    alternativeOffers: [
      { id: 1, type: 'Micro Loan', amount: '$2,000', interest: '15%' },
      { id: 2, type: 'Secured Loan', amount: '$5,000', interest: '10%' },
    ],
  };

  return (
    <div className="container mx-auto p-6 flex gap-6">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-100 p-4 rounded-lg hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
            <Home size={16} /> Dashboard
          </li>
          <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
            <BookOpen size={16} /> Personalized Loan Page
          </li>
          <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
            <List size={16} /> Active Loans
          </li>
          <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
            <List size={16} /> Past Loans
          </li>
          <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
            <HelpCircle size={16} /> Need Help
          </li>
          <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
            <CheckCircle size={16} /> Recent Activity & Notifications
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Progress Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Application Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={applicationProgress} className="h-4" />
            <p className="mt-2 text-sm text-gray-600">
              Your application is {applicationProgress}% complete.
            </p>
          </CardContent>
        </Card>

        {/* Pending Actions & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingActions.length > 0 ? (
              <ul className="space-y-2">
                {pendingActions.map((action) => (
                  <li key={action.id} className="flex items-center gap-2 text-sm text-yellow-600">
                    <AlertCircle size={16} />
                    {action.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-green-600">No pending actions. You're all set!</p>
            )}
          </CardContent>
        </Card>

        {/* Active Loan & Repayment Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Active Loan & Repayment Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Loan Amount: <span className="font-medium">{activeLoan.amount}</span>
              </p>
              <p className="text-sm text-gray-600">
                EMI: <span className="font-medium">{activeLoan.emi}</span>
              </p>
              <p className="text-sm text-gray-600">
                Next Due Date: <span className="font-medium">{activeLoan.dueDate}</span>
              </p>
            </div>
            <Progress value={activeLoan.repaymentProgress} className="h-4" />
            <p className="mt-2 text-sm text-gray-600">
              You have repaid {activeLoan.repaymentProgress}% of your loan.
            </p>
            <div className="mt-4 flex gap-4">
              <Button variant="outline">Manage EMI</Button>
              <Button variant="outline">Prepay Loan</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
