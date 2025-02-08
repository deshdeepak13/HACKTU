import React, { useState } from 'react';
import { PersonalDetails } from './PersonalDetails';
import { FinancialDetails } from './FinancialDetails';
import { DocumentUpload } from './DocumentUpload';
import { VideoKYC } from './VideoKYC';
import { LoanConfiguration } from './LoanConfiguration';
import { CheckCircle2, CircleDot } from 'lucide-react';

const steps = [
  { id: 'personal', title: 'Personal Details' },
  { id: 'financial', title: 'Financial Details' },
  { id: 'documents', title: 'Document Upload' },
  { id: 'kyc', title: 'Video KYC' },
  { id: 'loan', title: 'Loan Configuration' },
];

export function LoanWizard() {
  const [currentStep, setCurrentStep] = useState('personal');

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalDetails />;
      case 'financial':
        return <FinancialDetails />;
      case 'documents':
        return <DocumentUpload />;
      case 'kyc':
        return <VideoKYC />;
      case 'loan':
        return <LoanConfiguration />;
      default:
        return null;
    }
  };

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const currentIndex = steps.findIndex(step => step.id === currentStep);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        {/* Steps sidebar */}
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav className="space-y-1">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                    status === 'current'
                      ? 'bg-blue-50 text-blue-700'
                      : status === 'completed'
                      ? 'text-gray-900 hover:bg-gray-50'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="truncate flex items-center">
                    {status === 'completed' ? (
                      <CheckCircle2 className="mr-3 h-5 w-5 text-blue-500" />
                    ) : status === 'current' ? (
                      <CircleDot className="mr-3 h-5 w-5 text-blue-500" />
                    ) : (
                      <div className="mr-3 h-5 w-5 rounded-full border-2 border-gray-300" />
                    )}
                    {step.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          {getCurrentStepContent()}
          
          <div className="flex justify-between">
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(step => step.id === currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1].id);
                }
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(step => step.id === currentStep);
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1].id);
                }
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {currentStep === steps[steps.length - 1].id ? 'Submit Application' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}