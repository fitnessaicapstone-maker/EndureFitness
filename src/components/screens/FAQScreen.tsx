import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQScreenProps {
  onNavigate: (screen: string) => void;
}

export function FAQScreen({ onNavigate }: FAQScreenProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'workouts' | 'subscription'>('general');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = {
    general: [
      {
        question: 'How do I get started with Endure?',
        answer: 'Simply complete the onboarding process by entering your fitness goals, body metrics, and preferences. Our AI will create a personalized workout plan for you.',
      },
      {
        question: 'Can I sync Endure with other fitness apps?',
        answer: 'Yes! Endure integrates with popular fitness trackers and health apps to provide comprehensive tracking of your fitness journey.',
      },
      {
        question: 'How is my data protected?',
        answer: 'We use industry-standard encryption and security measures to protect your personal data. Your information is never shared with third parties without your consent.',
      },
      {
        question: 'Can I use Endure offline?',
        answer: 'Yes, most features work offline. Your data will sync automatically when you reconnect to the internet.',
      },
    ],
    workouts: [
      {
        question: 'How are workout plans generated?',
        answer: 'Our AI analyzes your fitness goals, current fitness level, available equipment, and preferences to create personalized workout plans that adapt to your progress.',
      },
      {
        question: 'Can I create custom workouts?',
        answer: 'Absolutely! You can create and save custom workouts, or modify any AI-generated workout to fit your needs.',
      },
      {
        question: 'How often should I update my body metrics?',
        answer: 'We recommend updating your metrics every 4-6 weeks. Remember, you can only edit your initial metrics twice to maintain accurate progress tracking.',
      },
      {
        question: 'What if I miss a workout?',
        answer: 'No problem! Our AI will automatically adjust your plan. Consistency is key, but missing occasional workouts won\'t derail your progress.',
      },
    ],
    subscription: [
      {
        question: 'What\'s included in the free plan?',
        answer: 'The Basic plan includes AI workout tracking, basic analytics, and custom workouts. Perfect for getting started with your fitness journey.',
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.',
      },
      {
        question: 'How do I upgrade my plan?',
        answer: 'Go to Profile > Payment & Subscriptions > Subscription Plans and select the plan you want. Changes take effect immediately.',
      },
      {
        question: 'Is there a family plan available?',
        answer: 'We\'re currently working on family and group plans. Stay tuned for updates!',
      },
    ],
  };

  const currentFAQs = faqs[activeTab];

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-[#0a0d1a] via-[#1a1d2e] to-[#0f1220] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#AECEFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A586E4]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-6 flex items-center gap-4">
          <button 
            onClick={() => onNavigate('profile')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">Frequently Asked Questions</h1>
        </div>

        {/* Category Tabs */}
        <div className="px-6 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                activeTab === 'general'
                  ? 'bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white shadow-lg shadow-[#92B8FF]/30'
                  : 'bg-white/5 text-white/60 border border-white/10'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('workouts')}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                activeTab === 'workouts'
                  ? 'bg-gradient-to-r from-[#9470DC] to-[#B29AE8] text-white shadow-lg shadow-[#9470DC]/30'
                  : 'bg-white/5 text-white/60 border border-white/10'
              }`}
            >
              Workouts
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                activeTab === 'subscription'
                  ? 'bg-gradient-to-r from-[#A586E4] to-[#C9E4FF] text-white shadow-lg shadow-[#A586E4]/30'
                  : 'bg-white/5 text-white/60 border border-white/10'
              }`}
            >
              Subscription
            </button>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="px-6 space-y-3">
          {currentFAQs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform ${
                    openFAQ === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFAQ === idx && (
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="px-6 mt-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#92B8FF]/10 to-[#9470DC]/10 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-2">Still have questions?</h3>
            <p className="text-white/60 text-sm mb-4">
              Our support team is here to help you 24/7.
            </p>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-[#92B8FF]/50 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
