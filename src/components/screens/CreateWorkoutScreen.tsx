import { useState } from 'react';
import { ArrowLeft, Search, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CreateWorkoutScreenProps {
  onNavigate: (screen: string) => void;
}

export function CreateWorkoutScreen({ onNavigate }: CreateWorkoutScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddExercisePopup, setShowAddExercisePopup] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [showWorkoutSelection, setShowWorkoutSelection] = useState(false);
  const [showNewWorkoutForm, setShowNewWorkoutForm] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [reps, setReps] = useState(10);
  const [sets, setSets] = useState(3);
  const [weight, setWeight] = useState(60);

  // Exercise Library Categories
  const exerciseCategories = [
    {
      id: 'strength',
      name: 'Strength',
      exercises: 256,
      tagline: 'Make you stronger',
      image: 'https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2NDU2MjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#92B8FF',
    },
    {
      id: 'stamina',
      name: 'Stamina',
      exercises: 134,
      tagline: 'Make you faster',
      image: 'https://images.unsplash.com/photo-1758520705189-a6b56a7ae832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFtaW5hJTIwZW5kdXJhbmNlJTIwd29ya291dHxlbnwxfHx8fDE3NjQ1NjIxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#C9E4FF',
    },
    {
      id: 'cardio',
      name: 'Cardio & Care',
      exercises: 97,
      tagline: 'Make you healthy',
      image: 'https://images.unsplash.com/photo-1737736193172-f3b87a760ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW8lMjBydW5uaW5nJTIwZml0bmVzc3xlbnwxfHx8fDE3NjQ0Nzc0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#AECEFF',
    },
    {
      id: 'yoga',
      name: 'Yoga',
      exercises: 168,
      tagline: 'Build your strength',
      image: 'https://images.unsplash.com/photo-1629779749250-0d198f6e4609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHN0cmV0Y2hpbmd8ZW58MXx8fHwxNzY0NTYyMTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#9470DC',
    },
  ];

  const categories = ['All', 'Strength', 'Stamina', 'Cardio', 'Yoga'];

  const exercises = [
    { id: '1', name: 'Bench Press', category: 'Strength', equipment: 'Barbell', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NDU2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '2', name: 'Squats', category: 'Strength', equipment: 'Barbell', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NDU2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '3', name: 'Pull-ups', category: 'Strength', equipment: 'Bar', difficulty: 'Advanced', image: 'https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NDU2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '4', name: 'Plank', category: 'Cardio', equipment: 'Bodyweight', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NDU2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '5', name: 'Deadlift', category: 'Strength', equipment: 'Barbell', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NDU2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '6', name: 'Push-ups', category: 'Strength', equipment: 'Bodyweight', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NDU2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '7', name: 'Running', category: 'Stamina', equipment: 'None', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NDU2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: '8', name: 'Downward Dog', category: 'Yoga', equipment: 'Mat', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NDU2MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const existingWorkouts = [
    'Back Workout',
    'Chest Workout',
    'Legs Workout',
    'My Morning Routine',
    'Push Day',
    'Pull Day',
  ];

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#92B8FF';
      case 'Intermediate': return '#AECEFF';
      case 'Advanced': return '#9470DC';
      default: return '#92B8FF';
    }
  };

  const handleAddExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setShowAddExercisePopup(true);
  };

  const closePopup = () => {
    setShowAddExercisePopup(false);
    setShowWorkoutSelection(false);
    setShowNewWorkoutForm(false);
    setSelectedExercise(null);
  };

  const handleSaveToNewWorkout = () => {
    if (newWorkoutName.trim()) {
      // Save exercise to new workout
      alert(`Created "${newWorkoutName}" and added ${selectedExercise.name}`);
      closePopup();
      setNewWorkoutName('');
    }
  };

  const handleSaveToExisting = (workoutName: string) => {
    alert(`Added ${selectedExercise.name} to ${workoutName}`);
    closePopup();
  };

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
          <h1 className="text-white text-2xl">Exercise Library</h1>
        </div>

        {/* Search Bar */}
        <div className="px-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5 text-white/40 hover:text-white/60" />
              </button>
            )}
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                       text-white placeholder-white/40 focus:outline-none focus:border-[#92B8FF]/50 transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-6 mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white shadow-lg shadow-[#92B8FF]/30'
                    : 'bg-white/5 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Category Cards */}
        {selectedCategory === 'All' && !searchQuery && (
          <div className="px-6 mb-6 space-y-4">
            {/* Main Card */}
            <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden h-44">
              <div className="absolute inset-0 opacity-30">
                <ImageWithFallback src={exerciseCategories[0].image} alt={exerciseCategories[0].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#92B8FF]/40 to-transparent" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-[#92B8FF] text-2xl mb-1">{exerciseCategories[0].name}</h3>
                  <p className="text-white/80 text-sm">{exerciseCategories[0].exercises} Exercises</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl self-start">
                  <span className="text-white text-sm">{exerciseCategories[0].tagline}</span>
                </div>
              </div>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-2 gap-4">
              {exerciseCategories.slice(1).map((category) => (
                <div key={category.id} className="relative p-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden h-44">
                  <div className="absolute inset-0 opacity-30">
                    <ImageWithFallback src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent" style={{ background: `linear-gradient(to bottom right, ${category.color}40, transparent)` }} />
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-white text-lg mb-1">{category.name}</h3>
                      <p className="text-white/70 text-xs">{category.exercises} Exercises</p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl self-start">
                      <span className="text-white text-xs">{category.tagline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercise List */}
        <div className="px-6 space-y-3">
          <AnimatePresence>
            {filteredExercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                         hover:border-[#92B8FF]/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Exercise Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Exercise Info */}
                  <div className="flex-1" onClick={() => onNavigate('exercise-detail')}>
                    <h3 className="text-white mb-1">{exercise.name}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span 
                        className="px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: `${getDifficultyColor(exercise.difficulty)}40` }}
                      >
                        {exercise.difficulty}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/60">{exercise.equipment}</span>
                    </div>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddExercise(exercise);
                    }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#92B8FF] to-[#AECEFF] 
                             flex items-center justify-center shadow-lg shadow-[#92B8FF]/30 hover:shadow-xl transition-all"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/40">No exercises found</p>
            </div>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showAddExercisePopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh]"
            >
              <div className="bg-gradient-to-br from-[#1a1d2e] to-[#0f1220] rounded-t-3xl border-t border-white/20 
                            backdrop-blur-xl shadow-2xl p-6 overflow-y-auto max-h-[80vh]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white text-xl">Add {selectedExercise?.name}</h2>
                  <button
                    onClick={closePopup}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                             flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {!showWorkoutSelection && !showNewWorkoutForm ? (
                  <>
                    {/* Performance Inputs */}
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-3 gap-4">
                        {/* Sets */}
                        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                          <label className="text-white/60 text-xs mb-2 block">Sets</label>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setSets(Math.max(1, sets - 1))}
                              className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                            >
                              -
                            </button>
                            <div className="py-2 text-center text-white text-xl">{sets}</div>
                            <button
                              onClick={() => setSets(sets + 1)}
                              className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Reps */}
                        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                          <label className="text-white/60 text-xs mb-2 block">Reps</label>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setReps(Math.max(1, reps - 1))}
                              className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                            >
                              -
                            </button>
                            <div className="py-2 text-center text-white text-xl">{reps}</div>
                            <button
                              onClick={() => setReps(reps + 1)}
                              className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Weight */}
                        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                          <label className="text-white/60 text-xs mb-2 block">Weight (kg)</label>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setWeight(Math.max(0, weight - 5))}
                              className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                            >
                              -
                            </button>
                            <div className="py-2 text-center text-white text-xl">{weight}</div>
                            <button
                              onClick={() => setWeight(weight + 5)}
                              className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowWorkoutSelection(true)}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                                 text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-xl transition-all"
                      >
                        Add to Existing Workout
                      </button>
                      <button
                        onClick={() => setShowNewWorkoutForm(true)}
                        className="w-full py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                                 text-white hover:bg-white/10 transition-all"
                      >
                        Create New Workout
                      </button>
                    </div>
                  </>
                ) : showWorkoutSelection ? (
                  <>
                    <h3 className="text-white mb-4">Select Workout</h3>
                    <div className="space-y-3 mb-6">
                      {existingWorkouts.map((workout) => (
                        <button
                          key={workout}
                          onClick={() => handleSaveToExisting(workout)}
                          className="w-full p-4 text-left rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 
                                   text-white hover:border-[#92B8FF]/30 transition-all"
                        >
                          {workout}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowWorkoutSelection(false)}
                      className="w-full py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                               text-white hover:bg-white/10 transition-all"
                    >
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-white mb-4">New Workout Name</h3>
                    <div className="mb-6">
                      <input
                        type="text"
                        placeholder="Enter workout name"
                        value={newWorkoutName}
                        onChange={(e) => setNewWorkoutName(e.target.value)}
                        className="w-full px-4 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                                 text-white placeholder-white/40 focus:outline-none focus:border-[#92B8FF]/50 transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={handleSaveToNewWorkout}
                        disabled={!newWorkoutName.trim()}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                                 text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-xl transition-all
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Create & Add Exercise
                      </button>
                      <button
                        onClick={() => setShowNewWorkoutForm(false)}
                        className="w-full py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                                 text-white hover:bg-white/10 transition-all"
                      >
                        Back
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
