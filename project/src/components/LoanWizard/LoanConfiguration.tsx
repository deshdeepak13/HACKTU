import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';

export function LoanConfiguration({ data, updateData }) {
  const [formData, setFormData] = useState({
    loanAmount: data.loanAmount || 25000,
    loanTenure: data.loanTenure || 24,
    loanPurpose: data.loanPurpose || "Home Renovation",
  });

  // Simple EMI Calculation (Placeholder Formula)
  const interestRate = 8.5; // Fixed interest rate (can be dynamic)
  const monthlyRate = interestRate / 1200; // Convert annual % to monthly decimal
  const emi = Math.round(
    (formData.loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -formData.loanTenure))
  );

  // useEffect(() => {
  //     updateData(formData);
  //   }, [formData, updateData]);

    const handleChange = (e) => {
      const { id, value } = e.target;
      const updatedData = {
        ...formData,
        [id]: id === "loanAmount" || id === "loanTenure" ? Number(value) : value,
      };
    
      setFormData(updatedData);
      updateData(updatedData); // ✅ Updates parent state on user input
    };
    
    // ❌ Remove useEffect
    

  return (
    <div className="space-y-6">
      {/* Loan Details */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Loan Details</h3>

        <div className="space-y-6">
          {/* Loan Amount Slider */}
          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
              Loan Amount
            </label>
            <input
              type="range"
              id="loanAmount"
              min="1000"
              max="50000"
              step="1000"
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
              value={formData.loanAmount}
              onChange={handleChange}
            />
            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>$1,000</span>
              <span className="font-medium text-blue-600">${formData.loanAmount.toLocaleString()}</span>
              <span>$50,000</span>
            </div>
          </div>

          {/* Loan Tenure Slider */}
          <div>
            <label htmlFor="loanTenure" className="block text-sm font-medium text-gray-700">
              Loan Tenure
            </label>
            <input
              type="range"
              id="loanTenure"
              min="12"
              max="60"
              step="12"
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
              value={formData.loanTenure}
              onChange={handleChange}
            />
            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>12 months</span>
              <span className="font-medium text-blue-600">{formData.loanTenure} months</span>
              <span>60 months</span>
            </div>
          </div>

          {/* Loan Purpose */}
          <div>
            <label htmlFor="loanPurpose" className="block text-sm font-medium text-gray-700">
              Loan Purpose
            </label>
            <select
              id="loanPurpose"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.loanPurpose}
              onChange={handleChange}
            >
              <option>Home Renovation</option>
              <option>Debt Consolidation</option>
              <option>Business</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loan Summary */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Loan Summary</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Calculator className="h-5 w-5 text-blue-500" />
              <span className="ml-2 text-sm font-medium text-gray-700">Monthly EMI</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">${emi.toLocaleString()}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span className="ml-2 text-sm font-medium text-gray-700">Interest Rate</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{interestRate}%</p>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="mt-6 bg-blue-50 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">AI Recommendation</h3>
              <p className="mt-2 text-sm text-blue-700">
                Based on your profile and credit score, you might qualify for a lower interest rate
                with a 36-month tenure. Would you like to explore this option?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
