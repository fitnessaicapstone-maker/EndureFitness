import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface BodyMetricsScreenProps {
  onNavigate: (screen: string) => void;
  gender?: string;
}

export function BodyMetricsScreen({ onNavigate, gender }: BodyMetricsScreenProps) {
  const [bodyType, setBodyType] = useState('');

  return (
    <div className="min-h-screen pb-24 px-8 py-16 bg-white">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl mb-6 text-black">Initial Profile Setup</h1>
        <p className="text-gray-600 mb-12">This information helps us personalize your fitness journey. All data is kept secure and private to you.</p>
        
        <div className="space-y-8">
          {/* Section 1: Height and Weight */}
          <div className="border-2 border-black rounded-lg p-6">
            <h2 className="text-xl mb-6 text-black">Height and Weight</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height" className="text-black mb-2 block">Height (cm)</Label>
                <Input id="height" type="number" placeholder="175" className="border-2 border-black" />
              </div>
              <div>
                <Label htmlFor="weight" className="text-black mb-2 block">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="70" className="border-2 border-black" />
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
                  <Input id="wrists" type="number" placeholder="18" className="border-2 border-black" />
                </div>
                <div>
                  <Label htmlFor="waist" className="text-black mb-2 block text-sm">Waist</Label>
                  <Input id="waist" type="number" placeholder="80" className="border-2 border-black" />
                </div>
                <div>
                  <Label htmlFor="chest" className="text-black mb-2 block text-sm">Chest</Label>
                  <Input id="chest" type="number" placeholder="95" className="border-2 border-black" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quad-right" className="text-black mb-2 block text-sm">Right Quad</Label>
                  <Input id="quad-right" type="number" placeholder="55" className="border-2 border-black" />
                </div>
                <div>
                  <Label htmlFor="quad-left" className="text-black mb-2 block text-sm">Left Quad</Label>
                  <Input id="quad-left" type="number" placeholder="55" className="border-2 border-black" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="calf-right" className="text-black mb-2 block text-sm">Right Calf</Label>
                  <Input id="calf-right" type="number" placeholder="38" className="border-2 border-black" />
                </div>
                <div>
                  <Label htmlFor="calf-left" className="text-black mb-2 block text-sm">Left Calf</Label>
                  <Input id="calf-left" type="number" placeholder="38" className="border-2 border-black" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="arm-right" className="text-black mb-2 block text-sm">Right Arm</Label>
                  <Input id="arm-right" type="number" placeholder="35" className="border-2 border-black" />
                </div>
                <div>
                  <Label htmlFor="arm-left" className="text-black mb-2 block text-sm">Left Arm</Label>
                  <Input id="arm-left" type="number" placeholder="35" className="border-2 border-black" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="forearm-right" className="text-black mb-2 block text-sm">Right Forearm</Label>
                  <Input id="forearm-right" type="number" placeholder="28" className="border-2 border-black" />
                </div>
                <div>
                  <Label htmlFor="forearm-left" className="text-black mb-2 block text-sm">Left Forearm</Label>
                  <Input id="forearm-left" type="number" placeholder="28" className="border-2 border-black" />
                </div>
              </div>
              
              {gender === 'female' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bust" className="text-black mb-2 block text-sm">Bust</Label>
                    <Input id="bust" type="number" placeholder="90" className="border-2 border-black" />
                  </div>
                  <div>
                    <Label htmlFor="bosom" className="text-black mb-2 block text-sm">Bosom</Label>
                    <Input id="bosom" type="number" placeholder="85" className="border-2 border-black" />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Section 3: Body Type */}
          <div className="border-2 border-black rounded-lg p-6">
            <h2 className="text-xl mb-6 text-black">Body Type Selection</h2>
            <Select value={bodyType} onValueChange={setBodyType}>
              <SelectTrigger className="border-2 border-black">
                <SelectValue placeholder="Select your body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="athletic">Athletic</SelectItem>
                <SelectItem value="slim">Slim</SelectItem>
                <SelectItem value="bulky">Bulky</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            className="w-full bg-black text-white hover:bg-gray-900 border-2 border-black" 
            onClick={() => onNavigate('tour')}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
