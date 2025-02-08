import { ArrowRight, Rocket, Shield, Clock, Sparkles, Banknote, LineChart, ShieldCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FC } from "react";

type FeatureCardProps = {
  icon: FC<{ className?: string }>;
  title: string;
  text: string;
  delay: number;
};

const DashboardIllustration: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="h-64 bg-muted/30 rounded-xl flex flex-col items-center justify-center p-6 relative shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl" />
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative flex gap-8"
      >
        <div className="flex flex-col items-center p-4 bg-background rounded-xl shadow-md">
          <LineChart className="h-12 w-12 text-primary" />
          <p className="text-sm mt-2 font-semibold">Growth Analysis</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-background rounded-xl shadow-md">
          <ShieldCheck className="h-12 w-12 text-green-500" />
          <p className="text-sm mt-2 font-semibold">Secure Loans</p>
        </div>
      </motion.div>
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

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, text, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
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

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <nav className="fixed w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-3">
            <Rocket className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Finसारथी
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Button variant="outline" onClick={() => navigate("/auth")} className="rounded-full px-6 py-2 border-primary/30 hover:border-primary/50">
              Sign In
            </Button>
          </motion.div>
        </div>
      </nav>
      <main className="pt-32">
        <section className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <div className="mb-8 inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Lending Platform</span>
            </div>
            <h1 className="text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              <span className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Finसारथी</span>
              <br /> Next-Gen Financial Empowerment
            </h1>
            <p className="text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
              Transform your financial future with instant decisions, personalized rates, and seamless digital experience.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/apply")} className="rounded-full px-8 py-6 text-lg gap-2 hover:gap-3 transition-all">
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
