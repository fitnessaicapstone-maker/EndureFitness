import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ProgressDots } from '../ProgressDots';

interface GenderSelectionScreenProps {
  onNavigate: (screen: string) => void;
  onSetGender: (gender: string) => void;
}

export function GenderSelectionScreen({ onNavigate, onSetGender }: GenderSelectionScreenProps) {
  const [selected, setSelected] = useState<string>('');

  const handleContinue = () => {
    if (selected) {
      onSetGender(selected);
    }
    onNavigate('age');
  };

  return (
    <div className="h-screen flex flex-col px-6 py-10 bg-[#1a1d2e] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header - boxier buttons */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('goal')}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white rotate-180" />
          </button>
          <button
            onClick={() => onNavigate('age')}
            className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white/80 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-[#9470DC] text-2xl mb-2">Tell us about yourself!</h1>
          <p className="text-white/50 text-sm">
            To give you a better experience we need to know your gender.
          </p>
        </div>

        {/* Gender Cards - boxier, less wide */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 mb-[50px] mt-[0px] mr-[0px] ml-[0px]">
          {/* Male Card */}
          <button
            onClick={() => setSelected('male')}
            className={`w-48 h-48 rounded-2xl backdrop-blur-xl border transition-all duration-300
                       flex flex-col items-center justify-center gap-4 relative overflow-hidden
                       ${selected === 'male' 
                         ? 'bg-white/20 border-[#92B8FF]/60 shadow-lg shadow-[#92B8FF]/30' 
                         : 'bg-white/5 border-white/10 hover:bg-white/10'
                       }`}
          >
            {selected === 'male' && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#92B8FF]/20 to-transparent" />
            )}
            <div className="relative z-10 flex flex-col items-center gap-3">
              {/* Male Symbol - proper arrow connection */}
              <svg className="w-20 h-20" fill="none" stroke={selected === 'male' ? '#92B8FF' : 'white'} strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="10" cy="14" r="5" />
                <line x1="13.5" y1="10.5" x2="19" y2="5" />
                <polyline points="15,5 19,5 19,9" />
              </svg>
              <span className={`text-lg ${selected === 'male' ? 'text-[#92B8FF]' : 'text-white'}`}>Male</span>
            </div>
          </button>

          {/* Female Card */}
          <button
            onClick={() => setSelected('female')}
            className={`w-48 h-48 rounded-2xl backdrop-blur-xl border transition-all duration-300
                       flex flex-col items-center justify-center gap-4 relative overflow-hidden
                       ${selected === 'female' 
                         ? 'bg-white/20 border-[#9470DC]/60 shadow-lg shadow-[#9470DC]/30' 
                         : 'bg-white/5 border-white/10 hover:bg-white/10'
                       }`}
          >
            {selected === 'female' && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#9470DC]/20 to-transparent" />
            )}
            <div className="relative z-10 flex flex-col items-center gap-3">
              {/* Female Symbol - bigger circle */}
              <svg className="w-20 h-20" fill="none" stroke={selected === 'female' ? '#9470DC' : 'white'} strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="5" />
                <line x1="12" y1="13" x2="12" y2="21" />
                <line x1="9" y1="18" x2="15" y2="18" />
              </svg>
              <span className={`text-lg ${selected === 'female' ? 'text-[#9470DC]' : 'text-white'}`}>Female</span>
            </div>
          </button>
        </div>

        {/* Progress Dots */}
        <div className="mb-4">
          <ProgressDots total={5} current={1} />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full py-3.5 rounded-xl transition-all duration-300
                   shadow-lg backdrop-blur-xl
                   ${selected
                     ? 'bg-[#92B8FF] hover:bg-[#AECEFF] text-white shadow-[#92B8FF]/20' 
                     : 'bg-white/5 text-white/40 cursor-not-allowed border border-white/10'
                   }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}