import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Page, Service } from '../types';
import ParticleBackground from '../components/ParticleBackground';
import { SpinnerIcon, ArrowRightIcon } from '../components/Icons';
import { blogPosts } from '../components/constants';
import { smoothScrollTo } from '../utils/smoothScroll';

interface ServiceDetailPageProps {
  service: Service;
  setPage: (page: Page, id?: string) => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, setPage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const benefitsRef = useRef<HTMLElement | null>(null);
  const processRef = useRef<HTMLElement | null>(null);
  const whyUsRef = useRef<HTMLElement | null>(null);

  const sectionLinks = [
    { id: 'benefits', title: 'Benefits' },
    { id: 'process', title: 'Our Process' },
    { id: 'why-us', title: 'Why ProbSolv?' }
  ];

  // Observer for individual process steps
  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, service.process.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the vertical center
        threshold: 0,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (ref) observer.unobserve(ref);
      });
    };
  }, [service.process]);

  // Observer for main page sections
  useEffect(() => {
    const sections = [
        { id: 'benefits', ref: benefitsRef.current },
        { id: 'process', ref: processRef.current },
        { id: 'why-us', ref: whyUsRef.current },
    ];
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        },
        {
            rootMargin: `-100px 0px -60% 0px`, // Trigger when section top is 100px from viewport top
        }
    );

    sections.forEach((section) => {
        if (section.ref) observer.observe(section.ref);
    });

    return () => {
        sections.forEach((section) => {
            if (section.ref) observer.unobserve(section.ref);
        });
    };
  }, []);


  const handleStepClick = (index: number) => {
    const element = stepRefs.current[index];
    if (!element) return;

    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
    smoothScrollTo(middle, 800);
  };
  
  const handleSectionLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 88; // pt-24 on main content area
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        smoothScrollTo(offsetPosition, 800);
    }
  };

  const relatedPosts = useMemo(() => {
    const keywords = service.title.toLowerCase().split(' ');
    const primaryKeyword = keywords.includes('ai') ? 'ai' : keywords.includes('vibe') ? 'vibe' : 'web';

    return blogPosts
        .filter(post => post.category.toLowerCase().includes(primaryKeyword))
        .slice(0, 2); // Get up to 2 posts
  }, [service]);


  return (
    <div className="pt-24 pb-16 sm:pb-20">
      {/* Hero */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center text-center px-4" aria-labelledby="service-hero-title">
        <ParticleBackground type="waves" />
        <div className="relative z-10">
          <h1 id="service-hero-title" className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-text_light dark:text-white drop-shadow-lg">{service.title}</h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-subtext_light dark:text-gray-300 drop-shadow-lg">{service.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Mobile Sticky Nav */}
        <div className="md:hidden sticky top-16 bg-surface_light/80 dark:bg-surface_dark/80 backdrop-blur-sm z-20 py-2 -mx-4 px-4 mb-8 border-b border-border_light dark:border-border_dark">
            <nav className="flex space-x-4 overflow-x-auto" aria-label="Page section navigation">
                {sectionLinks.map(link => (
                    <button
                        key={link.id}
                        onClick={() => handleSectionLinkClick(link.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                            activeSection === link.id
                            ? 'bg-primary text-white'
                            : 'bg-border_light dark:bg-border_dark text-subtext_light dark:text-subtext_dark'
                        }`}
                    >
                        {link.title}
                    </button>
                ))}
            </nav>
        </div>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Progress Indicator Sidebar */}
          <aside className="hidden md:block md:col-span-4">
            <div className="sticky top-28">
              <nav aria-labelledby="service-navigation">
                <div className="mb-8">
                    <h3 id="service-navigation" className="font-heading font-bold text-lg text-text_light dark:text-text_dark mb-4">On This Page</h3>
                    <ul role="list" className="space-y-1">
                        {sectionLinks.map(link => (
                            <li key={link.id}>
                                <button
                                    onClick={() => handleSectionLinkClick(link.id)}
                                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                                        activeSection === link.id
                                        ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent font-semibold'
                                        : 'text-subtext_light dark:text-subtext_dark hover:bg-border_light/50 dark:hover:bg-border_dark/50 hover:text-text_light dark:hover:text-text_dark'
                                    }`}
                                >
                                    {link.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div role="navigation" aria-labelledby="process-heading">
                    <h3 id="process-heading" className="font-heading font-bold text-lg text-text_light dark:text-text_dark mb-4">Service Process Steps</h3>
                    <ul role="list" className="space-y-1">
                        {service.process.map((p, i) => (
                            <li key={i} role="listitem">
                                <button 
                                    onClick={() => handleStepClick(i)} 
                                    className={`w-full text-left flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-border_light/50 dark:hover:bg-border_dark/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-bg_dark ${activeStep === i ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
                                    aria-current={activeStep === i ? 'step' : 'false'}
                                >
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 bg-surface_light dark:bg-surface_dark mr-3 flex-shrink-0" style={{borderColor: activeStep >= i ? 'var(--color-primary)' : 'currentColor'}} aria-hidden="true">
                                        {activeStep >= i && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                                    </div>
                                    <span className={`text-sm font-medium ${activeStep === i ? 'text-primary dark:text-accent' : 'text-subtext_light dark:text-subtext_dark hover:text-text_light dark:hover:text-text_dark'}`}>{p.step}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 md:col-span-8">
            {/* Benefits */}
            <section ref={benefitsRef} id="benefits" className="mb-12 scroll-mt-24" aria-labelledby="benefits-heading">
              <h2 id="benefits-heading" className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6 text-center md:text-left">Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-accent/20 hover:-translate-y-2 hover:scale-105">
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-primary dark:text-accent">{benefit}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section ref={processRef} id="process" className="mb-12 scroll-mt-24" aria-labelledby="process-main-heading">
              <h2 id="process-main-heading" className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6 text-center md:text-left">Our Step-by-Step Process</h2>
              <div className="space-y-6">
                {service.process.map((p, i) => (
                  <div key={i} ref={(el) => { stepRefs.current[i] = el; }} className="flex scroll-mt-24">
                    <div className="flex flex-col items-center mr-4" aria-hidden="true">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border-2 border-primary rounded-full text-primary font-bold">
                          {i + 1}
                        </div>
                      </div>
                      {i < service.process.length - 1 && <div className="w-px h-full bg-primary/30"></div>}
                    </div>
                    <div className="pb-8">
                      <h3 className="font-heading mb-2 text-lg sm:text-xl font-bold text-text_light dark:text-text_dark">{p.step}</h3>
                      <p className="text-subtext_light dark:text-subtext_dark">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Us */}
            <section ref={whyUsRef} id="why-us" className="scroll-mt-24" aria-labelledby="why-us-heading">
              <h2 id="why-us-heading" className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6 text-center md:text-left">Why ProbSolv?</h2>
              <div className="space-y-6">
                {service.whyUs.map((reason, i) => (
                  <div key={i} className="bg-bg_light dark:bg-surface_dark p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-accent/20 hover:-translate-y-2 hover:scale-105">
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-text_light dark:text-text_dark mb-2">{reason.title}</h3>
                    <p className="text-subtext_light dark:text-subtext_dark">{reason.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Related Insights */}
            {relatedPosts.length > 0 && (
                <section id="related-insights" className="mt-16 scroll-mt-24" aria-labelledby="related-insights-heading">
                    <h2 id="related-insights-heading" className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6 text-center md:text-left">Related Insights</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedPosts.map((post) => (
                            <button
                                key={post.id}
                                onClick={() => setPage('BlogPost', post.id)}
                                className="group bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl text-left transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 dark:hover:shadow-accent/15 hover:-translate-y-2 hover:scale-105 hover:border-primary dark:hover:border-accent flex flex-col"
                            >
                                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-xl">
                                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-primary dark:text-accent font-semibold mb-2">{post.category}</p>
                                    <h3 className="font-heading text-lg font-bold text-text_light dark:text-text_dark flex-grow">{post.title}</h3>
                                    <div className="mt-4 font-semibold text-primary dark:text-accent inline-flex items-center">
                                        Read More
                                        <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;