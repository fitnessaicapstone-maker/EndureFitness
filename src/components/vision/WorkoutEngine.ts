import type { Dispatch, SetStateAction } from "react";

export interface MotionExercisePlan {
  name: string;
  targetReps: number;
  targetSets: number;
}

export const DEFAULT_WORKOUT_PLAN: MotionExercisePlan[] = [
  { name: "Squats", targetReps: 10, targetSets: 1 },
  { name: "Push-ups", targetReps: 2, targetSets: 1 },
  { name: "Sit-ups", targetReps: 3, targetSets: 1 },
];

interface RepProgressHandlers {
  workoutPlan: MotionExercisePlan[];
  exerciseIndex: number;
  setExerciseIndex: Dispatch<SetStateAction<number>>;
  setSetNumber: Dispatch<SetStateAction<number>>;
  setReps: Dispatch<SetStateAction<number>>;
  setWorkoutDone: Dispatch<SetStateAction<boolean>>;
}

export function handleRepProgress({
  workoutPlan,
  exerciseIndex,
  setExerciseIndex,
  setSetNumber,
  setReps,
  setWorkoutDone,
}: RepProgressHandlers) {
  setReps((prev: number) => {
    const next = prev + 1;
    const exercise = workoutPlan[exerciseIndex];
    const targetReps = exercise.targetReps;
    const targetSets = exercise.targetSets;

    if (next >= targetReps) {
      setSetNumber((s: number) => {
        if (s < targetSets) return s + 1;

        setExerciseIndex((i: number) => {
          if (i + 1 < workoutPlan.length) return i + 1;
          setWorkoutDone(true);
          return i;
        });

        return 1;
      });

      return 0;
    }

    return next;
  });
}
