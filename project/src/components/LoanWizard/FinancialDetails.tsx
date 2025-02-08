import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

export function FinancialDetails({ data, updateData }) {
  const [formData, setFormData] = useState({
    employmentType: data.employmentType || "",
    monthlyIncome: data.monthlyIncome || "",
    employer: data.employer || "",
    workExperience: data.workExperience || "",
  });

  // useEffect(() => {
  //   updateData(formData);
  // }, [formData, updateData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedData = { ...formData, [id]: value };
  
    setFormData(updatedData);
    updateData(updatedData); // ✅ Only update state on user input
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Employment & Income</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
              Employment Type
            </label>
            <select
              id="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Self-employed</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">
              Monthly Income
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                id="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label htmlFor="employer" className="block text-sm font-medium text-gray-700">
              Employer Name
            </label>
            <input
              type="text"
              id="employer"
              value={formData.employer}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your employer's name"
            />
          </div>
          <div>
            <label htmlFor="workExperience" className="block text-sm font-medium text-gray-700">
              Work Experience (years)
            </label>
            <input
              type="number"
              id="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Years of experience"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">AI Risk Assessment</h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Low Risk
          </span>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                Risk Score: 75/100
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
          </div>
        </div>
        <div className="mt-4 flex items-start space-x-3 text-sm text-gray-500">
          <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <p>
            Our AI has analyzed your financial profile and determined you're a low-risk applicant. This may positively impact your loan terms.
          </p>
        </div>
      </div>
    </div>
  );
}
