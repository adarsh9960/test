'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import FancyButton from '@/components/ui-custom/FancyButton';
import InfiniteCallIcon from '@/components/ui-custom/InfiniteCallIcon';

interface AboutSectionProps {
  title: string;
  content: string;
  images: string[];
}

export default function AboutSection({ title, content, images }: AboutSectionProps) {
  return (
    <section id="about" className="pt-[5px] pb-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Slider */}
          <div className="relative h-[250px] md:h-[400px] rounded-lg overflow-hidden shadow-xl w-full">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={false}
              pagination={false}
              className="h-full w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
            <div className="prose prose-lg max-w-none">
              {content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <FancyButton
  className="animate-popup"
  onClick={() =>
    window.open(
      "https://blog.itzadarsh.co.in/ai/post?slug=elite-cabs-mumbai-reliable-ride",
      "_blank"
    )
  }
>
  Know More
  <ArrowRight className="ml-2 h-4 w-4" />
</FancyButton>

              <InfiniteCallIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
