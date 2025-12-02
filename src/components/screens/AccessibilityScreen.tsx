import { ChevronLeft, Type, Volume2, Eye, Palette, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface AccessibilityScreenProps {
  onNavigate: (screen: string) => void;
}

export function AccessibilityScreen({ onNavigate }: AccessibilityScreenProps) {
  const [settings, setSettings] = useState({
    textSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    voiceGuidance: false,
    colorblindMode: 'none',
    hapticFeedback: true,
  });

  const textSizes = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'Extra Large', value: 'xl' },
  ];

  const colorblindModes = [
    { label: 'None', value: 'none' },
    { label: 'Protanopia', value: 'protanopia' },
    { label: 'Deuteranopia', value: 'deuteranopia' },
    { label: 'Tritanopia', value: 'tritanopia' },
  ];

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
          <h1 className="text-xl text-white">Accessibility</h1>
        </div>

        <div className="px-6 space-y-4">
          {/* Text Size */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#92B8FF]/10">
                <Type className="w-5 h-5 text-[#92B8FF]" />
              </div>
              <h3 className="text-white">Text Size</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {textSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSettings({ ...settings, textSize: size.value })}
                  className={`py-3 px-4 rounded-xl transition-all ${
                    settings.textSize === size.value
                      ? 'bg-[#92B8FF] text-white shadow-lg shadow-[#92B8FF]/20'
                      : 'bg-white/5 text-white/60 border border-white/10'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Settings */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#9470DC]/10">
                <Eye className="w-5 h-5 text-[#9470DC]" />
              </div>
              <h3 className="text-white">Visual Settings</h3>
            </div>
            <div className="space-y-3">
              {/* High Contrast */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white">High Contrast Mode</span>
                <button
                  onClick={() => setSettings({ ...settings, highContrast: !settings.highContrast })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.highContrast ? 'bg-[#92B8FF]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white">Reduce Motion</span>
                <button
                  onClick={() => setSettings({ ...settings, reduceMotion: !settings.reduceMotion })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.reduceMotion ? 'bg-[#92B8FF]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.reduceMotion ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Colorblind Mode */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#AECEFF]/10">
                <Palette className="w-5 h-5 text-[#AECEFF]" />
              </div>
              <h3 className="text-white">Colorblind Mode</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {colorblindModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setSettings({ ...settings, colorblindMode: mode.value })}
                  className={`py-3 px-4 rounded-xl transition-all ${
                    settings.colorblindMode === mode.value
                      ? 'bg-[#AECEFF] text-white shadow-lg shadow-[#AECEFF]/20'
                      : 'bg-white/5 text-white/60 border border-white/10'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Audio & Haptics */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#B29AE8]/10">
                <Volume2 className="w-5 h-5 text-[#B29AE8]" />
              </div>
              <h3 className="text-white">Audio & Haptics</h3>
            </div>
            <div className="space-y-3">
              {/* Voice Guidance */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <p className="text-white">Voice Guidance</p>
                  <p className="text-white/50 text-xs mt-1">Hear workout instructions</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, voiceGuidance: !settings.voiceGuidance })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.voiceGuidance ? 'bg-[#92B8FF]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.voiceGuidance ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Haptic Feedback */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <p className="text-white">Haptic Feedback</p>
                  <p className="text-white/50 text-xs mt-1">Vibration for interactions</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, hapticFeedback: !settings.hapticFeedback })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.hapticFeedback ? 'bg-[#92B8FF]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.hapticFeedback ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button - At Bottom */}
        <div className="px-6 pb-6 pt-4">
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-[#92B8FF]/50 transition-all">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}