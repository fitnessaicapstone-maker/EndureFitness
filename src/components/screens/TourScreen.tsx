import { useState } from 'react';
import { Button } from '../ui/button';
import { Home, Dumbbell, TrendingUp, Bot, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourScreenProps {
  onNavigate: (screen: string) => void;
}

export function TourScreen({ onNavigate }: TourScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Home,
      title: 'Home',
      description: 'Track progress, view stats, and daily motivation',
    },
    {
      icon: Dumbbell,
      title: 'Workouts',
      description: 'Create custom workouts or AI-generated routines',
    },
    {
      icon: TrendingUp,
      title: 'Progress',
      description: 'Monitor improvements with detailed analytics',
    },
    {
      icon: Bot,
      title: 'AI Coach',
      description: 'Real-time form feedback and guidance',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNavigate('home');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex justify-end p-6">
        <Button variant="ghost" onClick={() => onNavigate('home')} className="text-black">
          Skip Tour
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-md text-center">
          <div className="border-2 border-black rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-12">
            <CurrentIcon className="w-16 h-16 text-black" />
          </div>
          
          <h1 className="text-4xl mb-6 text-black">{slides[currentSlide].title}</h1>
          <p className="text-gray-600 mb-12 text-lg">{slides[currentSlide].description}</p>
          
          <div className="flex justify-center gap-2 mb-12">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-black' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex gap-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="flex-1 border-2 border-black"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={handleNext} 
          className="flex-1 bg-black text-white hover:bg-gray-900 border-2 border-black"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          {currentSlide < slides.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
