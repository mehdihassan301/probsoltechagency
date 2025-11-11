import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { SpinnerIcon } from '../components/Icons';
import { pricingTiers } from '../components/constants';

interface ProjectBriefPageProps {
  planName: string;
  setPage: (page: Page) => void;
}

const ProjectBriefPage: React.FC<ProjectBriefPageProps> = ({ planName, setPage }) => {
  const selectedPlan = pricingTiers.find(p => p.name === planName);
  const planBudget = selectedPlan ? selectedPlan.price : 'N/A';
    
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    socialLink: '',
    newToTech: '',
    message: '',
    plan: planName,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, newToTech: e.target.value });
  };


  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formState.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[1-9]\d{6,14}$/.test(formState.phone.replace(/[\s-()]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formState.businessName.trim()) newErrors.businessName = 'Business Name is required.';
    if (!formState.newToTech) newErrors.newToTech = 'This field is required.';
    if (!formState.message.trim()) newErrors.message = 'Please describe your project.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const submissionData = {
          ...formState,
          plan: `${planName} (Budget: ${planBudget})`,
          form_source: 'Project Brief Page'
        };
          
        const response = await fetch('https://formspree.io/f/mpwozakj', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          throw new Error('Form submission failed.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitError('Sorry, there was an issue sending your brief. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-text_light dark:text-text_dark">Project Brief</h1>
        <p className="mt-4 text-base md:text-lg text-subtext_light dark:text-subtext_dark">
          Let's get started! Please provide us with some details about your project to help us understand your vision.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 md:p-12">
        {submitted ? (
          <div className="text-center py-10 animate-fade-in">
            <h2 className="font-heading text-2xl font-bold text-primary dark:text-accent mb-4">Brief Submitted!</h2>
            <p className="text-subtext_light dark:text-subtext_dark">Thank you! We've received your project details and will be in touch within 24 hours to discuss the next steps.</p>
             <button
              onClick={() => setPage('Home')}
              className="mt-8 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-purple-600 transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="selected-plan" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Selected Plan</label>
              <div id="selected-plan" className="w-full bg-bg_light dark:bg-bg_dark border border-border_light dark:border-border_dark rounded-md p-3">
                <span className="font-semibold text-text_light dark:text-text_dark">{planName}</span>
                <span className="text-subtext_light dark:text-subtext_dark"> (Budget: {planBudget})</span>
              </div>
            </div>
             
             {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Full Name</label>
                <input type="text" name="name" id="name" required value={formState.name} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Email Address</label>
                <input type="email" name="email" id="email" required value={formState.email} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>
            </div>
            
            {/* Business Info */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                <label htmlFor="phone" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Phone Number</label>
                <input type="tel" name="phone" id="phone" required placeholder="+1..." value={formState.phone} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                </div>
                <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Business Name</label>
                <input type="text" name="businessName" id="businessName" required value={formState.businessName} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.businessName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                {errors.businessName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessName}</p>}
                </div>
            </div>
            
            {/* Social Link */}
             <div>
                <label htmlFor="socialLink" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Website or Social Link <span className="text-xs">(Optional)</span></label>
                <input type="url" name="socialLink" id="socialLink" placeholder="https://..." value={formState.socialLink} onChange={handleChange} className="w-full bg-bg_light dark:bg-bg_dark border border-border_light dark:border-border_dark rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light focus:ring-primary focus:border-primary"/>
            </div>

            {/* Tech Experience */}
            <div>
              <label className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Are you new to working with technology/agencies?</label>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="newToTech" value="Yes" required checked={formState.newToTech === 'Yes'} onChange={handleRadioChange} className="form-radio text-primary focus:ring-primary" />
                  <span className="ml-2 text-text_light dark:text-text_dark">Yes</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="newToTech" value="No" required checked={formState.newToTech === 'No'} onChange={handleRadioChange} className="form-radio text-primary focus:ring-primary" />
                  <span className="ml-2 text-text_light dark:text-text_dark">No</span>
                </label>
              </div>
              {errors.newToTech && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.newToTech}</p>}
            </div>

            {/* Project Details */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Tell us about your project</label>
              <textarea name="message" id="message" rows={5} required placeholder="What are your goals? Who is your target audience? Any specific features you need?" value={formState.message} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
            </div>

            {/* Submission */}
            <div>
              <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg text-base hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                {isSubmitting && <SpinnerIcon className="w-5 h-5" />}
                {isSubmitting ? 'Submitting...' : 'Submit Project Brief'}
              </button>
            </div>
            {submitError && <p className="mt-4 text-center text-red-600 dark:text-red-400">{submitError}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ProjectBriefPage;