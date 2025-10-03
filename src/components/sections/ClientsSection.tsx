'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

interface Client {
  id: number;
  name: string;
  logo: string;
}

interface ClientsSectionProps {
  clients: Client[];
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
  return (
    <section id="clients" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Clients We Served
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading businesses and organizations across Mumbai
          </p>
        </div>

        {/* Clients Carousel */}
        <div className="relative">
          <Swiper
  modules={[Autoplay]}
  slidesPerView={2}
  spaceBetween={20}
  loop={true}
  freeMode={true}
  speed={1500} // smooth scroll timing
  autoplay={{
    delay: 0, // no pause, continuous
    disableOnInteraction: false,
  }}
  allowTouchMove={false} // prevent manual dragging
  navigation={false}
  pagination={false}
  breakpoints={{
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 50,
    },
  }}
  className="clients-swiper"
>

            {clients.map((client) => (
              <SwiperSlide key={client.id}>
                <div className="flex items-center justify-center h-20 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain opacity-60 hover:opacity-90 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
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
