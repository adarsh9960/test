'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AIChat from './AIChat';

// Mobile-Responsive WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    focusable="false"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.565-.075-.194-.672-1.62-.922-2.206-.247-.582-.497-.5-.672-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Mobile-Responsive Phone SVG Icon Component
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    focusable="false"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// Mobile-Responsive Calendar SVG Icon Component
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    focusable="false"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

// Mobile-Responsive Bot/AI SVG Icon Component
const BotIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    focusable="false"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

// Mobile-Responsive Close (X) SVG Icon Component
const CloseIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    focusable="false"
  >
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function CTAFloater() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Show the floater after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCallClick = () => {
    window.open('tel:+919960416025', '_self');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919960416025', '_blank');
  };

  const handleBookingClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAIChatClick = () => {
    setIsChatOpen(true);
    setIsExpanded(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="flex flex-col gap-2 sm:gap-3 animate-fade-in">
          {/* Call Button */}
          <Button
            onClick={handleCallClick}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 group relative overflow-hidden animate-slide-up"
            aria-label="Call Now"
            style={{ animationDelay: '0ms' }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-green-300 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-2 sm:mr-3 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              Call Now: +91 70217 51691
              <div className="absolute right-0 top-1/2 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          </Button>
          
          {/* WhatsApp Button */}
          <Button
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 group relative overflow-hidden animate-slide-up"
            aria-label="Chat on WhatsApp"
            style={{ animationDelay: '100ms' }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-green-400 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-2 sm:mr-3 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              Chat on WhatsApp
              <div className="absolute right-0 top-1/2 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          </Button>
          
          {/* Book Now Button */}
          <Button
            onClick={handleBookingClick}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 group relative overflow-hidden animate-slide-up"
            aria-label="Book Now"
            style={{ animationDelay: '200ms' }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-green-300 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-2 sm:mr-3 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              Book a Ride
              <div className="absolute right-0 top-1/2 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          </Button>
          
          {/* AI Chat Button */}
          <Button
            onClick={handleAIChatClick}
            size="lg"
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 group relative overflow-hidden animate-slide-up"
            aria-label="Chat with AI"
            style={{ animationDelay: '300ms' }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <BotIcon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-purple-300 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-2 sm:mr-3 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              Chat with AI Assistant
              <div className="absolute right-0 top-1/2 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          </Button>
        </div>
      )}
      
      {/* Main CTA Button */}
      <Button
        onClick={toggleExpanded}
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 p-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-white/30 relative overflow-hidden group animate-popup"
        aria-label={isExpanded ? "Close actions" : "Quick actions"}
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30"></div>
        
        {/* Inner ring effect */}
        <div className="absolute inset-2 rounded-full bg-blue-300 animate-pulse opacity-20"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        {/* Icon */}
        <div className="relative z-10">
          {isExpanded ? (
            <CloseIcon className="h-7 w-7 sm:h-8 sm:w-8 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <div className="relative">
              <PhoneIcon className="h-7 w-7 sm:h-8 sm:w-8 group-hover:-translate-y-1 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
              {/* Notification dot ring */}
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-ping opacity-30"></div>
            </div>
          )}
        </div>
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 rounded-full bg-blue-300 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
        
        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </Button>
      
      {/* Tooltip */}
      {!isExpanded && (
        <div className="absolute bottom-full right-0 mb-2 px-2 py-1 sm:px-3 sm:py-2 bg-gray-900 text-white text-xs sm:text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          Quick Contact
          <div className="absolute bottom-0 right-3 sm:right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      )}
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
      
      {/* AI Chat Component */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
