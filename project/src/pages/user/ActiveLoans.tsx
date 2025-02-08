import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ActiveLoans() {
  // Indian-based loan data
  const activeLoans = [
    {
      id: 1,
      type: 'Personal Loan',
      amount: '₹3,00,000',
      emi: '₹8,500/month',
      repaymentProgress: 50,
      dueDate: '15 March 2025',
    },
    {
      id: 2,
      type: 'Home Loan',
      amount: '₹40,00,000',
      emi: '₹35,000/month',
      repaymentProgress: 30,
      dueDate: '28 February 2025',
    },
    {
      id: 3,
      type: 'Car Loan',
      amount: '₹8,00,000',
      emi: '₹12,000/month',
      repaymentProgress: 60,
      dueDate: '10 March 2025',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeLoans.map((loan) => (
          <Card key={loan.id}>
            <CardHeader>
              <CardTitle>{loan.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Loan Amount: <span className="font-medium">{loan.amount}</span>
              </p>
              <p className="text-sm text-gray-600">
                EMI: <span className="font-medium">{loan.emi}</span>
              </p>
              <p className="text-sm text-gray-600">
                Next Due Date: <span className="font-medium">{loan.dueDate}</span>
              </p>
              <Progress value={loan.repaymentProgress} className="h-4 mt-2" />
              <p className="text-sm text-gray-600 mt-2">
                Repayment: {loan.repaymentProgress}% completed
              </p>
              <div className="mt-4 flex gap-4">
                <Button variant="outline">Manage EMI</Button>
                <Button variant="outline">Prepay Loan</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
