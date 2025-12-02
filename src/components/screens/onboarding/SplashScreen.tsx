import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
// @ts-ignore: imported from Figma asset loader at runtime
import endureLogo from "figma:asset/ae8528a70c61b154e099d5cf52318180871d2341.png";

interface SplashScreenProps {
  onNavigate?: (screen: string) => void;
  showButton?: boolean;
}

export function SplashScreen({
  onNavigate,
  showButton,
}: SplashScreenProps) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    // Width (320) - Padding (4+4) - Button (48) = 264 max travel
    // Threshold set to near the end (e.g., 250)
    if (info.offset.x > 250) {
      // Threshold reached - navigate
      onNavigate?.("login");
    } else {
      // Reset position
      setSliderPosition(0);
    }
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden flex flex-col items-center justify-start pt-32">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      {/* Logo and brand text */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <img
          src={endureLogo}
          alt="Endure"
          className="w-48 h-auto mb-2"
        />
        <h1 className="text-white text-4xl tracking-[0.3em] font-[Alatsi] m-[0px] p-[0px] mx-[0px] my-[-20px] text-[38px]">
          ENDURE        </h1>
      </motion.div>

      {/* Slide to start button - positioned at bottom */}
      {showButton && onNavigate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-80 max-w-[85vw]"
        >
          <div className="relative h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full overflow-hidden">
            {/* Background text */}
            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm pointer-events-none">
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </div>

            {/* Slider button with gloss effect */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 264 }}
              dragElastic={0}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              onDrag={(_, info) =>
                setSliderPosition(info.offset.x)
              }
              className="absolute left-1 top-1 bottom-1 w-12 bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                       rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing
                       shadow-lg shadow-[#92B8FF]/30 overflow-hidden"
              style={{ x: sliderPosition }}
            >
              {/* Gloss/shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full" />
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />

              <ChevronRight className="w-5 h-5 text-white relative z-10" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}