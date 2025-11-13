import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, SparklesIcon, BrainIcon, UsersIcon, SpinnerIcon, ZapIcon } from './Icons';
import AnimatedCardBackground from './AnimatedCardBackground';

const faqs = [
  {
    question: 'What is your development process like?',
    answer: 'We follow an agile methodology that starts with a deep discovery phase to understand your goals. From there, we move to UI/UX design, development sprints with regular check-ins, rigorous testing, and finally, a seamless deployment. We believe in collaboration and keep you in the loop every step of the way.',
  },
  {
    question: 'How much does a typical project cost?',
    answer: 'Project costs vary depending on the scope, complexity, and technologies involved. Our starter websites begin around $2,500, while more complex apps and AI automations are custom-quoted. We provide detailed, transparent proposals after our initial consultation. Check out our Pricing page for more details.',
  },
  {
    question: 'How long will it take to build my website/app?',
    answer: 'Timelines depend on the project size. A simple landing page can be ready in as little as two weeks, a standard multi-page website typically takes 4-8 weeks, and complex applications or AI integrations can take several months. We always provide a project timeline with key milestones in our proposal.',
  },
  {
    question: 'What does your 7-Day Money-Back Guarantee cover?',
    answer: 'Our guarantee applies to the initial project deposit. If within the first 7 days you are not satisfied with the initial design concepts or the direction of the project, you can request a full refund of your deposit. It’s our commitment to ensuring we’re the right fit for you from the very beginning.',
  },
  {
    question: 'What kind of clients are the best fit for ProbSolv?',
    answer: 'We partner best with growth-oriented businesses who have a clear vision and value a collaborative relationship. Whether you are a startup needing a strong digital foundation or an established company looking to innovate with AI and automation, we thrive with clients who see technology as a key driver of their success.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'Our core stack includes modern frontend frameworks like React, Next.js, and Vue, paired with robust backend solutions. For AI, we leverage technologies like Google\'s Gemini, Dialogflow, and custom machine learning models. We are technology-agnostic in principle, always choosing the right tool for the job to ensure scalable, secure, and high-performance solutions.',
  },
  {
    question: 'How involved do I need to be in the project?',
    answer: 'Your involvement is key to success! We prefer a collaborative partnership where you provide feedback at key milestones (like design reviews and feature demos). While we handle all the technical heavy lifting, your industry expertise and vision are crucial to ensure the final product perfectly aligns with your business goals.',
  },
  {
    question: 'Do you offer support after the project is launched?',
    answer: 'Absolutely. We offer various support and maintenance packages to ensure your digital asset remains secure, updated, and performing optimally. We believe in building long-term partnerships, not just one-off projects.',
  },
  {
    question: 'What if my project scope changes mid-way?',
    answer: 'We understand that project requirements can evolve. We use an agile approach, which allows for flexibility. For significant changes, we\'ll discuss the impact on timeline and budget and issue a change order. Minor adjustments can often be accommodated within the existing sprint.',
  },
  {
    question: 'Do you provide domain and hosting services?',
    answer: 'While we don\'t directly provide domain registration or hosting, we offer guidance on the best providers for your needs (like Vercel, AWS, or Google Cloud). We handle the entire deployment process and can help you configure your domain and hosting environment for optimal performance and security.',
  },
  {
    question: 'Can you work with an existing website or codebase?',
    answer: 'Yes, we can. We would first conduct a thorough code audit to assess the quality, scalability, and security of the existing codebase. Based on the audit, we will recommend the best path forward, which could be refactoring, extending, or in some cases, rebuilding to meet modern standards.',
  },
  {
    question: 'What\'s the difference between a "Vibe Coding App" and regular app development?',
    answer: '"Vibe Coding" is our philosophy of putting the user\'s emotional experience first. While regular development focuses on functionality, Vibe Coding obsesses over aesthetics, micro-interactions, and brand resonance to create an app that doesn\'t just work well, but feels incredible to use, fostering stronger user loyalty.',
  },
  {
    question: 'How do you handle intellectual property and NDAs?',
    answer: 'Client confidentiality and IP protection are paramount. We are happy to sign a Non-Disclosure Agreement (NDA) before any sensitive information is shared. Upon project completion and final payment, all intellectual property, including source code and designs we create for you, is fully transferred to you.',
  },
  {
    question: 'What is your approach to SEO?',
    answer: 'SEO is foundational to our web development process. We build sites with clean, semantic HTML, ensure fast loading speeds, mobile-first design, and implement on-page SEO best practices (meta tags, alt text, structured data). For ongoing SEO, we offer dedicated packages to help you rank higher and drive organic traffic.'
  },
  {
    question: 'Do you design logos and provide branding services?',
    answer: 'While our primary focus is on digital product design (UI/UX) and development, we do offer branding services as part of a larger project. This can include logo design, style guides, and brand strategy to ensure your digital presence is cohesive and impactful. Let us know your needs, and we can build a custom package.'
  },
  {
    question: 'How do you ensure the security of the applications you build?',
    answer: 'Security is a top priority. We follow industry best practices, including data encryption, secure authentication, protection against common vulnerabilities (like XSS and SQL injection), and dependency scanning. For AI projects, we ensure data privacy and responsible AI practices are implemented from the start.'
  },
  {
    question: 'Can you integrate with third-party services and APIs?',
    answer: 'Absolutely. We specialize in creating seamless integrations with a wide range of third-party services, including payment gateways (Stripe, PayPal), CRMs (Salesforce, HubSpot), marketing automation tools, and any other platform with a documented API. This ensures your new digital asset works perfectly within your existing ecosystem.'
  },
  {
    question: 'What makes ProbSolv different from other agencies?',
    answer: 'We believe our key differentiator is our "Vibe Coding" philosophy combined with our expertise in AI automation. We don\'t just build functional products; we create aesthetic, memorable experiences that resonate with users. Furthermore, our focus on automating business processes means we deliver solutions that not only look great but also provide a tangible, long-term ROI by increasing efficiency.'
  },
  {
    question: 'How do you handle project management and communication?',
    answer: 'We prioritize transparent and efficient communication. Each project is assigned a dedicated project manager and we use tools like Slack for daily updates and Trello/Jira for progress tracking. We also schedule regular weekly or bi-weekly video calls to demo progress, gather feedback, and ensure we\'re always aligned with your vision.',
  },
  {
    question: 'What if I\'m not satisfied with the final product?',
    answer: 'Our iterative process with multiple feedback loops is designed to prevent this. However, your complete satisfaction is our goal. We offer a set number of revision rounds after the final delivery to address any minor adjustments. For any larger concerns, we will work with you to find a solution, backed by our commitment to building long-term partnerships.',
  },
  {
    question: 'Do you have experience in my specific industry?',
    answer: 'We have had the pleasure of working with clients across a diverse range of industries, including e-commerce, SaaS, fintech, and lifestyle brands. While we may not be experts in every niche, our strength lies in our ability to quickly learn the intricacies of your business and apply our technical and design expertise to solve your unique challenges.',
  },
  {
    question: 'How do you test your applications to ensure quality?',
    answer: 'Quality assurance is a critical part of our process. Our dedicated QA team performs rigorous testing, including functional testing, usability testing, performance testing, and cross-browser/cross-device compatibility checks. We also utilize automated testing where appropriate to ensure a robust and bug-free final product.',
  },
  {
    question: 'Who will be working on my project?',
    answer: 'Your project will be handled by our in-house team of expert designers, developers, and project managers. We don\'t outsource our core work. Based on your project\'s needs, we will assemble a dedicated team with the right skills to bring your vision to life, ensuring you have direct communication with the people building your product.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, we are a fully remote agency and have successfully collaborated with clients from all over the world. We are adept at managing projects across different time zones to ensure smooth communication and timely delivery.',
  },
  {
    question: 'Can you help with a project that is already in progress?',
    answer: 'We can certainly help! We would start with a comprehensive audit of your existing project to understand the current state, codebase, and challenges. From there, we can propose a plan to take over development, refactor where necessary, and guide the project to a successful launch.',
  },
  {
    question: 'What is the payment structure for projects?',
    answer: 'For most projects, we follow a milestone-based payment structure. Typically, this involves an upfront deposit to begin work (usually 30-50%), followed by payments upon completion of key milestones (e.g., design approval, feature completion). The final payment is due upon project completion and before the final handover.',
  },
  {
    question: 'How do you determine the "vibe" for a Vibe Coding App?',
    answer: 'The "vibe" is determined through a collaborative Vibe Discovery session. We immerse ourselves in your brand identity, target audience, and market positioning. We use mood boards, style scapes, and workshops to define the desired emotional response and aesthetic, ensuring the final app is a true extension of your brand.',
  },
  {
    question: 'What if I need features not in your pricing packages?',
    answer: 'Our pricing packages are designed as starting points. We understand every project is unique. We are happy to create a custom proposal tailored to your specific feature requirements, complexity, and long-term goals. Just get in touch for a custom quote.',
  }
];

// Custom component for the count-up animation
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string; inView: boolean }> = ({ end, duration = 2000, suffix = '', inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 5);
      const currentCount = Math.floor(easedProgress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
         setCount(end);
      }
    };

    requestAnimationFrame(step);

  }, [inView, end, duration]);

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  );
};


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


const AboutPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [isAskFormVisible, setIsAskFormVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const titleRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const whyChooseUsRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLElement>(null);
  
  const titleInView = useAnimateOnScroll(titleRef);
  const missionInView = useAnimateOnScroll(missionRef);
  const philosophyInView = useAnimateOnScroll(philosophyRef);
  const approachInView = useAnimateOnScroll(approachRef);
  const whyChooseUsInView = useAnimateOnScroll(whyChooseUsRef);
  const statsInView = useAnimateOnScroll(statsRef);
  const faqInView = useAnimateOnScroll(faqRef);

  const faqItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleFaqs, setVisibleFaqs] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setVisibleFaqs(prev => new Set(prev).add(index));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    
    faqItemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      faqItemRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [showAllFaqs]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('https://formspree.io/f/mpwozakj', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ question: question, form_source: 'About Page FAQ Submission' }),
        });

        if (response.ok) {
          setFormSubmitted(true);
          setQuestion('');
        } else {
          throw new Error('Submission failed.');
        }
      } catch (error) {
        console.error('Question submission error:', error);
        setSubmitError('Could not submit your question. Please try again.');
        setTimeout(() => setSubmitError(null), 3000); // Hide error after 3s
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const approachItems = [
    { icon: BrainIcon, title: 'Problem-First Thinking', description: 'We dive deep to understand the core challenge, ensuring the solution we build delivers real, measurable business value.' },
    { icon: SparklesIcon, title: 'Aesthetic Excellence', description: 'We believe that great design is not a luxury. We craft beautiful, intuitive experiences that users love and trust.' },
    { icon: UsersIcon, title: 'True Partnership', description: 'We work as an extension of your team, fostering transparent communication and collaboration to achieve shared success.' },
  ];

  const whyChooseUsItems = [
    { icon: SparklesIcon, title: 'The Vibe + AI Edge', description: "We master both aesthetic-driven 'Vibe Coding' and pragmatic AI automation. We don't just build products; we create memorable, intelligent experiences, giving you a dual advantage." },
    { icon: UsersIcon, title: 'Deep Partnership, Not a Vendor', description: "We integrate with your team as a true strategic partner. Your success is our success. We go beyond tickets and tasks to understand your business and proactively find opportunities for growth." },
    { icon: ZapIcon, title: 'Future-Proof by Design', description: "Technology changes fast. We build with a forward-thinking, scalable architecture and modern tech stack, ensuring your digital assets are resilient, adaptable, and ready for tomorrow." },
    { icon: BrainIcon, title: 'Tangible ROI is the Goal', description: "Our solutions are designed to deliver a clear return on investment. From AI chatbots that cut support costs to websites engineered for conversion, every line of code aims to improve your bottom line." },
  ];

  const statsCards = [
    { end: 100, suffix: "+", label: "Projects Launched" },
    { end: 50, suffix: "+", label: "Happy Clients" },
    { end: 1, suffix: "M+", label: "End Users Impacted" },
  ];
  
  const displayedFaqs = showAllFaqs ? faqs : faqs.slice(0, 5);

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={titleRef} className={`text-center max-w-3xl mx-auto mb-16 will-change-[transform,opacity] ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-text_light dark:text-text_dark">About ProbSolv</h1>
        <p className="mt-4 text-base md:text-lg text-subtext_light dark:text-subtext_dark">
          We are a team of passionate designers, developers, and strategists dedicated to building the future of digital experiences.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
            <div ref={missionRef} className={`will-change-[transform,opacity] ${missionInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-4">Our Mission</h2>
              <p className="text-base md:text-lg lg:text-xl text-subtext_light dark:text-subtext_dark leading-relaxed">
                  Our mission is to empower businesses by creating intelligent, beautiful, and automated digital systems. We believe that smart technology and great design are the keys to unlocking sustainable growth and competitive advantage in any industry.
              </p>
            </div>

            <div ref={philosophyRef} className={`will-change-[transform,opacity] ${philosophyInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-4">Our Philosophy</h2>
              <p className="text-base md:text-lg lg:text-xl text-subtext_light dark:text-subtext_dark leading-relaxed">
                  We operate on three core principles: <strong className="text-primary dark:text-accent">Problem-First Thinking</strong>, where we deeply understand the challenge before building the solution; <strong className="text-primary dark:text-accent">Aesthetic Excellence</strong>, because we believe great products should feel amazing to use; and <strong className="text-primary dark:text-accent">Partnership Over Process</strong>, focusing on collaborative relationships with our clients to achieve shared goals.
              </p>
            </div>
            
            <section ref={approachRef} className={`py-8 will-change-[transform,opacity] ${approachInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-12 text-center">Our Approach</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
                    {approachItems.map((item, index) => (
                        <div key={item.title} className={`flex flex-col items-center p-6 rounded-xl transition-all duration-300 ease-in-out`} style={{ animationDelay: `${index * 150}ms` }}>
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                                <item.icon className="w-8 h-8 transition-transform duration-300" />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary dark:text-accent mb-2">{item.title}</h3>
                            <p className="text-subtext_light dark:text-subtext_dark">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section ref={whyChooseUsRef} className={`py-12 bg-bg_light dark:bg-surface_dark rounded-xl will-change-[transform,opacity] ${whyChooseUsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-12 text-center">Why Choose ProbSolv?</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
                    {whyChooseUsItems.map((item, index) => (
                        <div key={item.title} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mt-1">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl font-bold text-text_light dark:text-text_dark mb-1">{item.title}</h3>
                                <p className="text-subtext_light dark:text-subtext_dark">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div ref={statsRef} className="grid md:grid-cols-3 gap-8 text-center pt-8">
               {statsCards.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`relative bg-bg_light/90 dark:bg-surface_dark/90 p-6 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-accent/20 will-change-[transform,opacity] ${statsInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <AnimatedCardBackground />
                    <div className="relative z-10">
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                          <CountUp end={stat.end} inView={statsInView} suffix={stat.suffix} />
                      </h3>
                      <p className="text-subtext_light dark:text-subtext_dark">{stat.label}</p>
                    </div>
                  </div>
               ))}
            </div>
        </div>
        
        {/* FAQ Section */}
        <section ref={faqRef} className="mt-24">
            <h2 className={`font-heading text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark text-center mb-12 will-change-[transform,opacity] ${faqInView ? 'animate-fade-in-up' : 'opacity-0'}`}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {displayedFaqs.map((faq, index) => (
                <div 
                  key={index} 
                  ref={el => { faqItemRefs.current[index] = el; }} 
                  data-index={index}
                  className={`border border-border_light dark:border-border_dark rounded-lg bg-surface_light dark:bg-surface_dark transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/15 dark:hover:shadow-accent/15 hover:-translate-y-1 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 dark:focus-within:ring-offset-bg_dark will-change-[transform,opacity] ${visibleFaqs.has(index) ? 'animate-fade-in-up' : 'opacity-0'}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                  >
                    <span className="text-lg font-semibold text-text_light dark:text-text_dark">{faq.question}</span>
                    <ChevronDownIcon className={`w-6 h-6 text-subtext_light dark:text-subtext_dark transition-transform duration-300 ${openFaq === index ? 'transform rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="p-6 pt-0 text-subtext_light dark:text-subtext_dark">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                    className="px-6 py-2.5 border-2 border-primary text-primary font-semibold text-sm rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
                >
                    {showAllFaqs ? 'Show Less' : `See All ${faqs.length} FAQs`}
                </button>
                <button
                    onClick={() => {
                      setIsAskFormVisible(!isAskFormVisible);
                      if (formSubmitted) {
                          setFormSubmitted(false);
                      }
                    }}
                    className="px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                    {isAskFormVisible ? 'Nevermind' : 'Ask a Question'}
                </button>
            </div>

            {isAskFormVisible && (
              <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up">
                {formSubmitted ? (
                  <div className="text-center p-8 bg-green-500/10 text-green-700 dark:text-green-300 rounded-lg animate-fade-in" role="alert">
                      <h3 className="font-heading font-bold text-xl">Thank You!</h3>
                      <p>Your question has been submitted. We'll get back to you shortly if a response is needed.</p>
                  </div>
                ) : (
                  <div className="bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8">
                    <h3 className="font-heading text-2xl font-bold text-text_light dark:text-text_dark text-center mb-6">Have a Different Question?</h3>
                    <form onSubmit={handleQuestionSubmit} className="space-y-4" noValidate>
                      <div>
                        <label htmlFor="question" className="sr-only">Your Question</label>
                        <textarea
                          id="question"
                          name="question"
                          placeholder="Type your question here..."
                          rows={4}
                          required
                          maxLength={250}
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          className="w-full bg-bg_light dark:bg-bg_dark border border-border_light dark:border-border_dark rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light focus:ring-primary focus:border-primary"
                        />
                        <p className="text-right text-sm text-subtext_light dark:text-subtext_dark mt-1">{250 - question.length} characters remaining</p>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting || !question.trim()}
                        className="w-full px-6 py-3 bg-primary text-white font-semibold text-base rounded-lg hover:bg-purple-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-surface_dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting && <SpinnerIcon className="w-5 h-5" />}
                        {isSubmitting ? 'Submitting...' : 'Submit Question'}
                      </button>
                      {submitError && <p className="mt-2 text-sm text-center text-red-600 dark:text-red-400">{submitError}</p>}
                    </form>
                  </div>
                )}
              </div>
            )}
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
