import { useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ExerciseSearchScreenProps {
  onNavigate: (screen: string) => void;
}

export function ExerciseSearchScreen({ onNavigate }: ExerciseSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(60);

  const categories = ['All', 'Upper Body', 'Lower Body', 'Core', 'Cardio', 'Stretches'];

  const exercises = [
    { 
      id: '1',
      name: 'Bench Press', 
      category: 'Upper Body', 
      equipment: 'Barbell',
      targetMuscles: 'Chest, Triceps, Shoulders',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2NDU2MjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    { 
      id: '2',
      name: 'Squats', 
      category: 'Lower Body', 
      equipment: 'Barbell',
      targetMuscles: 'Quads, Glutes, Hamstrings',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2NDU2MjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    { 
      id: '3',
      name: 'Pull-ups', 
      category: 'Upper Body', 
      equipment: 'Bar',
      targetMuscles: 'Back, Biceps',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2NDU2MjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    { 
      id: '4',
      name: 'Plank', 
      category: 'Core', 
      equipment: 'Bodyweight',
      targetMuscles: 'Core, Abs',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2NDU2MjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    { 
      id: '5',
      name: 'Deadlift', 
      category: 'Lower Body', 
      equipment: 'Barbell',
      targetMuscles: 'Back, Hamstrings, Glutes',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2NDU2MjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    { 
      id: '6',
      name: 'Push-ups', 
      category: 'Upper Body', 
      equipment: 'Bodyweight',
      targetMuscles: 'Chest, Triceps, Shoulders',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2NDU2MjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
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

  if (selectedExercise) {
    const exercise = exercises.find(ex => ex.id === selectedExercise);
    if (!exercise) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="px-6 py-6 flex items-center justify-between">
            <button
              onClick={() => setSelectedExercise(null)}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                       flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white">Exercise Details</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Exercise Image */}
          <div className="px-6 mb-6">
            <div className="relative rounded-3xl overflow-hidden aspect-video">
              <ImageWithFallback
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 
                              flex items-center justify-center">
                  <div className="text-white text-2xl ml-1">▶</div>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Info */}
          <div className="px-6 space-y-6">
            {/* Name & Details */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4">
              <div>
                <h2 className="text-white text-2xl mb-2">{exercise.name}</h2>
                <div className="flex items-center gap-2">
                  <span 
                    className="px-3 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: `${getDifficultyColor(exercise.difficulty)}40` }}
                  >
                    {exercise.difficulty}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/60 text-sm">{exercise.equipment}</span>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/60 text-sm mb-1">Target Muscles</p>
                <p className="text-white">{exercise.targetMuscles}</p>
              </div>
            </div>

            {/* Performance Inputs */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4">
              <h3 className="text-white">Performance</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Sets */}
                <div>
                  <label className="text-white/60 text-xs mb-2 block">Sets</label>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setSets(Math.max(1, sets - 1))}
                      className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 
                               text-white transition-all"
                    >
                      -
                    </button>
                    <div className="py-3 text-center text-white text-xl">{sets}</div>
                    <button
                      onClick={() => setSets(sets + 1)}
                      className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 
                               text-white transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Reps */}
                <div>
                  <label className="text-white/60 text-xs mb-2 block">Reps</label>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setReps(Math.max(1, reps - 1))}
                      className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 
                               text-white transition-all"
                    >
                      -
                    </button>
                    <div className="py-3 text-center text-white text-xl">{reps}</div>
                    <button
                      onClick={() => setReps(reps + 1)}
                      className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 
                               text-white transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="text-white/60 text-xs mb-2 block">Weight (kg)</label>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setWeight(Math.max(0, weight - 5))}
                      className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 
                               text-white transition-all"
                    >
                      -
                    </button>
                    <div className="py-3 text-center text-white text-xl">{weight}</div>
                    <button
                      onClick={() => setWeight(weight + 5)}
                      className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 
                               text-white transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-3">
              <h3 className="text-white">Instructions</h3>
              <ol className="space-y-2 text-white/70 text-sm">
                <li>1. Set up in the starting position with proper form</li>
                <li>2. Engage your core and maintain stability</li>
                <li>3. Execute the movement with controlled motion</li>
                <li>4. Return to starting position</li>
                <li>5. Repeat for desired number of repetitions</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-8">
              <button
                onClick={() => setSelectedExercise(null)}
                className="flex-1 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                         text-white hover:bg-white/10 transition-all"
              >
                Back
              </button>
              <button
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                         text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-xl transition-all"
              >
                Add to Workout
              </button>
            </div>
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

        {/* Exercise List */}
        <div className="px-6 space-y-3">
          <AnimatePresence>
            {filteredExercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedExercise(exercise.id)}
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                         hover:border-[#92B8FF]/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {/* Exercise Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Exercise Info */}
                  <div className="flex-1">
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
                    <p className="text-white/50 text-xs mt-1">{exercise.category}</p>
                  </div>

                  {/* Arrow */}
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center 
                                group-hover:bg-gradient-to-br group-hover:from-[#92B8FF] group-hover:to-[#AECEFF] 
                                transition-all">
                    <span className="text-white/60 group-hover:text-white">→</span>
                  </div>
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
    </div>
  );
}
