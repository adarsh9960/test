'use client';

import React from 'react';
import { useIntersectionObserver, useCountUp } from '@/hooks/useIntersectionObserver';

export default function CommitmentSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.2);
  
  // Count-up animations for the commitment section
  const animatedUsers = useCountUp(60000, 2000, isVisible);
  const animatedFleet = useCountUp(175, 2000, isVisible);

  return (
    <section ref={sectionRef} className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Our Commitment to Excellence
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With years of experience in the transportation industry, we have built a reputation for reliability, 
                safety, and exceptional service. Our commitment to customer satisfaction drives everything we do, 
                from maintaining our vehicles to training our drivers.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{animatedUsers.toLocaleString()}+</div>
                  <p className="text-muted-foreground text-sm">Users</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{animatedFleet}+</div>
                  <p className="text-muted-foreground text-sm">Vehicle Fleet</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">24X7</div>
                  <p className="text-muted-foreground text-sm">Availability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}