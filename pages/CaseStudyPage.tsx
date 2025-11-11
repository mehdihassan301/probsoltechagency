import React, { useRef, useState, useEffect } from 'react';
import { Page, PortfolioItem } from '../types';
import ParticleBackground from '../components/ParticleBackground';

interface CaseStudyPageProps {
  item: PortfolioItem;
  setPage: (page: Page) => void;
}

const useAnimateOnScroll = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, { threshold });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);
    return isInView;
};

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ item, setPage }) => {
  const challengeRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const challengeInView = useAnimateOnScroll(challengeRef);
  const solutionInView = useAnimateOnScroll(solutionRef);
  const resultsInView = useAnimateOnScroll(resultsRef);
  const techInView = useAnimateOnScroll(techRef);
  const ctaInView = useAnimateOnScroll(ctaRef);
  
  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center text-center">
        <div className="absolute inset-0">
            <img src={item.heroImage} alt={item.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-white/50 dark:bg-black/60"></div>
        </div>
        <ParticleBackground type="dots" />
        <div className="relative z-10 container mx-auto px-4">
          <p className="text-primary dark:text-accent font-semibold mb-2 drop-shadow-lg">{item.category}</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold max-w-4xl mx-auto drop-shadow-lg text-text_light dark:text-white">{item.title}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto">
          {/* The Challenge */}
          <section ref={challengeRef} className={`mb-12 will-change-[transform,opacity] ${challengeInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-4 text-center md:text-left">The Challenge</h2>
            <p className="text-lg text-subtext_light dark:text-subtext_dark leading-relaxed text-center md:text-left">{item.challenge}</p>
          </section>

          {/* The Solution */}
          <section ref={solutionRef} className="mb-12">
            <h2 className={`font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-8 text-center md:text-left will-change-[transform,opacity] ${solutionInView ? 'animate-fade-in-up' : 'opacity-0'}`}>Our Solution</h2>
            <div className={`space-y-6 will-change-[transform,opacity] ${solutionInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {item.solution.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div>
                      <div className="flex items-center justify-center w-10 h-10 border-2 border-primary rounded-full text-primary font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                    </div>
                    {index < item.solution.length - 1 && <div className="w-px h-full bg-primary/30"></div>}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-heading mb-2 text-xl font-bold text-primary dark:text-accent">{step.title}</h3>
                    <p className="text-subtext_light dark:text-subtext_dark">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* The Results */}
          <section ref={resultsRef} className="mb-12 bg-bg_light dark:bg-surface_dark py-12 rounded-xl">
            <h2 className={`font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-8 text-center will-change-[transform,opacity] ${resultsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>The Results</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
              {item.results.map((result, index) => (
                <div key={index} className={`p-6 will-change-[transform,opacity] ${resultsInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 150}ms`}}>
                  <p className="font-heading text-4xl font-bold text-primary dark:text-accent">{result.value}</p>
                  <h3 className="font-heading text-lg font-semibold text-text_light dark:text-text_dark mt-2">{result.metric}</h3>
                  <p className="text-sm text-subtext_light dark:text-subtext_dark mt-1">{result.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Technologies Used */}
            <section ref={techRef} className="text-center">
                <h2 className={`font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6 will-change-[transform,opacity] ${techInView ? 'animate-fade-in-up' : 'opacity-0'}`}>Technologies Used</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {item.technologies.map((tech, index) => (
                        <div 
                            key={tech} 
                            className={`bg-border_light dark:bg-border_dark text-subtext_light dark:text-text_dark font-medium py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:bg-primary/10 hover:text-primary dark:hover:bg-accent/10 dark:hover:text-accent hover:shadow-lg cursor-default active:scale-95 will-change-[transform,opacity] ${techInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {tech}
                        </div>
                    ))}
                </div>
            </section>

           {/* CTA */}
           <div ref={ctaRef} className={`mt-16 text-center will-change-[transform,opacity] ${ctaInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <button
                    onClick={() => setPage('Contact')}
                    className="px-8 py-4 bg-primary text-white font-bold rounded-lg text-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white dark:focus-visible:ring-offset-bg_dark"
                >
                    Start Your Next Project
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;