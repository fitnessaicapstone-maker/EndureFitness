export interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  updatedAt: string;
}

export interface BodyMetricsData {
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  wrists?: number;
  waist?: number;
  chest?: number;
  rightQuad?: number;
  leftQuad?: number;
  rightCalf?: number;
  leftCalf?: number;
  rightArm?: number;
  leftArm?: number;
  rightForearm?: number;
  leftForearm?: number;
  bust?: number;
  bosom?: number;
  bodyType?: "athletic" | "slim" | "bulky" | string;
  updatedAt: string;
}

export interface WorkoutExerciseData {
  id: string;
  name: string;
  category?: string;
  equipment?: string;
  difficulty?: string;
  image?: string;
  sets: number;
  reps: number;
  weight: number;
  estimatedTime?: string;
}

export interface WorkoutData {
  id: string;
  name: string;
  type?: "premade" | "user" | string;
  exercises: WorkoutExerciseData[];
  duration?: string;
  calories?: number;
  difficulty?: string;
  lastEdited?: string;
  restPeriods?: number[];
  createdAt: string;
  updatedAt: string;
}

export interface MotionDetectExerciseResultData {
  name: string;
  targetReps: number;
  targetSets: number;
  setsCompleted: number;
  repsCompleted: number;
  formWarningOccurred: boolean;
  unsupported?: boolean;
}

export interface MotionDetectWorkoutSessionData {
  id: string;
  source: "motion-detect";
  workoutName: string;
  startedAt: string;
  completedAt: string;
  exercises: MotionDetectExerciseResultData[];
  formWarningOccurred: boolean;
}

export type MetricsPhotoView = "front" | "back" | "left" | "right";

export interface MetricsPhotoData {
  view: MetricsPhotoView;
  imageDataUrl: string;
  capturedAt: string;
}

export interface MetricsPhotoSessionData {
  id: string;
  createdAt: string;
  photos: MetricsPhotoData[];
}

export type NewMotionDetectWorkoutSessionData = Omit<
  MotionDetectWorkoutSessionData,
  "id" | "source" | "completedAt"
> & {
  id?: string;
  source?: "motion-detect";
  completedAt?: string;
};

export type NewProfileData = Omit<ProfileData, "updatedAt"> & {
  updatedAt?: string;
};

export type NewBodyMetricsData = Omit<BodyMetricsData, "updatedAt"> & {
  updatedAt?: string;
};

export type NewWorkoutData = Omit<WorkoutData, "createdAt" | "updatedAt"> & {
  createdAt?: string;
  updatedAt?: string;
};

const PROFILE_STORAGE_KEY = "endureFitness.profile";
const BODY_METRICS_STORAGE_KEY = "endureFitness.bodyMetrics";
const WORKOUTS_STORAGE_KEY = "endureFitness.workouts";
const MOTION_DETECT_HISTORY_STORAGE_KEY = "endureFitness.motionDetectHistory";
const METRICS_PHOTO_LIBRARY_STORAGE_KEY = "endureFitness.metricsPhotoLibrary";

const canUseLocalStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

function readStorageValue<T>(storageKey: string): T | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  const storedValue = window.localStorage.getItem(storageKey);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

function writeStorageValue<T>(storageKey: string, value: T): T {
  if (canUseLocalStorage()) {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }

  return value;
}

function removeStorageValue(storageKey: string) {
  if (canUseLocalStorage()) {
    window.localStorage.removeItem(storageKey);
  }
}

const nowIso = () => new Date().toISOString();

export function saveProfileData(profileData: NewProfileData): ProfileData {
  const savedProfile: ProfileData = {
    ...profileData,
    name: profileData.name.trim(),
    email: profileData.email.trim().toLowerCase(),
    phone: profileData.phone?.trim(),
    updatedAt: profileData.updatedAt ?? nowIso(),
  };

  return writeStorageValue(PROFILE_STORAGE_KEY, savedProfile);
}

export function loadProfileData(): ProfileData | null {
  return readStorageValue<ProfileData>(PROFILE_STORAGE_KEY);
}

export function updateProfileData(updates: Partial<NewProfileData>): ProfileData | null {
  const currentProfile = loadProfileData();

  if (!currentProfile) {
    return null;
  }

  return saveProfileData({
    ...currentProfile,
    ...updates,
    id: updates.id ?? currentProfile.id,
    name: updates.name ?? currentProfile.name,
    email: updates.email ?? currentProfile.email,
    updatedAt: nowIso(),
  });
}

export function deleteProfileData() {
  removeStorageValue(PROFILE_STORAGE_KEY);
}

export function saveBodyMetricsData(metricsData: NewBodyMetricsData): BodyMetricsData {
  const savedMetrics: BodyMetricsData = {
    ...metricsData,
    updatedAt: metricsData.updatedAt ?? nowIso(),
  };

  return writeStorageValue(BODY_METRICS_STORAGE_KEY, savedMetrics);
}

export function loadBodyMetricsData(): BodyMetricsData | null {
  return readStorageValue<BodyMetricsData>(BODY_METRICS_STORAGE_KEY);
}

export function updateBodyMetricsData(
  updates: Partial<NewBodyMetricsData>
): BodyMetricsData | null {
  const currentMetrics = loadBodyMetricsData();

  if (!currentMetrics) {
    return null;
  }

  return saveBodyMetricsData({
    ...currentMetrics,
    ...updates,
    updatedAt: nowIso(),
  });
}

export function deleteBodyMetricsData() {
  removeStorageValue(BODY_METRICS_STORAGE_KEY);
}

export function saveWorkoutList(workouts: NewWorkoutData[]): WorkoutData[] {
  const savedWorkouts = workouts.map((workout) => {
    const timestamp = nowIso();

    return {
      ...workout,
      createdAt: workout.createdAt ?? timestamp,
      updatedAt: workout.updatedAt ?? timestamp,
    };
  });

  return writeStorageValue(WORKOUTS_STORAGE_KEY, savedWorkouts);
}

export function loadWorkoutList(): WorkoutData[] {
  return readStorageValue<WorkoutData[]>(WORKOUTS_STORAGE_KEY) ?? [];
}

export function loadWorkoutData(workoutId: string): WorkoutData | null {
  return loadWorkoutList().find((workout) => workout.id === workoutId) ?? null;
}

export function saveWorkoutData(workoutData: NewWorkoutData): WorkoutData {
  const currentWorkouts = loadWorkoutList();
  const currentWorkout = currentWorkouts.find((workout) => workout.id === workoutData.id);
  const timestamp = nowIso();
  const savedWorkout: WorkoutData = {
    ...workoutData,
    createdAt: workoutData.createdAt ?? currentWorkout?.createdAt ?? timestamp,
    updatedAt: workoutData.updatedAt ?? timestamp,
  };

  const nextWorkouts = currentWorkout
    ? currentWorkouts.map((workout) =>
        workout.id === savedWorkout.id ? savedWorkout : workout
      )
    : [...currentWorkouts, savedWorkout];

  writeStorageValue(WORKOUTS_STORAGE_KEY, nextWorkouts);

  return savedWorkout;
}

export function updateWorkoutData(
  workoutId: string,
  updates: Partial<NewWorkoutData>
): WorkoutData | null {
  const currentWorkout = loadWorkoutData(workoutId);

  if (!currentWorkout) {
    return null;
  }

  return saveWorkoutData({
    ...currentWorkout,
    ...updates,
    id: currentWorkout.id,
    createdAt: currentWorkout.createdAt,
    updatedAt: nowIso(),
  });
}

export function deleteWorkoutData(workoutId: string): WorkoutData[] {
  const nextWorkouts = loadWorkoutList().filter((workout) => workout.id !== workoutId);

  return writeStorageValue(WORKOUTS_STORAGE_KEY, nextWorkouts);
}

export function deleteWorkoutList() {
  removeStorageValue(WORKOUTS_STORAGE_KEY);
}

export function loadMotionDetectWorkoutSessions(): MotionDetectWorkoutSessionData[] {
  return (
    readStorageValue<MotionDetectWorkoutSessionData[]>(
      MOTION_DETECT_HISTORY_STORAGE_KEY
    ) ?? []
  );
}

export function saveMotionDetectWorkoutSession(
  sessionData: NewMotionDetectWorkoutSessionData
): MotionDetectWorkoutSessionData {
  const completedAt = sessionData.completedAt ?? nowIso();
  const savedSession: MotionDetectWorkoutSessionData = {
    ...sessionData,
    id: sessionData.id ?? `motion-${completedAt}`,
    source: "motion-detect",
    completedAt,
  };

  const nextSessions = [savedSession, ...loadMotionDetectWorkoutSessions()];

  writeStorageValue(MOTION_DETECT_HISTORY_STORAGE_KEY, nextSessions);

  return savedSession;
}

export function deleteMotionDetectWorkoutSessions() {
  removeStorageValue(MOTION_DETECT_HISTORY_STORAGE_KEY);
}

export function loadMetricsPhotoSessions(): MetricsPhotoSessionData[] {
  return readStorageValue<MetricsPhotoSessionData[]>(METRICS_PHOTO_LIBRARY_STORAGE_KEY) ?? [];
}

export function saveMetricsPhotoSession(
  photosByView: Record<MetricsPhotoView, string>
): MetricsPhotoSessionData {
  const timestamp = nowIso();
  const views: MetricsPhotoView[] = ["front", "back", "left", "right"];
  const savedSession: MetricsPhotoSessionData = {
    id: `metrics-photos-${timestamp}`,
    createdAt: timestamp,
    photos: views.map((view) => ({
      view,
      imageDataUrl: photosByView[view],
      capturedAt: timestamp,
    })),
  };

  const nextSessions = [savedSession, ...loadMetricsPhotoSessions()].slice(0, 12);

  writeStorageValue(METRICS_PHOTO_LIBRARY_STORAGE_KEY, nextSessions);

  return savedSession;
}

export function deleteMetricsPhotoSessions() {
  removeStorageValue(METRICS_PHOTO_LIBRARY_STORAGE_KEY);
}
