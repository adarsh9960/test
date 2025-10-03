'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper/modules';
import { Star, Quote, Users, Award, TrendingUp } from 'lucide-react';
import { useIntersectionObserver, useCountUp } from '@/hooks/useIntersectionObserver';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  averageRating: number;
  totalRatings: number;
}

export default function TestimonialsSection({ 
  testimonials, 
  averageRating, 
  totalRatings 
}: TestimonialsSectionProps) {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.2);
  
  // Use count-up animations that trigger when section is visible
  const animatedRating = useCountUp(averageRating * 10, 2000, isVisible) / 10;
  const animatedCount = useCountUp(totalRatings, 2000, isVisible);
  const animatedSatisfaction = useCountUp(98, 2000, isVisible);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Excellence Speaks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our customers have to say about their experience with Elite Cabs 24X7
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {animatedRating.toFixed(1)}
              </div>
              <p className="text-muted-foreground">Average Rating</p>
              <div className="flex justify-center mt-2">
                {renderStars(animatedRating)}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {animatedCount.toLocaleString()}
              </div>
              <p className="text-muted-foreground">clients</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-2">{animatedSatisfaction}%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Keyboard]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{ enabled: true }}
            navigation={false}
            pagination={false}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-card rounded-lg p-8 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {testimonial.comment}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        
                       
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
