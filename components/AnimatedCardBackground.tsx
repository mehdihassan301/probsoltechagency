import React from 'react';

const AnimatedCardBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl z-0" aria-hidden="true">
      <div className="absolute w-full h-full">
        <div 
          className="absolute w-64 h-64 bg-primary/20 dark:bg-primary/30 blur-3xl rounded-full animate-move-blob will-change-transform"
          style={{ animationDuration: '20s', top: '-20%', left: '-30%' }}
        />
        <div 
          className="absolute w-72 h-72 bg-accent/20 dark:bg-accent/30 blur-3xl rounded-full animate-move-blob will-change-transform"
          style={{ animationDuration: '25s', animationDirection: 'reverse', bottom: '-20%', right: '-30%', animationDelay: '-5s' }}
        />
      </div>
    </div>
  );
};

export default AnimatedCardBackground;