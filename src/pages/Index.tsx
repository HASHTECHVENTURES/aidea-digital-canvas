
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

    return () => observer.disconnect();
  }, []);

  const valueProps = [
    {
      icon: Brain,
      title: "AI MVP Validation",
      description: "Validate your AI ideas before you build them"
    },
    {
      icon: Target,
      title: "Generative AI Strategy",
      description: "Custom GPT solutions that actually work"
    },
    {
      icon: Zap,
      title: "Rapid Implementation",
      description: "Go from concept to market in weeks, not months"
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "Track ROI and business impact from day one"
    }
  ];

  const miniCaseStudies = [
    {
      title: "E-commerce Conversion Boost",
      result: "22% increase in conversion",
      description: "GPT-powered lead flow optimization"
    },
    {
      title: "EdTech MVP Launch",
      result: "3 weeks to market",
      description: "Custom prompt strategy implementation"
    },
    {
      title: "SaaS Support Automation",
      result: "40% time saved",
      description: "Internal AI co-pilot deployment"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Make AI Work for{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Business
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
              Strategy-first AI consulting for founders who want results, not just technology
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in"
            >
              Start Your Free AI Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Aidea Digital?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We don't just implement AI—we help you think strategically about where and how AI can transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="fade-in-on-scroll text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-50 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <prop.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Case Studies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results, Real Fast
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how we've helped businesses like yours achieve measurable AI success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {miniCaseStudies.map((study, index) => (
              <div
                key={index}
                className="fade-in-on-scroll bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  <span className="text-2xl font-bold text-green-600">{study.result}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{study.title}</h3>
                <p className="text-gray-600">{study.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 fade-in-on-scroll">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-200"
            >
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in-on-scroll">
            <div className="flex items-center justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by 500+ Professionals
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the growing community of business leaders who've made AI work for their companies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="fade-in-on-scroll">
                <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-gray-600">AI MVP Strategies Delivered</div>
              </div>
              <div className="fade-in-on-scroll">
                <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Professionals Trained</div>
              </div>
              <div className="fade-in-on-scroll">
                <div className="text-4xl font-bold text-pink-600 mb-2">35%</div>
                <div className="text-gray-600">Average Efficiency Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-on-scroll">
            Ready to Make AI Work for Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 fade-in-on-scroll">
            Book a free strategy call and discover your AI opportunities in just 30 minutes
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 fade-in-on-scroll"
          >
            Start Your Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
