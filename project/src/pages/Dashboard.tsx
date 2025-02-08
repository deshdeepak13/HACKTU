import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/50">
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Application Dashboard</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Application Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { step: 1, title: "Application Submitted", status: "Completed", time: "2 hours ago" },
                { step: 2, title: "Document Verification", status: "In Progress", time: "Currently Processing" },
                { step: 3, title: "Credit Assessment", status: "Pending", time: "Waiting" },
                { step: 4, title: "Approval Decision", status: "Pending", time: "Waiting" },
              ].map(({ step, title, status, time }) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                  ${status === "Completed" ? "bg-green-500 text-white" :
                                    status === "In Progress" ? "bg-yellow-500 text-white" :
                                    "bg-gray-300 text-gray-700"}`}>
                    {step}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{status}</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">{time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      
    </div>
  );
}
