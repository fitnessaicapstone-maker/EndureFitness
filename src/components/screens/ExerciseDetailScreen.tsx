import { ArrowLeft, Plus, Play, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ExerciseDetailScreenProps {
  onNavigate: (screen: string) => void;
  exerciseName?: string;
}

export function ExerciseDetailScreen({ onNavigate, exerciseName }: ExerciseDetailScreenProps) {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showWorkoutSelection, setShowWorkoutSelection] = useState(false);
  const [showNewWorkoutForm, setShowNewWorkoutForm] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [reps, setReps] = useState('10');
  const [sets, setSets] = useState('3');
  const [weight, setWeight] = useState('0');

  const existingWorkouts = [
    'Back Workout',
    'Arms Workout',
    'Legs Workout',
    'My Custom Workout',
  ];

  const handleSaveToNewWorkout = () => {
    if (newWorkoutName.trim()) {
      // Mock save
      setShowAddPopup(false);
      setShowNewWorkoutForm(false);
      setNewWorkoutName('');
    }
  };

  const handleSaveToExisting = (workoutName: string) => {
    // Mock save
    setShowAddPopup(false);
    setShowWorkoutSelection(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1d2e] text-white relative overflow-hidden font-sans selection:bg-[#92B8FF] selection:text-[#1a1d2e]">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#92B8FF]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#9470DC]/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none mix-blend-screen" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 py-6 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('exercise-search')}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setShowAddPopup(true)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#92B8FF] hover:bg-white/20 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      
      {/* Video Section - Top Half */}
      <div className="h-[45vh] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1d2e]/20 to-[#1a1d2e] z-10" />
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1734630341082-0fec0e10126c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXhlcmNpc2UlMjBneW0lMjB3b3Jrb3V0JTIwZGFya3xlbnwxfHx8fDE3NjQ1ODYyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Exercise Video Thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button className="w-16 h-16 rounded-full bg-[#92B8FF]/20 backdrop-blur-md border border-[#92B8FF]/50 flex items-center justify-center group transition-transform hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-[#92B8FF] flex items-center justify-center shadow-[0_0_20px_rgba(146,184,255,0.5)]">
              <Play className="w-6 h-6 text-[#1a1d2e] fill-[#1a1d2e] ml-1" />
            </div>
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-[#1a1d2e] to-transparent">
          <h1 className="text-4xl font-bold text-white mb-1 drop-shadow-lg">{exerciseName || 'Bench Press'}</h1>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#92B8FF]/10 border border-[#92B8FF]/20 text-[#92B8FF] text-xs font-medium backdrop-blur-sm">
              Chest
            </span>
            <span className="px-3 py-1 rounded-full bg-[#9470DC]/10 border border-[#9470DC]/20 text-[#9470DC] text-xs font-medium backdrop-blur-sm">
              Strength
            </span>
          </div>
        </div>
      </div>
      
      {/* Description Section - Bottom Half */}
      <div className="relative z-10 px-6 pb-24 -mt-4">
        <div className="glass rounded-3xl p-6 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-[#92B8FF] font-bold text-xl">3</span>
              <span className="text-gray-400 text-xs uppercase tracking-wider mt-1">Sets</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-[#92B8FF] font-bold text-xl">8-12</span>
              <span className="text-gray-400 text-xs uppercase tracking-wider mt-1">Reps</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-[#92B8FF] font-bold text-xl">Medium</span>
              <span className="text-gray-400 text-xs uppercase tracking-wider mt-1">Load</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#9470DC] rounded-full"></span>
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm font-light">
              The bench press is a compound exercise that primarily targets the chest muscles (pectoralis major), 
              but also works the shoulders (anterior deltoids) and triceps. It's one of the most popular upper body 
              exercises for building strength and muscle mass.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#92B8FF] rounded-full"></span>
              How to Perform
            </h3>
            <ol className="space-y-4">
              {[
                "Lie flat on the bench with your feet firmly on the ground",
                "Grip the barbell slightly wider than shoulder-width",
                "Unrack the bar and position it over your chest",
                "Lower the bar to your mid-chest with control",
                "Press the bar back up to the starting position",
                "Repeat for desired number of repetitions"
              ].map((step, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded-full bg-[#92B8FF]/10 border border-[#92B8FF]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#92B8FF] transition-colors">
                    <span className="text-xs font-bold text-[#92B8FF] group-hover:text-[#1a1d2e]">{i + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm font-light">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#9470DC] rounded-full"></span>
              Pro Tips
            </h3>
            <ul className="space-y-3">
              {[
                "Keep your shoulder blades retracted throughout the movement",
                "Maintain a slight arch in your lower back",
                "Don't bounce the bar off your chest",
                "Use a spotter when lifting heavy weights"
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Check className="w-4 h-4 text-[#9470DC] mt-1 shrink-0" />
                  <p className="text-gray-300 text-sm font-light">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add Exercise Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-[#0f111a]/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowAddPopup(false)}
          />
          
          <div className="relative w-full max-w-md glass-strong rounded-t-[2.5rem] border-t border-white/10 overflow-hidden animate-in slide-in-from-bottom duration-300">
             {/* Glow effect inside modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full mt-3" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#92B8FF]/10 rounded-full blur-[60px] pointer-events-none" />
            
            <CardContent className="p-8 flex flex-col max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8 mt-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Add Exercise</h2>
                  <p className="text-[#92B8FF] text-sm">{exerciseName || 'Bench Press'}</p>
                </div>
                <button 
                  onClick={() => {
                    setShowAddPopup(false);
                    setShowWorkoutSelection(false);
                    setShowNewWorkoutForm(false);
                  }}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              {!showWorkoutSelection && !showNewWorkoutForm ? (
                <>
                  <div className="space-y-6 mb-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="reps" className="text-gray-300 text-xs uppercase tracking-wider">Reps</Label>
                        <div className="relative">
                          <Input 
                            id="reps"
                            type="number" 
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            className="bg-white/5 border-white/10 text-white focus:border-[#92B8FF] focus:ring-[#92B8FF]/20 h-12 text-center text-lg"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sets" className="text-gray-300 text-xs uppercase tracking-wider">Sets</Label>
                        <div className="relative">
                          <Input 
                            id="sets"
                            type="number" 
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                            className="bg-white/5 border-white/10 text-white focus:border-[#92B8FF] focus:ring-[#92B8FF]/20 h-12 text-center text-lg"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="weight" className="text-gray-300 text-xs uppercase tracking-wider">Lbs</Label>
                        <div className="relative">
                          <Input 
                            id="weight"
                            type="number" 
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="bg-white/5 border-white/10 text-white focus:border-[#92B8FF] focus:ring-[#92B8FF]/20 h-12 text-center text-lg"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Select Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {['Warm up', 'Drop set', 'Failure'].map((tag) => (
                        <button key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 whitespace-nowrap hover:bg-[#92B8FF]/20 hover:text-[#92B8FF] hover:border-[#92B8FF]/30 transition-all">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-3">
                    <Button 
                      className="w-full bg-[#92B8FF] text-[#1a1d2e] hover:bg-[#7FA8FF] border-none h-14 rounded-2xl font-bold text-base shadow-[0_4px_20px_rgba(146,184,255,0.25)]"
                      onClick={() => setShowWorkoutSelection(true)}
                    >
                      Add to Existing Workout
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-white/10 text-white hover:bg-white/5 h-14 rounded-2xl bg-transparent"
                      onClick={() => setShowNewWorkoutForm(true)}
                    >
                      Create New Workout
                    </Button>
                  </div>
                </>
              ) : showWorkoutSelection ? (
                <>
                  <h3 className="text-lg font-semibold text-white mb-4">Select Workout</h3>
                  <div className="space-y-3 mb-8">
                    {existingWorkouts.map((workout) => (
                      <button
                        key={workout}
                        onClick={() => handleSaveToExisting(workout)}
                        className="w-full p-4 text-left bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-[#92B8FF]/10 hover:border-[#92B8FF]/30 transition-all flex items-center justify-between group"
                      >
                        <span>{workout}</span>
                        <Plus className="w-5 h-5 text-gray-500 group-hover:text-[#92B8FF]" />
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full border-white/10 text-white hover:bg-white/5 h-14 rounded-2xl bg-transparent mt-auto"
                    onClick={() => setShowWorkoutSelection(false)}
                  >
                    Back
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-white mb-4">New Workout Name</h3>
                  <div className="mb-8">
                    <Input 
                      placeholder="E.g., Chest Day Destruction"
                      value={newWorkoutName}
                      onChange={(e) => setNewWorkoutName(e.target.value)}
                      className="bg-white/5 border-white/10 text-white focus:border-[#92B8FF] focus:ring-[#92B8FF]/20 h-14 rounded-2xl px-4"
                    />
                  </div>
                  <div className="mt-auto space-y-3">
                    <Button 
                      className="w-full bg-[#92B8FF] text-[#1a1d2e] hover:bg-[#7FA8FF] border-none h-14 rounded-2xl font-bold text-base shadow-[0_4px_20px_rgba(146,184,255,0.25)]"
                      onClick={handleSaveToNewWorkout}
                      disabled={!newWorkoutName.trim()}
                    >
                      Create & Add Exercise
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-white/10 text-white hover:bg-white/5 h-14 rounded-2xl bg-transparent"
                      onClick={() => setShowNewWorkoutForm(false)}
                    >
                      Back
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </div>
        </div>
      )}
    </div>
  );
}