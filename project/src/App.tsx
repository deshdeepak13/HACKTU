import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
// import LoanApplication from '@/pages/LoanApplication';
import { LoanWizard } from './components/LoanWizard/LoanWizard';
import Dashboard from '@/pages/Dashboard';
import User from './pages/user/User';
import { VideoKYC } from './components/LoanWizard/VideoKYC';
import { Button } from './components/ui/button';
import { useAuth } from './contexts/LoanContext';

function App() {
  const { logout } = useAuth()
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/apply" element={<LoanWizard />} />   {/*login check up dalna hai using token */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/loan-application" element={<LoanApplication />} /> */}

          <Route path="/user" element={<User />} />
          <Route path="/video" element={<VideoKYC />} />
        </Routes>
        <Toaster />
      </div>
      <Button className='fixed z-100 bottom-0 left-0 m-6' onClick={logout}>
        Logout
      </Button>
    </Router>
  );
}

export default App;