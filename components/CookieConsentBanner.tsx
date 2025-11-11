import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface CookieConsentBannerProps {
    setPage: (page: Page) => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ setPage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  // Effect to decide whether to show the banner initially
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(showTimer);
    }
  }, []);

  // Effect to automatically hide the banner after 10 seconds
  useEffect(() => {
    if (isVisible && !isHiding) {
      const hideTimer = setTimeout(() => {
        setIsHiding(true); // Start the hide animation
      }, 10000); // 10 seconds

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible, isHiding]);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsHiding(true); // Start the hide animation
  };

  const handleAnimationEnd = () => {
    if (isHiding) {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${isHiding ? 'animate-fade-out-down' : 'animate-fade-in-up'}`}
      style={{ animationDelay: isHiding ? '0s' : '0.5s', opacity: isHiding ? 1 : 0 }}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 rounded-lg bg-surface_light/80 dark:bg-surface_dark/80 backdrop-blur-lg shadow-2xl border border-border_light dark:border-border_dark">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-subtext_light dark:text-subtext_dark">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            <button onClick={() => setPage('PrivacyPolicy')} className="ml-2 font-semibold text-primary dark:text-accent underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                Learn more
            </button>.
          </p>
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-purple-600 transition-colors duration-300 flex-shrink-0 w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white dark:focus-visible:ring-offset-surface_dark"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;