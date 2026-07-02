import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Camera, Check } from 'lucide-react';
import {
  saveMetricsPhotoSession,
  type MetricsPhotoView,
} from '../../lib/appDataStorage';

interface PhotoCaptureScreenProps {
  onNavigate: (screen: string) => void;
}

type CapturedPhotos = Record<MetricsPhotoView, string | null>;

const viewOrder: MetricsPhotoView[] = ['front', 'back', 'left', 'right'];

const emptyCapturedPhotos: CapturedPhotos = {
  front: null,
  back: null,
  left: null,
  right: null,
};

const viewInstructions: Record<
  MetricsPhotoView,
  { title: string; instructions: string; color: string; number: string }
> = {
  front: {
    title: 'Front View',
    instructions: 'Stand straight facing the camera. Keep your arms at your sides and stand tall.',
    color: '#92B8FF',
    number: '1',
  },
  back: {
    title: 'Back View',
    instructions: 'Turn around and face away from the camera. Keep your arms at your sides.',
    color: '#AECEFF',
    number: '2',
  },
  left: {
    title: 'Left View',
    instructions: 'Turn to your left side. Keep your posture straight and arms relaxed.',
    color: '#B29AE8',
    number: '3',
  },
  right: {
    title: 'Right View',
    instructions: 'Turn to your right side. Keep your posture straight and arms relaxed.',
    color: '#9470DC',
    number: '4',
  },
};

export function PhotoCaptureScreen({ onNavigate }: PhotoCaptureScreenProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentView, setCurrentView] = useState<MetricsPhotoView>('front');
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhotos>(emptyCapturedPhotos);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);

  const currentIndex = viewOrder.indexOf(currentView);
  const currentColor = viewInstructions[currentView].color;

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    let didCancel = false;

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('Camera access is not available in this browser.');
        return;
      }

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        activeStream = mediaStream;

        if (!didCancel) {
          setStream(mediaStream);
          setCameraError('');
        }
      } catch {
        if (!didCancel) {
          setCameraError('Allow camera access to take your metrics photos.');
        }
      }
    }

    startCamera();

    return () => {
      didCancel = true;
      activeStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !stream) {
      return;
    }

    video.srcObject = stream;
    video.play().catch(() => {
      setCameraError('Tap the camera preview if it does not start automatically.');
    });
  }, [stream, currentView]);

  const handleCapture = () => {
    const video = videoRef.current;

    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setCameraError('Camera is still starting. Try again in a moment.');
      return;
    }

    const maxWidth = 900;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    const width = Math.round(video.videoWidth * scale);
    const height = Math.round(video.videoHeight * scale);
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')?.drawImage(video, 0, 0, width, height);

    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.82);

    const nextCapturedPhotos: CapturedPhotos = {
      ...capturedPhotos,
      [currentView]: imageDataUrl,
    };
    const allPhotosCaptured = viewOrder.every((view) => nextCapturedPhotos[view]);

    setCapturedPhotos(nextCapturedPhotos);
    setCameraError('');

    if (allPhotosCaptured) {
      saveMetricsPhotoSession({
        front: nextCapturedPhotos.front!,
        back: nextCapturedPhotos.back!,
        left: nextCapturedPhotos.left!,
        right: nextCapturedPhotos.right!,
      });

      onNavigate('metrics-update');
      return;
    }

    const nextMissingAfterCurrent = viewOrder
      .slice(currentIndex + 1)
      .find((view) => !nextCapturedPhotos[view]);
    const firstMissing = viewOrder.find((view) => !nextCapturedPhotos[view]);

    setCurrentView(nextMissingAfterCurrent ?? firstMissing ?? currentView);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div
        className="relative z-10 h-full px-6 py-5 grid"
        style={{ gridTemplateRows: '52px 8px 62px minmax(0, 1fr) 132px', gap: '14px' }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('progress')}
            aria-label="Back to progress"
            className="w-[52px] h-[52px] p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-xl">{viewInstructions[currentView].title}</h1>
          <div className="w-[52px]" />
        </div>

        <div className="flex items-center gap-3">
          {viewOrder.map((view, index) => (
            <div
              key={view}
              className="h-1.5 rounded-full flex-1 transition-all duration-500"
              style={{
                backgroundColor: capturedPhotos[view]
                  ? viewInstructions[view].color
                  : index === currentIndex
                    ? `${viewInstructions[view].color}99`
                    : 'rgba(255,255,255,0.2)',
                transform: capturedPhotos[view] ? 'scaleY(1.25)' : 'scaleY(1)',
              }}
            />
          ))}
        </div>

        <div className="min-h-0">
          <div className="h-full px-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <p className="text-white/70 text-sm text-center leading-relaxed">
              {viewInstructions[currentView].instructions}
            </p>
          </div>
        </div>

        <div className="min-h-0 flex items-center justify-center">
          <div
            className="h-full w-full max-w-[1180px] rounded-[24px] overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #0b0e1b, #151829)',
              border: `2px solid ${currentColor}40`,
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.28)',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={() => setIsCameraReady(true)}
              onCanPlay={() => {
                setIsCameraReady(true);
                setCameraError('');
              }}
              className="absolute inset-0 z-0 w-full h-full object-contain bg-[#0b0e1b]"
            />

            {!isCameraReady && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f1220]/70">
                <div className="px-5 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                  <p className="text-white/80 text-sm">Starting camera...</p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div
                className="w-40 h-[70%] max-h-[300px] min-h-[180px] border-2 border-dashed rounded-full transition-all duration-300"
                style={{ borderColor: currentColor + '70' }}
              />
            </div>

            <div className="absolute left-0 right-0 top-1/2 z-30 flex justify-center translate-y-[88px] pointer-events-none">
              <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <p className="text-white/70 text-sm text-center">Align your body here</p>
              </div>
            </div>

            {cameraError && (
              <div className="absolute inset-x-6 bottom-6 z-40 rounded-2xl bg-black/70 border border-white/10 px-4 py-3 text-center">
                <p className="text-white/80 text-sm">{cameraError}</p>
              </div>
            )}

            {isCameraReady && !cameraError && (
              <div className="absolute left-6 top-6 z-40 rounded-full bg-black/55 border border-[#92B8FF]/30 px-4 py-2">
                <p className="text-[#AECEFF] text-xs">Camera ready</p>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-50 min-h-0 flex flex-col items-center justify-center gap-4">
          <div className="flex justify-center">
            <button
              onClick={handleCapture}
              disabled={!isCameraReady}
              aria-label={`Capture ${viewInstructions[currentView].title}`}
              className="w-20 h-20 rounded-full shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${currentColor}, ${currentColor}dd)`,
                boxShadow: `0 10px 30px ${currentColor}40`,
              }}
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
          </div>

          <div className="flex justify-center gap-3">
            {viewOrder.map((view) => {
              const viewInfo = viewInstructions[view];
              const isActive = currentView === view;
              const hasPhoto = Boolean(capturedPhotos[view]);

              return (
                <button
                  key={view}
                  type="button"
                  onClick={() => setCurrentView(view)}
                  aria-label={`Show ${viewInfo.title}`}
                  className="w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: isActive || hasPhoto ? viewInfo.color : 'rgba(255,255,255,0.2)',
                    backgroundColor: hasPhoto ? `${viewInfo.color}20` : 'rgba(255,255,255,0.05)',
                    transform: hasPhoto ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {hasPhoto ? (
                    <Check className="w-6 h-6" style={{ color: viewInfo.color }} />
                  ) : (
                    <span className="text-white/40 text-xs">{viewInfo.number}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
