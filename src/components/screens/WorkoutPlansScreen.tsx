import { useState } from 'react';
import { Calendar, ChevronLeft, Sparkles, Plus, Dumbbell } from 'lucide-react';

interface WorkoutPlansScreenProps {
  onNavigate: (screen: string) => void;
}

export function WorkoutPlansScreen({ onNavigate }: WorkoutPlansScreenProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Mock workout plan data
  const workoutPlans: Record<number, any> = {
    1: {
      type: 'completed',
      workouts: [
        { name: 'Bench Press', sets: 4, reps: 8, weight: '225 lbs' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: '70 lbs' },
        { name: 'Cable Flyes', sets: 3, reps: 12, weight: '40 lbs' },
        { name: 'Push-ups', sets: 3, reps: 15, weight: 'Bodyweight' },
      ]
    },
    2: {
      type: 'completed',
      workouts: [
        { name: 'Squats', sets: 4, reps: 8, weight: '315 lbs' },
        { name: 'Leg Press', sets: 3, reps: 12, weight: '450 lbs' },
        { name: 'Leg Curls', sets: 3, reps: 12, weight: '90 lbs' },
      ]
    },
    3: { type: 'rest', note: 'Active recovery - Light stretching' },
    4: {
      type: 'current',
      workouts: [
        { name: 'Deadlifts', sets: 4, reps: 6, weight: '405 lbs' },
        { name: 'Pull-ups', sets: 3, reps: 10, weight: 'Bodyweight' },
        { name: 'Barbell Rows', sets: 4, reps: 8, weight: '185 lbs' },
        { name: 'Face Pulls', sets: 3, reps: 15, weight: '50 lbs' },
      ]
    },
    5: {
      type: 'planned',
      workouts: [
        { name: 'Shoulder Press', sets: 4, reps: 8, weight: '135 lbs' },
        { name: 'Lateral Raises', sets: 3, reps: 12, weight: '25 lbs' },
        { name: 'Front Raises', sets: 3, reps: 12, weight: '20 lbs' },
      ]
    },
    6: {
      type: 'planned',
      workouts: [
        { name: 'Bicep Curls', sets: 3, reps: 12, weight: '40 lbs' },
        { name: 'Tricep Dips', sets: 3, reps: 12, weight: 'Bodyweight' },
        { name: 'Hammer Curls', sets: 3, reps: 10, weight: '35 lbs' },
      ]
    },
    7: { type: 'rest', note: 'Complete rest day' },
  };

  const getDayStatus = (day: number) => {
    const plan = workoutPlans[day];
    if (!plan) return 'empty';
    return plan.type;
  };

  const getDayColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#92B8FF]/20 border-[#92B8FF]';
      case 'current':
        return 'bg-[#AECEFF]/30 border-[#AECEFF] ring-2 ring-[#AECEFF]';
      case 'planned':
        return 'bg-white/5 border-white/20';
      case 'rest':
        return 'bg-[#9470DC]/10 border-[#9470DC]/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="p-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl text-white">Workout Plans</h1>
          </div>
        </div>

        <div className="px-6 space-y-4">
          {/* Create Workout Plan Button */}
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white transition-all duration-300 shadow-lg shadow-[#92B8FF]/30 hover:shadow-[#92B8FF]/50 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Create Workout Plan</span>
          </button>

          {/* Generate AI Workout Plan Button */}
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#9470DC] to-[#B29AE8] text-white transition-all duration-300 shadow-lg shadow-[#9470DC]/30 hover:shadow-[#9470DC]/50 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Generate AI Workout Plan</span>
          </button>

          {/* Calendar */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#92B8FF]/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              {/* Month Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <Calendar className="w-5 h-5 text-[#92B8FF]" />
              </div>

              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-white/50 text-xs">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const status = getDayStatus(day);
                  const isSelected = selectedDate === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square rounded-xl border transition-all duration-300 ${getDayColor(status)} ${
                        isSelected ? 'scale-110' : 'hover:scale-105'
                      } flex items-center justify-center relative`}
                    >
                      <span className="text-white text-sm">{day}</span>
                      {status === 'completed' && (
                        <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#92B8FF]" />
                      )}
                      {status === 'rest' && (
                        <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#9470DC]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Day Details */}
          {selectedDate && workoutPlans[selectedDate] && (
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#AECEFF]/20 to-transparent rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white">
                    {monthNames[currentMonth.getMonth()]} {selectedDate}
                  </h3>
                  <span className={`px-3 py-1 rounded-lg text-xs ${
                    workoutPlans[selectedDate].type === 'completed' ? 'bg-[#92B8FF]/20 text-[#92B8FF]' :
                    workoutPlans[selectedDate].type === 'current' ? 'bg-[#AECEFF]/20 text-[#AECEFF]' :
                    workoutPlans[selectedDate].type === 'rest' ? 'bg-[#9470DC]/20 text-[#9470DC]' :
                    'bg-white/10 text-white/70'
                  }`}>
                    {workoutPlans[selectedDate].type === 'rest' ? 'Rest Day' :
                     workoutPlans[selectedDate].type === 'completed' ? 'Completed' :
                     workoutPlans[selectedDate].type === 'current' ? 'Today' :
                     'Planned'}
                  </span>
                </div>

                {workoutPlans[selectedDate].type === 'rest' ? (
                  <p className="text-white/70 text-sm">
                    {workoutPlans[selectedDate].note}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {workoutPlans[selectedDate].workouts.map((workout: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <Dumbbell className="w-4 h-4 text-[#92B8FF] mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white text-sm mb-1">{workout.name}</p>
                          <p className="text-white/60 text-xs">
                            {workout.sets} sets × {workout.reps} reps @ {workout.weight}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
