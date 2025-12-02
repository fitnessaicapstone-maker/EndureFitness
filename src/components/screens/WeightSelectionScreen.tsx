import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { ProgressDots } from '../ProgressDots';

interface WeightSelectionScreenProps {
  onNavigate: (screen: string) => void;
}

export function WeightSelectionScreen({ onNavigate }: WeightSelectionScreenProps) {
  const [unit, setUnit] = useState<'KG' | 'LBS'>('KG');
  const [selectedWeight, setSelectedWeight] = useState(70);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  // Generate weight range based on unit
  const getWeightRange = () => {
    if (unit === 'KG') {
      return { min: 30, max: 200, default: 70 };
    } else {
      return { min: 66, max: 440, default: 154 };
    }
  };

  const range = getWeightRange();
  const itemWidth = 15; // Increased from 10px to 15px for bigger scale

  // When unit changes, reset to default weight
  useEffect(() => {
    setSelectedWeight(range.default);
    isInitialized.current = false;
  }, [unit]);

  // Initialize scroll position
  useEffect(() => {
    if (scrollContainerRef.current && !isInitialized.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const targetScrollLeft = (selectedWeight - range.min) * itemWidth;
      
      setTimeout(() => {
        container.scrollLeft = targetScrollLeft;
        isInitialized.current = true;
      }, 50);
    }
  }, [selectedWeight, range.min]);

  const handleScroll = () => {
    if (!isInitialized.current) return;
    
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      
      // Calculate which weight is at the center
      const centerPosition = scrollLeft + (containerWidth / 2);
      const index = Math.round(centerPosition / itemWidth);
      const newWeight = range.min + index;
      
      if (newWeight >= range.min && newWeight <= range.max && newWeight !== selectedWeight) {
        setSelectedWeight(newWeight);
      }
    }
  };

  // Generate array of all weights
  const weights = [];
  for (let i = range.min; i <= range.max; i++) {
    weights.push(i);
  }

  return (
    <div className="h-screen flex flex-col px-6 py-10 bg-[#1a1d2e] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B29AE8]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('age')}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white rotate-180" />
          </button>
          <button
            onClick={() => onNavigate('height')}
            className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white/80 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-[#9470DC] text-2xl mb-2">What's Your Weight?</h1>
          <p className="text-white/50 text-sm">
            This will help us to personalize exercise program for you.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex gap-2 mb-8 max-w-xs mx-auto w-full">
          <button
            onClick={() => setUnit('KG')}
            className={`flex-1 py-2.5 rounded-xl transition-all duration-300 ${
              unit === 'KG'
                ? 'bg-[#92B8FF] text-white shadow-lg'
                : 'bg-white/5 text-white/70 border border-white/10 backdrop-blur-xl'
            }`}
          >
            KG
          </button>
          <button
            onClick={() => setUnit('LBS')}
            className={`flex-1 py-2.5 rounded-xl transition-all duration-300 ${
              unit === 'LBS'
                ? 'bg-[#9470DC] text-white shadow-lg'
                : 'bg-white/5 text-white/70 border border-white/10 backdrop-blur-xl'
            }`}
          >
            LBS
          </button>
        </div>

        {/* Weight Display */}
        <div className="text-center mb-[10px] mt-[20px] mr-[0px] ml-[0px] mx-[0px] my-[20px]">
          <span className="text-[#92B8FF] text-5xl" style={{ fontWeight: '700' }}>
            {selectedWeight}
          </span>
          <span className="text-white text-xl ml-2">{unit.toLowerCase()}</span>
        </div>

        {/* Horizontal Ruler Scale */}
        <div className="flex-1 flex items-center justify-center mb-16">
          <div className="relative w-full h-32">
            {/* Center Indicator */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-[#92B8FF] rounded-full z-30 pointer-events-none"
            />
            
            {/* Left Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1a1d2e] via-[#1a1d2e]/90 to-transparent z-20 pointer-events-none" />
            
            {/* Right Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1a1d2e] via-[#1a1d2e]/90 to-transparent z-20 pointer-events-none" />
            
            {/* Scrollable Ruler Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="w-full h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'auto'
              }}
            >
              {/* Ruler content with proper width */}
              <div 
                className="h-full flex items-start pt-2"
                style={{ 
                  width: `${weights.length * itemWidth}px`,
                  paddingLeft: '50vw',
                  paddingRight: '50vw'
                }}
              >
                {/* Ruler Ticks */}
                {weights.map((weight) => {
                  const isMajor = weight % 10 === 0;
                  const isMedium = weight % 5 === 0;
                  
                  return (
                    <div
                      key={weight}
                      className="relative flex flex-col items-center"
                      style={{ 
                        width: `${itemWidth}px`,
                        flexShrink: 0
                      }}
                    >
                      {/* Tick Mark */}
                      <div
                        className="bg-white/60"
                        style={{
                          width: isMajor ? '3px' : '1.5px',
                          height: isMajor ? '60px' : isMedium ? '36px' : '18px'
                        }}
                      />
                      
                      {/* Label for major ticks */}
                      {isMajor && (
                        <span
                          className="absolute text-white/70 whitespace-nowrap"
                          style={{ 
                            top: '68px',
                            fontSize: '13px',
                            fontWeight: '500'
                          }}
                        >
                          {weight}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="mb-4">
          <ProgressDots total={5} current={3} />
        </div>

        {/* Continue Button */}
        <button
          onClick={() => onNavigate('height')}
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