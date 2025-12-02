import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, TrendingUp, TrendingDown, Camera } from 'lucide-react';

export function ProgressScreen({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month' | 'year' | 'alltime'>('today');

  // Mock data for weight progress
  const weightData = {
    week: [
      { day: 'Mon', weight: 79 },
      { day: 'Tue', weight: 78.8 },
      { day: 'Wed', weight: 78.5 },
      { day: 'Thu', weight: 78.7 },
      { day: 'Fri', weight: 78.3 },
      { day: 'Sat', weight: 78.1 },
      { day: 'Sun', weight: 78 },
    ],
    month: [
      { week: 'W1', weight: 80 },
      { week: 'W2', weight: 79.5 },
      { week: 'W3', weight: 79 },
      { week: 'W4', weight: 78 },
    ],
    year: [
      { month: 'Jan', weight: 85 },
      { month: 'Feb', weight: 84 },
      { month: 'Mar', weight: 83 },
      { month: 'Apr', weight: 82 },
      { month: 'May', weight: 81.5 },
      { month: 'Jun', weight: 81 },
      { month: 'Jul', weight: 80.5 },
      { month: 'Aug', weight: 80 },
      { month: 'Sep', weight: 79.5 },
      { month: 'Oct', weight: 79 },
      { month: 'Nov', weight: 78.5 },
      { month: 'Dec', weight: 78 },
    ],
  };

  // Mock data for strength progress
  const strengthData = {
    week: [
      { day: 'Mon', strength: 220 },
      { day: 'Tue', strength: 220 },
      { day: 'Wed', strength: 225 },
      { day: 'Thu', strength: 225 },
      { day: 'Fri', strength: 230 },
      { day: 'Sat', strength: 230 },
      { day: 'Sun', strength: 235 },
    ],
    month: [
      { week: 'W1', strength: 215 },
      { week: 'W2', strength: 220 },
      { week: 'W3', strength: 225 },
      { week: 'W4', strength: 235 },
    ],
    year: [
      { month: 'Jan', strength: 185 },
      { month: 'Feb', strength: 190 },
      { month: 'Mar', strength: 195 },
      { month: 'Apr', strength: 200 },
      { month: 'May', strength: 205 },
      { month: 'Jun', strength: 210 },
      { month: 'Jul', strength: 215 },
      { month: 'Aug', strength: 220 },
      { month: 'Sep', strength: 225 },
      { month: 'Oct', strength: 230 },
      { month: 'Nov', strength: 232 },
      { month: 'Dec', strength: 235 },
    ],
  };

  // Mock data for active time (in minutes)
  const activeTimeData = {
    week: [
      { day: 'Mon', time: 45 },
      { day: 'Tue', time: 60 },
      { day: 'Wed', time: 50 },
      { day: 'Thu', time: 0 },
      { day: 'Fri', time: 75 },
      { day: 'Sat', time: 40 },
      { day: 'Sun', time: 35 },
    ],
    month: [
      { week: 'W1', time: 180 },
      { week: 'W2', time: 220 },
      { week: 'W3', time: 200 },
      { week: 'W4', time: 265 },
    ],
    year: [
      { month: 'Jan', time: 720 },
      { month: 'Feb', time: 680 },
      { month: 'Mar', time: 750 },
      { month: 'Apr', time: 800 },
      { month: 'May', time: 820 },
      { month: 'Jun', time: 780 },
      { month: 'Jul', time: 850 },
      { month: 'Aug', time: 900 },
      { month: 'Sep', time: 880 },
      { month: 'Oct', time: 920 },
      { month: 'Nov', time: 890 },
      { month: 'Dec', time: 865 },
    ],
  };

  // Muscle groups data for month view
  const muscleGroups = [
    { name: 'Chest', percentage: 12, color: '#FF6B8A', position: { top: '30%', left: '50%' } },
    { name: 'Shoulders', percentage: 8, color: '#B29AE8', position: { top: '25%', left: '30%' } },
    { name: 'Biceps', percentage: 15, color: '#92B8FF', position: { top: '40%', left: '20%' } },
    { name: 'Core', percentage: 10, color: '#AECEFF', position: { top: '50%', left: '50%' } },
    { name: 'Quads', percentage: 18, color: '#C9E4FF', position: { top: '70%', left: '50%' } },
  ];

  const tabs = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
    { id: 'alltime', label: 'All Time' },
  ];

  const getHighestActiveTime = (data: any[]) => {
    if (data.length === 0) return { label: '', value: 0 };
    const highest = data.reduce((max, item) => item.time > max.time ? item : max, data[0]);
    return { 
      label: highest.day || highest.week || highest.month, 
      value: highest.time 
    };
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-8">
          <h1 className="text-2xl text-white mb-6">Progress</h1>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white shadow-lg shadow-[#92B8FF]/30'
                    : 'bg-white/5 text-white/60 border border-white/10 backdrop-blur-xl hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 space-y-6">
          {/* Today View */}
          {activeTab === 'today' && (
            <div className="space-y-6">
              {/* Today Stats */}
              <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#92B8FF]/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h2 className="text-white mb-4">Today's Activity</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-white/60 text-xs mb-1">Workouts</p>
                      <p className="text-2xl text-[#92B8FF]">2</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-xs mb-1">Minutes</p>
                      <p className="text-2xl text-[#AECEFF]">75</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-xs mb-1">Calories</p>
                      <p className="text-2xl text-[#9470DC]">580</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Active Time Graph */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#AECEFF]/30 to-transparent rounded-full blur-2xl" />
                <div className="relative z-10">
                  <h3 className="text-white mb-4">Today's Active Time</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { hour: '6AM', time: 0 },
                      { hour: '8AM', time: 45 },
                      { hour: '10AM', time: 0 },
                      { hour: '12PM', time: 0 },
                      { hour: '2PM', time: 0 },
                      { hour: '4PM', time: 30 },
                      { hour: '6PM', time: 0 },
                      { hour: '8PM', time: 0 },
                    ]}>
                      <XAxis 
                        dataKey="hour" 
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 11 }}
                      />
                      <YAxis 
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 11 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(26, 29, 46, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff'
                        }}
                      />
                      <Bar 
                        dataKey="time" 
                        fill="#AECEFF"
                        radius={[8, 8, 0, 0]}
                        activeBar={{ fill: '#92B8FF' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Today's Plan Section */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9470DC]/30 to-transparent rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#92B8FF]" />
                    <h3 className="text-white">Today's Plan</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#92B8FF] mt-2" />
                      <div className="flex-1">
                        <p className="text-white text-sm">Morning: Upper Body Strength</p>
                        <p className="text-white/60 text-xs mt-1">Bench Press, Rows, Shoulder Press</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#AECEFF] mt-2" />
                      <div className="flex-1">
                        <p className="text-white text-sm">Evening: Core & Cardio</p>
                        <p className="text-white/60 text-xs mt-1">Planks, Crunches, 20 min run</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 opacity-50">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2" />
                      <div className="flex-1">
                        <p className="text-white text-sm">Optional: Stretching Session</p>
                        <p className="text-white/60 text-xs mt-1">15 min flexibility routine</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#92B8FF]" />
                  <h3 className="text-white">Today's Summary</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Great work today! You completed 2 workouts focusing on upper body. Your bench press reached a new personal best of 235 lbs.
                </p>
              </div>
            </div>
          )}

          {/* Week, Month, Year, All Time Views */}
          {(activeTab === 'week' || activeTab === 'month' || activeTab === 'year' || activeTab === 'alltime') && (
            <div className="space-y-6">
              {/* Update Metrics Button - Week Tab Only */}
              {activeTab === 'week' && onNavigate && (
                <button
                  onClick={() => onNavigate('photo-capture')}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] hover:from-[#AECEFF] hover:to-[#92B8FF] transition-all duration-300 shadow-lg shadow-[#92B8FF]/20 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-white">Update Metrics</span>
                </button>
              )}

              {/* Weight Progress */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#92B8FF]/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white">Weight Progress</h3>
                    <div className="flex items-center gap-1 text-[#92B8FF] text-sm">
                      <TrendingDown className="w-4 h-4" />
                      <span>-2.0 kg</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={activeTab === 'alltime' ? weightData.year : weightData[activeTab]}>
                      <XAxis 
                        dataKey={activeTab === 'week' ? 'day' : activeTab === 'month' ? 'week' : 'month'} 
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 12 }}
                        domain={['dataMin - 2', 'dataMax + 2']}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(26, 29, 46, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#92B8FF" 
                        strokeWidth={3}
                        dot={{ fill: '#92B8FF', r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Strength Progress */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#9470DC]/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white">Strength Gain</h3>
                    <div className="flex items-center gap-1 text-[#AECEFF] text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>+20 lbs</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={activeTab === 'alltime' ? strengthData.year : strengthData[activeTab]}>
                      <XAxis 
                        dataKey={activeTab === 'week' ? 'day' : activeTab === 'month' ? 'week' : 'month'} 
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 12 }}
                        domain={['dataMin - 10', 'dataMax + 10']}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(26, 29, 46, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="strength" 
                        stroke="#9470DC" 
                        strokeWidth={3}
                        dot={{ fill: '#9470DC', r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Active Time */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#AECEFF]/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white">Active Time</h3>
                    <div className="text-[#AECEFF] text-sm">
                      Peak: {getHighestActiveTime(activeTab === 'alltime' ? activeTimeData.year : activeTimeData[activeTab]).label}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={activeTab === 'alltime' ? activeTimeData.year : activeTimeData[activeTab]}>
                      <XAxis 
                        dataKey={activeTab === 'week' ? 'day' : activeTab === 'month' ? 'week' : 'month'} 
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(26, 29, 46, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff'
                        }}
                      />
                      <Bar 
                        dataKey="time" 
                        fill="#AECEFF"
                        radius={[8, 8, 0, 0]}
                        activeBar={{ fill: '#92B8FF' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Summary for Week, Month, Year */}
              {(activeTab === 'week' || activeTab === 'month' || activeTab === 'year') && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#92B8FF]/10 to-[#9470DC]/10 backdrop-blur-xl border border-[#92B8FF]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#92B8FF]/20 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-[#92B8FF]" />
                      <h3 className="text-white">AI Summary</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-white/80 text-sm mb-1">📈 Highs</p>
                        <p className="text-white/70 text-sm">
                          {activeTab === 'week' && "Excellent consistency! Hit a new bench press PR of 235 lbs on Friday. Active time peaked at 75 minutes."}
                          {activeTab === 'month' && "Outstanding progress this month! Strength increased by 20 lbs across major lifts. Muscle density in chest improved by 12%. Week 4 showed peak performance."}
                          {activeTab === 'year' && "Phenomenal year! Lost 7kg while gaining significant strength. Bench press increased from 185 to 235 lbs. Consistency rate of 82% maintained."}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm mb-1">📉 Lows</p>
                        <p className="text-white/70 text-sm">
                          {activeTab === 'week' && "Missed workout on Thursday. Consider focusing more on lower body to balance muscle development."}
                          {activeTab === 'month' && "Lower body workouts decreased slightly. Cardio endurance needs more attention to support overall fitness goals."}
                          {activeTab === 'year' && "Summer months (June-July) showed decreased activity. Consider planning ahead for busy periods to maintain consistency."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3D Body Diagram - Month Only */}
              {activeTab === 'month' && (
                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-white mb-4">Muscle Group Progress</h3>
                    <div className="relative h-[500px] bg-gradient-to-b from-[#1a1d2e] to-[#0f1220] rounded-2xl p-6 overflow-hidden">
                      {/* Simplified body diagram */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Body silhouette */}
                        <svg width="200" height="400" viewBox="0 0 200 400" className="opacity-40">
                          {/* Head */}
                          <ellipse cx="100" cy="40" rx="25" ry="30" fill="#4a5568" />
                          {/* Neck */}
                          <rect x="90" y="60" width="20" height="20" fill="#4a5568" />
                          {/* Shoulders */}
                          <ellipse cx="60" cy="90" rx="20" ry="15" fill="#6B5B95" opacity="0.7" />
                          <ellipse cx="140" cy="90" rx="20" ry="15" fill="#6B5B95" opacity="0.7" />
                          {/* Torso */}
                          <rect x="70" y="80" width="60" height="80" rx="10" fill="#4a5568" />
                          {/* Chest highlight */}
                          <rect x="75" y="85" width="50" height="40" rx="8" fill="#FF6B8A" opacity="0.6" />
                          {/* Core highlight */}
                          <rect x="80" y="130" width="40" height="30" rx="6" fill="#AECEFF" opacity="0.5" />
                          {/* Arms */}
                          <rect x="40" y="90" width="15" height="70" rx="7" fill="#4a5568" />
                          <rect x="145" y="90" width="15" height="70" rx="7" fill="#4a5568" />
                          {/* Biceps highlight */}
                          <ellipse cx="47" cy="110" rx="10" ry="20" fill="#92B8FF" opacity="0.7" />
                          <ellipse cx="153" cy="110" rx="10" ry="20" fill="#92B8FF" opacity="0.7" />
                          {/* Legs */}
                          <rect x="75" y="160" width="20" height="100" rx="10" fill="#4a5568" />
                          <rect x="105" y="160" width="20" height="100" rx="10" fill="#4a5568" />
                          {/* Quads highlight */}
                          <rect x="76" y="170" width="18" height="50" rx="8" fill="#C9E4FF" opacity="0.7" />
                          <rect x="106" y="170" width="18" height="50" rx="8" fill="#C9E4FF" opacity="0.7" />
                        </svg>

                        {/* Muscle group labels with lines */}
                        {muscleGroups.map((muscle, index) => (
                          <div 
                            key={muscle.name}
                            className="absolute"
                            style={{ 
                              top: muscle.position.top, 
                              left: muscle.position.left,
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            {/* Connecting line */}
                            <div 
                              className="absolute w-16 h-0.5 rounded-full"
                              style={{ 
                                backgroundColor: muscle.color,
                                left: index % 2 === 0 ? '100%' : '-100%',
                                top: '50%',
                                opacity: 0.6
                              }}
                            />
                            {/* Label */}
                            <div 
                              className="absolute whitespace-nowrap px-3 py-2 rounded-xl backdrop-blur-xl border"
                              style={{ 
                                backgroundColor: `${muscle.color}20`,
                                borderColor: `${muscle.color}40`,
                                left: index % 2 === 0 ? 'calc(100% + 64px)' : 'auto',
                                right: index % 2 === 0 ? 'auto' : 'calc(100% + 64px)',
                                top: '50%',
                                transform: 'translateY(-50%)'
                              }}
                            >
                              <p className="text-white text-xs mb-0.5">{muscle.name}</p>
                              <p className="text-sm" style={{ color: muscle.color }}>
                                +{muscle.percentage}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}