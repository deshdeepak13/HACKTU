import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LoanProvider } from './contexts/LoanContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoanProvider>
    <App />
    </LoanProvider>
  </StrictMode>
);
