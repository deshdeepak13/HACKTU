import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';

export default function UserHome() {
  // Sample state data
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

  return (
    <div className="flex gap-6 flex-wrap">
      {/* Application Progress Tracker */}
      <Card className='w-full'>
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
      <Card className='w-full'>
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
      <Card className='w-full'>
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
  );
}
