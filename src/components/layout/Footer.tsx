'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import navigationData from '@/data/navigation.json';
import companyInfo from '@/data/company-info.json';
import newsletterData from '@/data/newsletter.json';
import StarRating from '@/components/ui/StarRating';

interface FooterProps {
  rating: {
    count: number;
    average: number;
  };
}

/** Remove any © characters and 4-digit years / year-ranges from the config string */
function cleanCopyright(raw?: string) {
  const fallback = 'Elite Cabs 24X7. All rights reserved.';
  if (!raw) return fallback;
  const cleaned = raw
    .replace(/©/g, '') // remove ©
    .replace(/\b(19|20)\d{2}(?:\s*[-–—]\s*(?:19|20)\d{2})?\b/g, '') // remove years / ranges
    .replace(/^\s*[-–—:\s]+|\s*[-–—:\s]+$/g, '') // trim stray separators
    .trim();
  return cleaned.length ? (cleaned.endsWith('.') ? cleaned : `${cleaned}.`) : fallback;
}

export default function Footer({ rating }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const cleanedCopy = cleanCopyright(siteConfig.meta?.copyright);
  const { quickLinks, legalLinks } = navigationData.footerLinks;
  const { company } = companyInfo;
  const { newsletter } = newsletterData;

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src={siteConfig.icons.footerLogo}
                alt={company.name}
                width={120}
                height={40}
                className="h-10 w-auto rounded-[15px]"
              />
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              {company.description}
            </p>
            <div className="flex space-x-4">
              <a href={siteConfig.social.facebook} className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={siteConfig.social.twitter} className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={siteConfig.social.instagram} className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-sm opacity-90 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm opacity-90">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm opacity-90">{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-sm opacity-90">
                  {siteConfig.contact.address}
                </span>
              </div>
            </div>
          </div>

          {/* Live Rating */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Rating</h3>
            <div className="bg-background/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <StarRating rating={rating.average} showAriaLabel={false} />
                <span className="text-sm font-medium">{rating.average.toFixed(1)}</span>
              </div>
              <p className="text-sm opacity-90">
                
              </p>
              <div className="mt-3">
                <Link
                  href="#rate-service"
                  className="text-sm text-primary hover:underline"
                >
                  Rate our service →
                </Link>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">{newsletter.title}</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder={newsletter.placeholder}
                  className="flex-1 px-3 py-2 bg-background/20 border border-background/30 rounded-l-md text-sm focus:outline-none focus:border-primary"
                />
                <button className="px-4 py-2 bg-primary text-foreground rounded-r-md text-sm font-medium hover:bg-primary/90 transition-colors">
                  {newsletter.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-sm opacity-75">
                © {currentYear} {cleanedCopy}
              </p>
              <p className="text-sm opacity-75"> ITZ Adarsh </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <Link key={link.id} href={link.href} className="text-sm opacity-75 hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
