import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingAnalysisScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoadingAnalysisScreen({ onNavigate }: LoadingAnalysisScreenProps) {
  useEffect(() => {
    // Simulate AI analysis for 3 seconds
    const timer = setTimeout(() => {
      onNavigate('metrics-update');
    }, 3500);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden flex items-center justify-center">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B29AE8]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 px-6 text-center space-y-8">
        {/* Animated AI Icon */}
        <div className="relative mx-auto w-32 h-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#92B8FF] border-r-[#AECEFF] animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#9470DC] border-l-[#B29AE8] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#92B8FF] to-[#9470DC] flex items-center justify-center shadow-lg shadow-[#92B8FF]/30">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-white text-2xl">Analyzing Your Photos</h2>
          <p className="text-white/60">AI is processing your body composition...</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-xs mx-auto space-y-3">
          <LoadingStep text="Processing images" delay={0} />
          <LoadingStep text="Analyzing body composition" delay={800} />
          <LoadingStep text="Calculating metrics" delay={1600} />
          <LoadingStep text="Generating results" delay={2400} />
        </div>

        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#92B8FF] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#AECEFF] animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#9470DC] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

function LoadingStep({ text, delay }: { text: string; delay: number }) {
  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="w-2 h-2 rounded-full bg-[#92B8FF] animate-pulse" />
      <span className="text-white/70 text-sm">{text}</span>
    </div>
  );
}