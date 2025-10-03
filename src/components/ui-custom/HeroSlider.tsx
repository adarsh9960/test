'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2500); // 2.5 second auto-switch

    return () => clearInterval(interval);
  }, [slides.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const contentVariants = {
    enter: {
      y: 50,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      y: -50,
      opacity: 0,
    },
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setCurrentSlide((currentSlide + newDirection + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-[250px] md:h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.6 },
            scale: { duration: 0.8, ease: "easeInOut" },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="relative h-full w-full">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            {/* Animated overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <motion.div 
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="max-w-2xl p-4 md:p-6 rounded-xl backdrop-blur-sm"
                style={{ 
                  background: 'rgba(0,0,0,0.25)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
              >
                <motion.div 
                  className="mb-2 md:mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="text-primary font-semibold text-sm md:text-lg uppercase tracking-wide">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.div>

                <motion.h1 
                  className="text-2xl md:text-6xl font-bold text-white mb-3 md:mb-6 leading-tight"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p 
                  className="text-base md:text-xl text-gray-200 mb-4 md:mb-8 leading-relaxed hidden md:block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 md:gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FancyButton variant="booking" className="animate-popup text-sm md:text-base">
                      {slides[currentSlide].primaryCta}
                      <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </FancyButton>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FancyButton variant="secondary" className="animate-popup text-sm md:text-base">
                      {slides[currentSlide].secondaryCta}
                      <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </FancyButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newDirection = index > currentSlide ? 1 : -1;
              setPage([index, newDirection]);
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Mobile-specific styling */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-slide {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
}
