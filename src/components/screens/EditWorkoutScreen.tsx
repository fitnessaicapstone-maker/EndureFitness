import { useState } from 'react';
import { ArrowLeft, Plus, X, GripVertical, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface EditWorkoutScreenProps {
  onNavigate: (screen: string) => void;
  workoutId?: string;
}

export function EditWorkoutScreen({ onNavigate, workoutId }: EditWorkoutScreenProps) {
  const [workoutName, setWorkoutName] = useState('My Morning Routine');
  const [exercises, setExercises] = useState([
    { id: '1', name: 'Pull-ups', sets: 4, reps: 10, weight: 0 },
    { id: '2', name: 'Barbell Rows', sets: 4, reps: 12, weight: 135 },
    { id: '3', name: 'Lat Pulldowns', sets: 3, reps: 12, weight: 120 },
    { id: '4', name: 'Seated Cable Rows', sets: 3, reps: 12, weight: 110 },
  ]);

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleSave = () => {
    alert('Workout saved!');
    onNavigate('workouts');
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
          <h1 className="text-white text-xl">Edit Workout</h1>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] 
                     text-white text-sm hover:shadow-lg hover:shadow-[#92B8FF]/30 transition-all"
          >
            Save
          </button>
        </div>

        {/* Workout Name */}
        <div className="px-6 mb-6">
          <label className="text-white/60 text-sm mb-2 block">Workout Name</label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white placeholder-white/40 focus:outline-none focus:border-[#92B8FF]/50 transition-all"
          />
        </div>

        {/* Exercises List */}
        <div className="px-6 space-y-3 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-lg">Exercises</h2>
            <button
              onClick={() => onNavigate('create-workout')}
              className="px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 
                       text-white text-sm hover:bg-white/10 transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                       hover:border-[#92B8FF]/30 transition-all"
            >
              <div className="flex items-center gap-3">
                {/* Drag Handle */}
                <button className="text-white/40 hover:text-white/60 transition-colors">
                  <GripVertical className="w-5 h-5" />
                </button>

                {/* Exercise Info */}
                <div className="flex-1">
                  <h3 className="text-white mb-2">{exercise.name}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-white/40 text-xs block mb-1">Sets</label>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => {
                          const updated = [...exercises];
                          updated[index].sets = parseInt(e.target.value);
                          setExercises(updated);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 
                                 text-white text-sm focus:outline-none focus:border-[#92B8FF]/50"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs block mb-1">Reps</label>
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => {
                          const updated = [...exercises];
                          updated[index].reps = parseInt(e.target.value);
                          setExercises(updated);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 
                                 text-white text-sm focus:outline-none focus:border-[#92B8FF]/50"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs block mb-1">Weight</label>
                      <input
                        type="number"
                        value={exercise.weight}
                        onChange={(e) => {
                          const updated = [...exercises];
                          updated[index].weight = parseInt(e.target.value);
                          setExercises(updated);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 
                                 text-white text-sm focus:outline-none focus:border-[#92B8FF]/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleRemoveExercise(exercise.id)}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 
                           hover:border-red-500/30 flex items-center justify-center transition-all group"
                >
                  <Trash2 className="w-4 h-4 text-white/40 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delete Workout Button */}
        <div className="px-6">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this workout?')) {
                onNavigate('workouts');
              }
            }}
            className="w-full py-3 rounded-2xl bg-red-500/10 border border-red-500/30 
                     text-red-400 hover:bg-red-500/20 transition-all"
          >
            Delete Workout
          </button>
        </div>
      </div>
    </div>
  );
}
