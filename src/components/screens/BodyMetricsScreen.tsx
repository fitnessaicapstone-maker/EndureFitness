import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { BodyMetricsData, NewBodyMetricsData } from '../../lib/appDataStorage';
import {
  hasBodyMetricsErrors,
  validateBodyMetrics,
  type BodyMetricsErrors,
} from '../../lib/bodyMetricsValidation';

interface BodyMetricsScreenProps {
  onNavigate: (screen: string) => void;
  gender?: string;
  metrics: BodyMetricsData | null;
  onSaveMetrics: (updates: NewBodyMetricsData) => void;
}

export function BodyMetricsScreen({ onNavigate, gender, metrics: savedMetrics, onSaveMetrics }: BodyMetricsScreenProps) {
  const [metrics, setMetrics] = useState<NewBodyMetricsData>({
    gender,
    age: savedMetrics?.age,
    height: savedMetrics?.height,
    weight: savedMetrics?.weight,
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
  const activeGender = metrics.gender ?? gender;

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
      gender: activeGender,
    };
    const validationErrors = validateBodyMetrics(nextMetrics);

    setErrors(validationErrors);

    if (hasBodyMetricsErrors(validationErrors)) {
      return;
    }

    onSaveMetrics(nextMetrics);
    onNavigate('tour');
  };

  const renderError = (field: keyof NewBodyMetricsData) =>
    errors[field] ? <p className="text-red-600 text-sm mt-2">{errors[field]}</p> : null;

  return (
    <div className="min-h-screen pb-24 px-8 py-16 bg-white">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl mb-6 text-black">Initial Profile Setup</h1>
        <p className="text-gray-600 mb-12">This information helps us personalize your fitness journey. All data is kept secure and private to you.</p>
        {renderError('gender')}
        
        <div className="space-y-8">
          {/* Section 1: Height and Weight */}
          <div className="border-2 border-black rounded-lg p-6">
            <h2 className="text-xl mb-6 text-black">Height and Weight</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height" className="text-black mb-2 block">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="0"
                  placeholder="175"
                  value={metrics.height ?? ''}
                  onChange={(e) => updateMetric('height', e.target.value)}
                  className="border-2 border-black"
                />
                {renderError('height')}
              </div>
              <div>
                <Label htmlFor="weight" className="text-black mb-2 block">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  placeholder="70"
                  value={metrics.weight ?? ''}
                  onChange={(e) => updateMetric('weight', e.target.value)}
                  className="border-2 border-black"
                />
                {renderError('weight')}
              </div>
            </div>
          </div>
          
          {/* Section 2: Body Measurements */}
          <div className="border-2 border-black rounded-lg p-6">
            <h2 className="text-xl mb-6 text-black">Body Measurements</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="wrists" className="text-black mb-2 block text-sm">Wrists</Label>
                  <Input id="wrists" type="number" min="0" placeholder="18" value={metrics.wrists ?? ''} onChange={(e) => updateMetric('wrists', e.target.value)} className="border-2 border-black" />
                  {renderError('wrists')}
                </div>
                <div>
                  <Label htmlFor="waist" className="text-black mb-2 block text-sm">Waist</Label>
                  <Input id="waist" type="number" min="0" placeholder="80" value={metrics.waist ?? ''} onChange={(e) => updateMetric('waist', e.target.value)} className="border-2 border-black" />
                  {renderError('waist')}
                </div>
                <div>
                  <Label htmlFor="chest" className="text-black mb-2 block text-sm">Chest</Label>
                  <Input id="chest" type="number" min="0" placeholder="95" value={metrics.chest ?? ''} onChange={(e) => updateMetric('chest', e.target.value)} className="border-2 border-black" />
                  {renderError('chest')}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quad-right" className="text-black mb-2 block text-sm">Right Quad</Label>
                  <Input id="quad-right" type="number" min="0" placeholder="55" value={metrics.rightQuad ?? ''} onChange={(e) => updateMetric('rightQuad', e.target.value)} className="border-2 border-black" />
                  {renderError('rightQuad')}
                </div>
                <div>
                  <Label htmlFor="quad-left" className="text-black mb-2 block text-sm">Left Quad</Label>
                  <Input id="quad-left" type="number" min="0" placeholder="55" value={metrics.leftQuad ?? ''} onChange={(e) => updateMetric('leftQuad', e.target.value)} className="border-2 border-black" />
                  {renderError('leftQuad')}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="calf-right" className="text-black mb-2 block text-sm">Right Calf</Label>
                  <Input id="calf-right" type="number" min="0" placeholder="38" value={metrics.rightCalf ?? ''} onChange={(e) => updateMetric('rightCalf', e.target.value)} className="border-2 border-black" />
                  {renderError('rightCalf')}
                </div>
                <div>
                  <Label htmlFor="calf-left" className="text-black mb-2 block text-sm">Left Calf</Label>
                  <Input id="calf-left" type="number" min="0" placeholder="38" value={metrics.leftCalf ?? ''} onChange={(e) => updateMetric('leftCalf', e.target.value)} className="border-2 border-black" />
                  {renderError('leftCalf')}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="arm-right" className="text-black mb-2 block text-sm">Right Arm</Label>
                  <Input id="arm-right" type="number" min="0" placeholder="35" value={metrics.rightArm ?? ''} onChange={(e) => updateMetric('rightArm', e.target.value)} className="border-2 border-black" />
                  {renderError('rightArm')}
                </div>
                <div>
                  <Label htmlFor="arm-left" className="text-black mb-2 block text-sm">Left Arm</Label>
                  <Input id="arm-left" type="number" min="0" placeholder="35" value={metrics.leftArm ?? ''} onChange={(e) => updateMetric('leftArm', e.target.value)} className="border-2 border-black" />
                  {renderError('leftArm')}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="forearm-right" className="text-black mb-2 block text-sm">Right Forearm</Label>
                  <Input id="forearm-right" type="number" min="0" placeholder="28" value={metrics.rightForearm ?? ''} onChange={(e) => updateMetric('rightForearm', e.target.value)} className="border-2 border-black" />
                  {renderError('rightForearm')}
                </div>
                <div>
                  <Label htmlFor="forearm-left" className="text-black mb-2 block text-sm">Left Forearm</Label>
                  <Input id="forearm-left" type="number" min="0" placeholder="28" value={metrics.leftForearm ?? ''} onChange={(e) => updateMetric('leftForearm', e.target.value)} className="border-2 border-black" />
                  {renderError('leftForearm')}
                </div>
              </div>
              
              {activeGender === 'female' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bust" className="text-black mb-2 block text-sm">Bust</Label>
                    <Input id="bust" type="number" min="0" placeholder="90" value={metrics.bust ?? ''} onChange={(e) => updateMetric('bust', e.target.value)} className="border-2 border-black" />
                    {renderError('bust')}
                  </div>
                  <div>
                    <Label htmlFor="bosom" className="text-black mb-2 block text-sm">Bosom</Label>
                    <Input id="bosom" type="number" min="0" placeholder="85" value={metrics.bosom ?? ''} onChange={(e) => updateMetric('bosom', e.target.value)} className="border-2 border-black" />
                    {renderError('bosom')}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Section 3: Body Type */}
          <div className="border-2 border-black rounded-lg p-6">
            <h2 className="text-xl mb-6 text-black">Body Type Selection</h2>
            <Select value={metrics.bodyType ?? ''} onValueChange={(bodyType) => {
              setMetrics({ ...metrics, bodyType });
              setErrors({ ...errors, bodyType: undefined });
            }}>
              <SelectTrigger className="border-2 border-black">
                <SelectValue placeholder="Select your body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="athletic">Athletic</SelectItem>
                <SelectItem value="slim">Slim</SelectItem>
                <SelectItem value="bulky">Bulky</SelectItem>
              </SelectContent>
            </Select>
            {renderError('bodyType')}
          </div>
          
          <Button 
            className="w-full bg-black text-white hover:bg-gray-900 border-2 border-black" 
            onClick={handleSave}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
