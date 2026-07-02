import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, Plus, Clock, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIChatScreenProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// ================== Fitness AI 系统提示 ==================
const SYSTEM_PROMPT = `
You are "Endure AI Coach", a professional personal trainer.


Your focus:
1. Create effective and safe workout plans.
2. Provide clear and simple exercise form guidance.

Workout Plans:
- Structure by days (Day 1, Day 2, ...)
- Each exercise must include:
  • English name (optional Chinese)
  • sets x reps
  • target muscle group
  • rest time
- Adapt to user's goal (fat loss / muscle gain / strength)
- Adapt to user's experience (beginner / intermediate / advanced)
- Give simple progression tips

Exercise Form Guidance:
- Explain starting position, movement path, breathing
- List common mistakes and how to fix them
- Give 2–3 coaching cues like “chest up”, “knees track over toes”

If user mentions pain:
- Never tell them to push through pain
- Suggest reducing weight, ROM, or alternative safer movements

Your tone:
- Clear, simple, supportive
- When answering in Chinese, keep exercise names English+Chinese.
`;

// ================== 调用 OpenAI（Web 版） ==================
async function callFitnessAI(userMessage: string): Promise<string> {
  // ⚠️ 这里的 key 你要按你项目的方式配置：
  // CRA:  REACT_APP_OPENAI_API_KEY
  // Vite: VITE_OPENAI_API_KEY（那就用 import.meta.env）
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return '❌ Missing OpenAI API Key. Please check your environment variable.';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.4-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      console.error('OpenAI Error:', response.status, await response.text());
      return '❌ AI service failed. Please try again later.';
    }

    const data = await response.json();
    const aiReply = data?.choices?.[0]?.message?.content;

    return aiReply?.trim() ?? '❌ AI returned empty response. Please try again.';
  } catch (err) {
    console.error('OpenAI request error:', err);
    return '❌ Network error or AI service unavailable. Please check your connection.';
  }
}

export function AIChatScreen({ onNavigate }: AIChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm your Endure AI assistant. I'm here to help you with:\n\n• Creating personalized workout plans\n• Tracking your fitness progress\n• Answering exercise and nutrition questions\n• Providing form tips and motivation\n\nWhat can I help you with today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || loading) return;

    // 先加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // 调用真 AI
    const aiText = await callFitnessAI(trimmed);

    const aiMessage: Message = {
      id: `${Date.now()}-ai`,
      text: aiText,
      sender: 'ai',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden flex flex-col">
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative flex flex-col">
  
    {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#92B8FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9470DC]/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative z-10 px-6 py-6 flex items-center justify-between border-b border-white/10">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 
                   flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#92B8FF] to-[#9470DC] 
                        flex items-center justify-center shadow-lg shadow-[#92B8FF]/30">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-white text-xl">Endure AI</h1>
        </div>

        <button
          onClick={() => {
            /* TODO: Open chat history */
          }}
          className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 
                   flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <Clock className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 relative z-10">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#92B8FF] to-[#9470DC] 
                                  flex items-center justify-center shadow-lg shadow-[#92B8FF]/20">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/60 text-xs">AI Assistant</span>
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl backdrop-blur-xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-[#92B8FF] to-[#9470DC] text-white ml-auto'
                      : 'bg-white/10 border border-white/20 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p
                    className={`text-[10px] mt-2 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-white/50'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="text-xs text-white/50 mt-2">Thinking about your QUESITON...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions - Moved above input */}
      <div className="relative z-10 px-6 py-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            '💪 Create workout plan',
            '📊 Track my progress',
            '🍎 Nutrition advice',
            '❓ Exercise form tips',
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => setInputText(action)}
              className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 
                       text-white text-sm hover:bg-white/10 transition-all whitespace-nowrap flex-shrink-0"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 px-6 pb-6">
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-end gap-3">
          {/* Add Button */}
          <button
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 
                     flex items-center justify-center transition-all flex-shrink-0"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>

          {/* Text Input */}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            rows={1}
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm 
                     focus:outline-none resize-none max-h-32 py-2"
            style={{ minHeight: '36px' }}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || loading}
            className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#92B8FF] to-[#9470DC] 
                     hover:shadow-lg hover:shadow-[#92B8FF]/30 transition-all 
                     flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed 
                     flex-shrink-0"
          >
            {loading ? (
              <span className="text-[10px] text-white">...</span>
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
