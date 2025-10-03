'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui-custom/Hero';
import AboutSection from '@/components/sections/AboutSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import FleetSection from '@/components/sections/FleetSection';
import SightseeingSection from '@/components/sections/SightseeingSection';
import GallerySection from '@/components/sections/GallerySection';
import MergedExcellenceSection from '@/components/sections/MergedExcellenceSection';
import ClientsSection from '@/components/sections/ClientsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import FAQSection from '@/components/sections/FAQSection';
import RateServiceSection from '@/components/sections/RateServiceSection';
import ContactForm from '@/components/ui-custom/ContactForm';
import CTAFloater from '@/components/ui-custom/CTAFloater';
import ScrollToTopButton from '@/components/ui-custom/ScrollToTopButton';
import AIChatButton from '@/components/ui-custom/AIChatButton';
import { createRipple } from '@/lib/button-utils';
import { initializeAnimations, initializeSmoothScroll } from '@/lib/animations';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

// Import data
import pagesData from '@/data/pages.json';
import servicesData from '@/data/services.json';
import fleetData from '@/data/fleet.json';
import sightseeingData from '@/data/sightseeing.json';
import galleryData from '@/data/gallery.json';
import ratingsData from '@/data/ratings.json';
import partnersData from '@/data/partners.json';
import contactData from '@/data/contact.json';

// Force restart comment - updated at 17:15
console.log('Page component loaded');

export default function Home() {
  const [currentRating, setCurrentRating] = useState({
    count: ratingsData.count,
    average: ratingsData.average,
  });

  useEffect(() => {
    // Initialize animations
    const animationObserver = initializeAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScroll();

    // Cleanup on unmount
    return () => {
      if (animationObserver) {
        animationObserver.disconnect();
      }
    };
  }, []);

  const handleRatingSubmit = (newRating: any) => {
    // In a real app, this would update the backend
    // For now, we'll just update the local state
    const newCount = currentRating.count + 1;
    const newAverage = ((currentRating.average * currentRating.count) + newRating.rating) / newCount;
    
    setCurrentRating({
      count: newCount,
      average: Number(newAverage.toFixed(1)),
    });
  };

  const handleContactSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
    // In a real app, this would send the data to your API
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero slides={pagesData.home.hero.slides} />
        
        {/* About Section */}
        <AboutSection
          title={pagesData.home.about.title}
          content={pagesData.home.about.content}
          images={pagesData.home.about.images}
        />
        
        {/* Services Grid */}
        <ServicesGrid services={servicesData.services} />
        
        {/* Fleet Section */}
        <FleetSection categories={fleetData.categories} />
        
        {/* Sightseeing Section */}
        <SightseeingSection places={sightseeingData.places} />
        
        {/* Gallery Section */}
        <GallerySection images={galleryData.images} />
        
        {/* Why Choose Us Section */}
        <WhyChooseUsSection features={pagesData.home.whyChooseUs.features} />
        
        {/* How It Works Section */}
        <HowItWorksSection steps={pagesData.home.howItWorks.steps} />
        
        {/* Contact Section */}
        <section id="contact" className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                {contactData.contact.section.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {contactData.contact.section.description}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <ContactForm onSubmit={handleContactSubmit} />
                </div>
                
                {/* Contact Info & Map */}
                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {contactData.contact.info.title}
                    </h3>
                    <div className="space-y-4">
                      {contactData.contact.info.items.map((item) => {
                        const IconComponent = item.icon === 'Phone' ? Phone :
                                              item.icon === 'Mail' ? Mail :
                                              MapPin;
                        return (
                          <div key={item.id} className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{item.label}</p>
                              <p className="text-muted-foreground">{item.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {contactData.contact.quickActions.title}
                    </h3>
                    <div className="space-y-3">
                      {contactData.contact.quickActions.actions.map((action) => {
                        const IconComponent = action.icon === 'Phone' ? Phone :
                                              MessageCircle;
                        return (
                          <a
                            key={action.id}
                            href={action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn-water bg-${action.color}-500 text-white border-${action.color}-500 hover:bg-${action.color}-600 w-full`}
                            onClick={(e) => {
                              e.preventDefault();
                              createRipple(e as any);
                              window.open(action.url, action.url.startsWith('tel:') ? '_self' : '_blank');
                            }}
                          >
                            <span className="label">{action.text}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        
        {/* Merged Excellence Section */}
        <MergedExcellenceSection
          testimonials={ratingsData.items}
          averageRating={currentRating.average}
          totalRatings={currentRating.count}
        />

        {/* Clients Section */}
        <ClientsSection clients={partnersData.clients} />
        
        {/* Rate Service Section */}
        <RateServiceSection
          onSubmit={handleRatingSubmit}
          currentRating={currentRating}
        />
        
        {/* FAQ Section */}
        <FAQSection faqs={pagesData.home.faq.items} />
      </main>

      <Footer rating={currentRating} />
      
      {/* CTA Floater */}
      <CTAFloater />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
