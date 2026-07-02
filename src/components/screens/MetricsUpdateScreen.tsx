import { ArrowLeft, CheckCircle2, Images } from 'lucide-react';
import { motion } from 'motion/react';
import type { BodyMetricsData } from '../../lib/appDataStorage';

interface MetricsUpdateScreenProps {
  onNavigate: (screen: string) => void;
  bodyMetrics?: BodyMetricsData | null;
}

export function MetricsUpdateScreen({ onNavigate }: MetricsUpdateScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden flex items-center justify-center px-6">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ y: 16, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-xl p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#92B8FF]/25 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-[#92B8FF]/15 border border-[#92B8FF]/30 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#92B8FF]" />
          </div>

          <h1 className="text-white text-3xl mb-3">Photos Saved</h1>
          <p className="text-white/60 text-sm mb-8">
            Your front, back, left, and right body photos were saved successfully.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <button
              onClick={() => onNavigate('progress')}
              className="py-4 rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Progress
            </button>
            <button
              onClick={() => onNavigate('metrics-library')}
              className="py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white hover:from-[#AECEFF] hover:to-[#92B8FF] transition-all shadow-lg shadow-[#92B8FF]/20 flex items-center justify-center gap-2"
            >
              <Images className="w-5 h-5" />
              Metrics Library
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
