import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { pricingTiers } from '../components/constants';
import AnimatedCardBackground from '../components/AnimatedCardBackground';
import { SpinnerIcon } from '../components/Icons';

interface PricingPageProps {
  setPage: (page: Page, id?: string) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ setPage }) => {
  const tierRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleTiers, setVisibleTiers] = useState<Set<number>>(new Set());
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  const [isCustomFormVisible, setIsCustomFormVisible] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

    const tierObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setVisibleTiers(prev => new Set(prev).add(index));
          tierObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    tierRefs.current.forEach(ref => {
      if (ref) tierObserver.observe(ref);
    });

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      tierRefs.current.forEach(ref => {
        if (ref) tierObserver.unobserve(ref);
      });
    };
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formState.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Please describe your requirements.';
    } else if (formState.message.length > 500) {
      newErrors.message = 'Message cannot exceed 500 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch('https://formspree.io/f/mpwozakj', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ ...formState, form_source: 'Pricing Page - Bespoke Solution' }),
            });
            if (response.ok) {
                setSubmitted(true);
            } else {
                throw new Error('Form submission failed.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitError('Sorry, there was an issue sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={titleRef} className={`text-center max-w-2xl mx-auto mb-16 ${titleVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-text_light dark:text-text_dark">Flexible Pricing Plans</h1>
        <p className="mt-4 text-base md:text-lg text-subtext_light dark:text-subtext_dark">
          Choose a plan that scales with your business needs. Transparent pricing for exceptional value.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <div 
            key={tier.name} 
            ref={el => { tierRefs.current[index] = el; }}
            data-index={index}
            className={`relative rounded-xl p-8 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl overflow-hidden will-change-[transform,opacity] ${visibleTiers.has(index) ? 'animate-fade-in-up' : 'opacity-0'} ${
            tier.popular 
              ? 'border-2 border-primary bg-surface_light/90 dark:bg-surface_dark/90 shadow-2xl shadow-primary/20' 
              : 'border border-border_light dark:border-border_dark bg-surface_light/90 dark:bg-surface_dark/90 hover:border-primary dark:hover:border-accent hover:shadow-primary/20 dark:hover:shadow-accent/20'
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <AnimatedCardBackground />
            {tier.popular && (
              <div className="absolute top-0 right-8 -mt-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase z-20">Most Popular</div>
            )}
            <div className="relative z-10 flex flex-col flex-grow">
              <h2 className="font-heading text-2xl font-bold text-text_light dark:text-text_dark">{tier.name}</h2>
              
              {/* Pricing Block */}
              {tier.originalPrice ? (
                <>
                  <div className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-2xl font-medium text-subtext_light/80 dark:text-subtext_dark/80 line-through decoration-2">
                      {tier.originalPrice}
                    </span>
                    <p className="font-heading text-5xl font-extrabold text-text_light dark:text-text_dark">{tier.price}</p>
                  </div>
                  {tier.discount && (
                    <div className="mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
                            {tier.discount}
                        </span>
                    </div>
                  )}
                </>
              ) : (
                <p className="font-heading text-5xl font-extrabold text-text_light dark:text-text_dark mt-4">{tier.price}</p>
              )}

              <p className="text-subtext_light dark:text-subtext_dark mt-4 min-h-[60px]">{tier.description}</p>
              <div className="border-t border-border_light dark:border-border_dark my-6"></div>
              <ul className="space-y-4 text-text_light dark:text-text_dark flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="border-t border-border_light dark:border-border_dark my-6"></div>
              <p className="text-sm text-subtext_light dark:text-subtext_dark mb-6">Delivery: <span className="font-semibold text-text_light dark:text-text_dark">{tier.delivery}</span></p>
              <button
                onClick={() => setPage('ProjectBrief', tier.name)}
                className={`w-full py-2.5 font-semibold text-sm rounded-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface_dark ${
                tier.popular ? 'bg-primary text-white hover:bg-purple-600 focus-visible:ring-white' : 'bg-border_light text-text_light hover:bg-gray-300 dark:bg-border_dark dark:text-text_dark dark:hover:bg-border_dark/50 focus-visible:ring-primary'
              }`}>
                {tier.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
            onClick={() => setIsCustomFormVisible(prev => !prev)}
            className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
        >
            Request a Bespoke Solution
        </button>
      </div>

      {isCustomFormVisible && (
        <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up">
            {submitted ? (
                <div className="text-center p-8 bg-green-500/10 text-green-700 dark:text-green-300 rounded-lg animate-fade-in" role="alert">
                    <h3 className="font-heading text-2xl font-bold">Thank You!</h3>
                    <p>Your request for a bespoke solution has been received. We will contact you shortly.</p>
                </div>
            ) : (
                <div className="bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 md:p-12">
                    <h3 className="font-heading text-2xl font-bold text-text_light dark:text-text_dark text-center mb-6">Describe Your Custom Requirements</h3>
                    <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Full Name</label>
                                <input type="text" name="name" id="name" required value={formState.name} onChange={handleFormChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Email Address</label>
                                <input type="email" name="email" id="email" required value={formState.email} onChange={handleFormChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Project Details</label>
                            <textarea name="message" id="message" rows={5} maxLength={500} required placeholder="Tell us about your project, goals, and any specific features you have in mind..." value={formState.message} onChange={handleFormChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}></textarea>
                            <div className="flex justify-between items-center mt-1">
                                {errors.message ? <p className="text-sm text-red-600 dark:text-red-400">{errors.message}</p> : <span></span>}
                                <p className="text-sm text-subtext_light dark:text-subtext_dark">{formState.message.length}/500</p>
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg text-base hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                                {isSubmitting && <SpinnerIcon className="w-5 h-5" />}
                                {isSubmitting ? 'Sending...' : 'Submit Request'}
                            </button>
                        </div>
                        {submitError && <p className="mt-4 text-center text-red-600 dark:text-red-400">{submitError}</p>}
                    </form>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default PricingPage;