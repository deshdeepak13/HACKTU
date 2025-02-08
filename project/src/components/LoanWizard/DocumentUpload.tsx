import React from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export function DocumentUpload() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
        
        <div className="space-y-4">
          {/* ID Proof Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">ID Proof</h4>
                <p className="mt-1 text-xs text-gray-500">
                  Upload a valid government ID (Passport, Driver's License)
                </p>
              </div>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Choose File
              </button>
            </div>
          </div>

          {/* Income Proof Upload - With Success State */}
          <div className="border-2 border-gray-300 rounded-lg p-6 bg-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Income Proof</h4>
                  <p className="mt-1 text-xs text-gray-500">salary_slip_2024.pdf</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-500">
                Replace
              </button>
            </div>
          </div>

          {/* Address Proof Upload - With Error State */}
          <div className="border-2 border-gray-300 rounded-lg p-6 bg-red-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Address Proof</h4>
                  <p className="mt-1 text-xs text-red-500">Invalid document format. Please upload a PDF or JPG.</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-500">
                Try Again
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">AI Document Verification</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Our AI is analyzing your documents in real-time for:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Document authenticity</li>
                  <li>Data consistency</li>
                  <li>Fraud detection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}