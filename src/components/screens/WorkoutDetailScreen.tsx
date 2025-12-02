import { useState } from 'react';
import { ArrowLeft, Edit, Flame, Clock, Zap, Plus, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkoutDetailScreenProps {
  onNavigate: (screen: string) => void;
  workoutId?: string;
}

export function WorkoutDetailScreen({ onNavigate, workoutId }: WorkoutDetailScreenProps) {
  const [showAddRestPopup, setShowAddRestPopup] = useState(false);
  const [restDuration, setRestDuration] = useState(60);

  // Mock workout data - in real app this would be fetched based on workoutId
  const workoutDetails = {
    name: workoutId === 'user-1' ? 'My Morning Routine' : 'Back Workout',
    calories: 450,
    totalTime: '45 min',
    difficulty: 'Intermediate',
    exercises: [
      {
        name: 'Pull-ups',
        reps: 10,
        sets: 4,
        weight: 0,
        estimatedTime: '8 min',
      },
      {
        name: 'Barbell Rows',
        reps: 12,
        sets: 4,
        weight: 135,
        estimatedTime: '10 min',
      },
      {
        name: 'Lat Pulldowns',
        reps: 12,
        sets: 3,
        weight: 120,
        estimatedTime: '8 min',
      },
      {
        name: 'Seated Cable Rows',
        reps: 12,
        sets: 3,
        weight: 110,
        estimatedTime: '8 min',
      },
      {
        name: 'Deadlifts',
        reps: 8,
        sets: 4,
        weight: 225,
        estimatedTime: '10 min',
      },
      {
        name: 'Face Pulls',
        reps: 15,
        sets: 3,
        weight: 40,
        estimatedTime: '6 min',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden pb-32">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onNavigate('workouts')}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                       flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddRestPopup(true)}
                className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 
                         text-white hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Rest</span>
              </button>
              <button
                onClick={() => onNavigate('edit-workout', workoutId)}
                className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 
                         text-white hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
            </div>
          </div>

          <h1 className="text-white text-3xl mb-6">{workoutDetails.name}</h1>

          {/* Workout Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-[#92B8FF]" />
                <span className="text-white/60 text-xs">Calories</span>
              </div>
              <p className="text-white text-xl">{workoutDetails.calories}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-[#AECEFF]" />
                <span className="text-white/60 text-xs">Time</span>
              </div>
              <p className="text-white text-xl">{workoutDetails.totalTime}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-[#9470DC]" />
                <span className="text-white/60 text-xs">Level</span>
              </div>
              <p className="text-white text-xl">{workoutDetails.difficulty}</p>
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="px-6 space-y-3 pb-8">
          <h2 className="text-white text-xl mb-3">Exercises</h2>

          {workoutDetails.exercises.map((exercise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                       hover:border-[#92B8FF]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#92B8FF] to-[#AECEFF] 
                                  flex items-center justify-center">
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                    <h3 className="text-white">{exercise.name}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/60 mb-0.5">Sets</p>
                      <p className="text-[#92B8FF]">{exercise.sets}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-0.5">Reps</p>
                      <p className="text-[#AECEFF]">{exercise.reps}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-0.5">Weight</p>
                      <p className="text-[#9470DC]">{exercise.weight ? `${exercise.weight} lbs` : 'Body'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50 pt-3 border-t border-white/10">
                <Clock className="w-3 h-3" />
                <span>{exercise.estimatedTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Start Workout Button */}
      <div className="fixed bottom-6 left-6 right-6 z-30">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('selected-workout', workoutId)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                   text-white shadow-lg shadow-[#92B8FF]/20 hover:shadow-xl 
                   transition-all flex items-center justify-center gap-2 backdrop-blur-xl 
                   border border-white/20"
        >
          <Play className="w-5 h-5" />
          <span>Start Workout</span>
        </motion.button>
      </div>

      {/* Add Rest Popup Modal */}
      <AnimatePresence>
        {showAddRestPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddRestPopup(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50"
            >
              <div className="bg-gradient-to-br from-[#1a1d2e] to-[#0f1220] rounded-t-3xl border-t border-white/20 
                            backdrop-blur-xl shadow-2xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white text-xl">Add Rest Period</h2>
                  <button
                    onClick={() => setShowAddRestPopup(false)}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                             flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Rest Duration Controls */}
                <div className="mb-6">
                  <label className="text-white/60 text-sm mb-3 block">Rest Duration (seconds)</label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setRestDuration(Math.max(15, restDuration - 15))}
                      className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 
                               text-white text-2xl transition-all"
                    >
                      -
                    </button>
                    <div className="px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                      <span className="text-white text-4xl">{restDuration}</span>
                    </div>
                    <button
                      onClick={() => setRestDuration(restDuration + 15)}
                      className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 
                               text-white text-2xl transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    alert(`Added ${restDuration} second rest period`);
                    setShowAddRestPopup(false);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                           text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-xl transition-all"
                >
                  Add Rest Period
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}