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
// import { AIOverlay } from "./components/AIOverlay";
import {
  clearUserData,
  loadUserData,
  saveUserData,
  updateUserData,
  type NewUserData,
  type UserData,
} from "./lib/userStorage";
import {
  loadBodyMetricsData,
  loadProfileData,
  loadWorkoutList,
  deleteWorkoutData,
  saveProfileData,
  saveBodyMetricsData,
  saveWorkoutData,
  type BodyMetricsData,
  type NewBodyMetricsData,
  type NewProfileData,
  type NewWorkoutData,
  type ProfileData,
  type WorkoutData,
} from "./lib/appDataStorage";


export default function App() {
  const [userData, setUserData] = useState<UserData | null>(() => loadUserData());
  const [currentScreen, setCurrentScreen] = useState<string>(() =>
    userData ? "home" : "splash"
  );
  const [userName, setUserName] = useState(() => loadProfileData()?.name ?? userData?.name ?? "");
  const [userEmail, setUserEmail] = useState(() => loadProfileData()?.email ?? userData?.email ?? "");
  const [userPhone, setUserPhone] = useState(() => loadProfileData()?.phone ?? "");
  const [profileImage, setProfileImage] = useState(() => loadProfileData()?.profileImage ?? "");
  const [bodyMetrics, setBodyMetrics] = useState<BodyMetricsData | null>(() => loadBodyMetricsData());
  const [workouts, setWorkouts] = useState<WorkoutData[]>(() => loadWorkoutList());
  const [gender, setGender] = useState(() => loadBodyMetricsData()?.gender ?? userData?.gender ?? "");
  const [age, setAge] = useState<number | undefined>(() => userData?.age);
  const [height, setHeight] = useState<number | undefined>(() => loadBodyMetricsData()?.height ?? userData?.height);
  const [weight, setWeight] = useState<number | undefined>(() => loadBodyMetricsData()?.weight ?? userData?.weight);
  // const [showAIOverlay, setShowAIOverlay] = useState(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(
    () => userData?.hasCompletedSetup ?? false
  );
  const [currentWorkoutId, setCurrentWorkoutId] = useState<string | undefined>();
  

  // Splash screen auto-navigation
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        if (userData || hasCompletedSetup) {
          setCurrentScreen("home");
        } else {
          setCurrentScreen("splash-with-button");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, hasCompletedSetup, userData]);

  const handleNavigate = (screen: string, workoutId?: string) => {
    setCurrentScreen(screen);
    setCurrentWorkoutId(workoutId);
    // Mark setup as complete when user reaches home
    if (screen === "home" && !hasCompletedSetup) {
      setHasCompletedSetup(true);
      setUserData((currentUser) => {
        if (!currentUser) {
          return currentUser;
        }

        return updateUserData({ hasCompletedSetup: true }) ?? {
          ...currentUser,
          hasCompletedSetup: true,
        };
      });
    }
  };

  const handleSetGender = (newGender: string) => {
    setGender(newGender);
    const savedMetrics = saveBodyMetricsData({
      ...(loadBodyMetricsData() ?? {}),
      gender: newGender,
    });

    setBodyMetrics(savedMetrics);
    setUserData((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return updateUserData({ gender: newGender }) ?? {
        ...currentUser,
        gender: newGender,
      };
    });
  };

  const handleSetAge = (newAge: number) => {
    setAge(newAge);
    const savedMetrics = saveBodyMetricsData({
      ...(loadBodyMetricsData() ?? {}),
      age: newAge,
    });

    setBodyMetrics(savedMetrics);
    setUserData((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return updateUserData({ age: newAge }) ?? {
        ...currentUser,
        age: newAge,
      };
    });
  };

  const handleSetHeight = (newHeight: number) => {
    setHeight(newHeight);
    const savedMetrics = saveBodyMetricsData({
      ...(loadBodyMetricsData() ?? {}),
      height: newHeight,
    });

    setBodyMetrics(savedMetrics);
    setUserData((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return updateUserData({ height: newHeight }) ?? {
        ...currentUser,
        height: newHeight,
      };
    });
  };

  const handleSetWeight = (newWeight: number) => {
    setWeight(newWeight);
    const savedMetrics = saveBodyMetricsData({
      ...(loadBodyMetricsData() ?? {}),
      weight: newWeight,
    });

    setBodyMetrics(savedMetrics);
    setUserData((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return updateUserData({ weight: newWeight }) ?? {
        ...currentUser,
        weight: newWeight,
      };
    });
  };

  const handleSaveBodyMetrics = (updates: NewBodyMetricsData) => {
    const savedMetrics = saveBodyMetricsData({
      ...(loadBodyMetricsData() ?? {}),
      ...updates,
    });

    setBodyMetrics(savedMetrics);
    setGender(savedMetrics.gender ?? "");
    setHeight(savedMetrics.height);
    setWeight(savedMetrics.weight);
    setUserData((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return updateUserData({
        gender: savedMetrics.gender,
        height: savedMetrics.height,
        weight: savedMetrics.weight,
      }) ?? {
        ...currentUser,
        gender: savedMetrics.gender,
        height: savedMetrics.height,
        weight: savedMetrics.weight,
      };
    });
  };

  const handleSaveProfile = (profileUpdates: NewProfileData) => {
    const savedProfile = saveProfileData(profileUpdates);

    setUserName(savedProfile.name);
    setUserEmail(savedProfile.email);
    setUserPhone(savedProfile.phone ?? "");
    setProfileImage(savedProfile.profileImage ?? "");
    setUserData((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return updateUserData({
        name: savedProfile.name,
        email: savedProfile.email,
      }) ?? {
        ...currentUser,
        name: savedProfile.name,
        email: savedProfile.email,
      };
    });
  };

  const handleSaveWorkout = (workoutData: NewWorkoutData) => {
    saveWorkoutData(workoutData);
    setWorkouts(loadWorkoutList());
  };

  const handleDeleteWorkout = (workoutId: string) => {
    deleteWorkoutData(workoutId);
    setWorkouts(loadWorkoutList());
    setCurrentWorkoutId(undefined);
  };

  const loadCurrentProfile = (): ProfileData => {
    const savedProfile = loadProfileData();

    return {
      id: savedProfile?.id ?? userData?.id ?? userEmail,
      name: savedProfile?.name ?? userName,
      email: savedProfile?.email ?? userEmail,
      phone: savedProfile?.phone ?? userPhone,
      profileImage: savedProfile?.profileImage ?? profileImage,
      updatedAt: savedProfile?.updatedAt ?? new Date().toISOString(),
    };
  };

  const handleSetActiveUser = (activeUser: UserData) => {
    const savedProfile = loadProfileData();
    const savedMetrics = loadBodyMetricsData();

    setUserData(activeUser);
    setUserName(savedProfile?.name ?? activeUser.name);
    setUserEmail(savedProfile?.email ?? activeUser.email);
    setUserPhone(savedProfile?.phone ?? "");
    setProfileImage(savedProfile?.profileImage ?? "");
    setBodyMetrics(savedMetrics);
    setGender(savedMetrics?.gender ?? activeUser.gender ?? "");
    setAge(savedMetrics?.age ?? activeUser.age);
    setHeight(savedMetrics?.height ?? activeUser.height);
    setWeight(savedMetrics?.weight ?? activeUser.weight);
    setHasCompletedSetup(activeUser.hasCompletedSetup);
  };

  const handleSaveUser = (newUserData: NewUserData) => {
    const savedUser = saveUserData(newUserData);
    const savedProfile = saveProfileData({
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    });

    handleSetActiveUser(savedUser);
    setUserName(savedProfile.name);
    setUserEmail(savedProfile.email);
  };

  const handleLogout = () => {
    clearUserData();
    setUserData(null);
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setProfileImage("");
    setBodyMetrics(null);
    setGender("");
    setAge(undefined);
    setHeight(undefined);
    setWeight(undefined);
    setHasCompletedSetup(false);
    setCurrentWorkoutId(undefined);
    setCurrentScreen("login");
  };

  const handleOpenMotionDetect = () => {
    setCurrentScreen("motion-detect");   
  };

  const getCurrentBodyMetrics = (): BodyMetricsData | null => loadBodyMetricsData() ?? bodyMetrics;
  const getCurrentWorkouts = (): WorkoutData[] => loadWorkoutList();

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
        return <LoginScreen onNavigate={handleNavigate} onLogin={handleSetActiveUser} />;
      case "signup":
        return <SignupScreen onNavigate={handleNavigate} onSaveUser={handleSaveUser} />;
      case "goal":
        return <GoalSelectionScreen onNavigate={handleNavigate} />;
      case "gender":
        return <GenderSelectionScreen onNavigate={handleNavigate} onSetGender={handleSetGender} />;
      case "age":
        return <AgeSelectionScreen onNavigate={handleNavigate} onSetAge={handleSetAge} />;
      case "weight":
        return <WeightSelectionScreen onNavigate={handleNavigate} onSetWeight={handleSetWeight} />;
      case "height":
        return <HeightSelectionScreen onNavigate={handleNavigate} onSetHeight={handleSetHeight} />;
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
            // onOpenAI={() => setShowAIOverlay(true)}
          />
        );
      case "notifications":
        return <NotificationsScreen onNavigate={handleNavigate} />;

      // Profile section
      case "profile":
        return (
          <ProfileScreen
            userName={userName}
            userEmail={userEmail}
            userPhone={userPhone}
            profileImage={profileImage}
            gender={gender}
            age={age}
            height={height}
            weight={weight}
            onNavigate={handleNavigate}
            onSetGender={handleSetGender}
            onLogout={handleLogout}
          />
        );
      case "edit-profile":
        return (
          <EditProfileScreen
            onNavigate={handleNavigate}
            profile={loadCurrentProfile()}
            onSaveProfile={handleSaveProfile}
          />
        );
      case "metrics":
        return (
          <BodyMetricsScreen
            onNavigate={handleNavigate}
            gender={gender}
            metrics={getCurrentBodyMetrics()}
            onSaveMetrics={handleSaveBodyMetrics}
          />
        );
      case "metrics-edit":
        // return <BodyMetricsEditScreen onNavigate={handleNavigate} gender={gender} />;
      case "body-metrics-edit":
        return (
          <BodyMetricsEditScreen
            onNavigate={handleNavigate}
            gender={gender}
            height={height}
            weight={weight}
            metrics={getCurrentBodyMetrics()}
            onSaveMetrics={handleSaveBodyMetrics}
          />
        );

      // Workout section
      case "workouts":
        return <WorkoutScreen onNavigate={handleNavigate} workouts={getCurrentWorkouts()} />;
      case "workout-detail":
        return (
          <WorkoutDetailScreen
            onNavigate={handleNavigate}
            workoutId={currentWorkoutId}
            workouts={getCurrentWorkouts()}
          />
        );
      case "create-workout":
        return (
          <CreateWorkoutScreen
            onNavigate={handleNavigate}
            workouts={getCurrentWorkouts()}
            onSaveWorkout={handleSaveWorkout}
          />
        );
      case "edit-workout":
        return (
          <EditWorkoutScreen
            onNavigate={handleNavigate}
            workoutId={currentWorkoutId}
            workouts={getCurrentWorkouts()}
            onSaveWorkout={handleSaveWorkout}
            onDeleteWorkout={handleDeleteWorkout}
          />
        );
      case "selected-workout":
        return (
          <SelectedWorkoutScreen
            onNavigate={handleNavigate}
            workoutId={currentWorkoutId}
            workouts={getCurrentWorkouts()}
          />
        );
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
        return <ProgressScreen onNavigate={handleNavigate} bodyMetrics={getCurrentBodyMetrics()} />;
      case "achievements":
        return <AchievementsScreen onNavigate={handleNavigate} />;
      case "photo-capture":
        return <PhotoCaptureScreen onNavigate={handleNavigate} />;
      case "loading-analysis":
        return <LoadingAnalysisScreen onNavigate={handleNavigate} />;
      case "metrics-update":
        return <MetricsUpdateScreen onNavigate={handleNavigate} bodyMetrics={getCurrentBodyMetrics()} />;

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
            // onOpenAI={() => setShowAIOverlay(true)}
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
          // onOpenAI={() => setShowAIOverlay(true)}
          onOpenMotionDetect={handleOpenMotionDetect}
        />
      )}
      {/*  
      {showAIOverlay && (
        <AIOverlay
          onClose={() => setShowAIOverlay(false)}
          currentScreen={currentScreen}
        />
      )}
      */}
    </div>
  );
}
