import { ChevronLeft, Send, Camera, Mic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AIWorkoutScreenProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIWorkoutScreen({ onNavigate }: AIWorkoutScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "I'm tracking your workout! Start your first set and I'll count your reps.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Got it! I'm ready to track. Get in position and start your set.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden flex flex-col">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      {/* Top Bar - Back and Camera */}
      <div className="relative z-10 px-6 py-6 flex justify-between items-center">
        <button
          onClick={() => onNavigate('workouts')}
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 
                   flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 
                   flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <Camera className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Camera View - Large Circle */}
      <div className="flex-1 flex items-center justify-center px-6 relative z-10 mb-6">
        <div className="relative">
          {/* Outer circle */}
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[#2a3d5a] to-[#1a2d4a] 
                        flex items-center justify-center shadow-2xl border-4 border-[#1a2d4a]">
            {/* Inner circle */}
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#3a4d6a] to-[#2a3d5a]" />
          </div>
          
          {/* Camera Feed Label */}
          <p className="text-white/40 text-sm text-center mt-6">Camera Feed - Live Tracking</p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="relative z-10 px-6 pb-3 max-h-48 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-[#92B8FF] to-[#9470DC] text-white'
                    : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="relative z-10 px-6 pb-6 pt-3">
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3">
          {/* Mic Button */}
          <button
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 
                     flex items-center justify-center transition-all flex-shrink-0"
          >
            <Mic className="w-5 h-5 text-white" />
          </button>

          {/* Text Input */}
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask AI coach..."
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm 
                     focus:outline-none py-2"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                     hover:shadow-lg hover:shadow-[#92B8FF]/30 transition-all 
                     flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed 
                     flex-shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
