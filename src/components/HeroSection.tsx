import { Button } from '@/components/ui/button';
import TruckScene from './TruckScene';
import { useScrollHijack } from '@/hooks/useScrollHijack';

const HeroSection = () => {
  const { sectionRef, rotationProgress, isHijacked, isComplete } = useScrollHijack({
    threshold: 0.3,
    rotationDuration: 800
  });

  return (
    <section 
      ref={sectionRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Truck Scene */}
      <div className="absolute inset-0 z-0">
        <TruckScene 
          scrollProgress={rotationProgress} 
          isHijacked={isHijacked}
          isComplete={isComplete}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TransportPro
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional logistics solutions with cutting-edge technology. 
            Experience the future of transportation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="transport-glow bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isComplete && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`${isHijacked ? 'animate-pulse' : 'animate-bounce'}`}>
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {isHijacked ? 'Keep scrolling...' : 'Scroll to rotate'}
          </p>
          {isHijacked && (
            <div className="w-20 h-1 bg-muted rounded-full mt-2 mx-auto overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-150 ease-out"
                style={{ width: `${rotationProgress * 100}%` }}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroSection;