import { ChevronLeft, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface BodyMetricsEditScreenProps {
  onNavigate: (screen: string) => void;
  gender: string;
  height?: number;
  weight?: number;
  onSetGender: (gender: string) => void;
  onSaveMetrics: (updates: { gender: string; height: number; weight: number }) => void;
}

export function BodyMetricsEditScreen({
  onNavigate,
  gender,
  height,
  weight,
  onSetGender,
  onSaveMetrics,
}: BodyMetricsEditScreenProps) {
  const [editsRemaining] = useState(2); // Track how many edits are left
  const [selectedGender, setSelectedGender] = useState(gender || 'male');
  
  const [metrics, setMetrics] = useState({
    height: height ?? 185,
    weight: weight ?? 80,
  });

  const handleSave = () => {
    // Save metrics and navigate back
    onSetGender(selectedGender);
    onSaveMetrics({
      gender: selectedGender,
      height: metrics.height,
      weight: metrics.weight,
    });
    onNavigate('profile');
  };

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
          <h1 className="text-xl text-white">Body Metrics</h1>
        </div>

        {/* Warning Banner */}
        <div className="px-6 mb-4">
          <div className="p-4 rounded-2xl bg-[#9470DC]/10 backdrop-blur-xl border border-[#9470DC]/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#B29AE8] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm mb-1">Edits Remaining: {editsRemaining}</p>
                <p className="text-white/60 text-xs">
                  These metrics are your fitness starting point. Frequent changes may affect accuracy of results and readings.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-4">
          {/* Gender Selection */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Gender</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedGender('male')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedGender === 'male'
                    ? 'border-[#92B8FF] bg-[#92B8FF]/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="text-3xl mb-2">♂</div>
                <p className="text-white text-sm">Male</p>
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedGender === 'female'
                    ? 'border-[#9470DC] bg-[#9470DC]/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="text-3xl mb-2">♀</div>
                <p className="text-white text-sm">Female</p>
              </button>
            </div>
          </div>

          {/* Basic Metrics */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Basic Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Height (cm)</label>
                <input
                  type="number"
                  value={metrics.height}
                  onChange={(e) => setMetrics({ ...metrics, height: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Weight (kg)</label>
                <input
                  type="number"
                  value={metrics.weight}
                  onChange={(e) => setMetrics({ ...metrics, weight: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-[#92B8FF]/50 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
}
