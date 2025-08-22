import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Target, Zap, TrendingUp, CheckCircle, Search, ClipboardList, Wrench } from 'lucide-react';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Enhanced text animations
    const textElements = document.querySelectorAll('.animate-text');
    textElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
      }, index * 150);
    });

    return () => observer.disconnect();
  }, []);

  const valueProps = [
    {
      icon: Brain,
      title: "AI MVP Validation",
      description: "Validate your AI ideas before you build them",
      image: "/lovable-uploads/79db6077-e04d-4bfe-b860-906ba8087f23.png"
    },
    {
      icon: Target,
      title: "Generative AI Strategy", 
      description: "Custom GPT solutions that actually work",
      image: "/lovable-uploads/e6b63f3a-cd03-4dbd-aad1-c822afc4c206.png"
    },
    {
      icon: Zap,
      title: "Rapid Implementation",
      description: "Go from concept to market in weeks, not months",
      image: "/lovable-uploads/9e2baf8b-772e-4b51-b2e3-b4c41b31efa0.png"
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "Track ROI and business impact from day one",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const services = [
    {
      title: "AI Strategy & MVP Consulting",
      description: "Validate your AI ideas and create actionable roadmaps",
      features: [
        "AI opportunity mapping",
        "MVP validation and scoping",
        "Technology stack recommendations",
        "ROI projections and business case development"
      ]
    },
    {
      title: "Generative AI & Automation",
      description: "Custom GPT solutions and intelligent automation",
      features: [
        "Custom prompt engineering",
        "Workflow automation design",
        "AI-powered content generation",
        "Chatbot and assistant development"
      ]
    },
    {
      title: "Training & Support",
      description: "Empower your team with AI knowledge and ongoing guidance",
      features: [
        "Executive AI workshops",
        "Team training programs",
        "Best practices documentation",
        "Ongoing support and mentoring"
      ]
    }
  ];

  const strategicSteps = [
    {
      number: "01",
      title: "Discover & Assess",
      description: "We analyze your business, identify AI opportunities, and assess your readiness for AI implementation.",
      icon: Search
    },
    {
      number: "02",
      title: "Strategy & Planning",
      description: "We create a detailed AI roadmap with clear priorities, timelines, and success metrics.",
      icon: ClipboardList
    },
    {
      number: "03",
      title: "Implementation Support",
      description: "We guide you through implementation, providing ongoing support and optimization recommendations.",
      icon: Wrench
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-6 order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out leading-tight">
                Make AI Work for{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  Your Business
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto lg:mx-0 animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200 leading-relaxed">
                Strategy-first AI consulting for founders who want results, not just technology
              </p>
              <div className="animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400">
                <Link to="/contact" className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base md:text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-500 hover:scale-105 transform w-full sm:w-auto justify-center">
                  Start Your Free AI Strategy Call
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            <div className="animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-600 order-1 lg:order-2">
              <div className="relative group">
                <img 
                  src="/lovable-uploads/f125d18d-2d29-4803-ac30-85d405119421.png" 
                  alt="AI Human Partnership" 
                  className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl hover:scale-105 transition-all duration-700 hover:rotate-1 max-w-md mx-auto lg:max-w-none" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16 fade-in-on-scroll">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your AI Thinking Partner Not Just Another Vendor
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
              We help you think strategically about AI before you build anything. Our consulting services focus on strategy, validation, and practical implementation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div key={index} className="fade-in-on-scroll bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:scale-105 h-full flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4 lg:mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-2 lg:space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 mr-2 lg:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm lg:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Approach Section */}
      <section className="py-16 lg:py-20 mb-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16 fade-in-on-scroll">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Strategic Approach
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure your AI initiatives deliver real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pb-8">
            {strategicSteps.map((step, index) => (
              <div key={index} className="fade-in-on-scroll text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                </div>
                <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2 lg:mb-3">{step.number}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 lg:mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow text-sm lg:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Aidea Digital Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16 fade-in-on-scroll">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose AIdea Digital?</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
              We don't just implement AI we help you think strategically about where and how AI can transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="fade-in-on-scroll text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 sm:hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border border-gray-100 group h-full flex flex-col" style={{
                animationDelay: `${index * 150}ms`
              }}>
                <div className="mb-3 sm:mb-4 overflow-hidden rounded-lg flex-shrink-0">
                  <img src={prop.image} alt={prop.title} className="w-full h-28 sm:h-32 md:h-36 object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-2 sm:mb-3 md:mb-4 group-hover:rotate-12 transition-transform duration-500 mx-auto flex-shrink-0">
                  <prop.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{prop.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300 flex-grow leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Innovation Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-600 rounded-full animate-bounce delay-300"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="fade-in-on-scroll order-2 lg:order-1">
              <div className="relative group">
                <img 
                  src="/lovable-uploads/dad9c074-a979-47b0-a68e-d58dc5734461.png" 
                  alt="Strategic AI Implementation" 
                  className="w-full h-auto rounded-2xl shadow-xl hover:scale-105 transition-all duration-700 hover:-rotate-1" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            <div className="fade-in-on-scroll order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out">
                Strategic AI Implementation
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 lg:mb-6 animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-200">
                We help you identify the right AI opportunities and implement them with precision. No wasted resources, no trial and error.
              </p>
              <ul className="space-y-3 lg:space-y-4">
                {["Business-first approach to AI strategy", "Proven frameworks for AI implementation", "Measurable ROI from day one"].map((item, index) => (
                  <li key={index} className="flex items-center animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out" style={{
                    transitionDelay: `${300 + index * 150}ms`
                  }}>
                    <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-green-500 mr-2 lg:mr-3 hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 fade-in-on-scroll animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            Ready to Make AI Work for Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 lg:mb-8 fade-in-on-scroll animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200">
            Book a free strategy call and discover your AI opportunities in just 30 minutes
          </p>
          <div className="fade-in-on-scroll animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400">
            <Link to="/contact" className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 text-base sm:text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 group">
              Let's Connect
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
