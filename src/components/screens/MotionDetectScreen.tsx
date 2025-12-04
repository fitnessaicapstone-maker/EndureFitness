// MotionDetectScreen.tsx

import PoseDetector from "../vision/PoseDetector";
interface MotionDetectScreenProps {
  onNavigate: (screen: string, workoutId?: string) => void;
}

export function MotionDetectScreen({ onNavigate }: MotionDetectScreenProps) {
  return (
    <div className="min-h-screen bg-[#0a0d1a] text-white p-6">
      <h1 className="text-2xl font-bold mb-2">Motion Detect</h1>
      {/* <p className="text-white/70 mb-4"> */}
      {/* Motion detection screen coming soon... */}
      {/* </p> */}
      {/* Camera area: 640x480 fixed size */}
      <div
        className="mx-auto mb-4"
        style={{
          width: "90vw", // 90% of screen width
          maxWidth: "960px", // prevents it from becoming huge on desktop
          aspectRatio: "16 / 9", // full-body friendly
        }}
      >
        <PoseDetector />
      </div>

      <button
        className="px-4 py-2 rounded-xl bg-white/10 border border-white/20"
        onClick={() => onNavigate("home")}
      >
        Back to Home
      </button>
    </div>
  );
}
