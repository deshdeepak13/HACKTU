import { ArrowRight, Rocket, Shield, Clock, Sparkles, Banknote, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


// import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle } from "lucide-react";

const DashboardIllustration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="h-64 bg-muted/30 rounded-xl flex flex-col items-center justify-center p-6 relative shadow-lg"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl" />
      
      {/* Main dashboard elements */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative flex gap-8"
      >
        {/* Financial Growth */}
        <div className="flex flex-col items-center p-4 bg-background rounded-xl shadow-md">
          <LineChart className="h-12 w-12 text-primary" />
          <p className="text-sm mt-2 font-semibold">Growth Analysis</p>
        </div>
        
        {/* Secure Transactions */}
        <div className="flex flex-col items-center p-4 bg-background rounded-xl shadow-md">
          <ShieldCheck className="h-12 w-12 text-green-500" />
          <p className="text-sm mt-2 font-semibold">Secure Loans</p>
        </div>
      </motion.div>

      {/* Transactions Row */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative flex gap-6 mt-6"
      >
        <div className="flex flex-col items-center p-4 bg-background rounded-xl shadow-md">
          <Banknote className="h-12 w-12 text-yellow-500" />
          <p className="text-sm mt-2 font-semibold">Loan Disbursal</p>
        </div>

        <div className="flex flex-col items-center p-4 bg-background rounded-xl shadow-md">
          <CheckCircle className="h-12 w-12 text-blue-500" />
          <p className="text-sm mt-2 font-semibold">Instant Approval</p>
        </div>
      </motion.div>
    </motion.div>
  );
};



const FeatureCard = ({ icon: Icon, title, text, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-card p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all hover:shadow-xl"
    >
      <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground text-lg">{text}</p>
    </motion.div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <nav className="fixed w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Rocket className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Finसारथी
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="rounded-full px-6 py-2 border-primary/30 hover:border-primary/50"
            >
              Sign In
            </Button>
          </motion.div>
        </div>
      </nav>

      <main className="pt-32">
        <section className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Lending Platform</span>
            </div>
            <h1 className="text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            <span className=" font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Finसारथी
            </span><br/>
            Next-Gen Financial
              <span className="block mt-2">Empowerment</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
              Transform your financial future with instant decisions, 
              <span className="block md:inline"> personalized rates, and seamless digital experience.</span>
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply')}
                className="rounded-full px-8 py-6 text-lg gap-2 hover:gap-3 transition-all"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full px-8 py-6 text-lg border-border/50 hover:border-primary/30"
              >
                How It Works
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-16 mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl p-1 shadow-2xl max-w-5xl"
          >
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              {/* Add your dashboard illustration or animated component here */}
              <DashboardIllustration />
              {/* <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
                <Banknote className="h-16 w-16 text-primary" />
                <LineChart className="h-16 w-16 text-purple-500 ml-8" />
              </div> */}
            </div>
          </motion.div>
        </section>

        <section className="py-24 mt-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-8"
            >
              <FeatureCard
                icon={Clock}
                title="Instant Decisions"
                text="Real-time approval powered by advanced AI algorithms"
                delay={0.2}
              />
              <FeatureCard
                icon={Shield}
                title="Military-Grade Security"
                text="256-bit encryption and biometric authentication"
                delay={0.4}
              />
              <FeatureCard
                icon={Rocket}
                title="Smart Financing"
                text="Customized solutions matching your financial goals"
                delay={0.6}
              />
            </motion.div>
          </div>
        </section>
      </main>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        {/* Animated background elements */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-60 right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse delay-100" />
      </div>
    </div>
  );
}