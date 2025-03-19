
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'blur';
  delay?: number;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  animation = 'fade',
  delay = 0,
}) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-down':
        return 'animate-slide-down';
      case 'scale':
        return 'animate-scale-in';
      case 'blur':
        return 'animate-blur-in';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={cn(getAnimationClass(), className)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
