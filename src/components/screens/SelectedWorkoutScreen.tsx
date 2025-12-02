import { useState } from 'react';
import { ArrowLeft, Play, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface SelectedWorkoutScreenProps {
  onNavigate: (screen: string) => void;
}

export function SelectedWorkoutScreen({ onNavigate }: SelectedWorkoutScreenProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<{ [key: number]: number[] }>({});
  
  const exercises = [
    { name: 'Bench Press', weight: 135, reps: 10, sets: 3 },
    { name: 'Squats', weight: 185, reps: 12, sets: 4 },
    { name: 'Deadlift', weight: 225, reps: 8, sets: 3 },
    { name: 'Pull-ups', weight: 0, reps: 15, sets: 3 },
    { name: 'Shoulder Press', weight: 95, reps: 10, sets: 3 },
  ];

  const currentExercise = exercises[currentExerciseIndex];
  const totalExercises = exercises.length;
  const progressPercentage = ((currentExerciseIndex + 1) / totalExercises) * 100;

  const toggleSetComplete = (exerciseIndex: number, setIndex: number) => {
    setCompletedSets(prev => {
      const exerciseSets = prev[exerciseIndex] || [];
      const isCompleted = exerciseSets.includes(setIndex);
      
      if (isCompleted) {
        return {
          ...prev,
          [exerciseIndex]: exerciseSets.filter(s => s !== setIndex)
        };
      } else {
        return {
          ...prev,
          [exerciseIndex]: [...exerciseSets, setIndex]
        };
      }
    });
  };

  const isSetCompleted = (exerciseIndex: number, setIndex: number) => {
    return (completedSets[exerciseIndex] || []).includes(setIndex);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Workout complete
      alert('Workout Complete!');
      onNavigate('workouts');
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden pb-24">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('workouts')}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                     flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <p className="text-white/60 text-sm">Exercise {currentExerciseIndex + 1} of {totalExercises}</p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="px-6 mb-6">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#92B8FF] to-[#AECEFF]"
            />
          </div>
        </div>

        {/* Current Exercise Card */}
        <div className="px-6 mb-6">
          <motion.div
            key={currentExerciseIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden"
          >
            {/* Gradient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#92B8FF]/30 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6">
              {/* Exercise Name */}
              <div className="text-center">
                <h2 className="text-white text-3xl mb-2">{currentExercise.name}</h2>
                <p className="text-white/60">Complete {currentExercise.sets} sets</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-white/60 text-xs mb-1">Weight</p>
                  <p className="text-[#92B8FF] text-2xl">{currentExercise.weight || 'Body'}</p>
                  <p className="text-white/40 text-xs mt-1">{currentExercise.weight ? 'lbs' : 'weight'}</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-white/60 text-xs mb-1">Reps</p>
                  <p className="text-[#AECEFF] text-2xl">{currentExercise.reps}</p>
                  <p className="text-white/40 text-xs mt-1">per set</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-white/60 text-xs mb-1">Sets</p>
                  <p className="text-[#9470DC] text-2xl">{currentExercise.sets}</p>
                  <p className="text-white/40 text-xs mt-1">total</p>
                </div>
              </div>

              {/* Set Checkboxes */}
              <div className="space-y-3">
                <p className="text-white text-sm">Mark completed sets:</p>
                {Array.from({ length: currentExercise.sets }).map((_, setIndex) => (
                  <button
                    key={setIndex}
                    onClick={() => toggleSetComplete(currentExerciseIndex, setIndex)}
                    className={`w-full p-4 rounded-xl border transition-all ${
                      isSetCompleted(currentExerciseIndex, setIndex)
                        ? 'bg-gradient-to-r from-[#92B8FF]/20 to-[#AECEFF]/20 border-[#92B8FF]/50'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">Set {setIndex + 1}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSetCompleted(currentExerciseIndex, setIndex)
                          ? 'bg-gradient-to-br from-[#92B8FF] to-[#AECEFF] border-[#92B8FF]'
                          : 'border-white/30'
                      }`}>
                        {isSetCompleted(currentExerciseIndex, setIndex) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Exercise Navigation Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {exercises.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentExerciseIndex
                  ? 'w-8 bg-gradient-to-r from-[#92B8FF] to-[#AECEFF]'
                  : index < currentExerciseIndex
                  ? 'w-2 bg-white/40'
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="px-6 flex gap-3">
          <button
            onClick={handlePreviousExercise}
            disabled={currentExerciseIndex === 0}
            className="flex-1 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={handleNextExercise}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                     text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-xl transition-all 
                     flex items-center justify-center gap-2"
          >
            {currentExerciseIndex === totalExercises - 1 ? (
              <>
                <Check className="w-5 h-5" />
                <span>Finish</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <Play className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="px-6 mt-6 flex gap-3">
          <button
            className="flex-1 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white/70 text-sm hover:bg-white/10 transition-all"
          >
            Skip Exercise
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white/70 text-sm hover:bg-white/10 transition-all"
          >
            Rest Timer
          </button>
        </div>
      </div>
    </div>
  );
}
