'use client';

import React, { useState } from 'react';
import { Star, Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FancyButton from '@/components/ui-custom/FancyButton';
import Modal from '@/components/ui/Modal';
import StarRating from '@/components/ui/StarRating';

interface RatingData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

interface RateServiceSectionProps {
  onSubmit?: (data: RatingData) => void;
  currentRating?: {
    count: number;
    average: number;
  };
}

export default function RateServiceSection({ onSubmit, currentRating }: RateServiceSectionProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    setIsModalOpen(true);
  };

  const handleRatingHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRating(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const ratingData: RatingData = {
        name: formData.name,
        email: formData.email,
        rating,
        comment: formData.comment,
      };

      // Here you would typically send the data to your API
      console.log('Rating submitted:', ratingData);
      
      if (onSubmit) {
        onSubmit(ratingData);
      }

      setSubmitted(true);
      closeModal(); // Close modal after successful submission
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        comment: '',
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('There was an error submitting your rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareRating = () => {
    const url = window.location.href;
    const text = `Rate Elite Cabs 24X7`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Rate Elite Cabs 24X7',
        text: text,
        url: url,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${text}\n${url}`);
      alert('Link copied to clipboard!');
    }
  };

  const renderInteractiveStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starRating = index + 1;
      const filled = starRating <= (hoverRating || rating);
      
      return (
        <Star
          key={index}
          className={`h-8 w-8 transition-colors duration-200 ${
            filled
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          } cursor-pointer hover:scale-110`}
          onClick={() => handleRatingClick(starRating)}
          onMouseEnter={() => handleRatingHover(starRating)}
          onMouseLeave={() => handleRatingLeave()}
        />
      );
    });
  };

  if (submitted) {
    return (
      <section id="rate-service" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Thank You for Your Rating!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your feedback helps us improve our services and provide better experiences for all our customers.
              </p>
              <div className="space-y-4">
                <FancyButton onClick={() => setSubmitted(false)}>
                  Rate Again
                </FancyButton>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Share your experience with others:
                  </p>
                  <Button
                    onClick={shareRating}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Rating Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="rate-service" className="py-16" style={{ backgroundColor: '#F8F3ED' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Rate Our Service
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your feedback is valuable to us. Click on a star to share your experience with Elite Cabs 24X7.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-lg">
              {/* Current Rating Display */}
              {currentRating && (
                <div className="text-center mb-8 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="flex">
                      <StarRating rating={currentRating.average} showAriaLabel={false} />
                    </div>
                    <span className="text-xl font-semibold text-primary">
                      {currentRating.average.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    
                  </p>
                </div>
              )}

              {/* Interactive Rating Stars */}
              <div className="text-center">
                <Label className="text-lg font-semibold mb-4 block">
                  How would you rate our service?
                </Label>
                <div className="flex justify-center space-x-2 mb-4">
                  {renderInteractiveStars()}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-muted-foreground">
                    You rated: {rating} star{rating !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Share Link */}
              <div className="text-center mt-8">
                <Button
                  type="button"
                  onClick={shareRating}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share this link to rate us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Rate Our Service"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selected Rating Display */}
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium mb-2 block">
              Your Rating:
            </Label>
            <div className="flex justify-center space-x-1">
              <StarRating rating={rating} showAriaLabel={false} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {rating} star{rating !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
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

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Feedback</Label>
            <Textarea
              id="comment"
              name="comment"
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              placeholder="Share your experience with us..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <FancyButton
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </FancyButton>
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
