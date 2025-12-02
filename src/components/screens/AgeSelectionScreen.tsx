import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { ProgressDots } from "../ProgressDots";

interface AgeSelectionScreenProps {
  onNavigate: (screen: string) => void;
}

export function AgeSelectionScreen({
  onNavigate,
}: AgeSelectionScreenProps) {
  const [selectedAge, setSelectedAge] = useState(25);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);
  const itemHeight = 70;

  useEffect(() => {
    // Initialize scroll position to center the default age
    if (scrollContainerRef.current) {
      isScrollingProgrammatically.current = true;
      const container = scrollContainerRef.current;
      const targetScrollTop = (selectedAge - 10) * itemHeight;
      container.scrollTop = targetScrollTop;

      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 100);
    }
  }, []);

  const handleScroll = () => {
    if (isScrollingProgrammatically.current) return;

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;

      // Calculate which age is at the center
      // Center of viewport in content = scrollTop + half container height (210px)
      // First item center is at 175 + 35 = 210px in content
      const centerOfViewport = scrollTop + 210;
      const firstItemCenter = 175 + itemHeight / 2;
      const index = Math.round(
        (centerOfViewport - firstItemCenter) / itemHeight,
      );
      const newAge = 10 + index;

      if (
        newAge >= 10 &&
        newAge <= 100 &&
        newAge !== selectedAge
      ) {
        setSelectedAge(newAge);
      }
    }
  };

  const ages = Array.from({ length: 91 }, (_, i) => i + 10);

  return (
    <div className="h-screen flex flex-col px-6 py-10 bg-[#1a1d2e] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9E4FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate("gender")}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white rotate-180" />
          </button>
          <button
            onClick={() => onNavigate("weight")}
            className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white/80 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-[#92B8FF] text-2xl mb-2">
            How old are you?
          </h1>
          <p className="text-white/50 text-sm">
            This helps us to create your personalized exercise.
          </p>
        </div>

        {/* Age Picker Container - Fixed center position */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="relative w-full max-w-xs">
            {/* Fixed height container with center point - extended to show more numbers */}
            <div
              className="relative"
              style={{ height: "420px" }}
            >
              {/* Top Fade - Fixed position */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1a1d2e] to-transparent z-20 pointer-events-none" />

              {/* Bottom Fade - Fixed position */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a1d2e] to-transparent z-20 pointer-events-none" />

              {/* Scrollable Container - Fixed position, content scrolls through */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="absolute inset-0 overflow-y-scroll overflow-x-hidden scrollbar-hide"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {/* Spacer top - positions first item at center */}
                <div style={{ height: "175px" }} />

                {/* Age Items */}
                {ages.map((age) => {
                  const isSelected = age === selectedAge;
                  const distance = Math.abs(age - selectedAge);

                  return (
                    <div
                      key={age}
                      className="flex items-center justify-center bg-transparent"
                      style={{
                        height: `${itemHeight}px`,
                      }}
                    >
                      <span
                        className="transition-all duration-200"
                        style={{
                          fontSize: isSelected
                            ? "4rem"
                            : "2.5rem",
                          color: isSelected
                            ? "#92B8FF"
                            : "white",
                          opacity: isSelected
                            ? 1
                            : distance === 1
                              ? 0.5
                              : distance === 2
                                ? 0.3
                                : 0.15,
                          fontWeight: isSelected
                            ? "700"
                            : "400",
                        }}
                      >
                        {age}
                      </span>
                    </div>
                  );
                })}

                {/* Spacer bottom - positions last item at center */}
                <div style={{ height: "175px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="mb-4">
          <ProgressDots total={5} current={2} />
        </div>

        {/* Continue Button */}
        <button
          onClick={() => onNavigate("weight")}
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