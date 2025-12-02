import { useEffect } from 'react';
import { motion } from 'motion/react';
import endureLogo from 'figma:asset/ae8528a70c61b154e099d5cf52318180871d2341.png';

interface LoadingSplashScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoadingSplashScreen({ onNavigate }: LoadingSplashScreenProps) {
  useEffect(() => {
    // Navigate to home after 3 seconds
    const timer = setTimeout(() => {
      onNavigate('home');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onNavigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden bg-[#1a1d2e]">
      {/* Background with opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#92B8FF]/10 via-transparent to-[#9470DC]/10" />
      
      {/* Logo - no animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <img 
          src={endureLogo} 
          alt="Endure Logo" 
          className="w-40 h-40 mb-6"
        />
        <motion.h1 
          className="text-white text-5xl tracking-[0.3em] mb-4 font-[Alatsi] -mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          ENDURE
        </motion.h1>

        {/* Loading text */}
        <motion.p
          className="text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Setting up your journey...
        </motion.p>
      </motion.div>
    </div>
  );
}