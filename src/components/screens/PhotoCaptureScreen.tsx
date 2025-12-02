import { useState } from 'react';
import { ChevronLeft, Camera, Check } from 'lucide-react';

interface PhotoCaptureScreenProps {
  onNavigate: (screen: string) => void;
}

type ViewType = 'front' | 'back' | 'side';

export function PhotoCaptureScreen({ onNavigate }: PhotoCaptureScreenProps) {
  const [currentView, setCurrentView] = useState<ViewType>('front');
  const [capturedPhotos, setCapturedPhotos] = useState<Record<ViewType, boolean>>({
    front: false,
    back: false,
    side: false,
  });
  const [hasCapturedCurrentPhoto, setHasCapturedCurrentPhoto] = useState(false);

  const viewInstructions = {
    front: {
      title: 'Front View',
      instructions: 'Stand straight facing the camera. Keep your arms at your sides and stand tall.',
      color: '#92B8FF',
    },
    back: {
      title: 'Back View',
      instructions: 'Turn around and face away from the camera. Keep your arms at your sides and stand straight.',
      color: '#AECEFF',
    },
    side: {
      title: 'Side View',
      instructions: 'Turn to your side. Keep your posture straight and arms at your sides.',
      color: '#9470DC',
    },
  };

  const handleCapture = () => {
    if (!hasCapturedCurrentPhoto) {
      // Capture the photo
      setHasCapturedCurrentPhoto(true);
      setCapturedPhotos(prev => ({ ...prev, [currentView]: true }));
    }
  };

  const handleNext = () => {
    if (currentView === 'front') {
      setCurrentView('back');
      setHasCapturedCurrentPhoto(false);
    } else if (currentView === 'back') {
      setCurrentView('side');
      setHasCapturedCurrentPhoto(false);
    }
  };

  const handleDone = () => {
    // All photos captured, proceed to loading
    onNavigate('loading-analysis');
  };

  const isLastPhoto = currentView === 'side';
  const currentColor = viewInstructions[currentView].color;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button
            onClick={() => onNavigate('progress')}
            className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-xl">{viewInstructions[currentView].title}</h1>
          <div className="w-11" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 px-6 mb-6">
          <div className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${capturedPhotos.front ? 'bg-[#92B8FF] scale-y-125' : 'bg-white/20'}`} />
          <div className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${capturedPhotos.back ? 'bg-[#AECEFF] scale-y-125' : 'bg-white/20'}`} />
          <div className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${capturedPhotos.side ? 'bg-[#9470DC] scale-y-125' : 'bg-white/20'}`} />
        </div>

        {/* Instructions */}
        <div className="px-6 mb-6">
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <p className="text-white/70 text-sm text-center leading-relaxed">
              {viewInstructions[currentView].instructions}
            </p>
          </div>
        </div>

        {/* Camera View Area */}
        <div className="flex-1 px-6 pb-6 flex flex-col">
          {/* Camera Preview */}
          <div className="flex-1 rounded-3xl overflow-hidden relative" style={{ 
            background: hasCapturedCurrentPhoto 
              ? 'linear-gradient(135deg, rgba(146, 184, 255, 0.1), rgba(148, 112, 220, 0.1))' 
              : 'linear-gradient(135deg, #1a1d2e, #0f1220)',
            border: `2px solid ${hasCapturedCurrentPhoto ? currentColor + '40' : 'rgba(255,255,255,0.1)'}`
          }}>
            {/* Simulated camera view with body outline guide */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!hasCapturedCurrentPhoto && (
                <div className="w-40 h-80 border-2 border-dashed rounded-full transition-all duration-300" style={{ borderColor: currentColor + '60' }} />
              )}
              
              {hasCapturedCurrentPhoto && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: currentColor + '20' }}>
                    <Check className="w-12 h-12" style={{ color: currentColor }} />
                  </div>
                </div>
              )}
            </div>
            
            {/* Alignment guide text */}
            {!hasCapturedCurrentPhoto && (
              <div className="absolute bottom-28 left-0 right-0 flex justify-center">
                <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <p className="text-white/70 text-sm text-center">Align your body here</p>
                </div>
              </div>
            )}

            {hasCapturedCurrentPhoto && (
              <div className="absolute top-6 left-0 right-0 flex justify-center">
                <div className="px-5 py-2.5 rounded-xl backdrop-blur-md border" style={{ 
                  backgroundColor: currentColor + '20',
                  borderColor: currentColor + '40'
                }}>
                  <p className="text-white text-sm">Photo Captured!</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons Area */}
          <div className="mt-6 space-y-4">
            {/* Capture Button */}
            {!hasCapturedCurrentPhoto && (
              <div className="flex justify-center">
                <button
                  onClick={handleCapture}
                  className="w-20 h-20 rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentColor}, ${currentColor}dd)`,
                    boxShadow: `0 10px 30px ${currentColor}40`
                  }}
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
            )}

            {/* Next/Done Button */}
            {hasCapturedCurrentPhoto && (
              <button
                onClick={isLastPhoto ? handleDone : handleNext}
                className="w-full py-4 rounded-2xl text-white transition-all duration-300 shadow-lg"
                style={{ 
                  background: `linear-gradient(90deg, ${currentColor}, ${viewInstructions[isLastPhoto ? 'side' : (currentView === 'front' ? 'back' : 'side')].color})`,
                  boxShadow: `0 8px 24px ${currentColor}30`
                }}
              >
                {isLastPhoto ? 'Done' : 'Next'}
              </button>
            )}

            {/* Photo Indicators */}
            <div className="flex justify-center gap-3">
              <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${capturedPhotos.front ? 'bg-[#92B8FF]/20 border-[#92B8FF] scale-110' : 'bg-white/5 border-white/20'}`}>
                {capturedPhotos.front ? (
                  <Check className="w-6 h-6 text-[#92B8FF]" />
                ) : (
                  <span className="text-white/40 text-xs">1</span>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${capturedPhotos.back ? 'bg-[#AECEFF]/20 border-[#AECEFF] scale-110' : 'bg-white/5 border-white/20'}`}>
                {capturedPhotos.back ? (
                  <Check className="w-6 h-6 text-[#AECEFF]" />
                ) : (
                  <span className="text-white/40 text-xs">2</span>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${capturedPhotos.side ? 'bg-[#9470DC]/20 border-[#9470DC] scale-110' : 'bg-white/5 border-white/20'}`}>
                {capturedPhotos.side ? (
                  <Check className="w-6 h-6 text-[#9470DC]" />
                ) : (
                  <span className="text-white/40 text-xs">3</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}