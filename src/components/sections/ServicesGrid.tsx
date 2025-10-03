'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper/modules';
import { Car, MapPin, Route, Star, Award, Shield, ArrowRight } from 'lucide-react';
import FancyButton from '@/components/ui-custom/FancyButton';

interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  image: string;
}

interface ServicesGridProps {
  services: Service[];
}

const iconMap = {
  Car,
  MapPin,
  Route,
  Star,
  Award,
  Shield,
};

export default function ServicesGrid({ services }: ServicesGridProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const IconComponent = ({ iconName }: { iconName: string }) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="h-8 w-8 text-primary" /> : null;
  };

  return (
    <section id="services" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive transportation solutions tailored to meet your diverse travel needs
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <IconComponent iconName={service.icon} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <FancyButton className="w-full"
  onClick={() => {
    const whatsappNumber = "+917021751691";
    const message = encodeURIComponent("Hi, I want to book your service.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }}>
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </FancyButton>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
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
            className="services-swiper"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <IconComponent iconName={service.icon} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <FancyButton className="w-full"
  onClick={() => {
    const whatsappNumber = "+917021751691";
    const message = encodeURIComponent("Hi, I want to book your service.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }}>
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </FancyButton>
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
