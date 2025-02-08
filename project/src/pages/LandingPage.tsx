import { ArrowRight, Rocket, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Finसारथी</span>
          </div>
          <Button variant="outline" onClick={() => navigate('/auth')}>
            Sign In
          </Button>
        </div>
      </nav>

      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Revolutionizing Lending
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of lending with AI-powered decisions, 
            lightning-fast approvals, and personalized offers tailored just for you.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/apply')}>
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        <section className="bg-muted py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Approvals</h3>
                <p className="text-muted-foreground">
                  Get your loan approved in minutes, not days, with our 
                  AI-powered decision engine.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Process</h3>
                <p className="text-muted-foreground">
                  Your data is protected with bank-grade security and 
                  advanced encryption.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <Rocket className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Lending</h3>
                <p className="text-muted-foreground">
                  Get personalized loan offers based on your unique profile 
                  and requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Chatbot Integration */}
      <Chatbot />
      </main>
    </div>
  );
}