import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle, AlertCircle } from 'lucide-react';

export default function Notifications() {
  // Dummy data for recent activity and notifications
  const notifications = [
    {
      id: 1,
      type: 'success',
      message: 'Your loan application has been approved!',
      date: '2025-02-07',
    },
    {
      id: 2,
      type: 'alert',
      message: 'Your EMI payment is due in 3 days.',
      date: '2025-02-05',
    },
    {
      id: 3,
      type: 'info',
      message: 'New personalized loan offers are available for you.',
      date: '2025-02-03',
    },
    {
      id: 4,
      type: 'success',
      message: 'Last EMI payment successfully processed.',
      date: '2025-02-01',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Bell size={24} /> Recent Activity & Notifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {notification.type === 'success' && (
                  <CheckCircle className="text-green-500" size={20} />
                )}
                {notification.type === 'alert' && (
                  <AlertCircle className="text-red-500" size={20} />
                )}
                {notification.type === 'info' && (
                  <Bell className="text-blue-500" size={20} />
                )}
                {notification.message}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Date: {notification.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
