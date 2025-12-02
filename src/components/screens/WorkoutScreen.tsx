import { useState } from 'react';
import { Search, History, ChevronDown, ChevronUp, Play, Edit, Plus, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkoutScreenProps {
  onNavigate: (screen: string, workoutId?: string) => void;
}

export function WorkoutScreen({ onNavigate }: WorkoutScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCollection, setExpandedCollection] = useState<string | null>(null);

  // Premade Workout Collections
  const premadeCollections = [
    {
      id: 'beginner',
      name: 'Beginner Programs',
      workouts: [
        { id: 'beginner-upper', name: 'Upper Body Basics', exercises: 5, duration: '30 min' },
        { id: 'beginner-lower', name: 'Lower Body Basics', exercises: 5, duration: '30 min' },
        { id: 'beginner-core', name: 'Core Foundation', exercises: 4, duration: '20 min' },
      ],
    },
    {
      id: 'intermediate',
      name: 'Intermediate Programs',
      workouts: [
        { id: 'back-workout', name: 'Back Workout', exercises: 6, duration: '45 min' },
        { id: 'chest-workout', name: 'Chest Workout', exercises: 5, duration: '40 min' },
        { id: 'legs-workout', name: 'Legs Workout', exercises: 7, duration: '50 min' },
        { id: 'arms-workout', name: 'Arms Workout', exercises: 5, duration: '35 min' },
      ],
    },
    {
      id: 'advanced',
      name: 'Advanced Programs',
      workouts: [
        { id: 'full-body', name: 'Full Body Blitz', exercises: 8, duration: '60 min' },
        { id: 'power-lifting', name: 'Power Lifting', exercises: 6, duration: '55 min' },
        { id: 'hiit-circuit', name: 'HIIT Circuit', exercises: 10, duration: '40 min' },
      ],
    },
  ];

  // User Created Workouts
  const userWorkouts = [
    { id: 'user-1', name: 'My Morning Routine', exercises: 6, duration: '35 min', lastEdited: 'Today' },
    { id: 'user-2', name: 'Push Day', exercises: 8, duration: '50 min', lastEdited: '2 days ago' },
    { id: 'user-3', name: 'Pull Day', exercises: 7, duration: '45 min', lastEdited: '3 days ago' },
  ];

  // Filter workouts based on search
  const filteredUserWorkouts = userWorkouts.filter(workout =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden pb-32">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      <div className="relative z-10 px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-white text-3xl">Workouts</h1>
          <button
            onClick={() => onNavigate('workout-history')}
            className="p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
          >
            <History className="w-5 h-5 text-[#92B8FF]" />
          </button>
        </div>

        {/* Create Workout & Warm Up Buttons */}
        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('create-workout')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                     text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-xl hover:shadow-[#92B8FF]/40 
                     transition-all flex items-center justify-center gap-2 backdrop-blur-xl border border-white/20"
          >
            <Plus className="w-5 h-5" />
            <span>Create Workout</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('warm-up')}
            className="w-full py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Flame className="w-5 h-5 text-[#AECEFF]" />
            <span>Warm Up</span>
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white placeholder-white/40 focus:outline-none focus:border-[#92B8FF]/50 transition-all"
          />
        </div>

        {/* Premade Workout Collections */}
        <div className="space-y-3">
          <h2 className="text-white text-xl">Premade Workouts</h2>
          
          {premadeCollections.map((collection) => (
            <div key={collection.id} className="space-y-2">
              {/* Collection Header */}
              <motion.button
                onClick={() => setExpandedCollection(
                  expandedCollection === collection.id ? null : collection.id
                )}
                className="w-full p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                         hover:bg-white/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#92B8FF] to-[#AECEFF] 
                                flex items-center justify-center">
                    <span className="text-white text-sm">{collection.workouts.length}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white">{collection.name}</h3>
                    <p className="text-white/50 text-xs">{collection.workouts.length} workouts</p>
                  </div>
                </div>
                {expandedCollection === collection.id ? (
                  <ChevronUp className="w-5 h-5 text-white/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/60" />
                )}
              </motion.button>

              {/* Expanded Workouts */}
              <AnimatePresence>
                {expandedCollection === collection.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {collection.workouts.map((workout) => (
                      <motion.div
                        key={workout.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="ml-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 
                                 hover:border-[#92B8FF]/30 transition-all cursor-pointer group"
                        onClick={() => onNavigate('workout-detail', workout.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{workout.name}</h4>
                            <div className="flex gap-3 text-xs text-white/50">
                              <span>{workout.exercises} exercises</span>
                              <span>•</span>
                              <span>{workout.duration}</span>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center 
                                        group-hover:bg-gradient-to-br group-hover:from-[#92B8FF] group-hover:to-[#AECEFF] 
                                        transition-all group-hover:shadow-lg group-hover:shadow-[#92B8FF]/30">
                            <span className="text-white/60 group-hover:text-white text-sm">→</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* User Created Workouts */}
        <div className="space-y-3 pb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-xl">My Workouts</h2>
          </div>

          {filteredUserWorkouts.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-white/40">No workouts found</p>
            </div>
          )}

          {filteredUserWorkouts.map((workout) => (
            <motion.div
              key={workout.id}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                       hover:border-[#9470DC]/30 transition-all cursor-pointer group"
              onClick={() => onNavigate('workout-detail', workout.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white mb-1">{workout.name}</h3>
                  <div className="flex gap-3 text-xs text-white/50">
                    <span>{workout.exercises} exercises</span>
                    <span>•</span>
                    <span>{workout.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('create-workout', workout.id);
                    }}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 
                             flex items-center justify-center transition-all"
                  >
                    <Edit className="w-4 h-4 text-[#AECEFF]" />
                  </button>
                </div>
              </div>
              <p className="text-white/40 text-xs">Last edited: {workout.lastEdited}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}