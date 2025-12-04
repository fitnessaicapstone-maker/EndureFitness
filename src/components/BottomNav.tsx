import { Home, Dumbbell, TrendingUp, User, Sparkles } from 'lucide-react';
import { Camera } from 'lucide-react'
import { motion } from 'motion/react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  // onOpenAI: () => void;
  onOpenMotionDetect: () => void;
}

export function BottomNav({ activeScreen, onNavigate, /*onOpenAI,*/ onOpenMotionDetect }: BottomNavProps) {
  // Main navigation items with icons
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'ai-chat', label: 'AI', icon: Sparkles, isCenter: true },
    { id: 'motion-detect', label: 'Detect', icon: Camera },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 z-40">
      {/* Frosted glass navigation bar */}
      <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-full px-[16px] py-[6px] shadow-lg shadow-black/20 max-w-md mx-auto">
        <div className="flex justify-around items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'ai-chat') return onNavigate('ai-chat');
                  if (item.id === 'motion-detect') return onOpenMotionDetect?.();
                  return onNavigate(item.id);
                }}
                className="flex-1 flex flex-col items-center gap-1 relative py-[3px] px-[0px]"
              >
                {/* Animated gradient background for active item */}
                {isActive && (
                  <motion.div
                    layoutId="navBubble"
                    className="absolute inset-0 bg-gradient-to-r from-[#92B8FF] to-[#9470DC] rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon 
                  className={`w-6 h-6 transition-colors ${ 
                    isActive ? 'text-white' : 'text-white/50'
                  }`} 
                />
                <span 
                  className={`text-[10px] transition-colors ${ 
                    isActive ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
