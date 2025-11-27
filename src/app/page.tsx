'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
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

export default function Home() {
  const [currentRating, setCurrentRating] = useState({
    count: ratingsData.count,
    average: ratingsData.average,
  });

  useEffect(() => {
    const animationObserver = initializeAnimations();
    initializeSmoothScroll();
    return () => {
      if (animationObserver) animationObserver.disconnect();
    };
  }, []);

  const handleRatingSubmit = (newRating: any) => {
    const newCount = currentRating.count + 1;
    const newAverage =
      ((currentRating.average * currentRating.count) + newRating.rating) / newCount;
    setCurrentRating({
      count: newCount,
      average: Number(newAverage.toFixed(1)),
    });
  };

  const handleContactSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
  };

  // JSON-LD for Elite Cabs 24X7
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": "https://elitecabsmumbai.com/#company",
    "name": "Elite Cabs 24X7",
    "url": "https://elitecabsmumbai.com",
    "logo": "https://www.elitecabsmumbai.com/favicon.ico",
    "image": "https://www.elitecabsmumbai.com/elite-cabs-logo-blue.png",
    "description": "Elite Cabs 24X7 is Mumbai's premier taxi service provider, offering reliable, comfortable, and affordable transportation solutions. With years of experience in the industry, we have established ourselves as a trusted name for both local and outstation travel.",
    "telephone": "+91 99604 16025",
    "email": "help@itzadarsh.co.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Not specified",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/Adarsh.2332004/",
      "https://www.instagram.com/itzadarsh.co.in/"
    ],
    "serviceArea": {
      "@type": "Place",
      "name": "Mumbai Metropolitan Region"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://elitecabsmumbai.com",
      "priceCurrency": "INR",
      "eligibleRegion": "IN-MH",
      "price": "Variable",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": "500",
        "maxPrice": "5000",
        "priceCurrency": "INR",
        "eligibleRegion": "IN-MH"
      }
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "serviceType": [
      "Local Rentals",
      "Outstation Trips",
      "Airport Pickup & Drop",
      "Wedding Cars",
      "Corporate Travel",
      "Family & Business Trips",
      "One-Way Drop",
      "Mumbai Sightseeing"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Inject JSON-LD in Head */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </Head>

      <Header />

      <main className="flex-1">
        <Hero slides={pagesData.home.hero.slides} />

        <AboutSection
          title={pagesData.home.about.title}
          content={pagesData.home.about.content}
          images={pagesData.home.about.images}
        />

        <ServicesGrid services={servicesData.services} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2355033797574310"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-5i+c8-1r-7m+vh"
     data-ad-client="ca-pub-2355033797574310"
     data-ad-slot="4333491086"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
        <FleetSection categories={fleetData.categories} />
        <SightseeingSection places={sightseeingData.places} />
        <GallerySection images={galleryData.images} />
        <WhyChooseUsSection features={pagesData.home.whyChooseUs.features} />
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
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2355033797574310"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-5i+c8-1r-7m+vh"
     data-ad-client="ca-pub-2355033797574310"
     data-ad-slot="4333491086"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
                <ContactForm onSubmit={handleContactSubmit} />

                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2355033797574310"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-5i+c8-1r-7m+vh"
     data-ad-client="ca-pub-2355033797574310"
     data-ad-slot="4333491086"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
                      {contactData.contact.info.title}
                    </h3>
                    <div className="space-y-4">
                      {contactData.contact.info.items.map((item) => {
                        const IconComponent =
                          item.icon === 'Phone' ? Phone :
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
                            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2355033797574310"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-5i+c8-1r-7m+vh"
     data-ad-client="ca-pub-2355033797574310"
     data-ad-slot="4333491086"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2355033797574310"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-5i+c8-1r-7m+vh"
     data-ad-client="ca-pub-2355033797574310"
     data-ad-slot="4333491086"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
                      {contactData.contact.quickActions.title}
                    </h3>
                    <div className="space-y-3">
                      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2355033797574310"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-5i+c8-1r-7m+vh"
     data-ad-client="ca-pub-2355033797574310"
     data-ad-slot="4333491086"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
                      {contactData.contact.quickActions.actions.map((action) => {
                        const IconComponent = action.icon === 'Phone' ? Phone : MessageCircle;
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
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2355033797574310"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-5i+c8-1r-7m+vh"
     data-ad-client="ca-pub-2355033797574310"
     data-ad-slot="4333491086"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
              </div>
            </div>
          </div>
        </section>

        <MergedExcellenceSection
          testimonials={ratingsData.items}
          averageRating={currentRating.average}
          totalRatings={currentRating.count}
        />

        <ClientsSection clients={partnersData.clients} />
        <RateServiceSection onSubmit={handleRatingSubmit} currentRating={currentRating} />
        <FAQSection faqs={pagesData.home.faq.items} />
      </main>

      <Footer rating={currentRating} />
      <CTAFloater />
      <ScrollToTopButton />
    </div>
  );
}
