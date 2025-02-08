import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';

export default function Help() {
  // Dummy FAQs
  const faqs = [
    {
      question: 'How can I check my loan application status?',
      answer: 'You can check your application status in the "Application Progress" section on your dashboard.',
    },
    {
      question: 'What happens if I miss an EMI payment?',
      answer: 'Missing an EMI may result in late fees. Please contact support for repayment options.',
    },
    {
      question: 'How can I modify my loan application?',
      answer: 'Go to "Modify Loan Application" in your dashboard to make changes before approval.',
    },
    {
      question: 'What documents are required for loan approval?',
      answer: 'You will need identity proof, address proof, income documents, and bank statements.',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <HelpCircle size={24} /> Need Help?
      </h2>

      {/* Contact Support */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            If you need further assistance, feel free to reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Phone size={16} /> Call Support
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail size={16} /> Email Support
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle size={16} /> Chat with Us
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-3">
                <p className="font-medium">{faq.question}</p>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
