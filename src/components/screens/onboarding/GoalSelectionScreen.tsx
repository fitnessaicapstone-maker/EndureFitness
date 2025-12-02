import { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { ProgressDots } from '../../ProgressDots';

interface GoalSelectionScreenProps {
  onNavigate: (screen: string) => void;
}

// Fitness goals with corresponding gradient color pairs for visual consistency
const goals = [
  { text: 'Cardio', gradient: ['#92B8FF', '#AECEFF'] },
  { text: 'Loose Weight', gradient: ['#AECEFF', '#C9E4FF'] },
  { text: 'Strength', gradient: ['#C9E4FF', '#B29AE8'] },
  { text: 'Reduce Stress', gradient: ['#B29AE8', '#A586E4'] },
  { text: 'Flexibility', gradient: ['#A586E4', '#9470DC'] },
  { text: 'Sports Activities', gradient: ['#9470DC', '#92B8FF'] },
  { text: 'Stay Fit', gradient: ['#92B8FF', '#AECEFF'] },
  { text: 'Nutrition Gain', gradient: ['#AECEFF', '#C9E4FF'] }
];

export function GoalSelectionScreen({ onNavigate }: GoalSelectionScreenProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <div className="h-screen flex flex-col px-6 py-10 bg-[#1a1d2e] relative overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#9470DC]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#C9E4FF]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('login')}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white rotate-180" />
          </button>
          <button
            onClick={() => onNavigate('gender')}
            className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white/80 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Screen title and description */}
        <div className="mb-6">
          <h1 className="text-[#92B8FF] text-2xl mb-2">
            What's your goal?
          </h1>
          <p className="text-white/40 text-sm">
            This helps us to create your personalized exercise plan.
          </p>
        </div>

        {/* Multi-select goal list */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-[0px] -mt-12">
          {goals.map((goal) => {
            const isSelected = selectedGoals.includes(goal.text);
            
            return (
              <button
                key={goal.text}
                onClick={() => toggleGoal(goal.text)}
                className="w-full max-w-md relative transition-all duration-300 group"
                style={{
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div className="flex items-center gap-4 relative">
                  {/* Selection indicator with gradient styling */}
                  <div className="relative flex-shrink-0">
                    {isSelected ? (
                      <>
                        {/* Glow effect for selected state */}
                        <div 
                          className="absolute inset-0 rounded-full blur-md opacity-60"
                          style={{
                            background: `linear-gradient(135deg, ${goal.gradient[0]}, ${goal.gradient[1]})`
                          }}
                        />
                        {/* Gradient ring with checkmark */}
                        <div 
                          className="relative w-7 h-7 rounded-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${goal.gradient[0]}, ${goal.gradient[1]})`,
                            padding: '2px'
                          }}
                        >
                          <div className="w-full h-full rounded-full bg-[#1a1d2e] flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" style={{ color: goal.gradient[0] }} strokeWidth={3} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-7 h-7 rounded-full border-2 border-white/10" />
                    )}
                  </div>

                  {/* Goal text with conditional gradient styling */}
                  <div className="flex-1 text-left relative">
                    {isSelected ? (
                      <>
                        {/* Text glow effect */}
                        <div 
                          className="absolute inset-0 blur-lg opacity-40"
                          style={{
                            background: `linear-gradient(90deg, ${goal.gradient[0]}, ${goal.gradient[1]})`,
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                          }}
                        >
                          <span className="text-3xl opacity-0" style={{ fontWeight: '700' }}>
                            {goal.text}
                          </span>
                        </div>
                        {/* Gradient text */}
                        <span 
                          className="text-3xl bg-gradient-to-r bg-clip-text text-transparent relative"
                          style={{
                            backgroundImage: `linear-gradient(90deg, ${goal.gradient[0]}, ${goal.gradient[1]})`,
                            fontWeight: '700'
                          }}
                        >
                          {goal.text}
                        </span>
                      </>
                    ) : (
                      <span 
                        className="text-3xl text-white/15 transition-all duration-300"
                        style={{ fontWeight: '600' }}
                      >
                        {goal.text}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="mb-4">
          <ProgressDots total={5} current={0} />
        </div>

        {/* Continue button - disabled until at least one goal selected */}
        <button
          onClick={() => onNavigate('gender')}
          disabled={selectedGoals.length === 0}
          className={`w-full py-3.5 rounded-xl transition-all duration-300
                   shadow-lg backdrop-blur-xl
                   ${selectedGoals.length > 0
                     ? 'bg-[#92B8FF] hover:bg-[#AECEFF] text-white shadow-[#92B8FF]/20' 
                     : 'bg-white/5 text-white/40 cursor-not-allowed border border-white/10'
                   }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
