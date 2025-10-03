'use client';

import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

export default function InfiniteCallIcon() {
  const [isPulsing, setIsPulsing] = useState(true);
  const [isFloating, setIsFloating] = useState(true);

  useEffect(() => {
    // Infinite pulse animation
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 1000);

    // Infinite float animation
    const floatInterval = setInterval(() => {
      setIsFloating(prev => !prev);
    }, 2000);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(floatInterval);
    };
  }, []);

  const handleCallClick = () => {
    window.open('tel:+917021751691', '_self');
  };

  return (
    <button
      onClick={handleCallClick}
      className={`
        relative inline-flex items-center justify-center
        w-12 h-12 md:w-14 md:h-14
        bg-green-500 hover:bg-green-600
        text-white rounded-full
        shadow-lg hover:shadow-xl
        transform transition-all duration-300
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-green-300
        ${isFloating ? 'animate-bounce' : ''}
        group
      `}
      aria-label="Call us now"
    >
      {/* Pulse effect */}
      <div className={`
        absolute inset-0
        bg-green-400 rounded-full
        transition-all duration-1000
        ${isPulsing ? 'scale-125 opacity-30' : 'scale-100 opacity-0'}
      `} />
      
      {/* Ring effect */}
      <div className={`
        absolute inset-0
        border-2 border-green-400 rounded-full
        transition-all duration-1000
        ${isPulsing ? 'scale-150 opacity-0' : 'scale-100 opacity-70'}
      `} />

      {/* Phone icon */}
      <Phone className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Tooltip */}
      <div className="
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
        px-3 py-1 bg-gray-800 text-white text-sm rounded-md
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none whitespace-nowrap
        z-20
      ">
        Call Now: +91 70217 51691
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </button>
  );
}