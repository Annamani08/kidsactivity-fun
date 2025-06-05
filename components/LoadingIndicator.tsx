
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'md', text = "Loading, please wait..." }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-4',
    md: 'w-12 h-12 border-[6px]',
    lg: 'w-16 h-16 border-8',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div
        className={`${sizeClasses[size]} border-brand-accent border-t-transparent rounded-full animate-spin`}
      ></div>
      {text && <p className="mt-4 text-lg text-brand-text font-medium">{text}</p>}
    </div>
  );
};

export default LoadingIndicator;