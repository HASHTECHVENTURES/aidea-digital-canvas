
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Target, Zap, TrendingUp, CheckCircle, Star } from 'lucide-react';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
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
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Target,
      title: "Generative AI Strategy",
      description: "Custom GPT solutions that actually work",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Zap,
      title: "Rapid Implementation",
      description: "Go from concept to market in weeks, not months",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "Track ROI and business impact from day one",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const miniCaseStudies = [
    {
      title: "E-commerce Conversion Boost",
      result: "22% increase in conversion",
      description: "GPT-powered lead flow optimization",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "EdTech MVP Launch",
      result: "3 weeks to market",
      description: "Custom prompt strategy implementation",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "SaaS Support Automation",
      result: "40% time saved",
      description: "Internal AI co-pilot deployment",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-20 lg:pt-32 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out">
                Make AI Work for{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  Your Business
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto lg:mx-0 animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200">
                Strategy-first AI consulting for founders who want results, not just technology
              </p>
              <div className="animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-1 transform"
                >
                  Start Your Free AI Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            <div className="animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-600">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
                  alt="AI Technology - Circuit Board" 
                  className="w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-all duration-700 hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out">
              Why Choose Aidea Digital?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200">
              We don't just implement AI—we help you think strategically about where and how AI can transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="fade-in-on-scroll text-center p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border border-gray-100 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={prop.image} 
                    alt={prop.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-500">
                  <prop.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{prop.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Innovation Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-600 rounded-full animate-bounce delay-300"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-on-scroll order-2 lg:order-1">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" 
                  alt="Programming and Development" 
                  className="w-full h-auto rounded-2xl shadow-xl hover:scale-105 transition-all duration-700 hover:-rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            <div className="fade-in-on-scroll order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out">
                Strategic AI Implementation
              </h2>
              <p className="text-xl text-gray-600 mb-6 animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-200">
                We help you identify the right AI opportunities and implement them with precision. No wasted resources, no trial and error.
              </p>
              <ul className="space-y-4">
                {[
                  "Business-first approach to AI strategy",
                  "Proven frameworks for AI implementation", 
                  "Measurable ROI from day one"
                ].map((item, index) => (
                  <li key={index} className="flex items-center animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out" style={{ transitionDelay: `${300 + index * 150}ms` }}>
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Case Studies */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out">
              Real Results, Real Fast
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200">
              See how we've helped businesses like yours achieve measurable AI success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {miniCaseStudies.map((study, index) => (
              <div
                key={index}
                className="fade-in-on-scroll bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group border border-gray-100"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 group-hover:rotate-12 transition-transform duration-500" />
                  <span className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">{study.result}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{study.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{study.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 fade-in-on-scroll">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-200 group"
            >
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-24 h-24 bg-pink-600 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-600 rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out">
                Innovation That Works
              </h2>
              <p className="text-xl text-gray-600 mb-6 animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-200">
                We leverage cutting-edge AI technologies to solve real business problems. From ideation to implementation, we ensure your AI initiatives deliver tangible results.
              </p>
              <div className="animate-text opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-400">
                <Link
                  to="/solutions"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  Explore AI Solutions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            <div className="fade-in-on-scroll">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80" 
                  alt="Innovation - Light Bulb" 
                  className="w-full h-auto rounded-2xl shadow-xl hover:scale-105 transition-all duration-700 hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center fade-in-on-scroll">
            <div className="flex items-center justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-8 w-8 text-yellow-400 fill-current hover:scale-110 transition-transform duration-300" 
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out">
              Trusted by 500+ Professionals
            </h2>
            <p className="text-xl text-gray-600 mb-8 animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200">
              Join the growing community of business leaders who've made AI work for their companies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { number: "20+", label: "AI MVP Strategies Delivered" },
                { number: "500+", label: "Professionals Trained" },
                { number: "35%", label: "Average Efficiency Increase" }
              ].map((stat, index) => (
                <div key={index} className="fade-in-on-scroll group" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                  <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-on-scroll animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            Ready to Make AI Work for Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 fade-in-on-scroll animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200">
            Book a free strategy call and discover your AI opportunities in just 30 minutes
          </p>
          <div className="fade-in-on-scroll animate-text opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 group"
            >
              Start Your Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
