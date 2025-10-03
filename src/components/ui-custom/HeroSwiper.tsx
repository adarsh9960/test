'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import FancyButton from './FancyButton';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
}

interface HeroSwiperProps {
  slides: HeroSlide[];
}

export default function HeroSwiper({ slides }: HeroSwiperProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background Image */}
      <div className="relative h-[220px] md:h-[60vh] lg:h-[70vh] w-full">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          fill
          className={`object-cover object-center transition-all duration-1000 ease-in-out hero-image-animate ${
            isAnimating ? 'scale-110 opacity-90' : 'scale-100 opacity-100'
          }`}
          priority={currentSlide === 0}
        />
        {/* Removed the black overlay div */}
      </div>

      {/* Button positioned at bottom left */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20">
        <a
          href="tel:+919876543210"
          className="group relative inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 animate-popup"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <span className="absolute inset-0 rounded-full bg-green-600 opacity-30 animate-ping"></span>
          <span className="absolute inset-0 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></span>
        </a>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-4 md:w-6 md:w-8 pagination-active' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}