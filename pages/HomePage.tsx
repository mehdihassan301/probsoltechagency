import React, { useRef, useEffect, useState } from 'react';
import { Page, PricingTier } from '../types';
import { 
    AIIcon, WebDevIcon, VibeCodeIcon, ArrowRightIcon, ZapIcon, ShieldCheckIcon, SparklesIcon,
    ReactIcon, NextjsIcon, TailwindIcon, NodejsIcon, PythonIcon, FirebaseIcon, MongoDBIcon, 
    SupabaseIcon, OpenAIIcon, VercelIcon 
} from '../components/Icons';
import { portfolioItems, serviceDetails, pricingTiers } from '../components/constants';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedCardBackground from '../components/AnimatedCardBackground';

interface HomePageProps {
  setPage: (page: Page, id?: string) => void;
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
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);
    return isInView;
};

// Section Component for consistent animations
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string, threshold?: number }> = ({ children, className = '', threshold = 0.1 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useAnimateOnScroll(ref, threshold);
    return (
        <section ref={ref} className={`${className} will-change-[transform,opacity] ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {children}
        </section>
    );
};

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const featuredProjects = portfolioItems.slice(0, 3);
  const featuredServices = serviceDetails.slice(0, 3);

  const credibilityItems = [
    { icon: ZapIcon, text: "Fast Delivery " },
    { icon: SparklesIcon, text: "Modern Design Standards" },
    { icon: ShieldCheckIcon, text: "Secure Tech" },
    { icon: AIIcon, text: "AI-Powered Systems" }
  ];

  const valueProps = [
    { icon: WebDevIcon, title: "Future-Ready Technology", description: "We build with scalable, modern frameworks to ensure your digital assets are built for tomorrow's challenges." },
    { icon: VibeCodeIcon, title: "Human-Centered Interfaces", description: "Our designs prioritize intuitive user experiences, making technology feel effortless and engaging." },
    { icon: AIIcon, title: "Automation That Saves", description: "We implement intelligent systems that cut down on manual work, saving you valuable time and resources." },
    { icon: SparklesIcon, title: "Vibe-Coded Aesthetic", description: "Beyond functionality, we craft unique digital vibes that resonate with your brand and captivate your audience." }
  ];

  const techStackIcons = [
    { icon: ReactIcon, name: "React" },
    { icon: NextjsIcon, name: "Next.js" },
    { icon: TailwindIcon, name: "TailwindCSS" },
    { icon: NodejsIcon, name: "Node.js" },
    { icon: PythonIcon, name: "Python" },
    { icon: FirebaseIcon, name: "Firebase" },
    { icon: MongoDBIcon, name: "MongoDB" },
    { icon: SupabaseIcon, name: "Supabase" },
    { icon: OpenAIIcon, name: "OpenAI" },
    { icon: VercelIcon, name: "Vercel" }
  ];
  
  const processSteps = [
    { number: "01", title: "Discovery", description: "We dive deep into your goals, audience, and challenges to build a strategic roadmap for success." },
    { number: "02", title: "Design", description: "Our team crafts stunning, user-centric designs and interactive prototypes for your approval." },
    { number: "03", title: "Development", description: "Using agile methods, we build your solution with clean, efficient code and provide regular updates." },
    { number: "04", title: "Launch & Automation", description: "We handle a seamless deployment and integrate automation to ensure your new digital engine runs smoothly." }
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <ParticleBackground type="network" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms', opacity: 0 }}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text_light dark:text-white leading-tight drop-shadow-lg animate-text-alive">
              ProbSolv Tech Agency
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms', opacity: 0 }}>
            <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-teal-600 drop-shadow-[0_0_8px_rgba(13,148,136,0.4)] dark:text-accent dark:drop-shadow-[0_0_10px_rgba(106,235,255,0.7)] tracking-wide">
              Web Development • Vibe Coded Apps • AI Automations
            </h2>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '500ms', opacity: 0 }}>
            <h3 className="mt-6 max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-subtext_light dark:text-gray-300 drop-shadow-lg">
              Scalable Intelligence for Modern Businesses.<span className="font-bold text-text_light dark:text-white">Effortlessly</span>.
            </h3>
          </div>
          <div className="animate-fade-in-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '600ms', opacity: 0 }}>
            <button
              onClick={() => setPage('Contact')}
              className="px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base bg-primary text-white font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 w-full sm:w-auto"
            >
              Launch Your System
            </button>
            <button
              onClick={() => setPage('Services')}
              className="px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base bg-surface_light/80 dark:bg-surface_dark/80 backdrop-blur-sm text-text_light dark:text-text_dark font-semibold rounded-lg hover:bg-surface_light dark:hover:bg-surface_dark transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              What We Offer
            </button>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <AnimatedSection className="py-8 bg-bg_light/50 dark:bg-surface_dark/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                {credibilityItems.map((item, index) => (
                    <div key={index} className="group flex flex-col sm:flex-row items-center justify-center gap-3 text-center transition-transform duration-300 hover:scale-105">
                        <item.icon className="w-7 h-7 text-subtext_light dark:text-subtext_dark group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300 animate-pulse-subtle group-hover:animate-none" />
                        <span className="text-sm sm:text-base font-semibold text-subtext_light dark:text-subtext_dark group-hover:text-text_light dark:group-hover:text-text_dark transition-colors duration-300">{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
      </AnimatedSection>
      
      {/* Value Proposition Grid */}
      <AnimatedSection className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {valueProps.map((prop, index) => (
                    <div key={index} className="relative group bg-surface_light dark:bg-surface_dark p-8 rounded-xl border border-border_light dark:border-border_dark overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-accent/10">
                        <AnimatedCardBackground />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                                <prop.icon className="w-7 h-7" />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-text_light dark:text-text_dark mb-2">{prop.title}</h3>
                            <p className="text-subtext_light dark:text-subtext_dark">{prop.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </AnimatedSection>

      {/* Core Services Section */}
      <AnimatedSection className="py-16 sm:py-20 md:py-24 bg-bg_light dark:bg-surface_dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text_light dark:text-text_dark mb-12">Our Core Services</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredServices.map((service) => (
              <button key={service.id} onClick={() => setPage('ServiceDetail', service.id)} className="w-full h-full text-left relative group bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-accent/20 hover:-translate-y-2 hover:scale-105 hover:border-primary dark:hover:border-accent flex flex-col items-start overflow-hidden">
                <AnimatedCardBackground />
                <div className="relative z-10 flex flex-col items-start flex-grow">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary group-hover:text-white flex-shrink-0">
                    <service.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-12deg]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text_light dark:text-text_dark mb-2">{service.title}</h3>
                  <p className="text-subtext_light dark:text-subtext_dark mb-6 flex-grow">{service.description}</p>
                  <div className="mt-auto font-semibold text-primary dark:text-accent inline-flex items-center">
                    Learn More <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setPage('Services')} className="mt-12 px-5 sm:px-6 py-2.5 bg-primary text-white font-semibold rounded-lg text-sm hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
            Explore All Services
          </button>
        </div>
      </AnimatedSection>

      {/* Transformation Section */}
      <AnimatedSection className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text_light dark:text-text_dark mb-4">From Manual Chaos to Automated Clarity</h2>
            <p className="max-w-2xl mx-auto text-subtext_light dark:text-subtext_dark mb-12">We transform cluttered workflows into streamlined, intelligent systems that work for you.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
                {/* Before */}
                <div className="w-full p-8 bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="font-heading text-2xl font-bold mb-4">Before ProbSolv</h3>
                    <ul className="space-y-3 text-subtext_light dark:text-subtext_dark">
                        <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✕</span><span>Overwhelmed by repetitive tasks and support tickets.</span></li>
                        <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✕</span><span>Outdated website with low engagement and conversions.</span></li>
                        <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✕</span><span>Missed opportunities due to inefficient processes.</span></li>
                    </ul>
                </div>
                {/* After */}
                <div className="w-full p-8 bg-primary/10 dark:bg-primary/20 border border-primary/50 rounded-xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                     <h3 className="font-heading text-2xl font-bold text-primary dark:text-accent mb-4">After ProbSolv</h3>
                    <ul className="space-y-3 text-text_light dark:text-text_dark">
                        <li className="flex items-start gap-3"><span className="text-green-500 font-bold mt-1">✓</span><span>AI-powered automations handle 80% of manual work.</span></li>
                        <li className="flex items-start gap-3"><span className="text-green-500 font-bold mt-1">✓</span><span>A high-performance website that converts visitors into customers.</span></li>
                        <li className="flex items-start gap-3"><span className="text-green-500 font-bold mt-1">✓</span><span>Scalable digital systems that fuel business growth.</span></li>
                    </ul>
                </div>
            </div>
        </div>
      </AnimatedSection>

      {/* Featured Projects */}
      <AnimatedSection className="py-16 sm:py-20 md:py-24 bg-bg_light dark:bg-surface_dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text_light dark:text-text_dark mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-xl aspect-w-4 aspect-h-3 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-accent/20 hover:-translate-y-2 hover:scale-105">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                  <p className="text-accent text-sm">{item.category}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button onClick={() => setPage('CaseStudy', item.id)} className="font-semibold text-white bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-primary">
                      View Case Study
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setPage('Portfolio')} className="mt-12 px-5 sm:px-6 py-2.5 bg-primary text-white font-semibold rounded-lg text-sm hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
            View Full Portfolio
          </button>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text_light dark:text-text_dark mb-12">What Our Clients Say</h2>
          <TestimonialsCarousel />
        </div>
      </AnimatedSection>
      
      {/* Tech Stack */}
      <AnimatedSection className="py-16 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text_light dark:text-text_dark mb-12">Our Technology Stack</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 max-w-4xl mx-auto">
            {techStackIcons.map(tech => (
              <div key={tech.name} className="group flex flex-col items-center gap-2 text-subtext_light dark:text-subtext_dark transition-colors duration-300 hover:text-primary dark:hover:text-accent">
                <tech.icon className="h-10 w-10 sm:h-12 sm:w-12 transition-all duration-300 group-hover:scale-110 animate-pulse-subtle group-hover:animate-none" />
                <span className="text-xs sm:text-sm font-semibold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text_light dark:text-text_dark mb-12">Our 4-Step Process to Success</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {processSteps.map((step) => (
                    <div key={step.number} className="relative p-6 text-left">
                        <div className="absolute top-4 left-4 text-7xl font-black text-gray-400/20 dark:text-gray-600/20 -z-10">{step.number}</div>
                        <h3 className="font-heading text-xl font-bold text-text_light dark:text-text_dark mt-12 mb-2">{step.title}</h3>
                        <p className="text-subtext_light dark:text-subtext_dark">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </AnimatedSection>
      
      {/* Final CTA */}
      <AnimatedSection className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-purple-600 p-8 sm:p-12 rounded-xl shadow-2xl shadow-primary/30 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-16 -left-10 w-52 h-52 bg-white/10 rounded-full"></div>
                <div className="relative z-10">
                    <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">Ready to Build Something Powerful?</h2>
                    <p className="mt-4 max-w-xl mx-auto text-white/80 text-lg">Tell us your idea and we’ll turn it into a scalable digital system.</p>
                    <button onClick={() => setPage('Contact')} className="mt-8 px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base bg-white text-primary font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                        Start Your Project
                    </button>
                </div>
            </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default HomePage;
