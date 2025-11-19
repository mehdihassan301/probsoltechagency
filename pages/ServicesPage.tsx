
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { serviceDetails } from '../components/constants';
import { ChevronDownIcon, SpinnerIcon, SparklesIcon } from '../components/Icons';
import AnimatedCardBackground from '../components/AnimatedCardBackground';

interface ServicesPageProps {
  setPage: (page: Page, serviceId?: string) => void;
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
          body: JSON.stringify({ ...formState, form_source: 'Services Page - Budget Support Request' }),
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
          body: JSON.stringify({ ...formState, form_source: 'Services Page - Collaboration Proposal' }),
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


const ServiceCard: React.FC<{ service: typeof serviceDetails[0], isOpen: boolean, onToggle: () => void, setPage: (page: Page, serviceId?: string) => void }> = ({ service, isOpen, onToggle, setPage }) => {
  return (
    <div className="group relative border border-border_light dark:border-border_dark rounded-xl bg-surface_light/90 dark:bg-surface_dark/90 overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-accent/20 hover:border-primary dark:hover:border-accent focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 dark:focus-within:ring-offset-bg_dark">
      <AnimatedCardBackground />
      <div className="relative z-10">
        <button className="w-full text-left p-4 sm:p-6 md:p-8 flex justify-between items-center focus:outline-none" onClick={onToggle}>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <service.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-12deg]" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-text_light dark:text-text_dark">{service.title}</h3>
              <p className="text-subtext_light dark:text-subtext_dark mt-1 text-sm sm:text-base">{service.description}</p>
            </div>
          </div>
          <ChevronDownIcon className={`w-6 h-6 text-subtext_light dark:text-subtext_dark transition-transform duration-300 ml-4 flex-shrink-0 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        <div 
          className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-4 border-t border-border_light dark:border-border_dark">
              
              <p className="text-subtext_light dark:text-subtext_dark mb-8 text-sm sm:text-base leading-relaxed">{service.overview}</p>
              
              <div className="grid md:grid-cols-2 md:gap-x-12">
                {/* Left Column */}
                <div>
                  <h4 className="font-heading text-base sm:text-lg font-semibold text-text_light dark:text-text_dark mb-4">Our Process</h4>
                  <ol className="list-decimal list-inside space-y-3 text-subtext_light dark:text-subtext_dark text-sm sm:text-base">
                    {service.process.slice(0, 4).map(p => <li key={p.step}><strong>{p.step}</strong></li>)}
                  </ol>
                </div>
                
                {/* Right Column */}
                <div className="mt-8 md:mt-0">
                  <h4 className="font-heading text-base sm:text-lg font-semibold text-text_light dark:text-text_dark mb-4">Key Benefits</h4>
                  <ul className="list-disc list-inside space-y-2 text-subtext_light dark:text-subtext_dark mb-6 text-sm sm:text-base">
                    {service.benefits.slice(0, 4).map(b => <li key={b}>{b}</li>)}
                  </ul>
                  
                  <h4 className="font-heading text-base sm:text-lg font-semibold text-text_light dark:text-text_dark mb-4 mt-8">Deliverables</h4>
                  <ul className="list-disc list-inside space-y-2 text-subtext_light dark:text-subtext_dark text-sm sm:text-base">
                    {service.deliverables.slice(0, 4).map(d => <li key={d}>{d}</li>)}
                  </ul>
                </div>
              </div>
              
              <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg text-center mt-8">
                <p className="font-semibold text-primary text-sm sm:text-base">Guarantee: Elite-quality delivery with revisions until satisfaction.</p>
                <p className="text-sm text-accent">Plus, a 7-Day Money-Back Promise.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                 <button
                  onClick={() => setPage('ServiceDetail', service.id)}
                  className="w-full sm:w-auto px-5 py-2.5 border-2 border-primary text-primary font-semibold text-sm rounded-lg hover:bg-primary/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-surface_dark"
                >
                  Learn More
                </button>
                <button
                  onClick={() => setPage('Contact')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-purple-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white dark:focus-visible:ring-offset-surface_dark"
                >
                  Build With ProbSolv
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ServicesPage: React.FC<ServicesPageProps> = ({ setPage }) => {
  const [openService, setOpenService] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [activeForm, setActiveForm] = useState<'support' | 'collab' | null>(null);
  const formSectionRef = useRef<HTMLElement>(null);

  const toggleService = (id: string) => {
    setOpenService(openService === id ? null : id);
  };
  
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

  useEffect(() => {
    if (activeForm && formSectionRef.current) {
        setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
  }, [activeForm]);

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={titleRef} className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 ${titleVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-text_light dark:text-text_dark">Our Services</h1>
        <p className="mt-4 text-base md:text-lg text-subtext_light dark:text-subtext_dark">
          We provide cutting-edge digital solutions to elevate your business.
        </p>
      </div>
      
      {/* Promotional Campaign Card */}
      <div className="max-w-4xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/50 dark:border-primary/40 p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary dark:text-accent font-bold text-xs uppercase tracking-wider mb-4">
                    <SparklesIcon className="w-4 h-4" />
                    <span>Limited Time Offer</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-3">
                    Current Campaign: Get Visibility Now
                </h2>
                <p className="text-subtext_light dark:text-subtext_dark mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                    We are actively building our public portfolio and reviews. For a limited time, we are waiving <strong>100% of our development fees</strong> for the first 50 partners. Get premium Web Design, AI Chatbots, or Vibe Coded Apps for free in exchange for your honest feedback.
                </p>
                <button
                    onClick={() => setPage('Visibility')}
                    className="px-8 py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-purple-600 transition-all transform hover:scale-105 shadow-lg shadow-primary/30 text-sm sm:text-base"
                >
                    View Campaign Offer
                </button>
            </div>
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 blur-3xl rounded-full"></div>
          </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {serviceDetails.map((service, index) => (
          <div 
            key={service.id} 
            ref={el => { cardRefs.current[index] = el; }} 
            data-index={index}
            className={`will-change-[transform,opacity] ${visibleCards.has(index) ? 'animate-fade-in-up' : 'opacity-0'}`} 
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ServiceCard 
              service={service} 
              isOpen={openService === service.id} 
              onToggle={() => toggleService(service.id)}
              setPage={setPage}
            />
          </div>
        ))}
      </div>

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

export default ServicesPage;
