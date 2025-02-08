import { useEffect, useState } from "react";
import { PersonalDetails } from "./PersonalDetails";
import { FinancialDetails } from "./FinancialDetails";
import { DocumentUpload } from "./DocumentUpload";
import { VideoKYC } from "./VideoKYC";
import { LoanConfiguration } from "./LoanConfiguration";
import { CheckCircle2, CircleDot, AlertTriangle } from "lucide-react";
import { db, addDoc, collection } from "../../../firebase";
import { useLoan } from '@/contexts/LoanContext';
import { useLocation } from "react-router-dom";
const steps = [
  { id: "personal", title: "Personal Details" },
  { id: "financial", title: "Financial Details" },
  { id: "documents", title: "Document Upload" },
  { id: "loan", title: "Loan Configuration" },
  { id: "kyc", title: "Video KYC" },
];


// Static validation results
const STATIC_VALIDATION = {
  success: Math.random() > 0, // Random success/failure for demo
  errors: [
    {
      field: "pan_card",
      message: "PAN card image is blurry",
      suggestion: "Upload a clear photo of your PAN card with visible details"
    },
    {
      field: "aadhaar",
      message: "Aadhaar card back side missing",
      suggestion: "Upload both front and back sides of your Aadhaar card"
    }
  ]
};

export function LoanWizard() {
  const [currentStep, setCurrentStep] = useState("personal");
  const { selectedLoan } = useLoan();
  const [validationResult, setValidationResult] = useState(null);
  const [showKYC, setShowKYC] = useState(false);

  const [loanData, setLoanData] = useState({
    personal: {},
    financial: {},
    documents: {},
    kyc: {},
    loan: {},
  });


  const location = useLocation();

  useEffect(() => {
    // Extract loan data from the query string (URL)
    const queryParams = new URLSearchParams(location.search);
    const loanType = queryParams.get('loanType');
    const amount = queryParams.get('amount');
    const interestRate = queryParams.get('interestRate');
    const tenure = queryParams.get('tenure');
    console.log(interestRate)
    // Update the loanData state with the extracted query parameters
    if (loanType && amount && interestRate && tenure) {
      setLoanData(prevData => ({
        ...prevData,
        loan: {
          loanType,
          amount,
          interestRate,
          tenure,
        }
      }));
    }
  }, [location.search]);  // Run whenever the query string changes

  const updateLoanData = (step, newData) => {
    setLoanData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...newData },
    }));
  };

  const handleSubmit = async () => {

    console.log("Validating Documents...");
    alert("Validating documents... Please wait.");
    const docRef = await addDoc(collection(db, "loanApplications"), loanData);
    console.log("Document ID:", docRef.id);

    // Static validation flow
    if (STATIC_VALIDATION.success) {
      setShowKYC(true);
      setCurrentStep("kyc");
    } else {
      setValidationResult(STATIC_VALIDATION.errors);
    }

    // Dynamic implementation (keep commented)
    /*
    try {
      const response = await fetch("https://your-api.com/validate", {
        method: "POST",
        body: JSON.stringify(loanData.documents)
      });
      
      const result = await response.json();
      if (result.valid) {
        setCurrentStep("kyc");
      } else {
        setValidationResult(result.errors);
      }
    } catch (error) {
      alert("Validation failed: " + error.message);
    }
    */
  };

  const getCurrentStepContent = () => {
    if (validationResult) {
      return (
        <div className="p-6 bg-red-50 rounded-lg">
          <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Document Validation Issues
          </h3>
          <div className="space-y-4">
            {validationResult.map((error, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-red-600 font-medium">{error.message}</p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Suggested Fix:</span> {error.suggestion}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setValidationResult(null);
              setCurrentStep("documents");
            }}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Re-upload Documents
          </button>
        </div>
      );
    }

    if (showKYC) {
      return <VideoKYC data={loanData.kyc} updateData={(newData) => updateLoanData("kyc", newData)} />;
    }

    switch (currentStep) {
      case "personal":
        return <PersonalDetails data={loanData.personal} updateData={(newData) => updateLoanData("personal", newData)} />;
      case "financial":
        return <FinancialDetails data={loanData.financial} updateData={(newData) => updateLoanData("financial", newData)} />;
      case "documents":
        return <DocumentUpload data={loanData.documents} updateData={(newData) => updateLoanData("documents", newData)} />;
      case "loan":
        return <LoanConfiguration data={loanData.loan} updateData={(newData) => updateLoanData("loan", newData)} />;
      default:
        return null;
    }
  };

  // ... rest of the component remains same until the return statement ...
  const getStepStatus = (stepId) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        {/* Steps Sidebar */}
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav className="space-y-1">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              const isKYCHidden = step.id === "kyc" && !showKYC;
              
              if (isKYCHidden) return null;

              return (
                <button
                  key={step.id}
                  onClick={() => !validationResult && setCurrentStep(step.id)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                    status === "current"
                      ? "bg-blue-50 text-blue-700"
                      : status === "completed"
                      ? "text-gray-900 hover:bg-gray-50"
                      : "text-gray-500 hover:bg-gray-50"
                  } ${validationResult ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  
                  <span className="truncate flex items-center">
                    {status === "completed" ? (
                      <CheckCircle2 className="mr-3 h-5 w-5 text-blue-500" />
                    ) : status === "current" ? (
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

        {/* Main Content */}
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          {getCurrentStepContent()}

          {/* Navigation Buttons */}
          {!validationResult && (
            <div className="flex justify-between">
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex((step) => step.id === currentStep);
                  if (currentIndex > 0) setCurrentStep(steps[currentIndex - 1].id);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex((step) => step.id === currentStep);
                  if (currentIndex < steps.length - 1) {
                    setCurrentStep(steps[currentIndex + 1].id);
                  } else {
                    handleSubmit();
                  }
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === steps[steps.length - 1].id ? "Submit Application" : "Next"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}