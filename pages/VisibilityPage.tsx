
import React, { useState } from 'react';
import { Page } from '../types';
import AnimatedCardBackground from '../components/AnimatedCardBackground';
import { WebDevIcon, VibeCodeIcon, AIIcon, XIcon, SpinnerIcon, ZapIcon } from '../components/Icons';

interface VisibilityPageProps {
  setPage: (page: Page) => void;
}

const CriteriaModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="relative bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 max-w-lg w-full shadow-2xl animate-pop-in z-50">
        <button onClick={onClose} className="absolute top-4 right-4 text-subtext_light dark:text-subtext_dark hover:text-text_light dark:hover:text-text_dark">
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="font-heading text-2xl font-bold text-text_light dark:text-text_dark mb-4">Value Exchange Criteria</h3>
        <p className="text-subtext_light dark:text-subtext_dark mb-6">
          We are offering these premium services with 100% waiver on our development fees to build our public reputation. In exchange for $2,500+ worth of value, we ask for:
        </p>
        <ul className="space-y-4 text-text_light dark:text-text_dark mb-6">
          <li className="flex items-start gap-3">
            <span className="text-yellow-500 text-xl">★</span>
            <span>A genuine, video or detailed text review on <strong>Trustpilot</strong> after project delivery.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-yellow-500 text-xl">★</span>
            <span>A 5-star rating and review on <strong>Google Maps</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <span>Permission to feature your project in our portfolio.</span>
          </li>
        </ul>
        <p className="text-sm text-subtext_light dark:text-subtext_dark italic border-l-2 border-primary pl-4">
            "We grow when you grow. Your honest feedback helps us help more businesses."
        </p>
        <button onClick={onClose} className="mt-8 w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-purple-600 transition-all">
          I Understand
        </button>
      </div>
    </div>
  );
};

const AvailFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [formState, setFormState] = useState({ name: '', email: '', service: 'Web Designing', agreement: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.agreement) {
            setError('You must agree to the review criteria.');
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('https://formspree.io/f/mpwozakj', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                },
                body: JSON.stringify({ ...formState, form_source: 'Visibility Promo - Free Service' }),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                throw new Error('Submission failed.');
            }
        } catch (err) {
            setError('Submission failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 max-w-lg w-full shadow-2xl animate-pop-in z-50">
                 <button onClick={onClose} className="absolute top-4 right-4 text-subtext_light dark:text-subtext_dark hover:text-text_light dark:hover:text-text_dark">
                    <XIcon className="w-6 h-6" />
                </button>
                
                {submitted ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">✓</span>
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-text_light dark:text-text_dark mb-2">Spot Reserved!</h3>
                        <p className="text-subtext_light dark:text-subtext_dark">We've received your request. A team member will contact you within 24 hours to initiate the onboarding.</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 border border-border_light dark:border-border_dark rounded-lg">Close</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="font-heading text-2xl font-bold text-text_light dark:text-text_dark mb-6">Claim Your Spot</h3>
                        <div>
                            <label className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-1">Name</label>
                            <input 
                                type="text" 
                                required 
                                value={formState.name}
                                onChange={e => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-bg_light dark:bg-bg_dark border border-border_light dark:border-border_dark rounded-md p-3 text-text_light dark:text-text_dark focus:ring-primary" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-1">Email</label>
                            <input 
                                type="email" 
                                required 
                                value={formState.email}
                                onChange={e => setFormState({...formState, email: e.target.value})}
                                className="w-full bg-bg_light dark:bg-bg_dark border border-border_light dark:border-border_dark rounded-md p-3 text-text_light dark:text-text_dark focus:ring-primary" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-1">Desired Service</label>
                            <select 
                                value={formState.service}
                                onChange={e => setFormState({...formState, service: e.target.value})}
                                className="w-full bg-bg_light dark:bg-bg_dark border border-border_light dark:border-border_dark rounded-md p-3 text-text_light dark:text-text_dark focus:ring-primary"
                            >
                                <option>Web Designing</option>
                                <option>Simple AI Chatbot Integration</option>
                                <option>Vibe Code App</option>
                            </select>
                        </div>
                        <div className="flex items-start gap-3 pt-2">
                            <input 
                                type="checkbox" 
                                id="agreement" 
                                checked={formState.agreement}
                                onChange={e => setFormState({...formState, agreement: e.target.checked})}
                                className="mt-1 w-4 h-4 text-primary rounded focus:ring-primary" 
                            />
                            <label htmlFor="agreement" className="text-sm text-subtext_light dark:text-subtext_dark">
                                I agree to provide a video or text review on Trustpilot/Google Maps upon completion of the service as "payment" for the development work.
                            </label>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-purple-600 transition-all flex justify-center items-center gap-2 mt-4"
                        >
                            {isSubmitting && <SpinnerIcon className="w-5 h-5" />}
                            {isSubmitting ? 'Processing...' : 'Avail Now'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

const VisibilityPage: React.FC<VisibilityPageProps> = ({ setPage }) => {
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const services = [
    {
      title: 'Web Designing',
      icon: WebDevIcon,
      description: 'A stunning, responsive landing page or 3-page site designed to convert visitors into customers.',
      value: '$1,500 Value'
    },
    {
      title: 'AI Chatbot Integration',
      icon: AIIcon,
      description: 'A smart assistant embedded on your site to answer FAQs and capture leads 24/7.',
      value: '$2,000 Value'
    },
    {
      title: 'Vibe Code App',
      icon: VibeCodeIcon,
      description: 'A bespoke mini-app or interactive component focused on aesthetic and user engagement.',
      value: '$3,000 Value'
    }
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-16 min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 font-bold text-sm animate-pulse">
          Offer Ends December 1st
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-text_light dark:text-white leading-tight">
          Get Visibility Now.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Zero Development Cost.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-subtext_light dark:text-subtext_dark max-w-2xl mx-auto">
          We are waiving 100% of our agency fees for the first 50 partners. You get premium tech; we get your honest feedback to grow.
        </p>
        
        <div className="mt-8 flex justify-center items-center gap-2 text-sm font-semibold text-text_light dark:text-text_dark">
            <ZapIcon className="w-5 h-5 text-yellow-400" />
            <span>Limited to 50 Spots</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {services.map((service, index) => (
          <div 
            key={service.title} 
            className="relative bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up group overflow-hidden"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <AnimatedCardBackground />
            <div className="relative z-10 flex flex-col items-center h-full">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text_light dark:text-text_dark mb-3">{service.title}</h3>
                <p className="text-subtext_light dark:text-subtext_dark mb-6 flex-grow">{service.description}</p>
                <div className="mt-auto pt-6 border-t border-border_light dark:border-border_dark w-full">
                    <span className="block text-xs text-subtext_light dark:text-subtext_dark uppercase tracking-wider">Standard Price</span>
                    <span className="block text-lg font-bold text-subtext_light dark:text-subtext_dark line-through decoration-red-500">{service.value}</span>
                    <span className="block text-2xl font-extrabold text-primary dark:text-accent mt-1">FREE</span>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Area */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-20 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <button 
            onClick={() => setIsFormOpen(true)}
            className="px-10 py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-purple-600 transition-all transform hover:scale-105 shadow-lg shadow-primary/30 w-full sm:w-auto"
        >
            Avail Now
        </button>
        <button 
            onClick={() => setIsCriteriaOpen(true)}
            className="px-10 py-4 bg-transparent border-2 border-primary text-primary font-bold text-lg rounded-xl hover:bg-primary/10 transition-all transform hover:scale-105 w-full sm:w-auto"
        >
            View Criteria
        </button>
      </div>

      {/* Important Note / Disclaimer */}
      <div className="max-w-3xl mx-auto bg-red-500/5 dark:bg-red-900/10 border border-red-500/20 rounded-lg p-6 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <h4 className="font-heading font-bold text-red-600 dark:text-red-400 mb-2 flex items-center justify-center gap-2">
            <span>⚠</span> Important Note Regarding Costs
        </h4>
        <p className="text-sm md:text-base text-subtext_light dark:text-subtext_dark">
            While our <strong>design and development labor is 100% free</strong>, direct third-party costs are the client's responsibility. These include, but are not limited to:
        </p>
        <ul className="mt-4 text-sm text-left mx-auto max-w-md space-y-2 text-subtext_light dark:text-subtext_dark list-disc pl-5">
            <li><strong>Hosting & Domains:</strong> You must purchase your own domain and hosting plan (we can guide you).</li>
            <li><strong>AI Token Usage:</strong> For high-volume chatbots, OpenAI/Gemini API costs are billed directly to you by the provider.</li>
            <li><strong>Third-Party Licenses:</strong> Any premium fonts, plugins, or stock assets you specifically request that require a license fee.</li>
        </ul>
      </div>

      {/* Modals */}
      <CriteriaModal isOpen={isCriteriaOpen} onClose={() => setIsCriteriaOpen(false)} />
      <AvailFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

    </div>
  );
};

export default VisibilityPage;
