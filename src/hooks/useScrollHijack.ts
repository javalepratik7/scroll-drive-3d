import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollHijackOptions {
  threshold?: number;
  rotationDuration?: number;
}

export const useScrollHijack = ({ 
  threshold = 0.1, 
  rotationDuration = 100 
}: ScrollHijackOptions = {}) => {
  const [isHijacked, setIsHijacked] = useState(false);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hijackStartRef = useRef<number>(0);
  const accumulatedScrollRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback((e: Event) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const isInView = rect.top <= window.innerHeight * threshold && rect.bottom >= 0;

    if (isInView && !isHijacked && !isComplete) {
      // Start hijacking
      setIsHijacked(true);
      hijackStartRef.current = window.scrollY;
      accumulatedScrollRef.current = 0;
      e.preventDefault();
      document.body.style.overflow = 'hidden';
    }
  }, [isHijacked, isComplete, threshold]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isHijacked || isComplete) return;

    e.preventDefault();
    
    // Accumulate scroll delta
    accumulatedScrollRef.current += e.deltaY;
    
    // Calculate progress (0 to 1)
    const progress = Math.min(Math.max(accumulatedScrollRef.current / rotationDuration, 0), 1);
    setRotationProgress(progress);

    // Check if rotation is complete
    if (progress >= 1 && !isComplete) {
      setIsComplete(true);
      setIsHijacked(false);
      document.body.style.overflow = 'auto';
      
      // Smooth scroll to next section
      setTimeout(() => {
        if (sectionRef.current) {
          const nextSection = sectionRef.current.nextElementSibling;
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 500);
    }
  }, [isHijacked, isComplete, rotationDuration]);

  useEffect(() => {
    const handleScrollPassive = (e: Event) => {
      if (isHijacked) {
        e.preventDefault();
      } else {
        handleScroll(e);
      }
    };

    window.addEventListener('scroll', handleScrollPassive, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScrollPassive);
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto';
    };
  }, [handleScroll, handleWheel, isHijacked]);

  const reset = useCallback(() => {
    setIsHijacked(false);
    setRotationProgress(0);
    setIsComplete(false);
    accumulatedScrollRef.current = 0;
    document.body.style.overflow = 'auto';
  }, []);

  return {
    sectionRef,
    isHijacked,
    rotationProgress,
    isComplete,
    reset
  };
};