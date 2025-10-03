'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Get the positions
    const header = document.querySelector('header');
    const button = buttonRef.current;
    
    if (!header || !button) {
      // Fallback: just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsAnimating(false);
      return;
    }

    const headerRect = header.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Clone the car image for animation
    const carImage = button.querySelector('img');
    if (!carImage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsAnimating(false);
      return;
    }

    // Create a clone for animation
    const carClone = carImage.cloneNode(true) as HTMLImageElement;
    carClone.style.position = 'fixed';
    carClone.style.zIndex = '9999';
    carClone.style.pointerEvents = 'none';
    carClone.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    carClone.style.width = (carImage.offsetWidth * 1.5) + 'px';
    carClone.style.height = (carImage.offsetHeight * 1.5) + 'px';
    carClone.style.filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.5)) brightness(1.2)';
    
    // Set initial position (current button position)
    carClone.style.left = (buttonRect.left - 15) + 'px';
    carClone.style.top = (buttonRect.top - 15) + 'px';
    carClone.style.transform = 'scale(1) rotate(0deg)';
    
    document.body.appendChild(carClone);
    
    // Hide original car image during animation
    carImage.style.opacity = '0';
    
    // Animate car to header position with drifting effect
    setTimeout(() => {
      // Create drifting path - move left and right while going up
      const driftPath = [
        { x: buttonRect.left - 15, y: buttonRect.top - 15 },
        { x: buttonRect.left - 15 - 30, y: buttonRect.top - 100 }, // Drift left
        { x: buttonRect.left - 15 + 20, y: buttonRect.top - 200 }, // Drift right
        { x: buttonRect.left - 15 - 10, y: buttonRect.top - 300 }, // Drift left slightly
        { x: buttonRect.left - 15 + 15, y: headerRect.top + 30 }  // Final position near header
      ];
      
      let currentStep = 0;
      
      const animateDrift = () => {
        if (currentStep < driftPath.length) {
          const target = driftPath[currentStep];
          carClone.style.left = target.x + 'px';
          carClone.style.top = target.y + 'px';
          
          // Add rotation and scaling during drift
          if (currentStep === 1) {
            carClone.style.transform = 'scale(1.2) rotate(-8deg)';
          } else if (currentStep === 2) {
            carClone.style.transform = 'scale(1.4) rotate(5deg)';
          } else if (currentStep === 3) {
            carClone.style.transform = 'scale(1.6) rotate(-3deg)';
          } else if (currentStep === 4) {
            carClone.style.transform = 'scale(1.8) rotate(0deg)';
            carClone.style.filter = 'drop-shadow(0 20px 40px rgba(0,0,0,0.6)) brightness(1.4)';
          }
          
          currentStep++;
          setTimeout(animateDrift, 300); // Each drift step takes 300ms
        } else {
          // Animation complete, clean up and scroll
          setTimeout(() => {
            // Remove clone
            document.body.removeChild(carClone);
            // Show original car image
            carImage.style.opacity = '1';
            // Scroll to top with smooth behavior
            window.scrollTo({ 
              top: 0, 
              behavior: 'smooth' 
            });
            setIsAnimating(false);
          }, 200);
        }
      };
      
      animateDrift();
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <Button
      ref={buttonRef}
      onClick={scrollToTop}
      disabled={isAnimating}
      className="fixed left-[5px] bottom-6 z-40 bg-transparent hover:bg-transparent text-white rounded-full w-20 h-20 p-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 border-2 border-white/30 group"
      aria-label="Scroll to top"
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Pulsing ring effect */}
      <div className="absolute inset-0 rounded-full bg-transparent animate-ping opacity-30"></div>
      
      {/* Inner ring effect */}
      <div className="absolute inset-3 rounded-full bg-transparent animate-pulse opacity-20"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Car Image */}
      <div className="relative z-10 w-12 h-12">
        <img 
          src="/car-icon.png" 
          alt="Scroll to top" 
          className="w-full h-full object-contain transition-all duration-500 transform hover:scale-110"
          style={{ 
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            transition: 'all 0.3s ease'
          }}
        />
      </div>
      
      {/* Ripple effect on hover */}
      <div className="absolute inset-0 rounded-full bg-transparent scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-full border-2 border-white/50 opacity-0 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
        <div className="flex items-center space-x-2">
          <span>🚗</span>
          <span>Back to Top</span>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
      </div>
      
      {/* Loading spinner when animating */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full backdrop-blur-sm">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </Button>
  );
}