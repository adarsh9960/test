'use client';

import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import FancyButton from '@/components/ui-custom/FancyButton';
import { createRipple } from '@/lib/button-utils';
import { buildWhatsApp } from '@/utils/whatsapp';

export default function PricingSection() {
  const handleWhatsAppClick = (e: React.MouseEvent, message: string) => {
    e.preventDefault();
    createRipple(e as any);
    const whatsappUrl = buildWhatsApp('917021751691', message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="pricing" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Travel Partner Anytime, Anywhere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Best Quote guaranteed with no hidden charges
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">Best Quote</span>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Your Travel Partner Anytime, Anywhere
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                At Elite Cabs 24X7, we believe in transparent pricing with no hidden charges. Our rates are competitive and reflect the quality of service we provide. Get the best quote for your journey with our clear pricing structure.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <button
                onClick={(e) => handleWhatsAppClick(e, "Get Quote - Local Rides")}
                className="btn-water bg-green-500 text-white border-green-500 hover:bg-green-600 w-full inline-flex items-center justify-center space-x-2 p-6 rounded-lg"
                aria-label="Get quote for local rides via WhatsApp"
                role="button"
                tabIndex={0}
              >
                <span className="label">Get Quote - Local Rides</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <button
                onClick={(e) => handleWhatsAppClick(e, "Get Quote - Outstation")}
                className="btn-water bg-green-500 text-white border-green-500 hover:bg-green-600 w-full inline-flex items-center justify-center space-x-2 p-6 rounded-lg"
                aria-label="Get quote for outstation rides via WhatsApp"
                role="button"
                tabIndex={0}
              >
                <span className="label">Get Quote - Outstation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <button
                onClick={(e) => handleWhatsAppClick(e, "Get Quote - Corporate")}
                className="btn-water bg-green-500 text-white border-green-500 hover:bg-green-600 w-full inline-flex items-center justify-center space-x-2 p-6 rounded-lg"
                aria-label="Get quote for corporate rides via WhatsApp"
                role="button"
                tabIndex={0}
              >
                <span className="label">Get Quote - Corporate</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4">What's Included</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {[
                  { id: 1, text: "Professional driver" },
                  { id: 2, text: "Well-maintained vehicle" },
                  { id: 3, text: "24X7 customer support" },
                  { id: 4, text: "GPS tracking" },
                  { id: 5, text: "Air conditioning" },
                  { id: 6, text: "No hidden charges" }
                ].map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}