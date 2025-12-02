import { useEffect, useState } from "react";

// Onboarding screens
import { SplashScreen } from "./components/screens/onboarding/SplashScreen";
import { LoginScreen } from "./components/screens/onboarding/LoginScreen";
import { SignupScreen } from "./components/screens/onboarding/SignupScreen";
import { GoalSelectionScreen } from "./components/screens/onboarding/GoalSelectionScreen";
import { GenderSelectionScreen } from "./components/screens/GenderSelectionScreen";
import { AgeSelectionScreen } from "./components/screens/AgeSelectionScreen";
import { WeightSelectionScreen } from "./components/screens/WeightSelectionScreen";
import { HeightSelectionScreen } from "./components/screens/HeightSelectionScreen";
import { LoadingSplashScreen } from "./components/screens/LoadingSplashScreen";
import { TourScreen } from "./components/screens/TourScreen";

// Home screen
import { HomeScreen } from "./components/screens/HomeScreen";

// Workout screens
import { WorkoutScreen } from "./components/screens/WorkoutScreen";
import { WorkoutDetailScreen } from "./components/screens/WorkoutDetailScreen";
import { CreateWorkoutScreen } from "./components/screens/CreateWorkoutScreen";
import { EditWorkoutScreen } from "./components/screens/EditWorkoutScreen";
import { SelectedWorkoutScreen } from "./components/screens/SelectedWorkoutScreen";
import { AIWorkoutScreen } from "./components/screens/AIWorkoutScreen";
import { WarmUpScreen } from "./components/screens/WarmUpScreen";
import { WorkoutCompleteScreen } from "./components/screens/WorkoutCompleteScreen";
import { WorkoutHistoryScreen } from "./components/screens/WorkoutHistoryScreen";
import { WorkoutPlansScreen } from "./components/screens/WorkoutPlansScreen";
import { ExerciseDetailScreen } from "./components/screens/ExerciseDetailScreen";
import { ExerciseSearchScreen } from "./components/screens/ExerciseSearchScreen";

// Profile screens
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { EditProfileScreen } from "./components/screens/EditProfileScreen";
import { BodyMetricsScreen } from "./components/screens/BodyMetricsScreen";
import { BodyMetricsEditScreen } from "./components/screens/BodyMetricsEditScreen";

// Progress screens
import { ProgressScreen } from "./components/screens/ProgressScreen";
import { AchievementsScreen } from "./components/screens/AchievementsScreen";
import { PhotoCaptureScreen } from "./components/screens/PhotoCaptureScreen";
import { LoadingAnalysisScreen } from "./components/screens/LoadingAnalysisScreen";
import { MetricsUpdateScreen } from "./components/screens/MetricsUpdateScreen";

// Settings screens
import { SettingsScreen } from "./components/screens/SettingsScreen";
import { NotificationsScreen } from "./components/screens/NotificationsScreen";
import { PaymentScreen } from "./components/screens/PaymentScreen";
import { FAQScreen } from "./components/screens/FAQScreen";
import { AccessibilityScreen } from "./components/screens/AccessibilityScreen";
import { AboutAppScreen } from "./components/screens/AboutAppScreen";

// AI screens
import { AIChatScreen } from "./components/screens/AIChatScreen";

import { MotionDetectScreen } from "./components/screens/MotionDetectScreen";

// Layout components
import { BottomNav } from "./components/BottomNav";
import { AIOverlay } from "./components/AIOverlay";


export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>("splash");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [showAIOverlay, setShowAIOverlay] = useState(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [currentWorkoutId, setCurrentWorkoutId] = useState<string | undefined>();
  

  // Splash screen auto-navigation
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        if (hasCompletedSetup) {
          setCurrentScreen("home");
        } else {
          setCurrentScreen("splash-with-button");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, hasCompletedSetup]);

  const handleNavigate = (screen: string, workoutId?: string) => {
    setCurrentScreen(screen);
    setCurrentWorkoutId(workoutId);
    // Mark setup as complete when user reaches home
    if (screen === "home" && !hasCompletedSetup) {
      setHasCompletedSetup(true);
    }
  };

  const handleSetGender = (newGender: string) => {
    setGender(newGender);
  };

  const handleOpenMotionDetect = () => {
    setCurrentScreen("motion-detect");   // 或者打开你的侦测页面
  };

  // Screen groups for bottom navigation visibility
  const mainScreens = ["home", "workouts", "progress", "profile"];
  const hideBottomNavScreens = ["ai-chat", "ai-workout", "exercise-search"];
  const showBottomNav =
    mainScreens.includes(currentScreen) &&
    !hideBottomNavScreens.includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      // Onboarding flow
      case "splash":
        return <SplashScreen />;
      case "splash-with-button":
        return <SplashScreen onNavigate={handleNavigate} showButton />;
      case "login":
        return <LoginScreen onNavigate={handleNavigate} />;
      case "signup":
        return <SignupScreen onNavigate={handleNavigate} onSetName={setUserName} />;
      case "goal":
        return <GoalSelectionScreen onNavigate={handleNavigate} />;
      case "gender":
        return <GenderSelectionScreen onNavigate={handleNavigate} onSetGender={handleSetGender} />;
      case "age":
        return <AgeSelectionScreen onNavigate={handleNavigate} />;
      case "weight":
        return <WeightSelectionScreen onNavigate={handleNavigate} />;
      case "height":
        return <HeightSelectionScreen onNavigate={handleNavigate} />;
      case "loading-splash":
        return <LoadingSplashScreen onNavigate={handleNavigate} />;
      case "tour":
        return <TourScreen onNavigate={handleNavigate} />;

      // Main app screens
      case "home":
        return (
          <HomeScreen
            userName={userName}
            onNavigate={handleNavigate}
            onOpenAI={() => setShowAIOverlay(true)}
          />
        );
      case "notifications":
        return <NotificationsScreen onNavigate={handleNavigate} />;

      // Profile section
      case "profile":
        return (
          <ProfileScreen
            userName={userName}
            gender={gender}
            onNavigate={handleNavigate}
            onSetGender={handleSetGender}
          />
        );
      case "edit-profile":
        return <EditProfileScreen onNavigate={handleNavigate} />;
      case "metrics":
        return <BodyMetricsScreen onNavigate={handleNavigate} gender={gender} />;
      case "metrics-edit":
        // return <BodyMetricsEditScreen onNavigate={handleNavigate} gender={gender} />;
      case "body-metrics-edit":
        return (
          <BodyMetricsEditScreen
            onNavigate={handleNavigate}
            gender={gender}
            onSetGender={handleSetGender}
          />
        );

      // Workout section
      case "workouts":
        return <WorkoutScreen onNavigate={handleNavigate} />;
      case "workout-detail":
        return <WorkoutDetailScreen onNavigate={handleNavigate} workoutId={currentWorkoutId} />;
      case "create-workout":
        return <CreateWorkoutScreen onNavigate={handleNavigate} />;
      case "edit-workout":
        return <EditWorkoutScreen onNavigate={handleNavigate} workoutId={currentWorkoutId} />;
      case "selected-workout":
        return <SelectedWorkoutScreen onNavigate={handleNavigate} />;
      case "ai-workout":
        return <AIWorkoutScreen onNavigate={handleNavigate} />;
      case "warm-up":
        return <WarmUpScreen onNavigate={handleNavigate} />;
      case "workout-complete":
        return <WorkoutCompleteScreen onNavigate={handleNavigate} />;
      case "workout-history":
        return <WorkoutHistoryScreen onNavigate={handleNavigate} />;
      case "workout-plans":
        return <WorkoutPlansScreen onNavigate={handleNavigate} />;
      case "exercise-detail":
        return <ExerciseDetailScreen onNavigate={handleNavigate} />;
      case "exercise-search":
        return <ExerciseSearchScreen onNavigate={handleNavigate} />;

      // Progress section
      case "progress":
        return <ProgressScreen onNavigate={handleNavigate} />;
      case "achievements":
        return <AchievementsScreen onNavigate={handleNavigate} />;
      case "photo-capture":
        return <PhotoCaptureScreen onNavigate={handleNavigate} />;
      case "loading-analysis":
        return <LoadingAnalysisScreen onNavigate={handleNavigate} />;
      case "metrics-update":
        return <MetricsUpdateScreen onNavigate={handleNavigate} />;

      // Settings section
      case "settings":
        return <SettingsScreen onNavigate={handleNavigate} />;
      case "payment":
        return <PaymentScreen onNavigate={handleNavigate} />;
      case "faq":
        return <FAQScreen onNavigate={handleNavigate} />;
      case "accessibility":
        return <AccessibilityScreen onNavigate={handleNavigate} />;
      case "about":
        return <AboutAppScreen onNavigate={handleNavigate} />;

      // AI section
      case "ai-chat":
        return <AIChatScreen onNavigate={handleNavigate} />;

      case "motion-detect":
        return <MotionDetectScreen onNavigate={handleNavigate} />;

      // Default fallback
      default:
        return (
          <HomeScreen
            userName={userName}
            onNavigate={handleNavigate}
            onOpenAI={() => setShowAIOverlay(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d2e]">
      {renderScreen()}
      {showBottomNav && (
        <BottomNav
          activeScreen={currentScreen}
          onNavigate={handleNavigate}
          onOpenAI={() => setShowAIOverlay(true)}
          onOpenMotionDetect={handleOpenMotionDetect}
        />
      )}
      {showAIOverlay && (
        <AIOverlay
          onClose={() => setShowAIOverlay(false)}
          currentScreen={currentScreen}
        />
      )}
    </div>
  );
}