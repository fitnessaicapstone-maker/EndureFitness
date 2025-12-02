import { ChevronLeft, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

// Custom Animated Toggle
function AnimatedToggle({ checked, onChange, id }: { checked: boolean; onChange: (checked: boolean) => void; id: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
        checked ? 'bg-[#92B8FF]' : 'bg-white/20'
      }`}
      id={id}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-lg ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [kgUnit, setKgUnit] = useState(true);
  const [kmUnit, setKmUnit] = useState(true);
  const [autoIncrease, setAutoIncrease] = useState(false);
  const [aiCoach, setAiCoach] = useState(true);
  const [visualRecognition, setVisualRecognition] = useState(true);

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
          <h1 className="text-xl text-white">Settings</h1>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Dark Mode - Separate Section with Icons */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Label htmlFor="dark-mode" className="text-white">Dark Mode</Label>
                {/* Animated Sun/Moon Icons */}
                <div className="flex items-center gap-2">
                  <Sun className={`w-4 h-4 transition-all duration-300 ${darkMode ? 'text-white/30' : 'text-yellow-400'}`} />
                  <Moon className={`w-4 h-4 transition-all duration-300 ${darkMode ? 'text-[#92B8FF]' : 'text-white/30'}`} />
                </div>
              </div>
              <AnimatedToggle id="dark-mode" checked={darkMode} onChange={setDarkMode} />
            </div>
          </div>

          {/* Units - Separate Section */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Units</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="weight-unit" className="text-white/80">kg / lbs</Label>
                <AnimatedToggle id="weight-unit" checked={kgUnit} onChange={setKgUnit} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="distance-unit" className="text-white/80">km / miles</Label>
                <AnimatedToggle id="distance-unit" checked={kmUnit} onChange={setKmUnit} />
              </div>
            </div>
          </div>

          {/* Progress Automation */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Progress Automation</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="auto-increase" className="text-white">Auto-increase weight</Label>
                  <p className="text-sm text-white/50 mt-1">Increases weight after achieving target reps/sets</p>
                </div>
                <AnimatedToggle id="auto-increase" checked={autoIncrease} onChange={setAutoIncrease} />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Weight Increase Amount (lbs)</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="bg-white/5 border-white/10 text-white backdrop-blur-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.5">2.5 lbs</SelectItem>
                    <SelectItem value="5">5 lbs</SelectItem>
                    <SelectItem value="10">10 lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Achievement Timeframe</Label>
                <Select defaultValue="1week">
                  <SelectTrigger className="bg-white/5 border-white/10 text-white backdrop-blur-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1week">1 Week Straight</SelectItem>
                    <SelectItem value="2weeks">2 Weeks Straight</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-white/50 mt-2">Weight increases after you complete target for this duration. Counts toward achievements.</p>
              </div>
            </div>
          </div>

          {/* AI Settings */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">AI Settings</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="ai-coach" className="text-white">AI Coach Mode</Label>
                  <p className="text-sm text-white/50 mt-1">Real-time guidance during workouts</p>
                </div>
                <AnimatedToggle id="ai-coach" checked={aiCoach} onChange={setAiCoach} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="visual-recognition" className="text-white">Auto Assume Set Visually</Label>
                  <p className="text-sm text-white/50 mt-1">AI tracks reps automatically</p>
                </div>
                <AnimatedToggle id="visual-recognition" checked={visualRecognition} onChange={setVisualRecognition} />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">AI Voice Selection</Label>
                <Select defaultValue="voice1">
                  <SelectTrigger className="bg-white/5 border-white/10 text-white backdrop-blur-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voice1">Voice 1 - Professional</SelectItem>
                    <SelectItem value="voice2">Voice 2 - Energetic</SelectItem>
                    <SelectItem value="voice3">Voice 3 - Calm</SelectItem>
                    <SelectItem value="voice4">Voice 4 - Motivational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}