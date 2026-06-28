import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";

import {
  saveMotionDetectWorkoutSession,
  type MotionDetectExerciseResultData,
} from "../../lib/appDataStorage";
import {
  DEFAULT_WORKOUT_PLAN,
  handleRepProgress,
  type MotionExercisePlan,
} from "./WorkoutEngine";
import {
  detectSquat,
  detectPushup,
  detectSitup,
  type RepState,
} from "./ExerciseDetectors";

const SKELETON_CONNECTIONS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [0, 5],
  [0, 6],
  [5, 7],
  [7, 9],
  [6, 8],
  [8, 10],
  [5, 6],
  [5, 11],
  [6, 12],
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
];

type CameraStatus = "loading" | "ready" | "permission-denied" | "unavailable";
type SessionStatus = "idle" | "tracking" | "paused" | "ended";

interface PoseDetectorProps {
  onBackHome?: () => void;
  workoutPlan?: MotionExercisePlan[];
  workoutName?: string;
}

const getCameraErrorState = (error: unknown): {
  status: Exclude<CameraStatus, "loading" | "ready">;
  message: string;
} => {
  const errorName = error instanceof DOMException ? error.name : "";

  if (errorName === "NotAllowedError" || errorName === "SecurityError") {
    return {
      status: "permission-denied",
      message:
        "Camera access is blocked. Enable camera permission in your browser settings, then reopen Motion Detect.",
    };
  }

  if (errorName === "NotFoundError" || errorName === "DevicesNotFoundError") {
    return {
      status: "unavailable",
      message:
        "No camera was found on this device. Connect or enable a camera to use Motion Detect.",
    };
  }

  if (errorName === "NotReadableError" || errorName === "TrackStartError") {
    return {
      status: "unavailable",
      message:
        "The camera is unavailable. Another app may be using it, or the device may need to be reconnected.",
    };
  }

  return {
    status: "unavailable",
    message:
      "Motion Detect could not start the camera on this device. Check your camera and try again.",
  };
};

const SUPPORTED_EXERCISES = new Set(["Squats", "Push-ups", "Sit-ups"]);

const createExerciseResults = (
  workoutPlan: MotionExercisePlan[]
): MotionDetectExerciseResultData[] =>
  workoutPlan.map((exercise) => ({
    name: exercise.name,
    targetReps: exercise.targetReps,
    targetSets: exercise.targetSets,
    setsCompleted: 0,
    repsCompleted: 0,
    formWarningOccurred: false,
    unsupported: !SUPPORTED_EXERCISES.has(exercise.name),
  }));

const isWarningFeedback = (message: string) => {
  const normalizedMessage = message.trim().toLowerCase();

  return Boolean(normalizedMessage && !normalizedMessage.includes("good"));
};

const PoseDetector: FC<PoseDetectorProps> = ({
  onBackHome,
  workoutPlan = DEFAULT_WORKOUT_PLAN,
  workoutName = "Motion Detect Workout",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const splitContainerRef = useRef<HTMLDivElement | null>(null);
  const repState = useRef<RepState>("up");
  const sessionStatusRef = useRef<SessionStatus>("idle");
  const sessionStartedAtRef = useRef(new Date().toISOString());
  const sessionResultsRef = useRef<MotionDetectExerciseResultData[]>(
    createExerciseResults(workoutPlan.length > 0 ? workoutPlan : DEFAULT_WORKOUT_PLAN)
  );
  const savedSessionRef = useRef(false);

  const [feedback, setFeedback] = useState(""); // Bad form feedback
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("loading");
  const [cameraMessage, setCameraMessage] = useState(
    "Starting camera and loading motion detection..."
  );
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("idle");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [reps, setReps] = useState(0);
  const [workoutDone, setWorkoutDone] = useState(false);
  const [cameraPanelPercent, setCameraPanelPercent] = useState(68);
  const [isResizing, setIsResizing] = useState(false);
  const [isWideLayout, setIsWideLayout] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 900
  );
  const activeWorkoutPlan = useMemo(
    () => (workoutPlan.length > 0 ? workoutPlan : DEFAULT_WORKOUT_PLAN),
    [workoutPlan]
  );

  // On rep completion → use WorkoutEngine to handle sets/exercise transitions
  const onRep = () => {
    recordRepProgress();

    handleRepProgress({
      workoutPlan: activeWorkoutPlan,
      exerciseIndex: currentExerciseIndex,
      setExerciseIndex: setCurrentExerciseIndex,
      setSetNumber: setCurrentSet,
      setReps: setReps,
      setWorkoutDone: setWorkoutDone,
    });
  };

  const currentExercise =
    activeWorkoutPlan[currentExerciseIndex] ?? DEFAULT_WORKOUT_PLAN[0];
  const isCurrentExerciseSupported = SUPPORTED_EXERCISES.has(currentExercise.name);

  const updateExerciseResult = (
    exerciseIndex: number,
    updater: (result: MotionDetectExerciseResultData) => MotionDetectExerciseResultData
  ) => {
    sessionResultsRef.current = sessionResultsRef.current.map((result, index) =>
      index === exerciseIndex ? updater(result) : result
    );
  };

  const saveCompletedSession = () => {
    if (savedSessionRef.current) {
      return;
    }

    savedSessionRef.current = true;

    saveMotionDetectWorkoutSession({
      workoutName,
      startedAt: sessionStartedAtRef.current,
      exercises: sessionResultsRef.current,
      formWarningOccurred: sessionResultsRef.current.some(
        (exercise) => exercise.formWarningOccurred
      ),
    });
  };

  const recordRepProgress = () => {
    const willCompleteSet = reps + 1 >= currentExercise.targetReps;

    updateExerciseResult(currentExerciseIndex, (result) => ({
      ...result,
      repsCompleted: result.repsCompleted + 1,
      setsCompleted: willCompleteSet
        ? Math.max(result.setsCompleted, currentSet)
        : result.setsCompleted,
    }));
  };

  const handleFormFeedback = (message: string) => {
    setFeedback(message);

    if (isWarningFeedback(message)) {
      updateExerciseResult(currentExerciseIndex, (result) => ({
        ...result,
        formWarningOccurred: true,
      }));
    }
  };

  const startTracking = () => {
    repState.current = "up";
    sessionStatusRef.current = "tracking";
    setFeedback("");
    setSessionStatus("tracking");
  };

  const pauseTracking = () => {
    repState.current = "up";
    sessionStatusRef.current = "paused";
    setFeedback("");
    setSessionStatus("paused");
  };

  const resumeTracking = () => {
    repState.current = "up";
    sessionStatusRef.current = "tracking";
    setFeedback("");
    setSessionStatus("tracking");
  };

  const endWorkout = () => {
    repState.current = "up";
    sessionStatusRef.current = "ended";
    setFeedback("");
    setSessionStatus("ended");
    saveCompletedSession();
    setWorkoutDone(true);
  };

  const skipExercise = () => {
    repState.current = "up";
    sessionStatusRef.current = "idle";
    setFeedback("");
    setReps(0);
    setCurrentSet(1);
    setSessionStatus("idle");

    if (currentExerciseIndex + 1 < activeWorkoutPlan.length) {
      setCurrentExerciseIndex((index) => index + 1);
    } else {
      saveCompletedSession();
      setWorkoutDone(true);
      setSessionStatus("ended");
      sessionStatusRef.current = "ended";
    }
  };

  const drawKeypoints = (
    keypoints: poseDetection.Keypoint[],
    ctx: CanvasRenderingContext2D
  ) => {
    keypoints.forEach((kp) => {
      if ((kp.score ?? 0) > 0.4) {
        ctx.beginPath();
        ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    });
  };

  useEffect(() => {
    let animationFrameId = 0;
    let detector: poseDetection.PoseDetector | null = null;
    let isMounted = true;

    const runMoveNet = async () => {
      setCameraStatus("loading");
      setCameraMessage("Starting camera and loading motion detection...");

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraStatus("unavailable");
        setCameraMessage(
          "Camera access is not available in this browser. Try a modern browser with camera support."
        );
        return;
      }

      try {
        await tf.setBackend("webgl");
        await tf.ready();

        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
        );
      } catch (err) {
        console.error("Error starting motion detection:", err);
        if (isMounted) {
          setCameraStatus("unavailable");
          setCameraMessage(
            "Motion detection could not start on this device. Try refreshing or using another browser."
          );
        }
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        if (isMounted) {
          setCameraStatus("ready");
          setCameraMessage("");
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        if (isMounted) {
          const errorState = getCameraErrorState(err);
          setCameraStatus(errorState.status);
          setCameraMessage(errorState.message);
        }
        return;
      }

      const detect = async () => {
        if (!videoRef.current || !canvasRef.current || !detector) {
          animationFrameId = requestAnimationFrame(detect);
          return;
        }

        const poses = await detector.estimatePoses(videoRef.current);
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) {
          animationFrameId = requestAnimationFrame(detect);
          return;
        }

        // Match canvas size
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Clear and draw video
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (poses && poses.length > 0) {
          const keypoints = poses[0].keypoints;

          // Draw skeleton
          SKELETON_CONNECTIONS.forEach(([i, j]) => {
            const kp1 = keypoints[i];
            const kp2 = keypoints[j];
            if ((kp1.score ?? 0) > 0.4 && (kp2.score ?? 0) > 0.4) {
              ctx.beginPath();
              ctx.moveTo(kp1.x, kp1.y);
              ctx.lineTo(kp2.x, kp2.y);
              ctx.strokeStyle = "lime";
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          });

          drawKeypoints(keypoints, ctx);

          // Run current exercise detector only during active tracking.
          if (
            !workoutDone &&
            sessionStatusRef.current === "tracking" &&
            isCurrentExerciseSupported
          ) {
            if (currentExercise.name === "Squats")
              detectSquat({ keypoints, repState, onRep, setFeedback: handleFormFeedback });
            else if (currentExercise.name === "Push-ups")
              detectPushup({ keypoints, repState, onRep, setFeedback: handleFormFeedback });
            else if (currentExercise.name === "Sit-ups")
              detectSitup({ keypoints, repState, onRep, setFeedback: handleFormFeedback });
          }
        }

        animationFrameId = requestAnimationFrame(detect);
      };

      detect();
    };

    runMoveNet();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
      detector?.dispose();
    };
  }, [currentExerciseIndex, workoutDone, isCurrentExerciseSupported]);

  //Reset rep state when exercise changes
  useEffect(() => {
    repState.current = "up";
    setFeedback("");
  }, [currentExerciseIndex]);

  useEffect(() => {
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setReps(0);
    setWorkoutDone(false);
    setSessionStatus("idle");
    sessionStatusRef.current = "idle";
    repState.current = "up";
    sessionStartedAtRef.current = new Date().toISOString();
    sessionResultsRef.current = createExerciseResults(activeWorkoutPlan);
    savedSessionRef.current = false;
    setFeedback("");
  }, [activeWorkoutPlan]);

  useEffect(() => {
    sessionStatusRef.current = sessionStatus;
  }, [sessionStatus]);

  useEffect(() => {
    if (workoutDone) {
      saveCompletedSession();
      setSessionStatus("ended");
    }
  }, [workoutDone]);

  useEffect(() => {
    const updateLayout = () => setIsWideLayout(window.innerWidth >= 900);

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (!isResizing || !isWideLayout) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = splitContainerRef.current?.getBoundingClientRect();

      if (!bounds) {
        return;
      }

      const nextPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
      const clampedPercent = Math.min(78, Math.max(45, nextPercent));

      setCameraPanelPercent(clampedPercent);
    };

    const stopResizing = () => setIsResizing(false);

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResizing);

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResizing);
    };
  }, [isResizing, isWideLayout]);

  const sessionMessage = (() => {
    if (workoutDone || sessionStatus === "ended") return "Workout ended";
    if (sessionStatus === "tracking") return "Tracking reps";
    if (sessionStatus === "paused") return "Tracking paused";
    return "Ready to start";
  })();
  const repProgressPercent = Math.min(
    100,
    Math.round((reps / currentExercise.targetReps) * 100)
  );
  const totalExercises = activeWorkoutPlan.length;
  const currentExerciseNumber = Math.min(currentExerciseIndex + 1, totalExercises);
  const feedbackMessage = !isCurrentExerciseSupported
    ? `Motion Detect does not support ${currentExercise.name} yet. Skip to another supported exercise or track this move manually.`
    : feedback || "Start tracking to receive form feedback.";

  return (
    <div className="flex w-full flex-col items-center">
      <video ref={videoRef} style={{ display: "none" }} />
      <div
        ref={splitContainerRef}
        className="flex w-full max-w-[1800px]"
        style={{
          flexDirection: isWideLayout ? "row" : "column",
          alignItems: isWideLayout ? "stretch" : "center",
          gap: isWideLayout ? 0 : 16,
          minHeight: isWideLayout ? 620 : undefined,
        }}
      >
      <section
        className="min-w-0"
        style={{
          flexBasis: isWideLayout ? `${cameraPanelPercent}%` : "auto",
          width: isWideLayout ? undefined : "100%",
          paddingRight: isWideLayout ? 16 : 0,
        }}
      >
      <div
        className="relative flex min-h-[360px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl shadow-black/25"
        style={{
          height: isWideLayout ? "100%" : undefined,
          minHeight: isWideLayout ? 620 : 360,
        }}
      >
        <canvas
          ref={canvasRef}
          className={cameraStatus === "ready" ? "h-full w-full object-cover" : "hidden"}
        />

        {cameraStatus === "ready" && sessionStatus !== "tracking" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/35 px-6 text-center">
            <div>
              <h2 className="text-white text-xl mb-2">
                {sessionStatus === "paused"
                  ? "Tracking Paused"
                  : sessionStatus === "ended"
                    ? "Workout Ended"
                    : "Ready To Track"}
              </h2>
              <p className="text-sm text-white/70">
                {sessionStatus === "paused"
                  ? "Resume when you are ready. Reps will not count while paused."
                  : sessionStatus === "ended"
                    ? "Your camera is still available, but rep tracking has stopped."
                    : "Press Start Tracking when you are in position."}
              </p>
            </div>
          </div>
        )}

        {cameraStatus !== "ready" && (
          <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
            {cameraStatus === "loading" && (
              <div className="mb-4 h-10 w-10 rounded-full border-2 border-white/20 border-t-[#92B8FF] animate-spin" />
            )}

            <h2 className="text-white text-xl mb-2">
              {cameraStatus === "loading"
                ? "Starting Motion Detect"
                : cameraStatus === "permission-denied"
                  ? "Camera Permission Blocked"
                  : "Camera Unavailable"}
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-white/70">
              {cameraMessage}
            </p>

            {cameraStatus !== "loading" && onBackHome && (
              <button
                type="button"
                onClick={onBackHome}
                className="mt-5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/15"
              >
                Back to Home
              </button>
            )}
          </div>
        )}
      </div>
      </section>

      <div
        aria-label="Resize motion detect panels"
        className="w-5 cursor-col-resize items-stretch justify-center"
        style={{ display: isWideLayout ? "flex" : "none" }}
        onPointerDown={(event) => {
          event.preventDefault();
          setIsResizing(true);
        }}
      >
        <div
          className={`h-full w-1 rounded-full transition-colors ${
            isResizing ? "bg-[#92B8FF]" : "bg-white/15 hover:bg-[#92B8FF]/70"
          }`}
        />
      </div>

      <section
        className="min-w-0"
        style={{
          flexBasis: isWideLayout ? `${100 - cameraPanelPercent}%` : "auto",
          width: isWideLayout ? undefined : "100%",
          paddingLeft: isWideLayout ? 16 : 0,
        }}
      >
        {cameraStatus === "ready" && (
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 backdrop-blur-xl">
            {workoutDone ? (
              <div className="py-4 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#92B8FF]/40 bg-[#92B8FF]/15">
                  <span className="text-2xl text-[#AECEFF]">✓</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">Workout Complete</h2>
                <p className="mt-2 text-sm text-white/65">
                  {workoutName} is finished. Nice work completing the tracked session.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="text-left">
                    <p className="text-xs uppercase text-white/45">
                      Exercise {currentExerciseNumber} of {totalExercises}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">
                      {currentExercise.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/55">{workoutName}</p>
                  </div>
                  <div className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-sm text-[#AECEFF]">
                    {sessionMessage}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-center">
                    <p className="text-xs text-white/45">Set</p>
                    <p className="mt-1 text-2xl font-semibold text-[#92B8FF]">
                      {currentSet}
                    </p>
                    <p className="text-xs text-white/45">of {currentExercise.targetSets}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-center">
                    <p className="text-xs text-white/45">Reps</p>
                    <p className="mt-1 text-2xl font-semibold text-[#AECEFF]">
                      {reps}
                    </p>
                    <p className="text-xs text-white/45">completed</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-center">
                    <p className="text-xs text-white/45">Target</p>
                    <p className="mt-1 text-2xl font-semibold text-white">
                      {currentExercise.targetReps}
                    </p>
                    <p className="text-xs text-white/45">reps</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                    <span>Rep progress</span>
                    <span>{repProgressPercent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#92B8FF] to-[#9470DC] transition-all"
                      style={{ width: `${repProgressPercent}%` }}
                    />
                  </div>
                </div>

                <div
                  className={`mt-4 rounded-xl border p-4 text-left ${
                    isCurrentExerciseSupported
                      ? "border-[#92B8FF]/20 bg-[#92B8FF]/10"
                      : "border-yellow-300/25 bg-yellow-300/10"
                  }`}
                >
                  <p className="text-xs uppercase text-white/45">Form feedback</p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      isCurrentExerciseSupported ? "text-white" : "text-yellow-200"
                    }`}
                  >
                    {feedbackMessage}
                  </p>
                </div>
              </>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {sessionStatus === "idle" && !workoutDone && isCurrentExerciseSupported && (
                <button
                  type="button"
                  onClick={startTracking}
                  className="rounded-xl bg-[#92B8FF] px-4 py-2 text-sm text-[#0a0d1a] transition-colors hover:bg-[#AECEFF]"
                >
                  Start Tracking
                </button>
              )}

              {sessionStatus === "tracking" && !workoutDone && (
                <button
                  type="button"
                  onClick={pauseTracking}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/15"
                >
                  Pause
                </button>
              )}

              {sessionStatus === "paused" && !workoutDone && isCurrentExerciseSupported && (
                <button
                  type="button"
                  onClick={resumeTracking}
                  className="rounded-xl bg-[#92B8FF] px-4 py-2 text-sm text-[#0a0d1a] transition-colors hover:bg-[#AECEFF]"
                >
                  Resume
                </button>
              )}

              {sessionStatus !== "ended" && !workoutDone && (
                <button
                  type="button"
                  onClick={skipExercise}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/15"
                >
                  Skip Exercise
                </button>
              )}

              {sessionStatus !== "ended" && !workoutDone && (
                <button
                  type="button"
                  onClick={endWorkout}
                  className="rounded-xl border border-red-300/30 bg-red-500/15 px-4 py-2 text-sm text-red-100 transition-colors hover:bg-red-500/25"
                >
                  End Workout
                </button>
              )}
            </div>
          </div>
        )}
      </section>
      </div>
    </div>
  );
};

export default PoseDetector;
