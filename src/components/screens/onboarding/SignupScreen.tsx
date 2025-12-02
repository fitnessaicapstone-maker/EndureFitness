import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import endureLogo from 'figma:asset/ae8528a70c61b154e099d5cf52318180871d2341.png';

interface SignupScreenProps {
  onNavigate: (screen: string) => void;
  onSetName?: (name: string) => void;
}

export function SignupScreen({ onNavigate, onSetName }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (onSetName && name) {
      onSetName(name);
    }
    onNavigate('goal');
  };

  return (
    <div className="h-screen flex flex-col px-8 py-8 bg-[#1a1d2e] relative overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#92B8FF]/10 via-transparent to-[#9470DC]/10" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Back navigation button */}
        <button
          onClick={() => onNavigate('login')}
          className="self-start mb-4 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white rotate-180" />
        </button>

        {/* Brand logo and title */}
        <div className="flex flex-col items-center mt-[0px] mr-[0px] mb-[8px] ml-[0px]">
          <img 
            src={endureLogo} 
            alt="Endure Logo" 
            className="w-32 h-32 mb-1 m-[0px]"
          />
          <h1 className="text-white text-4xl tracking-[0.3em] mx-[0px] my-[-15px] font-[Alatsi]">ENDURE</h1>
        </div>

        {/* Spacer for vertical alignment */}
        <div className="h-16" />

        {/* Registration form */}
        <div className="flex flex-col max-w-md w-full mx-[0px] my-[60px]">
          <h2 className="text-white text-2xl mb-8 text-center">Create Account</h2>
          
          <div className="space-y-4">
            {/* Name input field */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 
                         text-white placeholder:text-white/40 backdrop-blur-xl
                         focus:outline-none focus:ring-2 focus:ring-[#92B8FF] focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {/* Email input field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 
                         text-white placeholder:text-white/40 backdrop-blur-xl
                         focus:outline-none focus:ring-2 focus:ring-[#92B8FF] focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {/* Password input field */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 
                         text-white placeholder:text-white/40 backdrop-blur-xl
                         focus:outline-none focus:ring-2 focus:ring-[#92B8FF] focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {/* Submit button - disabled until all fields filled */}
            <button
              onClick={handleSignUp}
              disabled={!name || !email || !password}
              className="w-full py-3 rounded-2xl bg-[#92B8FF] hover:bg-[#AECEFF] 
                       text-white transition-all duration-300
                       shadow-lg shadow-[#92B8FF]/20 backdrop-blur-xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
