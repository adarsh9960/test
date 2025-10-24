'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper/modules';
import { ArrowRight, Check } from 'lucide-react';
import FancyButton from '@/components/ui-custom/FancyButton';

interface FleetCategory {
  id: number;
  title: string;
  image: string;
  description: string;
  features: string[];
}

interface FleetSectionProps {
  categories: FleetCategory[];
}

export default function FleetSection({ categories }: FleetSectionProps) {
  return (
    <section id="fleet" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Own Fleet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium vehicles maintained to the highest standards for your comfort and safety
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 fleet-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 fleet-card"
            >
              <div className="relative h-48 overflow-hidden fleet-image">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="space-y-2 mb-4">
                  {category.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <FancyButton className="w-full" onClick={() => {
    const whatsappNumber = "+919960416025";
    const message = encodeURIComponent("Hi, I want to book your service.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </FancyButton>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden mb-12">
          <Swiper
            modules={[Autoplay, Keyboard]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{ enabled: true }}
            navigation={false}
            pagination={false}
            className="fleet-swiper"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {category.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <FancyButton className="w-full" onClick={() => {
    const whatsappNumber = "+919960416025";
    const message = encodeURIComponent("Hi, i want to view your fleet.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </FancyButton>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Additional Content */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Why Choose Our Fleet?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our diverse fleet of vehicles is meticulously maintained and regularly serviced to ensure your safety and comfort. From economical sedans for daily commutes to luxury cars for special occasions, we have the perfect vehicle for every need. All our vehicles come with professional drivers, GPS tracking, and 24X7 support.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Safety First</h4>
                <p className="text-sm text-muted-foreground">
                  Regular maintenance, safety checks, and trained drivers ensure your journey is safe and secure.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Comfort Guaranteed</h4>
                <p className="text-sm text-muted-foreground">
                  Clean, well-maintained vehicles with comfortable seating and modern amenities.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Always Available</h4>
                <p className="text-sm text-muted-foreground">
                  24X7 availability with real-time tracking and professional customer support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
