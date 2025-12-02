import { ArrowLeft, Trophy, Flame, Target, Dumbbell, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void;
}

export function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const notifications = [
    {
      icon: Trophy,
      color: '#92B8FF',
      title: 'Achievement Unlocked!',
      message: 'You completed your 7-day streak',
      time: '5 min ago',
      unread: true
    },
    {
      icon: Flame,
      color: '#FF6B6B',
      title: 'Workout Reminder',
      message: 'Time for your evening workout session',
      time: '1 hour ago',
      unread: true
    },
    {
      icon: Target,
      color: '#B29AE8',
      title: 'Goal Progress',
      message: 'You\'re 80% to your weekly goal!',
      time: '3 hours ago',
      unread: false
    },
    {
      icon: Dumbbell,
      color: '#AECEFF',
      title: 'New Workout Available',
      message: 'Check out "Advanced Strength Training"',
      time: 'Yesterday',
      unread: false
    },
    {
      icon: TrendingUp,
      color: '#9470DC',
      title: 'Weekly Report Ready',
      message: 'Your progress report is now available',
      time: '2 days ago',
      unread: false
    },
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 bg-[#1a1d2e] z-50 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-2xl">Notifications</h1>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:bg-white/10 cursor-pointer
                            ${notification.unread ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${notification.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: notification.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-white">{notification.title}</h3>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-[#92B8FF] rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-white/60 text-sm mb-2">{notification.message}</p>
                      <span className="text-white/40 text-xs">{notification.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Clear All Button */}
        <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl">
          <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-all duration-300">
            Clear All Notifications
          </button>
        </div>
      </div>
    </motion.div>
  );
}
