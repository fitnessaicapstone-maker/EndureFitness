import { X, Send } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

interface AIOverlayProps {
  onClose: () => void;
  currentScreen?: string;
}

export function AIOverlay({ onClose, currentScreen }: AIOverlayProps) {
  // Generate contextual greeting based on current screen
  const getContextualGreeting = () => {
    switch (currentScreen) {
      case 'progress':
        return "Hi! I can tell you about your weekly, monthly, and yearly progress. Ask me anything!";
      case 'workouts':
        return "Hi! I can help you with workout recommendations and track your performance. What would you like to know?";
      case 'home':
        return "Hi! Ask me about your progress, workouts, or how you're doing today!";
      default:
        return `Hi! I'm your AI fitness assistant. Ask me anything about ${currentScreen || 'your fitness journey'}!`;
    }
  };

  const [messages, setMessages] = useState([
    { role: 'ai', text: getContextualGreeting() }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    let aiResponse = 'I can help you with workout recommendations, form tips, nutrition advice, and tracking your progress. What would you like to know?';
    
    // Context-aware AI responses based on keywords
    if (input.toLowerCase().includes('workout') || input.toLowerCase().includes('today')) {
      aiResponse = "You're doing great! Today you've completed 2 workouts and burned 450 calories. Compared to last week, you've improved by 15% in consistency. Your bench press has increased from 185 lbs to 205 lbs - that's a 20 lb gain! Keep up the excellent work!";
    } else if (input.toLowerCase().includes('progress') || input.toLowerCase().includes('week')) {
      aiResponse = "This week you've completed 5 workouts for a total of 3.2 hours. You've burned 1,800 calories total. Compared to last month, your average workout duration has increased by 12 minutes and your consistency has improved by 23%. You're on track to meet your goals!";
    } else if (input.toLowerCase().includes('past') || input.toLowerCase().includes('history')) {
      aiResponse = "Looking at your past performance: Last month you averaged 4.2 workouts per week. This month you're at 5.5 - that's a 31% improvement! Your strength gains show bench press +20 lbs, squat +35 lbs, and deadlift +40 lbs over the past 2 months. Excellent progress!";
    }
    
    setMessages([...messages, 
      { role: 'user', text: input },
      { role: 'ai', text: aiResponse }
    ]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <Card className="w-full h-1/2 rounded-t-3xl border-2 border-black rounded-b-none">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-black">AI Assistant</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-black" />
            </button>
          </div>
          
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-black border border-gray-300'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input area with send button */}
          <div className="flex gap-2">
            <Input 
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="border-2 border-black"
            />
            <Button 
              onClick={handleSend}
              className="bg-black text-white hover:bg-gray-900 border-2 border-black"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
