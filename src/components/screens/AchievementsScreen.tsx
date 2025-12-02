import { ChevronLeft, Trophy, Target, Zap, Award, Lock, Flame, Dumbbell, Star, TrendingUp, Calendar, Medal } from 'lucide-react';
import { Progress } from '../ui/progress';
import { useState } from 'react';

interface AchievementsScreenProps {
  onNavigate: (screen: string) => void;
}

export function AchievementsScreen({ onNavigate }: AchievementsScreenProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'strength' | 'endurance' | 'consistency'>('all');

  const inProgress = [
    {
      id: 3,
      name: 'Iron Warrior',
      description: '30-day workout streak',
      progress: 70,
      current: 21,
      target: 30,
      icon: Flame,
      category: 'consistency',
      color: '#92B8FF',
    },
    {
      id: 4,
      name: 'Weight Progression',
      description: 'Auto-increase weight 10 times',
      progress: 60,
      current: 6,
      target: 10,
      icon: TrendingUp,
      category: 'strength',
      color: '#9470DC',
    },
    {
      id: 9,
      name: 'Cardio Champion',
      description: 'Run 50 miles total',
      progress: 45,
      current: 22.5,
      target: 50,
      icon: Zap,
      category: 'endurance',
      color: '#AECEFF',
    },
  ];

  const completed = [
    {
      id: 1,
      name: 'Consistency King',
      description: '7-day workout streak',
      icon: Trophy,
      date: 'Completed Nov 15, 2024',
      category: 'consistency',
      color: '#92B8FF',
    },
    {
      id: 2,
      name: 'Strength Builder',
      description: 'Bench press 225 lbs',
      icon: Dumbbell,
      date: 'Completed Nov 12, 2024',
      category: 'strength',
      color: '#9470DC',
    },
    {
      id: 7,
      name: 'Early Bird',
      description: 'Complete 5 morning workouts',
      icon: Star,
      date: 'Completed Nov 20, 2024',
      category: 'consistency',
      color: '#C9E4FF',
    },
    {
      id: 8,
      name: 'First Steps',
      description: 'Complete your first workout',
      icon: Medal,
      date: 'Completed Oct 28, 2024',
      category: 'all',
      color: '#B29AE8',
    },
  ];

  const locked = [
    {
      id: 5,
      name: 'Beast Mode',
      description: 'Complete 100 workouts',
      current: 45,
      target: 100,
      icon: Lock,
      category: 'consistency',
    },
    {
      id: 6,
      name: 'Endurance Master',
      description: 'Run 100 miles total',
      current: 28,
      target: 100,
      icon: Lock,
      category: 'endurance',
    },
    {
      id: 10,
      name: 'Muscle Mountain',
      description: 'Gain 10 lbs of muscle',
      current: 3,
      target: 10,
      icon: Lock,
      category: 'strength',
    },
    {
      id: 11,
      name: 'Century Club',
      description: 'Deadlift 500 lbs',
      current: 350,
      target: 500,
      icon: Lock,
      category: 'strength',
    },
    {
      id: 12,
      name: 'Marathon Ready',
      description: 'Complete a 26.2 mile run',
      current: 0,
      target: 1,
      icon: Lock,
      category: 'endurance',
    },
    {
      id: 13,
      name: 'Year of Progress',
      description: '365-day workout streak',
      current: 21,
      target: 365,
      icon: Lock,
      category: 'consistency',
    },
  ];

  const filterAchievements = (achievements: any[], category: string) => {
    if (category === 'all') return achievements;
    return achievements.filter(a => a.category === category);
  };

  const tabs = [
    { id: 'all', label: 'All', icon: Trophy },
    { id: 'strength', label: 'Strength', icon: Dumbbell },
    { id: 'endurance', label: 'Endurance', icon: Zap },
    { id: 'consistency', label: 'Streak', icon: Flame },
  ];

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-6 flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">Achievements</h1>
        </div>

        {/* Stats Summary */}
        <div className="px-6 mb-6">
          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 relative overflow-hidden">
            {/* Corner glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#92B8FF]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#9470DC]/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Total</p>
                <p className="text-2xl text-[#92B8FF]">{completed.length + inProgress.length + locked.length}</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Completed</p>
                <p className="text-2xl text-[#AECEFF]">{completed.length}</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">In Progress</p>
                <p className="text-2xl text-[#9470DC]">{inProgress.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 mb-6">
          <div className="flex gap-2 p-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-br from-[#92B8FF]/20 to-[#9470DC]/20 border border-[#92B8FF]/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#92B8FF]' : 'text-white/60'}`} />
                  <span className={`text-xs ${activeTab === tab.id ? 'text-white' : 'text-white/60'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6 space-y-6">
          {/* In Progress - Always at Top */}
          {filterAchievements(inProgress, activeTab).length > 0 && (
            <div>
              <h2 className="text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#92B8FF]" />
                In Progress
              </h2>
              <div className="space-y-3">
                {filterAchievements(inProgress, activeTab).map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={achievement.id} 
                      className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors relative overflow-hidden"
                    >
                      {/* Subtle glow */}
                      <div 
                        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20"
                        style={{ backgroundColor: achievement.color }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-start gap-4 mb-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${achievement.color}20` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: achievement.color }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white mb-1">{achievement.name}</h3>
                            <p className="text-white/60 text-sm">{achievement.description}</p>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/80">{achievement.current} / {achievement.target}</span>
                            <span style={{ color: achievement.color }}>{achievement.progress}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${achievement.progress}%`,
                                background: `linear-gradient(to right, ${achievement.color}, ${achievement.color}dd)`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed Achievements */}
          {filterAchievements(completed, activeTab).length > 0 && (
            <div>
              <h2 className="text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#AECEFF]" />
                Completed
              </h2>
              <div className="space-y-3">
                {filterAchievements(completed, activeTab).map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={achievement.id} 
                      className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors relative overflow-hidden"
                    >
                      {/* Gold glow for completed */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#AECEFF]/10 rounded-full blur-2xl" />
                      
                      <div className="relative z-10 flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${achievement.color}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: achievement.color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white mb-1">{achievement.name}</h3>
                          <p className="text-white/60 text-sm mb-2">{achievement.description}</p>
                          <p className="text-white/40 text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {achievement.date}
                          </p>
                        </div>
                        <div className="text-2xl">🏆</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {filterAchievements(locked, activeTab).length > 0 && (
            <div>
              <h2 className="text-white/70 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-white/50" />
                Locked
              </h2>
              <div className="space-y-3">
                {filterAchievements(locked, activeTab).map((achievement) => {
                  const Icon = achievement.icon;
                  const progress = Math.round((achievement.current / achievement.target) * 100);
                  return (
                    <div 
                      key={achievement.id} 
                      className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 opacity-60 relative overflow-hidden"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl border-2 border-white/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white/40" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white/70 mb-1">{achievement.name}</h3>
                          <p className="text-white/50 text-sm mb-3">{achievement.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div 
                                className="h-full rounded-full bg-white/30 transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-white/50 min-w-[60px] text-right">
                              {achievement.current} / {achievement.target}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
