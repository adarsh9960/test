'use client';

import React from 'react';
import { ArrowRight, CheckCircle, MessageCircle, Phone, Calendar, Bot, Car, MapPin, Star } from 'lucide-react';
import { createRipple } from '@/lib/button-utils';
import { motion } from 'framer-motion';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
}

const buttonColors = [
  'bg-green-500 hover:bg-green-600', 
  'bg-blue-500 hover:bg-blue-600', 
  'bg-purple-500 hover:bg-purple-600', 
  'bg-orange-500 hover:bg-orange-600'
];
const stepIcons = [MessageCircle, Phone, Calendar, Bot];
const stepIconColors = [
  'text-green-500', 
  'text-blue-500', 
  'text-purple-500', 
  'text-orange-500'
];
const buttonTexts = ['WhatsApp', 'Call', 'Book', 'Chatbot'];
const buttonActions = [
  'https://wa.me/919960416025',
  'tel:+919960416025',
  '#contact',
  '#chat'
];

// Individual Image Components for buttons using the provided icons
const WhatsAppButtonImage = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </div>
  </div>
);

const CallButtonImage = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 bg-blue-500 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    </div>
  </div>
);

const BookButtonImage = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 bg-purple-500 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    </div>
  </div>
);

const ChatbotButtonImage = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 bg-orange-500 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    </div>
  </div>
);

const buttonImageComponents = [WhatsAppButtonImage, CallButtonImage, BookButtonImage, ChatbotButtonImage];

export default function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Booking your ride with Elite Cabs 24X7 is simple and hassle-free
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-4 md:left-1/2 top-8 bottom-8 w-0.5 bg-primary/20 transform md:-translate-x-0.5"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => {
                const IconComponent = stepIcons[index];
                const ButtonImageComponent = buttonImageComponents[index];
                const colorClass = buttonColors[index];
                
                return (
                  <div key={step.id} className="relative flex items-center">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold z-10">
                      {step.id}
                    </div>
                    
                    {/* Content */}
                    <div className={`ml-6 md:ml-0 flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right md:order-first'}`}>
                      <div className="bg-card rounded-lg p-6 shadow-lg">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {step.description}
                        </p>
                        
                        {/* CTA Button with infinite pop-up animation */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            y: [0, -3, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="inline-block"
                        >
                          <a
                            href={buttonActions[index]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transform transition-all duration-300 hover:scale-110"
                            onClick={(e) => {
                              e.preventDefault();
                              createRipple(e as any);
                              if (buttonActions[index].startsWith('#')) {
                                document.querySelector(buttonActions[index])?.scrollIntoView({ behavior: 'smooth' });
                              } else {
                                window.open(buttonActions[index], buttonActions[index].startsWith('tel:') ? '_self' : '_blank');
                              }
                            }}
                          >
                            <ButtonImageComponent />
                          </a>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute left-1/2 top-16 transform -translate-x-1/2 text-primary">
                        <ArrowRight className="h-6 w-6 rotate-90" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-card rounded-lg p-8 shadow-lg">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Ready to Book Your Ride?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Experience the convenience and comfort of Elite Cabs 24X7. 
                Whether you need a quick ride across town or a planned outstation trip, 
                we're here to serve you 24 hours a day, 7 days a week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
