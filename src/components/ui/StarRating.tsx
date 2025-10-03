import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
  showAriaLabel?: boolean;
}

export function renderStars(rating: number, maxStars: number = 5, className: string = "") {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className={`h-5 w-5 text-yellow-400 fill-current ${className}`}
      />
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className="h-5 w-5 text-gray-300 fill-current" />
        <Star 
          className="h-5 w-5 text-yellow-400 fill-current absolute top-0 left-0 overflow-hidden" 
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        />
      </div>
    );
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className={`h-5 w-5 text-gray-300 fill-current ${className}`}
      />
    );
  }

  return stars;
}

export default function StarRating({ 
  rating, 
  maxStars = 5, 
  className = "", 
  showAriaLabel = true 
}: StarRatingProps) {
  const stars = renderStars(rating, maxStars, className);

  return (
    <div className="flex items-center space-x-1">
      {showAriaLabel && (
        <span className="sr-only" aria-label={`Rated ${rating} out of ${maxStars} stars`}>
          Rated {rating} out of {maxStars} stars
        </span>
      )}
      {stars}
    </div>
  );
}