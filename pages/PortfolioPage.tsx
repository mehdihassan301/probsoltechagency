import React, { useState, useEffect, useRef } from 'react';
import { portfolioItems } from '../components/constants';
import { Page } from '../types';

interface PortfolioPageProps {
  setPage: (page: Page, id?: string) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ setPage }) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTitleVisible(true);
        titleObserver.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }
    
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setVisibleItems(prev => new Set(prev).add(index));
          itemObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    itemRefs.current.forEach(ref => {
      if (ref) itemObserver.observe(ref);
    });

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      itemRefs.current.forEach(ref => {
        if (ref) itemObserver.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className={`text-center max-w-2xl mx-auto mb-16 ${titleVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Our Work</h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400">
            A selection of projects that showcase our commitment to quality, creativity, and results.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              // FIX: The ref callback should not return a value. Wrapped assignment in braces.
              ref={el => { itemRefs.current[index] = el; }}
              data-index={index}
              className={`group relative overflow-hidden rounded-xl aspect-w-4 aspect-h-3 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-accent/20 hover:-translate-y-2 hover:scale-105 will-change-[transform,opacity] ${visibleItems.has(index) ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                  <p className="text-accent text-sm">{item.category}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <button
                          onClick={() => setPage('CaseStudy', item.id)}
                          className="font-semibold text-white bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-white"
                      >
                          View Case Study
                      </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;