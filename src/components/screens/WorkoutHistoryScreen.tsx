import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Flame, ChevronRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkoutHistoryScreenProps {
  onNavigate: (screen: string) => void;
}

export function WorkoutHistoryScreen({ onNavigate }: WorkoutHistoryScreenProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

  const workoutHistory = [
    {
      id: 1,
      date: 'Today, 9:30 AM',
      exercises: ['Bench Press', 'Squats', 'Pull-ups', 'Shoulder Press'],
      duration: '45 min',
      calories: 320,
      sets: [
        { name: 'Bench Press', sets: 3, reps: 10, weight: 135 },
        { name: 'Squats', sets: 4, reps: 12, weight: 185 },
        { name: 'Pull-ups', sets: 3, reps: 8, weight: 0 },
        { name: 'Shoulder Press', sets: 3, reps: 10, weight: 95 },
      ],
    },
    {
      id: 2,
      date: 'Yesterday, 8:00 AM',
      exercises: ['Deadlift', 'Rows', 'Dips', 'Hammer Curls'],
      duration: '50 min',
      calories: 380,
      sets: [
        { name: 'Deadlift', sets: 4, reps: 8, weight: 225 },
        { name: 'Rows', sets: 3, reps: 10, weight: 115 },
        { name: 'Dips', sets: 3, reps: 12, weight: 0 },
        { name: 'Hammer Curls', sets: 3, reps: 12, weight: 30 },
      ],
    },
    {
      id: 3,
      date: 'Dec 28, 7:30 AM',
      exercises: ['Running', 'Core Work'],
      duration: '30 min',
      calories: 250,
      sets: [
        { name: 'Running', sets: 1, reps: 1, weight: 0 },
        { name: 'Core Work', sets: 3, reps: 15, weight: 0 },
      ],
    },
    {
      id: 4,
      date: 'Dec 26, 9:00 AM',
      exercises: ['Chest Workout', 'Squats', 'Shoulder Press'],
      duration: '55 min',
      calories: 410,
      sets: [
        { name: 'Chest Workout', sets: 4, reps: 10, weight: 140 },
        { name: 'Squats', sets: 4, reps: 12, weight: 185 },
        { name: 'Shoulder Press', sets: 3, reps: 10, weight: 95 },
      ],
    },
    {
      id: 5,
      date: 'Dec 24, 8:30 AM',
      exercises: ['Leg Day - Full'],
      duration: '60 min',
      calories: 450,
      sets: [
        { name: 'Leg Day - Full', sets: 5, reps: 12, weight: 205 },
      ],
    },
  ];

  const totalWorkouts = workoutHistory.length;
  const totalDuration = workoutHistory.reduce((sum, w) => sum + parseInt(w.duration), 0);
  const totalCalories = workoutHistory.reduce((sum, w) => sum + w.calories, 0);

  if (selectedWorkout !== null) {
    const workout = workoutHistory[selectedWorkout];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden pb-24">
        {/* Ambient background effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="px-6 py-6 flex items-center gap-4">
            <button
              onClick={() => setSelectedWorkout(null)}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                       flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-2xl">Workout Details</h1>
          </div>

          <div className="px-6 space-y-6">
            {/* Workout Summary */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#92B8FF]/20 to-transparent rounded-full blur-2xl" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar className="w-4 h-4" />
                  <span>{workout.date}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Clock className="w-4 h-4" />
                      <span>Duration</span>
                    </div>
                    <p className="text-[#92B8FF] text-2xl">{workout.duration}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Flame className="w-4 h-4" />
                      <span>Calories</span>
                    </div>
                    <p className="text-[#AECEFF] text-2xl">{workout.calories}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercises */}
            <div className="space-y-3">
              <h3 className="text-white">Exercises Completed</h3>
              {workout.sets.map((exercise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                           hover:border-[#92B8FF]/30 transition-all"
                >
                  <h4 className="text-white mb-3">{exercise.name}</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/60 mb-1">Sets</p>
                      <p className="text-[#92B8FF]">{exercise.sets}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">Reps</p>
                      <p className="text-[#AECEFF]">{exercise.reps}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">Weight</p>
                      <p className="text-[#9470DC]">{exercise.weight ? `${exercise.weight} lbs` : 'Bodyweight'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Back Button */}
            <button
              onClick={() => setSelectedWorkout(null)}
              className="w-full py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                       text-white hover:bg-white/10 transition-all"
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden pb-24">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-6 flex items-center gap-4">
          <button
            onClick={() => onNavigate('workouts')}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                     flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-2xl">Workout History</h1>
        </div>

        <div className="px-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
              <p className="text-white/60 text-xs mb-1">Total</p>
              <p className="text-[#92B8FF] text-2xl">{totalWorkouts}</p>
              <p className="text-white/40 text-xs mt-1">Workouts</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
              <p className="text-white/60 text-xs mb-1">Time</p>
              <p className="text-[#AECEFF] text-2xl">{totalDuration}</p>
              <p className="text-white/40 text-xs mt-1">Minutes</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
              <p className="text-white/60 text-xs mb-1">Burned</p>
              <p className="text-[#9470DC] text-2xl">{totalCalories}</p>
              <p className="text-white/40 text-xs mt-1">Calories</p>
            </div>
          </div>

          {/* Workout List */}
          <div className="space-y-3">
            <AnimatePresence>
              {workoutHistory.map((workout, index) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedWorkout(index)}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                           hover:border-[#92B8FF]/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{workout.date}</span>
                      </div>
                      <div className="space-y-1">
                        {workout.exercises.slice(0, 3).map((exercise, idx) => (
                          <div key={idx} className="text-white text-sm">{exercise}</div>
                        ))}
                        {workout.exercises.length > 3 && (
                          <div className="text-white/40 text-xs">
                            +{workout.exercises.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center 
                                  group-hover:bg-gradient-to-br group-hover:from-[#92B8FF] group-hover:to-[#AECEFF] 
                                  transition-all ml-4">
                      <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Flame className="w-4 h-4" />
                      <span>{workout.calories} cal</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
