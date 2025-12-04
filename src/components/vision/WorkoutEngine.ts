export const WORKOUT_PLAN = [
  { name: "Squats", targetReps: 10 },
  { name: "Push-ups", targetReps: 2 },
  { name: "Sit-ups", targetReps: 3 },
];

export const TOTAL_SETS = 1;

export function handleRepProgress({
  exerciseIndex,
  setExerciseIndex,
  setNumber,
  setSetNumber,
  setReps,
  setWorkoutDone,
}: any) {
  setReps((prev: number) => {
    const next = prev + 1;
    const target = WORKOUT_PLAN[exerciseIndex].targetReps;

    if (next >= target) {
      setSetNumber((s: number) => {
        if (s < TOTAL_SETS) return s + 1;

        setExerciseIndex((i: number) => {
          if (i + 1 < WORKOUT_PLAN.length) return i + 1;
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
