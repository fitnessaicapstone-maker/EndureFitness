import { useState } from 'react';
import { ArrowLeft, Plus, X, GripVertical, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { NewWorkoutData, WorkoutData, WorkoutExerciseData } from '../../lib/appDataStorage';

interface EditWorkoutScreenProps {
  onNavigate: (screen: string) => void;
  workoutId?: string;
  workouts: WorkoutData[];
  onSaveWorkout: (workout: NewWorkoutData) => void;
  onDeleteWorkout: (workoutId: string) => void;
}

export function EditWorkoutScreen({
  onNavigate,
  workoutId,
  workouts,
  onSaveWorkout,
  onDeleteWorkout,
}: EditWorkoutScreenProps) {
  const savedWorkout = workouts.find((workout) => workout.id === workoutId);
  const fallbackExercises: WorkoutExerciseData[] = [
    { id: '1', name: 'Pull-ups', sets: 4, reps: 10, weight: 0 },
    { id: '2', name: 'Barbell Rows', sets: 4, reps: 12, weight: 135 },
    { id: '3', name: 'Lat Pulldowns', sets: 3, reps: 12, weight: 120 },
    { id: '4', name: 'Seated Cable Rows', sets: 3, reps: 12, weight: 110 },
  ];
  const [workoutName, setWorkoutName] = useState(savedWorkout?.name ?? 'My Morning Routine');
  const [workoutNameError, setWorkoutNameError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [exercises, setExercises] = useState<WorkoutExerciseData[]>(
    savedWorkout?.exercises ?? fallbackExercises
  );

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const updateExerciseNumber = (
    index: number,
    field: 'sets' | 'reps' | 'weight',
    value: string
  ) => {
    const updated = [...exercises];

    updated[index] = {
      ...updated[index],
      [field]: value === '' ? 0 : Number(value),
    };
    setExercises(updated);
  };

  const handleSave = () => {
    const trimmedName = workoutName.trim();

    if (!trimmedName) {
      setWorkoutNameError('Workout name is required.');
      return;
    }

    onSaveWorkout({
      id: savedWorkout?.id ?? workoutId ?? `user-${Date.now()}`,
      name: trimmedName,
      type: savedWorkout?.type ?? 'user',
      exercises,
      duration: `${Math.max(exercises.length * 8, 8)} min`,
      calories: savedWorkout?.calories,
      difficulty: savedWorkout?.difficulty ?? 'Custom',
      lastEdited: 'Today',
      restPeriods: savedWorkout?.restPeriods,
      createdAt: savedWorkout?.createdAt,
    });
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
            onChange={(e) => {
              setWorkoutName(e.target.value);
              setWorkoutNameError('');
            }}
            className="w-full px-4 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                     text-white placeholder-white/40 focus:outline-none focus:border-[#92B8FF]/50 transition-all"
          />
          {workoutNameError && (
            <p className="text-red-300 text-sm mt-2">{workoutNameError}</p>
          )}
        </div>

        {/* Exercises List */}
        <div className="px-6 space-y-3 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-lg">Exercises</h2>
            <button
              onClick={() => onNavigate('create-workout', workoutId)}
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
                        min="0"
                        value={exercise.sets}
                        onChange={(e) => updateExerciseNumber(index, 'sets', e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 
                                 text-white text-sm focus:outline-none focus:border-[#92B8FF]/50"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs block mb-1">Reps</label>
                      <input
                        type="number"
                        min="0"
                        value={exercise.reps}
                        onChange={(e) => updateExerciseNumber(index, 'reps', e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 
                                 text-white text-sm focus:outline-none focus:border-[#92B8FF]/50"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs block mb-1">Weight</label>
                      <input
                        type="number"
                        min="0"
                        value={exercise.weight}
                        onChange={(e) => updateExerciseNumber(index, 'weight', e.target.value)}
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
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-3 rounded-2xl bg-red-500/10 border border-red-500/30 
                     text-red-400 hover:bg-red-500/20 transition-all"
          >
            Delete Workout
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end">
          <div className="w-full rounded-t-3xl bg-gradient-to-br from-[#1a1d2e] to-[#0f1220] border-t border-white/20 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl">Delete Workout?</h2>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-white/70 text-sm mb-6">
              This will permanently remove "{workoutName || 'this workout'}" from My Workouts.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  if (workoutId) {
                    onDeleteWorkout(workoutId);
                  }
                  setShowDeleteConfirm(false);
                  onNavigate('workouts');
                }}
                className="w-full py-4 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Delete Workout
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                Keep Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
