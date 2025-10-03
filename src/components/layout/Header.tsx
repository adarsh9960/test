'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import siteConfig from '@/data/site-config.json';
import navigationData from '@/data/navigation.json';

export default function Header() {
  const navigation = navigationData.mainNav;

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-yellow-400/30 backdrop-blur supports-[backdrop-filter]:bg-yellow-400/20 border-b border-yellow-400/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src={siteConfig.icons.logo}
                  alt="Elite Cabs 24X7"
                  width={120}
                  height={40}
                  className="h-12 w-auto rounded-[15px]"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-foreground hover:text-red-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-red-600" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-red-600" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <a href={siteConfig.social.facebook} className="text-red-600 hover:text-red-700 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href={siteConfig.social.twitter} className="text-red-600 hover:text-red-700 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href={siteConfig.social.instagram} className="text-red-600 hover:text-red-700 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-red-600" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-foreground hover:text-red-600 transition-colors font-medium py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center space-x-2 text-sm mb-2">
                      <Mail className="h-4 w-4 text-red-600" />
                      <span>{siteConfig.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm mb-4">
                      <Phone className="h-4 w-4 text-red-600" />
                      <span>{siteConfig.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <a href={siteConfig.social.facebook} className="text-red-600 hover:text-red-700 transition-colors">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href={siteConfig.social.twitter} className="text-red-600 hover:text-red-700 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href={siteConfig.social.instagram} className="text-red-600 hover:text-red-700 transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}