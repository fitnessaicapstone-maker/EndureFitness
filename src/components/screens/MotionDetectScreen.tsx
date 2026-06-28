// MotionDetectScreen.tsx

import { useMemo } from "react";

import type { WorkoutData } from "../../lib/appDataStorage";
import PoseDetector from "../vision/PoseDetector";
import {
  DEFAULT_WORKOUT_PLAN,
  type MotionExercisePlan,
} from "../vision/WorkoutEngine";

interface MotionDetectScreenProps {
  onNavigate: (screen: string, workoutId?: string) => void;
  workoutId?: string;
  workouts: WorkoutData[];
}

const toMotionWorkoutPlan = (workout?: WorkoutData): MotionExercisePlan[] => {
  if (!workout || workout.exercises.length === 0) {
    return DEFAULT_WORKOUT_PLAN;
  }

  return workout.exercises.map((exercise) => ({
    name: exercise.name,
    targetReps: Math.max(exercise.reps, 1),
    targetSets: Math.max(exercise.sets, 1),
  }));
};

export function MotionDetectScreen({
  onNavigate,
  workoutId,
  workouts,
}: MotionDetectScreenProps) {
  const selectedWorkout = workouts.find((workout) => workout.id === workoutId);
  const workoutPlan = useMemo(
    () => toMotionWorkoutPlan(selectedWorkout),
    [selectedWorkout]
  );
  const workoutName = selectedWorkout?.name ?? "Default Motion Detect Workout";

  return (
    <div className="min-h-screen bg-[#0a0d1a] text-white p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Motion Detect</h1>
        <button
          className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/15"
          onClick={() => onNavigate("home")}
        >
          Back to Home
        </button>
      </div>

      <div className="mx-auto mb-4 w-full">
        <PoseDetector
          workoutPlan={workoutPlan}
          workoutName={workoutName}
          onBackHome={() => onNavigate("home")}
        />
      </div>
    </div>
  );
}
