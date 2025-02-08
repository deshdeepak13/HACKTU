import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function PastLoans() {
  // Indian-specific dummy data for past loans
  const pastLoans = [
    {
      id: 1,
      type: 'Personal Loan',
      amount: '₹2,50,000',
      duration: '24 months',
      status: 'Fully Paid',
      completionDate: '2024-12-15',
    },
    {
      id: 2,
      type: 'Two-Wheeler Loan',
      amount: '₹1,20,000',
      duration: '18 months',
      status: 'Fully Paid',
      completionDate: '2023-10-05',
    },
    {
      id: 3,
      type: 'Home Loan',
      amount: '₹25,00,000',
      duration: '60 months',
      status: 'Fully Paid',
      completionDate: '2022-08-20',
    },
    {
      id: 4,
      type: 'Education Loan',
      amount: '₹8,00,000',
      duration: '48 months',
      status: 'Fully Paid',
      completionDate: '2021-06-10',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Past Loans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pastLoans.map((loan) => (
          <Card key={loan.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>{loan.type}</CardTitle>
              <CheckCircle className="text-green-500" size={20} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Loan Amount: <span className="font-medium">{loan.amount}</span>
              </p>
              <p className="text-sm text-gray-600">
                Duration: <span className="font-medium">{loan.duration}</span>
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium text-green-600">{loan.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Completion Date: <span className="font-medium">{loan.completionDate}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
