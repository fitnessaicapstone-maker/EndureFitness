import "@mediapipe/pose";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useRef, useState } from "react";

import { WORKOUT_PLAN, handleRepProgress } from "./WorkoutEngine";
import {
  detectSquat,
  detectPushup,
  detectSitup,
  RepState,
} from "./exerciseDetectors";

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

const PoseDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const repState = useRef<RepState>("up");

  const [feedback, setFeedback] = useState(""); // Bad form feedback
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [reps, setReps] = useState(0);
  const [workoutDone, setWorkoutDone] = useState(false);

  // On rep completion → use WorkoutEngine to handle sets/exercise transitions
  const onRep = () => {
    handleRepProgress({
      exerciseIndex: currentExerciseIndex,
      setExerciseIndex: setCurrentExerciseIndex,
      setNumber: currentSet,
      setSetNumber: setCurrentSet,
      setReps: setReps,
      setWorkoutDone: setWorkoutDone,
    });
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

    const runMoveNet = async () => {
      await tf.setBackend("webgl");
      await tf.ready();

      detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
      );

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
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

          // Run current exercise detector if workout not done
          if (!workoutDone) {
            const currentExercise = WORKOUT_PLAN[currentExerciseIndex].name;

            if (currentExercise === "Squats")
              detectSquat({ keypoints, repState, onRep, setFeedback });
            else if (currentExercise === "Push-ups")
              detectPushup({ keypoints, repState, onRep, setFeedback });
            else if (currentExercise === "Sit-ups")
              detectSitup({ keypoints, repState, onRep, setFeedback });
          }
        }

        animationFrameId = requestAnimationFrame(detect);
      };

      detect();
    };

    runMoveNet();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
      detector?.dispose();
    };
  }, [currentExerciseIndex, workoutDone]);

  //Reset rep state when exercise changes
  useEffect(() => {
    repState.current = "up";
  }, [currentExerciseIndex]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        style={{
          width: "90vw",
          maxWidth: "960px",
          aspectRatio: "16 / 9",
          border: "1px solid #000",
          objectFit: "cover",
        }}
      />

      <div style={{ textAlign: "center", marginTop: 12 }}>
        <h2 className="text-white text-xl">
          {workoutDone
            ? "Workout Complete!"
            : WORKOUT_PLAN[currentExerciseIndex].name}
        </h2>

        {!workoutDone && (
          <>
            <p className="text-white/80">
              Set: {currentSet} / {1} | Reps: {reps} /{" "}
              {WORKOUT_PLAN[currentExerciseIndex].targetReps}
            </p>
            {feedback && (
              <p className="text-yellow-400 font-semibold mt-1">{feedback}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PoseDetector;
