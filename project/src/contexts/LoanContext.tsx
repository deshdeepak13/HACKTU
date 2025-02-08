import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

type LoanParams = {
  loanType: string;
  amount: string;
  interestRate: string;
  tenure: string;
};

type LoanContextType = {
  selectedLoan: LoanParams | null;
  setSelectedLoan: Dispatch<SetStateAction<LoanParams | null>>;
};

const LoanContext = createContext<LoanContextType>({
  selectedLoan: null,
  setSelectedLoan: () => {}, // Default empty function
});

export function LoanProvider({ children }: { children: ReactNode }) {
  // Check localStorage on mount to retrieve any saved loan data
  const storedLoan = localStorage.getItem('selectedLoan');
  const initialLoan = storedLoan ? JSON.parse(storedLoan) : null;

  const [selectedLoan, setSelectedLoan] = useState<LoanParams | null>(initialLoan);

  // Sync the selectedLoan state with localStorage whenever it changes
  useEffect(() => {
    if (selectedLoan) {
      localStorage.setItem('selectedLoan', JSON.stringify(selectedLoan));
    } else {
      localStorage.removeItem('selectedLoan'); // If null, remove from localStorage
    }
  }, [selectedLoan]);

  return (
    <LoanContext.Provider value={{ selectedLoan, setSelectedLoan }}>
      {children}
    </LoanContext.Provider>
  );
}

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};
