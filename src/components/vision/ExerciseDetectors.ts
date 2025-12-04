import * as poseDetection from "@tensorflow-models/pose-detection";
import { getAngle} from "./PoseMath";
import React from "react";

export type RepState = "up" | "down";

interface DetectorProps {
  keypoints: poseDetection.Keypoint[];
  repState: React.RefObject<RepState>;
  onRep: () => void;
  setFeedback: (msg: string) => void;
}

/**
 * SQUATS
 */
export function detectSquat({
  keypoints,
  repState,
  onRep,
  setFeedback,
}: DetectorProps) {
  const leftHip = keypoints[11];
  const rightHip = keypoints[12];
  const leftKnee = keypoints[13];
  const rightKnee = keypoints[14];
  const leftAnkle = keypoints[15];
  const rightAnkle = keypoints[16];

  if (
    !leftHip ||
    !rightHip ||
    !leftKnee ||
    !rightKnee ||
    !leftAnkle ||
    !rightAnkle
  ) return;

  if (
    (leftHip.score ?? 0) < 0.5 ||
    (rightHip.score ?? 0) < 0.5 ||
    (leftKnee.score ?? 0) < 0.5 ||
    (rightKnee.score ?? 0) < 0.5 ||
    (leftAnkle.score ?? 0) < 0.5 ||
    (rightAnkle.score ?? 0) < 0.5
  ) return;

  const leftAngle = getAngle(leftHip, leftKnee, leftAnkle);
  const rightAngle = getAngle(rightHip, rightKnee, rightAnkle);

  const minAngle = Math.min(leftAngle, rightAngle);
  const maxAngle = Math.max(leftAngle, rightAngle);

  const DOWN_ANGLE = 100;
  const UP_ANGLE = 160;

  // Stage-based detection
  if (minAngle < DOWN_ANGLE && repState.current === "up") {
    repState.current = "down";
    setFeedback("Good! Go down fully");
  }

  if (maxAngle > UP_ANGLE && repState.current === "down") {
    repState.current = "up";
    onRep();
    setFeedback("✅ Good Rep!");
  }

  // Bad form
  if (minAngle > DOWN_ANGLE && repState.current === "down") setFeedback("⬇️ Go lower");
  if (Math.abs(leftKnee.x - rightKnee.x) > 50) setFeedback("⬅️ Keep knees aligned");
}

/**
 * PUSH-UPS
 */
export function detectPushup({
  keypoints,
  repState,
  onRep,
  setFeedback,
}: DetectorProps) {
  const shoulder = keypoints[5];
  const elbow = keypoints[7];
  const wrist = keypoints[9];
  const hip = keypoints[11];

  if (!shoulder || !elbow || !wrist || !hip) return;
  if (
    (shoulder.score ?? 0) < 0.4 ||
    (elbow.score ?? 0) < 0.4 ||
    (wrist.score ?? 0) < 0.4 ||
    (hip.score ?? 0) < 0.4
  )
    return;

  const elbowAngle = getAngle(shoulder, elbow, wrist);

  const DOWN_ANGLE = 90;
  const UP_ANGLE = 165;

  const bodyStraight = Math.abs(shoulder.y - hip.y) < 60;

  // DOWN
  if (elbowAngle < DOWN_ANGLE && repState.current === "up") {
    repState.current = "down";
    setFeedback("Good depth, now push up");
  }

  // UP → COUNT
  if (elbowAngle > UP_ANGLE && repState.current === "down" && bodyStraight) {
    repState.current = "up";
    onRep();
    setFeedback("✅ Good Push-up");
  }

  // BAD FORM
  if (!bodyStraight) setFeedback("⚠️ Keep your body straight");
  else if (repState.current === "down" && elbowAngle > 110)
    setFeedback("⬇️ Go lower");
}


/**
 * SIT UPS
 */
export function detectSitup({
  keypoints,
  repState,
  onRep,
  setFeedback,
}: DetectorProps) {
  const shoulder = keypoints[5];
  const hip = keypoints[11];
  const knee = keypoints[13];

  if (!shoulder || !hip || !knee) return;

  if (
    (shoulder.score ?? 0) < 0.4 ||
    (hip.score ?? 0) < 0.4 ||
    (knee.score ?? 0) < 0.4
  )
    return;

  const torsoAngle = getAngle(knee, hip, shoulder);

  const DOWN_ANGLE = 140; // lying back
  const UP_ANGLE = 80;    // fully up

  // UP POSITION
  if (torsoAngle < UP_ANGLE && repState.current === "up") {
    repState.current = "down";
    setFeedback("Good! Now lower down");
  }

  // DOWN POSITION → COUNT
  if (torsoAngle > DOWN_ANGLE && repState.current === "down") {
    repState.current = "up";
    onRep();
    setFeedback("✅ Good Sit-up");
  }

  // BAD FORM
  if (repState.current === "down" && torsoAngle < 95) {
    setFeedback("⬆️ Sit up higher");
  }
}



