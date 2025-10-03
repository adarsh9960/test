'use client';

import React from 'react';
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

interface HeroProps {
  slides: HeroSlide[];
}

export default function Hero({ slides }: HeroProps) {
  // Use only the first slide
  const heroSlide = slides[0];

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background Image */}
      <div className="relative h-[220px] md:h-[60vh] lg:h-[70vh] w-full">
        <Image
          src={heroSlide.image}
          alt={heroSlide.title}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Button positioned at bottom left */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20">
        <a
          href="tel:+919876543210"
          className="group relative inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 animate-popup"
          aria-label="Call us now"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <span className="absolute inset-0 rounded-full bg-green-600 opacity-30 animate-ping"></span>
          <span className="absolute inset-0 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></span>
        </a>
      </div>
    </section>
  );
}