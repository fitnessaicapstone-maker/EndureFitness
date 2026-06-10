import { ChevronLeft, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { BodyMetricsData, NewBodyMetricsData } from '../../lib/appDataStorage';
import {
  bodyMeasurementFields,
  hasBodyMetricsErrors,
  validateBodyMetrics,
  type BodyMetricsErrors,
} from '../../lib/bodyMetricsValidation';

interface BodyMetricsEditScreenProps {
  onNavigate: (screen: string) => void;
  gender: string;
  height?: number;
  weight?: number;
  metrics: BodyMetricsData | null;
  onSaveMetrics: (updates: NewBodyMetricsData) => void;
}

export function BodyMetricsEditScreen({
  onNavigate,
  gender,
  height,
  weight,
  metrics: savedMetrics,
  onSaveMetrics,
}: BodyMetricsEditScreenProps) {
  const [editsRemaining] = useState(2); // Track how many edits are left
  const [selectedGender, setSelectedGender] = useState(savedMetrics?.gender ?? gender ?? 'male');
  
  const [metrics, setMetrics] = useState<NewBodyMetricsData>({
    gender: savedMetrics?.gender ?? gender,
    age: savedMetrics?.age,
    height: savedMetrics?.height ?? height,
    weight: savedMetrics?.weight ?? weight,
    wrists: savedMetrics?.wrists,
    waist: savedMetrics?.waist,
    chest: savedMetrics?.chest,
    rightQuad: savedMetrics?.rightQuad,
    leftQuad: savedMetrics?.leftQuad,
    rightCalf: savedMetrics?.rightCalf,
    leftCalf: savedMetrics?.leftCalf,
    rightArm: savedMetrics?.rightArm,
    leftArm: savedMetrics?.leftArm,
    rightForearm: savedMetrics?.rightForearm,
    leftForearm: savedMetrics?.leftForearm,
    bust: savedMetrics?.bust,
    bosom: savedMetrics?.bosom,
    bodyType: savedMetrics?.bodyType ?? '',
  });
  const [errors, setErrors] = useState<BodyMetricsErrors>({});

  const updateMetric = (field: keyof NewBodyMetricsData, value: string) => {
    setMetrics({
      ...metrics,
      [field]: value === '' ? undefined : Number(value),
    });
    setErrors({ ...errors, [field]: undefined });
  };

  const handleSave = () => {
    const nextMetrics = {
      ...metrics,
      gender: selectedGender,
    };
    const validationErrors = validateBodyMetrics(nextMetrics);

    setErrors(validationErrors);

    if (hasBodyMetricsErrors(validationErrors)) {
      return;
    }

    onSaveMetrics(nextMetrics);
    onNavigate('profile');
  };

  const renderError = (field: keyof NewBodyMetricsData) =>
    errors[field] ? <p className="text-red-300 text-xs mt-2">{errors[field]}</p> : null;

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
                onClick={() => {
                  setSelectedGender('male');
                  setErrors({ ...errors, gender: undefined });
                }}
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
                onClick={() => {
                  setSelectedGender('female');
                  setErrors({ ...errors, gender: undefined });
                }}
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
            {renderError('gender')}
          </div>

          {/* Basic Metrics */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Basic Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Height (cm)</label>
                <input
                  type="number"
                  min="0"
                  value={metrics.height ?? ''}
                  onChange={(e) => updateMetric('height', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
                {renderError('height')}
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Weight (kg)</label>
                <input
                  type="number"
                  min="0"
                  value={metrics.weight ?? ''}
                  onChange={(e) => updateMetric('weight', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                />
                {renderError('weight')}
              </div>
            </div>
          </div>

          {/* Body Measurements */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Body Measurements</h3>
            <div className="grid grid-cols-2 gap-4">
              {bodyMeasurementFields.map((field) => (
                <div key={field.key}>
                  <label className="text-white/60 text-sm mb-2 block">{field.label} (cm)</label>
                  <input
                    type="number"
                    min="0"
                    value={(metrics[field.key] as number | undefined) ?? ''}
                    onChange={(e) => updateMetric(field.key, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                  />
                  {renderError(field.key)}
                </div>
              ))}
            </div>
          </div>

          {selectedGender === 'female' && (
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h3 className="text-white mb-4">Additional Measurements</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Bust (cm)</label>
                  <input
                    type="number"
                    min="0"
                    value={metrics.bust ?? ''}
                    onChange={(e) => updateMetric('bust', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                  />
                  {renderError('bust')}
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Bosom (cm)</label>
                  <input
                    type="number"
                    min="0"
                    value={metrics.bosom ?? ''}
                    onChange={(e) => updateMetric('bosom', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                  />
                  {renderError('bosom')}
                </div>
              </div>
            </div>
          )}

          {/* Body Type */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Body Type</h3>
            <select
              value={metrics.bodyType ?? ''}
              onChange={(e) => {
                setMetrics({ ...metrics, bodyType: e.target.value });
                setErrors({ ...errors, bodyType: undefined });
              }}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
            >
              <option value="" className="bg-[#1a1d2e]">Select body type</option>
              <option value="athletic" className="bg-[#1a1d2e]">Athletic</option>
              <option value="slim" className="bg-[#1a1d2e]">Slim</option>
              <option value="bulky" className="bg-[#1a1d2e]">Bulky</option>
            </select>
            {renderError('bodyType')}
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
