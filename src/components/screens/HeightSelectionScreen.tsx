import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { ProgressDots } from "../ProgressDots";

interface HeightSelectionScreenProps {
  onNavigate: (screen: string) => void;
}

export function HeightSelectionScreen({
  onNavigate,
}: HeightSelectionScreenProps) {
  const [unit, setUnit] = useState<"CM" | "FT/IN">("CM");
  const [selectedHeight, setSelectedHeight] = useState(175);
  const scrollRef = useRef<HTMLDivElement>(null);

  const minHeight = unit === "CM" ? 120 : 48; // 48 inches = 4'0"
  const maxHeight = unit === "CM" ? 230 : 96; // 96 inches = 8'0"
  const heights = Array.from(
    { length: maxHeight - minHeight + 1 },
    (_, i) => i + minHeight,
  );

  useEffect(() => {
    // Reset to default when unit changes
    setSelectedHeight(unit === "CM" ? 175 : 69); // 69 inches = 5'9"
  }, [unit]);

  useEffect(() => {
    // Center the selected height
    if (scrollRef.current) {
      const tickHeight = 12; // Increased from 8px to 12px for bigger scale
      const containerHeight = scrollRef.current.clientHeight;
      const centerOffset = containerHeight / 2;
      const targetScroll =
        (selectedHeight - minHeight) * tickHeight -
        centerOffset;
      scrollRef.current.scrollTop = targetScroll;
    }
  }, [selectedHeight, unit, minHeight]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const tickHeight = 12; // Increased from 8px to 12px
      const containerHeight = scrollRef.current.clientHeight;
      const centerOffset = containerHeight / 2;
      const index = Math.round(
        (scrollTop + centerOffset) / tickHeight,
      );
      const newHeight = minHeight + index;
      if (
        newHeight >= minHeight &&
        newHeight <= maxHeight &&
        newHeight !== selectedHeight
      ) {
        setSelectedHeight(newHeight);
      }
    }
  };

  const formatHeight = (value: number) => {
    if (unit === "CM") {
      return `${value}`;
    } else {
      const feet = Math.floor(value / 12);
      const inches = value % 12;
      return `${feet}'${inches}"`;
    }
  };

  return (
    <div className="h-screen flex flex-col px-6 py-10 bg-[#1a1d2e] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header - boxier buttons */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate("weight")}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white rotate-180" />
          </button>
          <button
            onClick={() => onNavigate("loading-splash")}
            className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white/80 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-[#92B8FF] text-2xl mb-2">
            What's Your Height?
          </h1>
          <p className="text-white/50 text-sm">
            This will help us to personalize exercise program
            for you.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex gap-2 mb-8 max-w-xs mx-auto w-full">
          <button
            onClick={() => setUnit("CM")}
            className={`flex-1 py-2.5 rounded-xl transition-all duration-300 ${
              unit === "CM"
                ? "bg-[#92B8FF] text-white shadow-lg"
                : "bg-white/5 text-white/70 border border-white/10 backdrop-blur-xl"
            }`}
          >
            CM
          </button>
          <button
            onClick={() => setUnit("FT/IN")}
            className={`flex-1 py-2.5 rounded-xl transition-all duration-300 ${
              unit === "FT/IN"
                ? "bg-[#9470DC] text-white shadow-lg"
                : "bg-white/5 text-white/70 border border-white/10 backdrop-blur-xl"
            }`}
          >
            FT/IN
          </button>
        </div>

        {/* Height Display - slightly smaller text */}
        <div className="text-center mb-12">
          <span className="text-[#92B8FF] text-5xl font-bold">
            {formatHeight(selectedHeight)}
          </span>
          {unit === "CM" && (
            <span className="text-white text-xl ml-2">cm</span>
          )}
        </div>

        {/* Vertical Scrolling Scale - ruler style */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="relative w-full max-w-xs h-[320px]">
            {/* Center indicator line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-1 w-24 bg-[#92B8FF] z-10 rounded-full" />

            {/* Gradient overlays */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1a1d2e] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a1d2e] to-transparent z-20 pointer-events-none" />

            {/* Scrollable ruler */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-full overflow-y-scroll scrollbar-hide flex flex-col items-center"
            >
              <div className="h-[160px] flex-shrink-0" />{" "}
              {/* Top padding */}
              <div className="flex flex-col relative items-center">
                {heights.map((height) => {
                  const isMajor =
                    unit === "CM"
                      ? height % 10 === 0
                      : height % 12 === 0;
                  const isMedium =
                    unit === "CM"
                      ? height % 5 === 0 && !isMajor
                      : height % 6 === 0 && !isMajor;
                  const tickWidth = isMajor
                    ? 60
                    : isMedium
                      ? 36
                      : 18;

                  return (
                    <div
                      key={height}
                      className="relative flex-shrink-0 flex items-center justify-center"
                      style={{ height: "12px", width: "100%" }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Number label for major ticks - on the left */}
                        {isMajor && (
                          <span
                            className="text-white/70 w-14 text-right"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            {formatHeight(height)}
                          </span>
                        )}
                        {/* Tick mark */}
                        <div
                          className="bg-white/60 rounded-full"
                          style={{
                            height: isMajor ? "3px" : "1.5px",
                            width: `${tickWidth}px`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="h-[160px] flex-shrink-0" />{" "}
              {/* Bottom padding */}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="mb-4">
          <ProgressDots total={5} current={4} />
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNavigate("loading-splash")}
          className="w-full py-3.5 rounded-xl bg-[#92B8FF] hover:bg-[#AECEFF] 
                   text-white transition-all duration-300
                   shadow-lg shadow-[#92B8FF]/20 backdrop-blur-xl"
        >
          Next
        </button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}