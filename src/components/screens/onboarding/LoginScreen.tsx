import { useState } from 'react';
import endureLogo from 'figma:asset/ae8528a70c61b154e099d5cf52318180871d2341.png';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="h-screen flex flex-col px-8 py-8 bg-[#1a1d2e] relative overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#92B8FF]/10 via-transparent to-[#9470DC]/10" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Brand logo and title */}
        <div className="flex flex-col items-center mb-2">
          <img 
            src={endureLogo} 
            alt="Endure Logo" 
            className="w-32 h-32 mb-1"
          />
          <h1 className="text-white text-4xl tracking-[0.3em] font-[Alatsi] mx-[0px] my-[-15px]">ENDURE</h1>
        </div>

        {/* Login form */}
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-[0px] my-[40px]">
          <div className="space-y-4 p-[0px]">
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

            {/* Primary login button */}
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-3 rounded-2xl bg-[#92B8FF] hover:bg-[#AECEFF] 
                       text-white transition-all duration-300
                       shadow-lg shadow-[#92B8FF]/20 backdrop-blur-xl"
            >
              Login
            </button>
          </div>
        </div>

        {/* Alternative authentication methods and signup link */}
        <div className="pb-8">
          {/* Social login options */}
          <div className="space-y-3 mb-4">
            <button
              onClick={() => onNavigate('goal')}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 
                       text-white backdrop-blur-xl border border-white/10
                       transition-all duration-300"
            >
              Continue with Google
            </button>

            <button
              onClick={() => onNavigate('goal')}
              className="w-full py-3 rounded-2xl bg-[#9470DC] hover:bg-[#A586E4] 
                       text-white transition-all duration-300
                       shadow-lg shadow-[#9470DC]/20 backdrop-blur-xl"
            >
              Continue with Apple
            </button>
          </div>

          {/* Sign up navigation */}
          <div className="text-center">
            <span className="text-white/60 text-sm">Don't have an account? </span>
            <button
              onClick={() => onNavigate('signup')}
              className="text-[#92B8FF] hover:text-[#AECEFF] transition-colors text-sm"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
