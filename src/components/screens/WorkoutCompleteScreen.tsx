import { motion } from 'motion/react';

interface WorkoutCompleteScreenProps {
  onNavigate: (screen: string) => void;
}

export function WorkoutCompleteScreen({ onNavigate }: WorkoutCompleteScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        {/* Container with border */}
        <div className="border-4 border-black rounded-3xl p-8 bg-white">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-7xl text-center mb-6"
          >
            🎉
          </motion.div>

          <h1 className="text-4xl text-black text-center mb-2">Workout Complete!</h1>
          <p className="text-gray-500 text-center mb-8">Great job on completing your session</p>

          {/* Stats - All with borders, no fills */}
          <div className="space-y-4 mb-6">
            <div className="p-5 rounded-2xl border-2 border-black bg-white">
              <p className="text-gray-500 text-sm mb-1 text-center">Total Duration</p>
              <p className="text-black text-4xl text-center">45 min</p>
            </div>

            <div className="p-5 rounded-2xl border-2 border-black bg-white">
              <p className="text-gray-500 text-sm mb-1 text-center">Calories Burned</p>
              <p className="text-black text-4xl text-center">420 cal</p>
            </div>

            <div className="p-5 rounded-2xl border-2 border-black bg-white">
              <p className="text-gray-500 text-sm mb-1 text-center">Exercises Completed</p>
              <p className="text-black text-4xl text-center">4/4</p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-100">
              <p className="text-gray-700 text-sm mb-3 text-center">Performance Summary</p>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Excellent session! You maintained great form throughout. Your bench press improved by 5 lbs compared to last week. Keep it up!
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => onNavigate('workouts')}
            className="w-full py-4 rounded-2xl bg-black text-white hover:bg-gray-900 transition-all"
          >
            Back to Workout Library
          </button>
        </div>
      </motion.div>
    </div>
  );
}
