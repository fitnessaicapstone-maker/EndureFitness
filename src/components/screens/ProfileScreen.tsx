import { Settings, Ruler, CreditCard, LogOut, HelpCircle, Accessibility, Info, Edit } from 'lucide-react';
import { useState } from 'react';

interface ProfileScreenProps {
  userName: string;
  gender: string;
  age?: number;
  height?: number;
  weight?: number;
  onNavigate: (screen: string) => void;
  onSetGender: (gender: string) => void;
}

export function ProfileScreen({ 
  userName, 
  gender, 
  age = 22,
  height = 185,
  weight = 80,
  onNavigate 
}: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header - Settings on left, Logout on right */}
        <div className="px-6 py-8 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('settings')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">My Profile</h1>
          <button 
            onClick={() => onNavigate('login')}
            className="p-2 rounded-lg bg-gradient-to-br from-[#92B8FF]/20 to-[#9470DC]/20 hover:from-[#92B8FF]/30 hover:to-[#9470DC]/30 backdrop-blur-xl border border-[#92B8FF]/30 transition-colors"
          >
            <LogOut className="w-5 h-5 text-[#92B8FF]" />
          </button>
        </div>

        <div className="px-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDQ2MTQ0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Profile"
                  className="w-32 h-32 rounded-3xl object-cover border-2 border-white/20"
                />
                {/* Edit Icon */}
                <button
                  onClick={() => onNavigate('edit-profile')}
                  className="absolute -bottom-2 -right-2 p-2.5 rounded-xl bg-[#92B8FF] shadow-lg shadow-[#92B8FF]/30 hover:bg-[#AECEFF] transition-colors"
                >
                  <Edit className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Name & Contact Info */}
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl mb-2">{userName || 'Adam Kenway'}</h2>
              <p className="text-white/60 text-sm mb-1">adam.kenway@gmail.com</p>
              <p className="text-white/60 text-sm">+16102458921</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10">
              {/* Gender */}
              <div className="text-center">
                <p className="text-white/50 text-xs mb-2">Gender</p>
                <p className="text-white">Male</p>
              </div>

              {/* Age */}
              <div className="text-center">
                <p className="text-white/50 text-xs mb-2">Age</p>
                <p className="text-white">22</p>
              </div>

              {/* Height */}
              <div className="text-center">
                <p className="text-white/50 text-xs mb-2">Height</p>
                <p className="text-white">185 cm</p>
              </div>

              {/* Weight */}
              <div className="text-center">
                <p className="text-white/50 text-xs mb-2">Weight</p>
                <p className="text-white">80 kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="px-6 mt-6 space-y-3">
          {/* Body Metrics */}
          <button 
            onClick={() => onNavigate('body-metrics-edit')}
            className="w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#92B8FF]/10">
                <Ruler className="w-5 h-5 text-[#92B8FF]" />
              </div>
              <span className="text-white">Body Metrics</span>
            </div>
            <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Payment & Subscriptions */}
          <button 
            onClick={() => onNavigate('payment')}
            className="w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#9470DC]/10">
                <CreditCard className="w-5 h-5 text-[#9470DC]" />
              </div>
              <span className="text-white">Payment & Subscriptions</span>
            </div>
            <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* FAQ */}
          <button 
            onClick={() => onNavigate('faq')}
            className="w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#AECEFF]/10">
                <HelpCircle className="w-5 h-5 text-[#AECEFF]" />
              </div>
              <span className="text-white">FAQ</span>
            </div>
            <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Accessibility */}
          <button 
            onClick={() => onNavigate('accessibility')}
            className="w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#C9E4FF]/10">
                <Accessibility className="w-5 h-5 text-[#C9E4FF]" />
              </div>
              <span className="text-white">Accessibility</span>
            </div>
            <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* About App */}
          <button 
            onClick={() => onNavigate('about')}
            className="w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#B29AE8]/10">
                <Info className="w-5 h-5 text-[#B29AE8]" />
              </div>
              <span className="text-white">About App</span>
            </div>
            <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}