import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { pricingTiers, serviceDetails } from '../components/constants';
import AnimatedCardBackground from '../components/AnimatedCardBackground';
import { SpinnerIcon } from '../components/Icons';

interface PricingPageProps {
  setPage: (page: Page, id?: string) => void;
}

const SupportRequestForm: React.FC<{onClose: () => void}> = ({ onClose }) => {
  const [formState, setFormState] = useState({ name: '', email: '', service: '', budget: '', description: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formState.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formState.service) newErrors.service = 'Please select a service.';
    if (!formState.description.trim()) newErrors.description = 'Please describe your project.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('https://formspree.io/f/mpwozakj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ ...formState, form_source: 'Pricing Page - Budget Support Request' }),
        });
        if (response.ok) {
          setSubmitted(true);
        } else {
          throw new Error('Form submission failed.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitError('Sorry, there was an issue sending your request. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="mt-12 text-center p-8 bg-green-500/10 text-green-700 dark:text-green-300 rounded-lg animate-fade-in" role="alert">
        <h3 className="font-heading text-2xl font-bold">Thank You!</h3>
        <p>Your support request has been received. We'll review it and get back to you if it aligns with our support program.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 text-sm font-semibold text-green-800 dark:text-green-200 bg-green-200/50 dark:bg-green-300/20 rounded-md">Close</button>
      </div>
    );
  }

  return (
    <div className="mt-12 text-left bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 md:p-12 animate-fade-in-up">
        <h3 className="font-heading text-2xl font-bold text-text_light dark:text-text_dark text-center mb-6">Budget Support Request</h3>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="support-name" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Full Name</label>
                    <input type="text" name="name" id="support-name" required value={formState.name} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="support-email" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Email Address</label>
                    <input type="email" name="email" id="support-email" required value={formState.email} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                    {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="support-service" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Service of Interest</label>
                    <select name="service" id="support-service" required value={formState.service} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark ${errors.service ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}>
                        <option value="" disabled>Select a service...</option>
                        {serviceDetails.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                        <option value="Other">Other</option>
                    </select>
                    {errors.service && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.service}</p>}
                </div>
                <div>
                    <label htmlFor="support-budget" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Your Budget (USD) <span className="text-xs">(Optional)</span></label>
                    <input type="text" name="budget" id="support-budget" placeholder="e.g., $500" value={formState.budget} onChange={handleChange} className="w-full bg-bg_light dark:bg-bg_dark border border-border_light dark:border-border_dark rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light focus:ring-primary focus:border-primary"/>
                </div>
            </div>
            <div>
                <label htmlFor="support-description" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Project Description</label>
                <textarea name="description" id="support-description" rows={4} required placeholder="Tell us about your project and why you need support..." value={formState.description} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.description ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
            </div>
            <div>
                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg text-base hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                    {isSubmitting && <SpinnerIcon className="w-5 h-5" />}
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
            </div>
            {submitError && <p className="mt-4 text-center text-red-600 dark:text-red-400">{submitError}</p>}
        </form>
    </div>
  );
};

const CollaborationProposalForm: React.FC<{onClose: () => void}> = ({ onClose }) => {
  const [formState, setFormState] = useState({ name: '', email: '', title: '', proposal: '', needs: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formState.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formState.title.trim()) newErrors.title = 'Please provide a title for your idea.';
    if (!formState.proposal.trim()) newErrors.proposal = 'Please describe your proposal.';
    if (!formState.needs.trim()) newErrors.needs = 'Please tell us what you need from us.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('https://formspree.io/f/mpwozakj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ ...formState, form_source: 'Pricing Page - Collaboration Proposal' }),
        });
        if (response.ok) {
          setSubmitted(true);
        } else {
          throw new Error('Form submission failed.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitError('Sorry, there was an issue sending your proposal. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="mt-12 text-center p-8 bg-green-500/10 text-green-700 dark:text-green-300 rounded-lg animate-fade-in" role="alert">
        <h3 className="font-heading text-2xl font-bold">Proposal Sent!</h3>
        <p>Thank you for your interest in collaborating. We'll review your proposal and reach out if it's a good fit.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 text-sm font-semibold text-green-800 dark:text-green-200 bg-green-200/50 dark:bg-green-300/20 rounded-md">Close</button>
      </div>
    );
  }

  return (
    <div className="mt-12 text-left bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 md:p-12 animate-fade-in-up">
        <h3 className="font-heading text-2xl font-bold text-text_light dark:text-text_dark text-center mb-6">Collaboration Proposal</h3>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="collab-name" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Full Name</label>
                    <input type="text" name="name" id="collab-name" required value={formState.name} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="collab-email" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Email Address</label>
                    <input type="email" name="email" id="collab-email" required value={formState.email} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                    {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="collab-title" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Your Idea / Venture</label>
                <input type="text" name="title" id="collab-title" required placeholder="e.g., AI-Powered App for..." value={formState.title} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
            </div>
             <div>
                <label htmlFor="collab-proposal" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Proposal & Your Contribution</label>
                <textarea name="proposal" id="collab-proposal" rows={4} required placeholder="Briefly describe your idea and what you bring to the table (e.g., industry expertise, audience, etc.)." value={formState.proposal} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.proposal ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}></textarea>
                {errors.proposal && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.proposal}</p>}
            </div>
            <div>
                <label htmlFor="collab-needs" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">What you need from ProbSolv</label>
                <textarea name="needs" id="collab-needs" rows={4} required placeholder="What specific expertise or resources are you looking for from us?" value={formState.needs} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.needs ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}></textarea>
                {errors.needs && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.needs}</p>}
            </div>
            <div>
                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg text-base hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                    {isSubmitting && <SpinnerIcon className="w-5 h-5" />}
                    {isSubmitting ? 'Submitting...' : 'Propose Collaboration'}
                </button>
            </div>
            {submitError && <p className="mt-4 text-center text-red-600 dark:text-red-400">{submitError}</p>}
        </form>
    </div>
  );
};


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

  const [activeForm, setActiveForm] = useState<'support' | 'collab' | null>(null);
  const formSectionRef = useRef<HTMLElement>(null);


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
  
  useEffect(() => {
    if (activeForm && formSectionRef.current) {
        setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
  }, [activeForm]);

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
            className={`relative rounded-xl p-8 flex flex-col transition-all duration-500 ease-in-out transform hover:scale-[1.03] hover:-translate-y-1 overflow-hidden will-change-[transform,opacity] ${visibleTiers.has(index) ? 'animate-fade-in-up' : 'opacity-0'} ${
            tier.popular 
              ? 'border-2 border-primary bg-surface_light/90 dark:bg-surface_dark/90 shadow-2xl shadow-primary/20 dark:shadow-accent/10' 
              : 'border border-border_light dark:border-border_dark bg-surface_light/90 dark:bg-surface_dark/90 hover:border-primary dark:hover:border-accent hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-accent/20'
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
            {isCustomFormVisible ? 'Close Custom Form' : 'Request a Bespoke Solution'}
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

      <section ref={formSectionRef} className="mt-16 sm:mt-24 max-w-4xl mx-auto text-center scroll-mt-24">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark">Alternative Partnership Models</h2>
        <p className="mt-4 text-subtext_light dark:text-subtext_dark max-w-3xl mx-auto">
            We believe in fostering innovation and supporting great ideas. If our standard plans aren't the right fit, let's explore other ways to work together.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
                onClick={() => setActiveForm(activeForm === 'collab' ? null : 'collab')}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
            >
                {activeForm === 'collab' ? 'Close Proposal Form' : 'Propose a Collaboration'}
            </button>
            <button
                onClick={() => setActiveForm(activeForm === 'support' ? null : 'support')}
                className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
            >
                {activeForm === 'support' ? 'Close Support Form' : 'Request Budget Support'}
            </button>
        </div>

        {activeForm === 'support' && <SupportRequestForm onClose={() => setActiveForm(null)} />}
        {activeForm === 'collab' && <CollaborationProposalForm onClose={() => setActiveForm(null)} />}
      </section>

    </div>
  );
};

export default PricingPage;
