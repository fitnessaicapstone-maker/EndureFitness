import {
  Bell,
  Flame,
  Heart,
  Dumbbell,
  Footprints,
  TrendingUp,
  Trophy,
  Zap,
  Calendar,
  ChevronRight,
  Camera,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HomeScreenProps {
  userName: string;
  onNavigate: (screen: string) => void;
  onOpenAI: () => void;
}

export function HomeScreen({
  userName,
  onNavigate,
  onOpenAI,
}: HomeScreenProps) {
  const [progressView, setProgressView] = useState<
    "weekly" | "monthly"
  >("weekly");
  const [selectedDay, setSelectedDay] = useState<number | null>(
    null,
  );

  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Don't wish for it, work for it.",
    "Push yourself because no one else is going to do it for you.",
  ];

  // Changes every time app opens based on timestamp
  const todayQuote =
    motivationalQuotes[
      Math.floor(Date.now() / 1000) % motivationalQuotes.length
    ];

  const weeklyData = [
    { day: "Mon", strength: 220 },
    { day: "Tue", strength: 220 },
    { day: "Wed", strength: 225 },
    { day: "Thu", strength: 225 },
    { day: "Fri", strength: 230 },
    { day: "Sat", strength: 230 },
    { day: "Sun", strength: 235 },
  ];

  const monthlyData = [
    { week: "W1", strength: 215 },
    { week: "W2", strength: 220 },
    { week: "W3", strength: 225 },
    { week: "W4", strength: 235 },
  ];

  const currentData =
    progressView === "weekly" ? weeklyData : monthlyData;

  // Calendar data
  const workoutDays = {
    1: { type: "completed", brief: "Upper Body • Completed" },
    2: { type: "completed", brief: "Lower Body • Completed" },
    3: { type: "rest", brief: "Rest Day" },
    4: { type: "current", brief: "Back & Biceps • Today" },
    5: { type: "planned", brief: "Shoulder Day" },
    6: { type: "planned", brief: "Arms & Core" },
    7: { type: "rest", brief: "Rest & Recovery" },
  };

  const getDayColor = (type: string) => {
    switch (type) {
      case "completed":
        return "bg-[#92B8FF]/20 border-[#92B8FF]";
      case "current":
        return "bg-[#AECEFF]/30 border-[#AECEFF] ring-1 ring-[#AECEFF]";
      case "planned":
        return "bg-white/5 border-white/20";
      case "rest":
        return "bg-[#9470DC]/10 border-[#9470DC]/30";
      default:
        return "bg-white/5 border-white/10";
    }
  };

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10 px-6 py-8 space-y-5">
        {/* Top Header Section */}
        <div className="flex items-start justify-between mb-2">
          {/* Left side - Greeting and User */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("profile")}
              className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/20"
            >
              <img
                src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDQ2MTQ0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
            <div>
              <p className="text-white/60 text-xs">
                Good Morning
              </p>
              <h2 className="text-white text-lg">
                {userName || "Adam Kenway"}
              </h2>
            </div>
          </div>

          {/* Right side - Notification */}
          <button
            onClick={() => onNavigate("notifications")}
            className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#92B8FF] rounded-full shadow-lg shadow-[#92B8FF]/50"></div>
          </button>
        </div>

        {/* Motivational Quote - With Gradient */}
        <div className="relative rounded-2xl overflow-hidden p-6 mt-4">
          {/* Corner glows */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-[#92B8FF]/15 rounded-full blur-xl" />
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#92B8FF]/20 via-[#9470DC]/20 to-[#A586E4]/20" />
          <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />

          {/* Content */}
          <div className="relative z-10">
            <p className="text-white text-center italic leading-relaxed font-bold font-normal">
              {todayQuote}
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#92B8FF]" />
            <h3 className="text-white text-lg">Statistics</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Calories */}
            <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Bottom right glow */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#92B8FF]/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-white/60 text-sm text-[rgb(255,255,255)]">
                    Calories
                  </p>
                  <div className="p-1.5 rounded-lg bg-white/5">
                    <Flame className="w-4 h-4 text-orange-400" />
                  </div>
                </div>
                <p className="text-[#92B8FF] text-2xl">
                  1200{" "}
                  <span className="text-white/50 text-sm text-[rgb(255,255,255)]">
                    Kcal
                  </span>
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Bottom right glow */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#AECEFF]/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-white/60 text-sm text-[rgb(255,255,255)]">
                    Walking
                  </p>
                  <div className="p-1.5 rounded-lg bg-white/5">
                    <Footprints className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <p className="text-[#AECEFF] text-2xl">
                  9560{" "}
                  <span className="text-white/50 text-sm text-[rgb(255,255,255)]">
                    Steps
                  </span>
                </p>
              </div>
            </div>

            {/* Heart Beats */}
            <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Bottom right glow */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#C9E4FF]/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-white/60 text-sm text-[rgb(255,255,255)]">
                    Heart Beats
                  </p>
                  <div className="p-1.5 rounded-lg bg-white/5">
                    <Heart className="w-4 h-4 text-red-400" />
                  </div>
                </div>
                <p className="text-[#C9E4FF] text-2xl">
                  73{" "}
                  <span className="text-white/50 text-sm text-[rgb(255,255,255)]">
                    bpm
                  </span>
                </p>
              </div>
            </div>

            {/* Workouts */}
            <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Bottom right glow */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#B29AE8]/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-white/60 text-sm text-[rgb(255,255,255)]">
                    Workouts
                  </p>
                  <div className="p-1.5 rounded-lg bg-white/5">
                    <Dumbbell className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
                <p className="text-[#B29AE8] text-2xl">
                  14{" "}
                  <span className="text-white/50 text-sm text-[rgb(255,255,255)]">
                    /20
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Peak Energy Time - Outside Box Style */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-[#9470DC]" />
            <h3 className="text-white text-lg">
              Peak Energy Time
            </h3>
          </div>
          <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Top left glow */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#9470DC]/15 rounded-full blur-xl" />
            <div className="relative z-10">
              <p className="text-[#B29AE8] text-xl">
                2:00 PM - 4:00 PM
              </p>
              <p className="text-white/50 text-sm mt-2 text-[rgba(255,255,255,0.8)]">
                Best time for you based on your AI Analysis
              </p>
            </div>
          </div>
        </div>

        {/* My Workout Plans */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-[#AECEFF]" />
            <h3 className="text-white text-lg">
              My Workout Plans
            </h3>
          </div>
          <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Top right gradient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#AECEFF]/30 to-transparent rounded-full blur-2xl" />

            <div className="relative z-10">
              {/* View All Button */}
              <button
                onClick={() => onNavigate("workout-plans")}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm transition-all mb-4 flex items-center justify-center gap-2"
              >
                <span className="text-[rgb(255,255,255)]">View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {["S", "M", "T", "W", "T", "F", "S"].map(
                  (day, i) => (
                    <div
                      key={i}
                      className="text-center text-white/50 text-xs mb-1 text-[rgb(255,255,255)]"
                    >
                      {day}
                    </div>
                  ),
                )}
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                  const workout =
                    workoutDays[
                      day as keyof typeof workoutDays
                    ];
                  const isSelected = selectedDay === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`aspect-square rounded-xl border transition-all duration-300 ${
                        workout
                          ? getDayColor(workout.type)
                          : "bg-white/5 border-white/10"
                      } ${
                        isSelected
                          ? "scale-105 shadow-lg"
                          : "hover:scale-105"
                      } flex items-center justify-center relative`}
                    >
                      <span className="text-white text-sm">
                        {day}
                      </span>
                      {workout &&
                        workout.type === "completed" && (
                          <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#92B8FF]" />
                        )}
                      {workout && workout.type === "rest" && (
                        <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#9470DC]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Day Info */}
              {selectedDay &&
                workoutDays[
                  selectedDay as keyof typeof workoutDays
                ] && (
                  <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white/70 text-sm">
                      {
                        workoutDays[
                          selectedDay as keyof typeof workoutDays
                        ].brief
                      }
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Strength Progression - Clickable */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#92B8FF]" />
            <h3 className="text-white text-lg">
              Strength Progress
            </h3>
          </div>
          <div
            onClick={() => onNavigate("progress")}
            className="relative w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer overflow-hidden"
          >
            {/* Top right gradient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#92B8FF]/30 to-transparent rounded-full blur-2xl" />
            <div className="relative z-10 p-5 pb-0">
              <div className="flex items-center justify-end mb-4">
                <span className="text-white/50 text-sm">
                  View All →
                </span>
              </div>

              {/* Toggle Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProgressView("weekly");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs transition-all ${
                    progressView === "weekly"
                      ? "bg-[#92B8FF] text-white shadow-lg shadow-[#92B8FF]/20"
                      : "bg-white/5 text-white/60 border border-white/10"
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProgressView("monthly");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs transition-all ${
                    progressView === "monthly"
                      ? "bg-[#92B8FF] text-white shadow-lg shadow-[#92B8FF]/20"
                      : "bg-white/5 text-white/60 border border-white/10"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Line Chart */}
            <div className="px-5 pb-[20px] pt-[0px] pr-[20px] pl-[20px] m-[0px]">
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={currentData}>
                  <XAxis
                    dataKey={
                      progressView === "weekly" ? "day" : "week"
                    }
                    stroke="#ffffff40"
                    tick={{ fill: "#ffffff60", fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#ffffff40"
                    tick={{ fill: "#ffffff60", fontSize: 11 }}
                    domain={["dataMin - 5", "dataMax + 5"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(26, 29, 46, 0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="strength"
                    stroke="#9470DC"
                    strokeWidth={3}
                    dot={{ fill: "#9470DC", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Achievements - Clickable */}
        <div
          onClick={() => onNavigate("achievements")}
          className="relative w-full p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors text-left cursor-pointer overflow-hidden"
        >
          {/* Top right glow */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#9470DC]/15 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#92B8FF]" />
                <h3 className="text-white text-lg">
                  Achievements
                </h3>
              </div>
              <span className="text-white/50 text-sm">
                View All →
              </span>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">
                    Minimum Target
                  </span>
                  <span className="text-[#92B8FF]">
                    Completed ✓
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-[#92B8FF] to-[#AECEFF]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">
                    Maximum Target
                  </span>
                  <span className="text-white/60">60%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-3/5 bg-gradient-to-r from-[#9470DC] to-[#B29AE8]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}