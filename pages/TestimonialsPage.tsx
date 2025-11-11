import React, { useState, useEffect, useRef } from 'react';
import { testimonials } from '../components/constants';
import AnimatedCardBackground from '../components/AnimatedCardBackground';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-border_light dark:text-border_dark'}`} viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        ))}
    </div>
);

const TestimonialsPage: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
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

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setVisibleCards(prev => new Set(prev).add(index));
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cardRefs.current.forEach(ref => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      cardRefs.current.forEach(ref => {
        if (ref) cardObserver.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={titleRef} className={`text-center max-w-2xl mx-auto mb-16 ${titleVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-text_light dark:text-text_dark">What Our Clients Say</h1>
        <p className="mt-4 text-base md:text-lg text-subtext_light dark:text-subtext_dark">
          We're proud to have built strong relationships and delivered results that speak for themselves.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            // FIX: The ref callback should not return a value. Wrapped assignment in braces.
            ref={el => { cardRefs.current[index] = el; }}
            data-index={index}
            className={`relative bg-surface_light/90 dark:bg-surface_dark/90 border border-border_light dark:border-border_dark rounded-xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-accent/20 will-change-[transform,opacity] ${visibleCards.has(index) ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <AnimatedCardBackground />
            <div className="relative z-10 flex flex-col flex-grow justify-between">
                <blockquote className="text-subtext_light dark:text-subtext_dark text-lg italic mb-6">
                “{testimonial.message}”
                </blockquote>
                <div>
                <div className="flex justify-between items-center">
                    <div>
                    <p className="font-bold text-text_light dark:text-text_dark">{testimonial.name}</p>
                    <p className="text-sm text-subtext_light dark:text-subtext_dark">{testimonial.role}</p>
                    </div>
                    <StarRating rating={testimonial.stars} />
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;