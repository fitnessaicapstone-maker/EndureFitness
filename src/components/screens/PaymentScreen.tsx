import { ChevronLeft, CreditCard, Plus, Check } from 'lucide-react';
import { useState } from 'react';

interface PaymentScreenProps {
  onNavigate: (screen: string) => void;
}

export function PaymentScreen({ onNavigate }: PaymentScreenProps) {
  const [activeTab, setActiveTab] = useState<'add-card' | 'subscriptions'>('add-card');

  const savedCards = [
    { last4: '4242', brand: 'Visa', expiry: '12/25' },
    { last4: '5555', brand: 'Mastercard', expiry: '09/26' },
  ];

  const subscriptionPlans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: '/month',
      features: ['AI Workout Tracking', 'Basic Analytics', 'Custom Workouts'],
      color: '#92B8FF',
    },
    {
      name: 'Pro',
      price: '$19.99',
      period: '/month',
      features: ['Everything in Basic', 'Advanced Analytics', 'Personalized AI Coach', 'Priority Support'],
      color: '#9470DC',
      popular: true,
    },
    {
      name: 'Elite',
      price: '$29.99',
      period: '/month',
      features: ['Everything in Pro', 'Nutrition Planning', '1-on-1 Coaching', 'Unlimited Everything'],
      color: '#A586E4',
    },
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
            onClick={() => onNavigate('profile')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">Payment & Subscriptions</h1>
        </div>

        <div className="px-6 space-y-4">
          {/* Saved Cards */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white mb-4">Saved Cards</h3>
            <div className="space-y-3">
              {savedCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#92B8FF]/10">
                      <CreditCard className="w-5 h-5 text-[#92B8FF]" />
                    </div>
                    <div>
                      <p className="text-white">{card.brand} •••• {card.last4}</p>
                      <p className="text-white/50 text-xs">Expires {card.expiry}</p>
                    </div>
                  </div>
                  <button className="text-[#92B8FF] text-sm">Remove</button>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Status */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#92B8FF]/10 to-[#9470DC]/10 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-white mb-1">Current Plan: Pro</h3>
                <p className="text-white/60 text-sm">Active until Dec 30, 2025</p>
              </div>
              <div className="p-2 rounded-full bg-green-500/20">
                <Check className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('add-card')}
              className={`flex-1 py-3 rounded-xl transition-all ${
                activeTab === 'add-card'
                  ? 'bg-[#92B8FF] text-white shadow-lg shadow-[#92B8FF]/20'
                  : 'bg-white/5 text-white/60 border border-white/10'
              }`}
            >
              Add Card
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`flex-1 py-3 rounded-xl transition-all ${
                activeTab === 'subscriptions'
                  ? 'bg-[#92B8FF] text-white shadow-lg shadow-[#92B8FF]/20'
                  : 'bg-white/5 text-white/60 border border-white/10'
              }`}
            >
              Subscription Plans
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'add-card' ? (
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h3 className="text-white mb-4">Add New Card</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
                    />
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-[#92B8FF]/50 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Card
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptionPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden"
                >
                  {plan.popular && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#9470DC] text-white text-xs">
                      Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-white text-xl mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-white text-3xl" style={{ color: plan.color }}>
                        {plan.price}
                      </span>
                      <span className="text-white/50">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-white/80 text-sm">
                        <Check className="w-4 h-4" style={{ color: plan.color }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
                    style={plan.popular ? { 
                      background: `linear-gradient(to right, ${plan.color}20, ${plan.color}10)`,
                      borderColor: plan.color + '40'
                    } : {}}
                  >
                    {plan.popular ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
