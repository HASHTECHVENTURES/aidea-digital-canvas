import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Target, 
  Zap, 
  TrendingUp, 
  CheckCircle, 
  Search, 
  ClipboardList, 
  Wrench, 
  Rocket, 
  Users, 
  Briefcase, 
  Building2, 
  Quote, 
  Star 
} from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Heading from '../components/ui/Heading';
import OptimizedImage from '../components/ui/OptimizedImage';
import { ICON_SIZES } from '../constants/design-system';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Enhanced text animations with mobile optimization
    const textElements = document.querySelectorAll('.animate-text');
    textElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
      }, isMobile ? index * 100 : index * 150);
    });

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  interface ValueProp {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    image: string;
  }

  interface Service {
    title: string;
    description: string;
    features: string[];
  }

  interface StrategicStep {
    number: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }

  interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
  }

  const valueProps: ValueProp[] = [
    {
      icon: Zap,
      title: "Execution-First Mindset",
      description: "Strategy without execution is noise",
      image: "/lovable-uploads/79db6077-e04d-4bfe-b860-906ba8087f23.png"
    },
    {
      icon: Target,
      title: "Business-Aligned AI", 
      description: "No generic or experimental solutions",
      image: "/lovable-uploads/e6b63f3a-cd03-4dbd-aad1-c822afc4c206.png"
    },
    {
      icon: Rocket,
      title: "Speed and Agility",
      description: "Rapid builds without technical debt",
      image: "/lovable-uploads/9e2baf8b-772e-4b51-b2e3-b4c41b31efa0.png"
    },
    {
      icon: Users,
      title: "Founder-Friendly",
      description: "We speak business, not just tech",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const services: Service[] = [
    {
      title: "AI Strategy & Implementation",
      description: "We help you identify where AI creates real value, define use cases, and implement them across your organization.",
      features: [
        "AI readiness assessment",
        "Use-case prioritization",
        "Tool and model selection",
        "Deployment roadmap"
      ]
    },
    {
      title: "Mock Development",
      description: "Before investing heavily, we build functional mock solutions to validate feasibility and experience.",
      features: [
        "Proof of concept (PoC)",
        "AI demos for internal buy-in",
        "Investor and stakeholder showcases"
      ]
    },
    {
      title: "MVP Development",
      description: "We build lean, scalable MVPs with AI at the core.",
      features: [
        "Fast build cycles",
        "User feedback loops",
        "Ready for pilots, demos, and early customers"
      ]
    },
    {
      title: "App Development",
      description: "AI-enabled mobile and web applications designed for real users.",
      features: [
        "Android, iOS, and web apps",
        "AI-powered features embedded from day one",
        "Performance and scalability focused"
      ]
    },
    {
      title: "Software Development",
      description: "Custom software solutions aligned to your business workflows.",
      features: [
        "AI-augmented platforms",
        "Backend, frontend, and API development",
        "Secure, scalable architectures"
      ]
    },
    {
      title: "Content & Video Development",
      description: "AI-assisted content and high-impact videos that convert, educate, and scale.",
      features: [
        "Blogs, articles, reports",
        "Sales and marketing content",
        "Explainer videos and product demos",
        "Founder and brand storytelling"
      ]
    },
    {
      title: "Workflow Automation",
      description: "We automate repetitive tasks across departments using AI and automation tools.",
      features: [
        "CRM, HR, finance, and operations",
        "No-code and low-code automation",
        "Productivity and cost optimization"
      ]
    },
    {
      title: "Presentation Development",
      description: "Business-ready presentations powered by clarity and AI-assisted storytelling.",
      features: [
        "Investor pitch decks",
        "Sales decks",
        "Strategy and board presentations"
      ]
    },
    {
      title: "Voice Automation",
      description: "Voice-based AI solutions that improve customer engagement.",
      features: [
        "AI voice bots",
        "Call automation",
        "Multilingual support"
      ]
    }
  ];

  const strategicSteps: StrategicStep[] = [
    {
      number: "01",
      title: "Discovery Call",
      description: "Understand your business problem",
      icon: Search
    },
    {
      number: "02",
      title: "Solution Design",
      description: "AI use cases mapped to outcomes",
      icon: ClipboardList
    },
    {
      number: "03",
      title: "Build & Deploy",
      description: "Fast, secure implementation",
      icon: Wrench
    },
    {
      number: "04",
      title: "Scale & Optimize",
      description: "Continuous improvement",
      icon: TrendingUp
    }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "AIdea Digital transformed our concept into a fully functional MVP that exceeded our expectations. From initial design to AI integration and deployment, their team guided us through every step. They didn't just build an app—they set up intelligent AI systems that have become core to our operations. The speed of delivery and quality of work is remarkable. Karma Terra wouldn't be where it is today without their expertise.",
      author: "Manisha Shekhar Asthana",
      role: "Founder",
      company: "Karma Terra"
    },
    {
      quote: "Choosing AIdea Digital to build our website was one of the best decisions we made. They delivered a stunning, responsive website that not only looks professional but performs flawlessly. Their team understood our vision from day one and brought it to life with exceptional attention to detail. The website has significantly improved our online presence and user engagement. Highly recommend their services!",
      author: "Amit Shah",
      role: "Founder",
      company: "Offee"
    },
    {
      quote: "AIdea Digital revolutionized our HR operations by implementing intelligent automation solutions that streamlined our entire workflow. Their automation systems have significantly reduced manual work, eliminated errors, and freed up our team to focus on strategic initiatives. The efficiency gains we've experienced are remarkable, and the ROI was evident within the first quarter. Their expertise in automation and AI integration is truly exceptional.",
      author: "Dhwani Mehta",
      role: "Co-Founder",
      company: "Opportune HR"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-16 pb-8 sm:pt-20 sm:pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-[100vw] min-h-[56.25vw] object-cover"
            style={{
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%) scale(1.15)'
            }}
            aria-label="Hero background video"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gray-950/70 z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-blue-950/20 to-purple-950/10 z-[1]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] z-[1]"></div>
        <div className="relative modern-container z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
            <div className="text-center space-y-4 sm:space-y-5 relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full mb-3 sm:mb-4 w-full sm:w-auto justify-center" role="banner">
                <span className="text-gray-300 text-sm sm:text-sm md:text-base whitespace-normal sm:whitespace-nowrap text-center">We design AI solutions that matter, businesses can't resist</span>
                <ArrowRight className={`${ICON_SIZES.sm} text-blue-400 flex-shrink-0 hidden sm:block`} aria-hidden="true" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white text-center animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out mb-3 sm:mb-4 whitespace-normal sm:whitespace-nowrap px-2 sm:px-0">
                AI That Works. Not Just AI That Impresses.
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                AIdea Digital helps startups, SMEs, and enterprises design, build, and deploy practical AI solutions that improve speed, efficiency, and decision-making. We go beyond experimentation—our focus is implementation, adoption, and measurable business impact.
              </p>
              <div className="animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-200 hover:bg-blue-300 text-blue-800 text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 w-full sm:w-auto min-h-[44px]"
                  aria-label="Book a consultation with AIdea Digital"
                >
                  Book a consultation
                  <ArrowRight className={`ml-2 ${ICON_SIZES.sm} group-hover:translate-x-1 transition-transform duration-300`} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Section background="primary">
        <div className="modern-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 fade-in-on-scroll">
            <Heading level={2} align="center" className="mb-3 sm:mb-4">
              Our Services
            </Heading>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-0">
              Comprehensive AI solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {services.map((service, index) => (
              <Card key={index} className="fade-in-on-scroll h-full flex flex-col" padding="md">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-3 sm:mb-4 flex-grow leading-relaxed">{service.description}</p>
                <ul className="space-y-1.5 sm:space-y-2" role="list">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className={`${ICON_SIZES.sm} text-blue-400 mr-2 mt-0.5 flex-shrink-0`} aria-hidden="true" />
                      <span className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Strategic Approach Section */}
      <Section background="secondary">
        <div className="modern-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 fade-in-on-scroll">
            <Heading level={2} align="center" className="mb-3 sm:mb-4">
              How We Engage
            </Heading>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-0">
              A proven process to turn AI into a business advantage
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            {strategicSteps.map((step, index) => (
              <div key={index} className="fade-in-on-scroll text-center group flex flex-col">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto glow-blue" aria-hidden="true">
                  <step.icon className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 text-white" />
                </div>
                <Card className="flex flex-col flex-grow" padding="md">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-3">{step.number}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed flex-grow">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Who We Work With Section */}
      <Section background="primary">
        <div className="modern-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 fade-in-on-scroll">
            <Heading level={2} align="center" className="mb-3 sm:mb-4">Who We Work With</Heading>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-0 whitespace-normal sm:whitespace-nowrap">
              If you are clear about the problem but unsure how to apply AI at scale, we are your execution partner.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <Card className="fade-in-on-scroll text-center group flex flex-col items-center" padding="md">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 glow-blue" aria-hidden="true">
                <Rocket className={ICON_SIZES.lg + " text-white"} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Startups</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-400">Building AI-first products or MVPs</p>
            </Card>
            <Card className="fade-in-on-scroll text-center group flex flex-col items-center" padding="md">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 glow-blue" aria-hidden="true">
                <Building2 className={ICON_SIZES.lg + " text-white"} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">SMEs</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-400">Looking to automate workflows and reduce costs</p>
            </Card>
            <Card className="fade-in-on-scroll text-center group flex flex-col items-center sm:col-span-2 md:col-span-1" padding="md">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 glow-blue" aria-hidden="true">
                <Briefcase className={ICON_SIZES.lg + " text-white"} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Enterprises</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-400">Adopting AI across functions and teams</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Why Choose Aidea Digital Section */}
      <Section background="secondary">
        <div className="modern-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 fade-in-on-scroll">
            <Heading level={2} align="center" className="mb-3 sm:mb-4">Why AIdea Digital</Heading>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-0">
              What sets us apart in delivering practical AI solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {valueProps.map((prop, index) => (
              <Card key={index} className="fade-in-on-scroll text-center group h-full flex flex-col" padding="md" style={{
                animationDelay: `${index * 150}ms`
              }}>
                <div className="mb-3 sm:mb-4 overflow-hidden rounded-xl flex-shrink-0">
                  <OptimizedImage 
                    src={prop.image} 
                    alt={`${prop.title} - Visual representation`}
                    className="w-full h-24 sm:h-28 md:h-32 lg:h-36 object-cover group-hover:scale-110 transition-transform duration-700 rounded-lg" 
                  />
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-3 group-hover:rotate-6 transition-transform duration-500 mx-auto flex-shrink-0 glow-blue" aria-hidden="true">
                  <prop.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{prop.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 flex-grow leading-relaxed">{prop.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* AI Innovation Section */}
      <Section background="primary" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" aria-hidden="true"></div>
        <div className="modern-container relative px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="fade-in-on-scroll order-2 lg:order-1">
              <div className="relative group">
                <OptimizedImage 
                  src="/lovable-uploads/dad9c074-a979-47b0-a68e-d58dc5734461.png" 
                  alt="Strategic AI Implementation - Visual representation of AI transformation"
                  className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 transition-all duration-700 border border-gray-800" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
              </div>
            </div>
            <div className="fade-in-on-scroll order-1 lg:order-2 space-y-3 sm:space-y-4">
              <Heading level={2} className="mb-3 sm:mb-4">
                Beyond Experimentation
              </Heading>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                We go beyond experimentation—our focus is implementation, adoption, and measurable business impact. We help you identify the right AI opportunities and implement them with precision.
              </p>
              <ul className="space-y-2 sm:space-y-3" role="list">
                {["Execution-first mindset", "Business-aligned AI solutions", "Measurable ROI from day one"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className={`${ICON_SIZES.md} text-blue-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0`} aria-hidden="true" />
                    <span className="text-sm sm:text-base md:text-lg text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section background="secondary">
        <div className="modern-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 fade-in-on-scroll">
            <Heading level={2} align="center" className="mb-3 sm:mb-4">
              Testimonials
            </Heading>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-0">
              What our clients say about working with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="fade-in-on-scroll flex flex-col" padding="md">
                <div className="mb-3 sm:mb-4 flex items-center space-x-1" role="img" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`${ICON_SIZES.sm} sm:${ICON_SIZES.md} fill-yellow-400 text-yellow-400`} aria-hidden="true" />
                  ))}
                </div>
                <Quote className={`${ICON_SIZES.md} sm:${ICON_SIZES.lg} text-blue-400 mb-3 sm:mb-4 opacity-50`} aria-hidden="true" />
                <blockquote className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-4 flex-grow leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-800 pt-3 sm:pt-4">
                  <p className="text-base sm:text-lg font-bold text-white mb-1">
                    {testimonial.author}
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 mb-1">
                    {testimonial.role}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    {testimonial.company}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient">
        <div className="modern-container text-center relative px-4 sm:px-6 lg:px-8">
          <Heading level={2} align="center" className="mb-3 sm:mb-4 fade-in-on-scroll text-white">
            Ready to Turn AI into a Business Advantage?
          </Heading>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 fade-in-on-scroll max-w-3xl mx-auto px-2 sm:px-0">
            Let's discuss how AI can work practically for your business
          </p>
          <div className="fade-in-on-scroll">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-200 hover:bg-blue-300 text-blue-800 text-sm sm:text-base md:text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 w-full sm:w-auto min-h-[44px]"
              aria-label="Book a consultation with AIdea Digital"
            >
              Book a consultation
              <ArrowRight className={`ml-2 ${ICON_SIZES.sm} group-hover:translate-x-1 transition-transform duration-300`} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Index;
