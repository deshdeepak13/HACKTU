import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PersonalizedLoan() {
  // Indian-specific loan offers
  const loanOffers = [
    { id: 1, type: 'HDFC Personal Loan', amount: '₹5,00,000', interest: '11.5%', tenure: '5 years' },
    { id: 2, type: 'Muthoot Home Loan', amount: '₹40,00,000', interest: '8.35%', tenure: '20 years' },
    { id: 3, type: 'SBI Car Loan', amount: '₹10,00,000', interest: '9.25%', tenure: '7 years' },
    { id: 4, type: 'Tata Capital Business Loan', amount: '₹15,00,000', interest: '12%', tenure: '3 years' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Personalized Loan Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {loanOffers.map((loan) => (
          <Card key={loan.id}>
            <CardHeader>
              <CardTitle>{loan.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Loan Amount: <span className="font-medium">{loan.amount}</span></p>
              <p className="text-sm text-gray-600">Interest Rate: <span className="font-medium">{loan.interest}</span></p>
              <p className="text-sm text-gray-600">Tenure: <span className="font-medium">{loan.tenure}</span></p>
              <Button variant="default" className="mt-4 w-full">Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
