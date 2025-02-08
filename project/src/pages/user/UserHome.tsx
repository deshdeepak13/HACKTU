import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Rocket, CheckCircle2, Clock, Zap, Banknote, LineChart, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserHome() {
  // Sample state data
  const applicationProgress = 65;
  const pendingActions = [
    { id: 1, message: 'Upload additional payslip', type: 'alert' },
    { id: 2, message: 'Verify income details', type: 'action' },
  ];
  const activeLoan = {
    amount: '₹1,50,000',
    emi: '₹12,300/month',
    repaymentProgress: 40,
    dueDate: '15 March 2025',
    paid: '₹60,000',
    remaining: '₹90,000'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Application Progress Card */}
      <motion.div variants={itemVariants}>
        <Card className="h-full border-primary/20 bg-gradient-to-br from-primary/5 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Application Status
              </CardTitle>
              {applicationProgress === 100 ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <div className="text-sm text-primary">{applicationProgress}%</div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Progress 
              value={applicationProgress} 
              className="h-3 bg-primary/10"
              indicatorClassName="bg-primary"
            />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Step:</span>
                <span className="font-medium">Document Verification</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Approval:</span>
                <span className="font-medium">2-3 business days</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full border-primary/30 hover:border-primary/50"
            >
              Continue Application
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Alerts & Actions Card */}
      <motion.div variants={itemVariants}>
        <Card className="h-full border-orange-100 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Requires Attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingActions.length > 0 ? (
              pendingActions.map((action) => (
                <div 
                  key={action.id}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className={`mt-1 p-1 rounded-full ${action.type === 'alert' ? 'bg-red-100' : 'bg-blue-100'}`}>
                    {action.type === 'alert' ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Zap className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{action.message}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 h-8 px-3 text-xs text-primary hover:bg-primary/10"
                    >
                      Resolve Now
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-500 mb-3" />
                <p className="text-sm text-green-600 font-medium">All caught up!</p>
                <p className="text-xs text-muted-foreground mt-1">No pending actions required</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Loan Management Card */}
      <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
        <Card className="h-full border-blue-100 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Banknote className="h-5 w-5 text-blue-600" />
              Active Loan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">Amount Disbursed</span>
                  <span className="text-sm font-semibold">{activeLoan.amount}</span>
                </div>
                <Progress 
                  value={activeLoan.repaymentProgress} 
                  className="h-2 bg-blue-100"
                  indicatorClassName="bg-blue-600"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹{activeLoan.paid} Paid</span>
                  <span>₹{activeLoan.remaining} Remaining</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-muted-foreground">Next EMI Due</p>
                  <p className="text-sm font-semibold mt-1">{activeLoan.emi}</p>
                  <p className="text-xs text-muted-foreground mt-1">Due by {activeLoan.dueDate}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-muted-foreground">Interest Rate</p>
                  <p className="text-sm font-semibold mt-1">10.5% p.a.</p>
                  <p className="text-xs text-muted-foreground mt-1">Reducing balance</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button variant="outline" className="flex-1 border-blue-200 hover:bg-blue-50">
              Pay Advance EMI
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              View Schedule
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Quick Actions Menu */}
      <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="flex flex-wrap gap-3 p-0">
            <Button variant="outline" className="rounded-full px-6 gap-2">
              <LineChart className="h-4 w-4" />
              Track Application
            </Button>
            <Button variant="outline" className="rounded-full px-6 gap-2">
              <Clock className="h-4 w-4" />
              Payment History
            </Button>
            <Button variant="outline" className="rounded-full px-6 gap-2">
              <Zap className="h-4 w-4" />
              New Loan Request
            </Button>
            <Button variant="outline" className="rounded-full px-6 gap-2">
              <AlertCircle className="h-4 w-4" />
              Support Center
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}