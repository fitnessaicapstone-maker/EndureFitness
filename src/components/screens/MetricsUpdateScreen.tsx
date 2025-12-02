import { Droplet, Activity, Weight, Ruler, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

interface MetricsUpdateScreenProps {
  onNavigate: (screen: string) => void;
}

export function MetricsUpdateScreen({ onNavigate }: MetricsUpdateScreenProps) {
  const overallScore = 85;
  const bodyFat = 11.8;
  const muscleMass = 49.2;
  const weight = 182.4;
  const bmi = 24.7;

  // Calculate circle progress (out of 100)
  const circleProgress = overallScore;
  const radius = 110; // Increased from 80
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circleProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden pb-8">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10 px-6 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-white text-2xl">Metrics Updated!</h1>
          <p className="text-white/60 text-sm">Your progress has been analyzed</p>
        </div>

        {/* Overall Score Card with Circular Progress */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
        >
          {/* Top right gradient glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#92B8FF]/30 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Circular Progress */}
            <div className="relative w-72 h-72 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="144"
                  cy="144"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="18"
                  fill="none"
                />
                {/* Progress circle with gradient */}
                <circle
                  cx="144"
                  cy="144"
                  r={radius}
                  stroke="url(#scoreGradient)"
                  strokeWidth="18"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#92B8FF" />
                    <stop offset="50%" stopColor="#AECEFF" />
                    <stop offset="100%" stopColor="#C9E4FF" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Score text in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-7xl text-white mb-2">{overallScore}</div>
                <div className="text-[#92B8FF]">Overall Score</div>
              </div>
            </div>

            {/* Status Message */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">+3 points from last week</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Body Composition Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          <h3 className="text-white text-lg mb-4">Body Composition</h3>

          {/* Body Fat */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9E4FF]/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#C9E4FF]/20 flex items-center justify-center">
                    <Droplet className="w-6 h-6 text-[#C9E4FF]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Body Fat</p>
                    <p className="text-white text-2xl">{bodyFat}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#92B8FF] text-sm">
                  <TrendingDown className="w-4 h-4" />
                  <span>-0.2%</span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bodyFat}%` }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#C9E4FF] to-[#AECEFF] rounded-full"
                />
              </div>
              <p className="text-white/40 text-xs mt-2">Ideal: 10-20%</p>
            </div>
          </div>

          {/* Muscle Mass */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B29AE8]/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#B29AE8]/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-[#B29AE8]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Muscle Mass</p>
                    <p className="text-white text-2xl">{muscleMass}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#9470DC] text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+1.2%</span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${muscleMass}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#B29AE8] to-[#A586E4] rounded-full"
                />
              </div>
              <p className="text-white/40 text-xs mt-2">Ideal: 35-45%</p>
            </div>
          </div>

          {/* Weight & BMI Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Weight */}
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#92B8FF]/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#92B8FF]/10 flex items-center justify-center mb-3">
                  <Weight className="w-5 h-5 text-[#92B8FF]" />
                </div>
                <p className="text-white/60 text-xs mb-1">Weight</p>
                <p className="text-white text-xl">{weight}</p>
                <p className="text-white/40 text-xs mt-1">lbs</p>
              </div>
            </div>

            {/* BMI */}
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#AECEFF]/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#AECEFF]/10 flex items-center justify-center mb-3">
                  <Ruler className="w-5 h-5 text-[#AECEFF]" />
                </div>
                <p className="text-white/60 text-xs mb-1">BMI</p>
                <p className="text-white text-xl">{bmi}</p>
                <p className="text-white/40 text-xs mt-1">Normal</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#9470DC]/20 to-[#B29AE8]/20 backdrop-blur-xl border border-[#9470DC]/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#9470DC]/20 rounded-full blur-2xl" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#9470DC] flex items-center justify-center">
                <span className="text-white text-lg">✨</span>
              </div>
              <h3 className="text-white">AI Analysis</h3>
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
              Outstanding progress this week! Your muscle mass increased by 1.2% while reducing body fat by 0.2%. 
              Your overall fitness score improved by 3 points. Keep up the excellent work with your current training routine!
            </p>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
        >
          <h3 className="text-white mb-4">This Week's Progress</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-xs mb-1">Workouts Completed</p>
              <p className="text-[#92B8FF] text-xl">14</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Active Days</p>
              <p className="text-[#AECEFF] text-xl">6/7</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Avg. Duration</p>
              <p className="text-[#9470DC] text-xl">58 min</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Calories Burned</p>
              <p className="text-[#B29AE8] text-xl">3,240</p>
            </div>
          </div>
        </motion.div>

        {/* Done Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          onClick={() => onNavigate('home')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white hover:from-[#AECEFF] hover:to-[#92B8FF] transition-all shadow-lg shadow-[#92B8FF]/20"
        >
          Done
        </motion.button>
      </div>
    </div>
  );
}