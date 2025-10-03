'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper/modules';
import { MapPin } from 'lucide-react';

interface SightseeingPlace {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface SightseeingSectionProps {
  places: SightseeingPlace[];
}

export default function SightseeingSection({ places }: SightseeingSectionProps) {
  return (
    <section id="sightseeing" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mumbai Sightseeing Places
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the vibrant city of Mumbai with our curated sightseeing tours
          </p>
        </div>

        {/* Grid Style Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Keyboard]}
            slidesPerView={2}
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
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            className="sightseeing-swiper"
          >
            {places.map((place) => (
              <SwiperSlide key={place.id}>
                <div className="group cursor-pointer">
                  <div className="relative h-40 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center space-x-1 text-white">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs font-medium truncate">{place.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {place.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Additional Info */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
              Discover Mumbai with us
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed text-center">
              Mumbai, the city of dreams, offers a perfect blend of history, culture, and modernity. 
              From iconic landmarks like the Gateway of India to the bustling markets of Colaba, 
              our expert drivers will guide you through the city's most cherished destinations.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Popular Routes</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• South Mumbai Heritage Tour</li>
                  <li>• Bandra to Worli Sea Link Drive</li>
                  <li>• Religious Places Circuit</li>
                  <li>• Bollywood Stars Homes Tour</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Tour Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Knowledgeable Drivers</li>
                  <li>• Flexible Timing</li>
                  <li>• Comfortable Vehicles</li>
                  <li>• Affordable Packages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
