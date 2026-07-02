import { useState } from 'react';
import { ChevronLeft, Images, ImageOff } from 'lucide-react';
import {
  loadMetricsPhotoSessions,
  type MetricsPhotoSessionData,
  type MetricsPhotoView,
} from '../../lib/appDataStorage';

interface MetricsLibraryScreenProps {
  onNavigate: (screen: string) => void;
}

const viewOrder: MetricsPhotoView[] = ['front', 'back', 'left', 'right'];

const viewLabels: Record<MetricsPhotoView, string> = {
  front: 'Front',
  back: 'Back',
  left: 'Left',
  right: 'Right',
};

function formatSessionDate(createdAt: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(createdAt));
}

export function MetricsLibraryScreen({ onNavigate }: MetricsLibraryScreenProps) {
  const [sessions] = useState<MetricsPhotoSessionData[]>(() => loadMetricsPhotoSessions());

  return (
    <div className="min-h-screen pb-8 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10 px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('progress')}
            aria-label="Back to progress"
            className="w-[52px] h-[52px] p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-2xl">Metrics Library</h1>
          <div className="w-[52px]" />
        </div>

        {sessions.length === 0 ? (
          <div className="min-h-[520px] flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                <ImageOff className="w-10 h-10 text-white/50" />
              </div>
              <h2 className="text-white text-xl mb-2">No Photos Yet</h2>
              <p className="text-white/60 text-sm mb-6">
                Saved body photos will appear here after you update metrics.
              </p>
              <button
                onClick={() => onNavigate('photo-capture')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white hover:from-[#AECEFF] hover:to-[#92B8FF] transition-all shadow-lg shadow-[#92B8FF]/20 flex items-center justify-center gap-2"
              >
                <Images className="w-5 h-5" />
                Update Metrics
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {sessions.map((session) => {
              const photosByView = new Map(session.photos.map((photo) => [photo.view, photo]));

              return (
                <div
                  key={session.id}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#92B8FF]/10 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <h2 className="text-white">Saved Photos</h2>
                      <p className="text-white/50 text-sm">{formatSessionDate(session.createdAt)}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                      {viewOrder.map((view) => {
                        const photo = photosByView.get(view);

                        return (
                          <div
                            key={view}
                            className="rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                          >
                            <div className="aspect-[4/3] bg-[#0f1220]">
                              {photo ? (
                                <img
                                  src={photo.imageDataUrl}
                                  alt={`${viewLabels[view]} metrics photo`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageOff className="w-8 h-8 text-white/30" />
                                </div>
                              )}
                            </div>
                            <div className="px-3 py-2">
                              <p className="text-white/80 text-sm">{viewLabels[view]}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
