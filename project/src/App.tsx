import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import LoanApplication from '@/pages/LoanApplication';
import Dashboard from '@/pages/Dashboard';
import User from './pages/user/User';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/apply" element={<LoanApplication />} />   {/*login check up dalna hai using token */ }
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/user" element={<User />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;