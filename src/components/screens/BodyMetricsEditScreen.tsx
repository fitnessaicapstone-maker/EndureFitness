import { ChevronLeft, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface BodyMetricsEditScreenProps {
  onNavigate: (screen: string) => void;
  gender: string;
  onSetGender: (gender: string) => void;
}

export function BodyMetricsEditScreen({ onNavigate, gender, onSetGender }: BodyMetricsEditScreenProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [editsRemaining] = useState(2); // Track how many edits are left
  const [selectedGender, setSelectedGender] = useState(gender || 'male');
  
  // Initial metrics from setup phase
  const [metrics, setMetrics] = useState({
    height: 185,
    weight: 80,
    wrists: 18,
    waist: 80,
    chest: 95,
    rQuad: 55,
    lQuad: 55,
    rCalf: 38,
    lCalf: 38,
    rArm: 35,
    lArm: 35,
    rForearm: 28,
    lForearm: 28,
    // Female specific
    bust: 90,
    underbust: 75,
    hips: 95,
    upperHips: 90,
  });

  const handleSave = () => {
    // Save metrics and navigate back
    onSetGender(selectedGender);
    onNavigate('profile');
  };

  const handleEditClick = () => {
    setShowWarning(true);
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

          {/* Upper Body Measurements */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Upper Body (cm)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Chest</label>
                <input
                  type="number"
                  value={metrics.chest}
                  onChange={(e) => setMetrics({ ...metrics, chest: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Waist</label>
                <input
                  type="number"
                  value={metrics.waist}
                  onChange={(e) => setMetrics({ ...metrics, waist: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              {selectedGender === 'female' && (
                <>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Bust</label>
                    <input
                      type="number"
                      value={metrics.bust}
                      onChange={(e) => setMetrics({ ...metrics, bust: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Underbust</label>
                    <input
                      type="number"
                      value={metrics.underbust}
                      onChange={(e) => setMetrics({ ...metrics, underbust: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Hips</label>
                    <input
                      type="number"
                      value={metrics.hips}
                      onChange={(e) => setMetrics({ ...metrics, hips: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Upper Hips</label>
                    <input
                      type="number"
                      value={metrics.upperHips}
                      onChange={(e) => setMetrics({ ...metrics, upperHips: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Arms Measurements */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Arms (cm)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Right Arm</label>
                <input
                  type="number"
                  value={metrics.rArm}
                  onChange={(e) => setMetrics({ ...metrics, rArm: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Left Arm</label>
                <input
                  type="number"
                  value={metrics.lArm}
                  onChange={(e) => setMetrics({ ...metrics, lArm: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Right Forearm</label>
                <input
                  type="number"
                  value={metrics.rForearm}
                  onChange={(e) => setMetrics({ ...metrics, rForearm: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Left Forearm</label>
                <input
                  type="number"
                  value={metrics.lForearm}
                  onChange={(e) => setMetrics({ ...metrics, lForearm: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Wrists</label>
                <input
                  type="number"
                  value={metrics.wrists}
                  onChange={(e) => setMetrics({ ...metrics, wrists: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
            </div>
          </div>

          {/* Legs Measurements */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Legs (cm)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Right Quad</label>
                <input
                  type="number"
                  value={metrics.rQuad}
                  onChange={(e) => setMetrics({ ...metrics, rQuad: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Left Quad</label>
                <input
                  type="number"
                  value={metrics.lQuad}
                  onChange={(e) => setMetrics({ ...metrics, lQuad: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Right Calf</label>
                <input
                  type="number"
                  value={metrics.rCalf}
                  onChange={(e) => setMetrics({ ...metrics, rCalf: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Left Calf</label>
                <input
                  type="number"
                  value={metrics.lCalf}
                  onChange={(e) => setMetrics({ ...metrics, lCalf: Number(e.target.value) })}
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

      {/* Warning Dialog */}
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent className="bg-[#1a1d2e] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Limited Edits</DialogTitle>
            <DialogDescription className="text-white/60">
              You can only edit your body metrics {editsRemaining} more times. These initial measurements are your fitness starting point and frequent changes may affect the accuracy of your progress tracking and results.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setShowWarning(false)}
              className="flex-1 py-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowWarning(false);
                // Enable editing
              }}
              className="flex-1 py-3 rounded-xl bg-[#92B8FF] text-white hover:bg-[#AECEFF] transition-colors"
            >
              Continue
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}