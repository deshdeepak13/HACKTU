import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import LoanApplication from '@/pages/LoanApplication';
import Dashboard from '@/pages/Dashboard';
import UserHome from './pages/UserHome';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/apply" element={<LoanApplication />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/user" element={<UserHome />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;