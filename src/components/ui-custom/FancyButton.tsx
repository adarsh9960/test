import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'booking';
};

export default function FancyButton({ children, className = '', variant = 'primary', ...rest }: Props) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'booking':
        return 'border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 hover:text-white hover:shadow-2xl hover:shadow-green-500/30 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300';
      case 'primary':
        return 'border-primary text-white hover:text-white hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300';
      case 'secondary':
        return 'border-secondary text-white hover:text-white hover:shadow-2xl hover:shadow-secondary/30 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300';
      default:
        return 'border-primary text-white hover:text-white hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300';
    }
  };

  const baseClasses = getVariantClasses();

  return (
    <button
      {...rest}
      className={`btn-water ${baseClasses} ${className} relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 group`}
      aria-pressed="false"
    >
      {/* Animated background for all variants */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      {/* Animated background for booking variant */}
      {variant === 'booking' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="absolute inset-0 rounded-full bg-green-300 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
        </>
      )}
      
      {/* Animated background for primary variant */}
      {variant === 'primary' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 rounded-full bg-primary/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
        </>
      )}
      
      {/* Animated background for secondary variant */}
      {variant === 'secondary' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 rounded-full bg-secondary/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
        </>
      )}
      
      {/* Ripple effect for all variants */}
      <div className="absolute inset-0 rounded-md bg-white/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-md border-2 border-white/30 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      
      <span className="label relative z-10 group-hover:scale-110 transition-transform duration-300">{children}</span>
    </button>
  );
}