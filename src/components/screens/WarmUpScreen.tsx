import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Pause, Play as PlayIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface WarmUpScreenProps {
  onNavigate: (screen: string) => void;
}

export function WarmUpScreen({ onNavigate }: WarmUpScreenProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45); // seconds
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const warmUpExercises = [
    {
      name: 'Arm circles',
      duration: 45,
      instructions: 'Rotate arms in circles forward and backward',
    },
    {
      name: 'Leg swings',
      duration: 40,
      instructions: 'Swing each leg forward and back, then side to side',
    },
    {
      name: 'Torso twists',
      duration: 40,
      instructions: 'Rotate your torso from side to side with control',
    },
    {
      name: 'High knees',
      duration: 30,
      instructions: 'Run in place bringing knees up high',
    },
    {
      name: 'Hip circles',
      duration: 40,
      instructions: 'Make large circles with your hips',
    },
  ];

  const currentExercise = warmUpExercises[currentExerciseIndex];
  const totalDuration = warmUpExercises.reduce((sum, ex) => sum + ex.duration, 0);
  const timeElapsed = warmUpExercises.slice(0, currentExerciseIndex).reduce((sum, ex) => sum + ex.duration, 0) + 
                      (currentExercise.duration - timeLeft);

  // Timer logic
  useEffect(() => {
    if (isPaused || isComplete) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next exercise
          if (currentExerciseIndex < warmUpExercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            return warmUpExercises[currentExerciseIndex + 1].duration;
          } else {
            setIsComplete(true);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, currentExerciseIndex, isComplete, warmUpExercises]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setCurrentExerciseIndex(0);
    setTimeLeft(warmUpExercises[0].duration);
    setIsPaused(false);
    setIsComplete(false);
  };

  const handleNext = () => {
    if (currentExerciseIndex < warmUpExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimeLeft(warmUpExercises[currentExerciseIndex + 1].duration);
      setIsPaused(false);
    }
  };

  const handleBack = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setTimeLeft(warmUpExercises[currentExerciseIndex - 1].duration);
      setIsPaused(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden flex items-center justify-center px-6">
        {/* Ambient background effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl animate-pulse" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center space-y-6"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#92B8FF] to-[#9470DC] 
                     flex items-center justify-center shadow-2xl shadow-[#92B8FF]/50"
          >
            <div className="text-6xl">✓</div>
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-white text-3xl">You're Warmed Up!</h1>
            <p className="text-white/60">Great job completing your warm-up routine</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/60">Total Time</span>
              <span className="text-[#92B8FF]">{formatTime(totalDuration)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Exercises Completed</span>
              <span className="text-[#AECEFF]">{warmUpExercises.length}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                       text-white hover:bg-white/10 transition-all"
            >
              Repeat
            </button>
            <button
              onClick={() => onNavigate('workouts')}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                       text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-xl transition-all"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden flex flex-col">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative z-10 px-6 py-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate('workouts')}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                   flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white text-xl">Warm Up</h1>
        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                   flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <RotateCcw className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Main Content Area - Camera View */}
      <div className="flex-1 relative z-10 flex items-center justify-center px-6">
        {/* Large Timer Display */}
        <motion.div
          key={timeLeft}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-64 h-64 mx-auto rounded-full bg-white/5 backdrop-blur-xl border border-white/10 
                        flex items-center justify-center relative overflow-hidden mb-8">
            {/* Circular progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 115}`}
                strokeDashoffset={`${2 * Math.PI * 115 * (1 - timeLeft / currentExercise.duration)}`}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#92B8FF" />
                  <stop offset="100%" stopColor="#AECEFF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Timer */}
            <div className="text-white text-6xl z-10">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Current Exercise Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] 
                        shadow-lg shadow-[#92B8FF]/30 backdrop-blur-xl mb-4">
            <span className="text-white text-sm">0{currentExerciseIndex + 1}</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom UI Controls */}
      <div className="relative z-10 px-6 pb-8 space-y-4">
        {/* Exercise Name & Instructions */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center space-y-2">
          <h2 className="text-white text-2xl capitalize">{currentExercise.name}</h2>
          <p className="text-white/70 text-sm">{currentExercise.instructions}</p>
        </div>

        {/* Time Display */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            {/* Current Exercise Time */}
            <div className="text-center flex-1">
              <p className="text-white/60 text-xs mb-1">Current</p>
              <p className="text-white text-lg">{formatTime(timeLeft)}</p>
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-white/20" />

            {/* Next Exercise Time */}
            <div className="text-center flex-1">
              <p className="text-white/60 text-xs mb-1">Next</p>
              <p className="text-white/70 text-lg">
                {currentExerciseIndex < warmUpExercises.length - 1
                  ? formatTime(warmUpExercises[currentExerciseIndex + 1].duration)
                  : '--:--'}
              </p>
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-white/20" />

            {/* Total Remaining */}
            <div className="text-center flex-1">
              <p className="text-white/60 text-xs mb-1">Remaining</p>
              <p className="text-[#92B8FF] text-lg">{formatTime(totalDuration - timeElapsed)}</p>
            </div>
          </div>
        </div>

        {/* Pause/Play Button */}
        <div className="flex justify-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPaused(!isPaused)}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#92B8FF] to-[#9470DC] 
                     flex items-center justify-center hover:shadow-2xl transition-all
                     shadow-xl shadow-[#92B8FF]/50 border border-white/20"
          >
            {isPaused ? (
              <PlayIcon className="w-8 h-8 text-white ml-1" />
            ) : (
              <Pause className="w-8 h-8 text-white" />
            )}
          </motion.button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleBack}
            disabled={currentExerciseIndex === 0}
            className="flex-1 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2
                     disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentExerciseIndex === warmUpExercises.length - 1}
            className="flex-1 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2
                     disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {warmUpExercises.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentExerciseIndex
                  ? 'w-8 bg-gradient-to-r from-[#92B8FF] to-[#AECEFF]'
                  : index < currentExerciseIndex
                  ? 'w-1.5 bg-white/40'
                  : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
