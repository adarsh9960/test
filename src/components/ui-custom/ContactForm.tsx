'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FancyButton from './FancyButton';
import { createRipple } from '@/lib/button-utils';
import { Star } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import ratingsData from '@/data/ratings.json';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  date: string;
  time: string;
  message: string;
}

export default function ContactForm({ onSubmit, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    from: '',
    to: '',
    date: '',
    time: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to the API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      console.log('Form submitted successfully:', result);
      
      if (onSubmit) {
        onSubmit(formData);
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        from: '',
        to: '',
        date: '',
        time: '',
        message: '',
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from">Pickup Location *</Label>
              <Input
                id="from"
                name="from"
                type="text"
                required
                value={formData.from}
                onChange={handleChange}
                placeholder="Enter pickup location"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="to">Destination *</Label>
              <Input
                id="to"
                name="to"
                type="text"
                required
                value={formData.to}
                onChange={handleChange}
                placeholder="Enter destination"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time *</Label>
            <Input
              id="time"
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Any additional information or special requirements..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <FancyButton type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </FancyButton>
            <div className="flex gap-2">
              <a
                href="https://wa.me/917021751691"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-water bg-green-500 text-white border-green-500 hover:bg-green-600"
                onClick={createRipple}
              >
                <span className="label">WhatsApp</span>
              </a>
              <a
                href="tel:+917021751691"
                className="btn-water bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                onClick={createRipple}
              >
                <span className="label">Call Now</span>
              </a>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Thank You for Your Message!
            </h3>
            <p className="text-green-700">
              We've received your inquiry and will get back to you soon.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">What Our Clients Say</h4>
            <div className="grid gap-4">
              {ratingsData.items.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-card rounded-lg p-4 shadow-md border">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-foreground">{testimonial.name}</h5>
                    <StarRating rating={testimonial.rating} showAriaLabel={false} />
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.comment}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-primary hover:underline"
          >
            Submit Another Message
          </button>
        </div>
      )}
    </div>
  );
}