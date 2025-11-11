import React, { useState } from 'react';
import { TwitterIcon, LinkedInIcon, GitHubIcon, ArrowRightIcon, SpinnerIcon } from './Icons';
import { Page } from '../types';
import Logo from './Logo';
import GradientMesh from './GradientMesh';

interface FooterProps {
  setPage: (page: Page) => void;
}

const FooterLink: React.FC<{ page: Page; setPage: (page: Page) => void; children: React.ReactNode }> = ({ page, setPage, children }) => (
    <li>
        <button onClick={() => setPage(page)} className="hover:text-primary dark:hover:text-accent transition-colors duration-200">
            {children}
        </button>
    </li>
);


const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('https://formspree.io/f/mpwozakj', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ email: email, form_source: 'Newsletter Subscription' }),
        });

        if (response.ok) {
          setSubscribed(true);
          setEmail('');
          setTimeout(() => setSubscribed(false), 3000); // Reset after 3s
        } else {
          throw new Error('Subscription failed.');
        }
      } catch (error) {
        console.error('Subscription error:', error);
        setSubmitError('Could not subscribe. Please try again.');
        setTimeout(() => setSubmitError(null), 3000); // Hide error after 3s
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  const socialLinks = [
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
    { icon: GitHubIcon, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="relative overflow-hidden bg-surface_light dark:bg-surface_dark text-subtext_light dark:text-subtext_dark border-t border-border_light dark:border-border_dark">
      <GradientMesh />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-sm">
          {/* Left Side: Info & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <Logo setPage={setPage} />
            <p className="max-w-md">Building the Digital Backbone of Your Business.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  aria-label={social.label} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-subtext_light dark:text-subtext_dark hover:text-primary dark:hover:text-accent"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Middle: Links */}
          <div className="md:col-span-2 lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading font-semibold text-text_light dark:text-text_dark mb-4">Company</h4>
              <ul className="space-y-3">
                <FooterLink page="About" setPage={setPage}>About Us</FooterLink>
                <FooterLink page="Blog" setPage={setPage}>Blog</FooterLink>
                <FooterLink page="Careers" setPage={setPage}>Careers</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-text_light dark:text-text_dark mb-4">Services</h4>
              <ul className="space-y-3">
                <FooterLink page="Services" setPage={setPage}>Our Services</FooterLink>
                <FooterLink page="Portfolio" setPage={setPage}>Portfolio</FooterLink>
                <FooterLink page="Pricing" setPage={setPage}>Pricing</FooterLink>
              </ul>
            </div>
             <div>
              <h4 className="font-heading font-semibold text-text_light dark:text-text_dark mb-4">Support</h4>
              <ul className="space-y-3">
                <FooterLink page="Contact" setPage={setPage}>Contact Us</FooterLink>
                <FooterLink page="PrivacyPolicy" setPage={setPage}>Privacy Policy</FooterLink>
                <FooterLink page="TermsOfService" setPage={setPage}>Terms of Service</FooterLink>
              </ul>
            </div>
          </div>

          {/* Right Side: Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-semibold text-text_light dark:text-text_dark mb-2">Join Our Newsletter</h4>
            <p className="mb-4 text-sm">Get the latest insights on tech, design, and AI.</p>
            {subscribed ? (
              <p role="status" className="text-green-500 animate-fade-in">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center max-w-sm">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-surface_light dark:bg-bg_dark border border-border_light dark:border-border_dark rounded-l-md p-2 text-text_light dark:text-text_dark placeholder-subtext_light dark:placeholder-subtext_dark focus:ring-primary focus:border-primary text-sm"
                />
                <button 
                  type="submit" 
                  aria-label="Subscribe to newsletter"
                  disabled={isSubmitting}
                  className="bg-primary text-white p-2 rounded-r-md hover:bg-purple-600 flex items-center justify-center h-[42px] w-12 disabled:bg-primary/70"
                >
                  {isSubmitting ? <SpinnerIcon className="w-5 h-5" /> : <ArrowRightIcon className="w-5 h-5" />}
                </button>
              </form>
            )}
             {submitError && <p role="alert" className="mt-2 text-sm text-red-500 animate-fade-in">{submitError}</p>}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border_light dark:border-border_dark text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ProbSolv Tech Agency. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;