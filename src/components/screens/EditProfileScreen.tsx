import { ChevronLeft, Camera } from 'lucide-react';
import { useState } from 'react';

interface EditProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function EditProfileScreen({ onNavigate }: EditProfileScreenProps) {
  const [formData, setFormData] = useState({
    name: 'Adam Kenway',
    email: 'adam.kenway@gmail.com',
    phone: '+16102458921',
  });

  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1758523672156-7a7b62d701f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwbWFuJTIwZmFjZSUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDU0MjQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');

  const handleSave = () => {
    // Save profile changes
    onNavigate('profile');
  };

  const handleImageChange = () => {
    // In a real app, this would open file picker
    // For demo, we'll just show a different image
    alert('Profile picture change functionality');
  };

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
          <h1 className="text-xl text-white">Edit Profile</h1>
        </div>

        <div className="px-6 space-y-4 mt-4">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-3xl object-cover border-2 border-white/20"
              />
              <button
                onClick={handleImageChange}
                className="absolute -bottom-2 -right-2 p-3 rounded-xl bg-[#92B8FF] shadow-lg shadow-[#92B8FF]/30 hover:bg-[#AECEFF] transition-colors"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <label className="text-white/60 text-sm mb-2 block">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
            />
          </div>

          {/* Email */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <label className="text-white/60 text-sm mb-2 block">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
            />
          </div>

          {/* Phone */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <label className="text-white/60 text-sm mb-2 block">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#92B8FF]/50"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#92B8FF] to-[#AECEFF] text-white shadow-lg shadow-[#92B8FF]/30 hover:shadow-[#92B8FF]/50 transition-all mt-6"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}