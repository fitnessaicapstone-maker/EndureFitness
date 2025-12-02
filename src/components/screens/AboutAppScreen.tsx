import { ChevronLeft, Dumbbell, Shield, Heart, Users, Mail, FileText, Award } from 'lucide-react';

interface AboutAppScreenProps {
  onNavigate: (screen: string) => void;
}

export function AboutAppScreen({ onNavigate }: AboutAppScreenProps) {
  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-6 flex items-center gap-4">
          <button 
            onClick={() => onNavigate('profile')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">About Endure</h1>
        </div>

        <div className="px-6 space-y-4">
          {/* App Info Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#92B8FF]/10 to-[#9470DC]/10 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 rounded-3xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC]">
                <Dumbbell className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-white text-2xl text-center mb-2 bg-gradient-to-r from-[#92B8FF] to-[#9470DC] bg-clip-text text-transparent">Endure</h2>
            <p className="text-white/60 text-sm text-center mb-4">Version 2.1.0</p>
            <p className="text-white/70 text-center leading-relaxed">
              Your AI-powered fitness companion designed to help you achieve your fitness goals with personalized workouts, progress tracking, and intelligent insights.
            </p>
          </div>

          {/* Features */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">What We Offer</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#92B8FF]/10 flex-shrink-0">
                  <Dumbbell className="w-4 h-4 text-[#92B8FF]" />
                </div>
                <div>
                  <p className="text-white text-sm">AI-Powered Workouts</p>
                  <p className="text-white/50 text-xs mt-1">Personalized plans that adapt to your progress</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#9470DC]/10 flex-shrink-0">
                  <Award className="w-4 h-4 text-[#9470DC]" />
                </div>
                <div>
                  <p className="text-white text-sm">Progress Tracking</p>
                  <p className="text-white/50 text-xs mt-1">Comprehensive analytics and insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#AECEFF]/10 flex-shrink-0">
                  <Heart className="w-4 h-4 text-[#AECEFF]" />
                </div>
                <div>
                  <p className="text-white text-sm">Health Integration</p>
                  <p className="text-white/50 text-xs mt-1">Sync with your favorite fitness trackers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#B29AE8]/10 flex-shrink-0">
                  <Shield className="w-4 h-4 text-[#B29AE8]" />
                </div>
                <div>
                  <p className="text-white text-sm">Privacy First</p>
                  <p className="text-white/50 text-xs mt-1">Your data is encrypted and secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#92B8FF]/10">
                <Users className="w-5 h-5 text-[#92B8FF]" />
              </div>
              <h3 className="text-white">Our Mission</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              We believe fitness should be accessible, personalized, and enjoyable for everyone. Our team of fitness experts, AI engineers, and designers work together to create the best possible experience for your fitness journey.
            </p>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-3">
            <button className="w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#9470DC]/10">
                  <FileText className="w-5 h-5 text-[#9470DC]" />
                </div>
                <span className="text-white">Terms of Service</span>
              </div>
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#AECEFF]/10">
                  <Shield className="w-5 h-5 text-[#AECEFF]" />
                </div>
                <span className="text-white">Privacy Policy</span>
              </div>
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#B29AE8]/10">
                  <Mail className="w-5 h-5 text-[#B29AE8]" />
                </div>
                <span className="text-white">Contact Us</span>
              </div>
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4">
            <p className="text-white/40 text-xs">
              © 2025 Endure. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-1">
              Made with ❤️ for fitness enthusiasts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}