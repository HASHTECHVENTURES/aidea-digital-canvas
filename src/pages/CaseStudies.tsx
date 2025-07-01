
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, DollarSign, Users, ArrowRight, CheckCircle } from 'lucide-react';

const CaseStudies = () => {
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

  const caseStudies = [
    {
      industry: "FinTech",
      title: "GPT-Powered Onboarding Revolution",
      challenge: "A growing FinTech startup was losing 60% of potential customers during their complex onboarding process.",
      solution: "We designed an AI-powered conversational onboarding flow that guides users through KYC requirements with intelligent prompts and real-time assistance.",
      results: [
        "35% faster customer signups",
        "50% reduction in support tickets",
        "₹5L+ monthly revenue increase"
      ],
      timeline: "6 weeks implementation",
      icon: TrendingUp,
      color: "from-green-500 to-green-600"
    },
    {
      industry: "EdTech",
      title: "AI Training Bot + Team Enablement",
      challenge: "An EdTech platform was spending 40+ hours weekly on repetitive customer training and support queries.",
      solution: "We implemented a custom GPT-powered training bot combined with comprehensive team training on AI best practices and prompt engineering.",
      results: [
        "₹2.3L/month operational savings",
        "75% reduction in training time",
        "95% customer satisfaction rate"
      ],
      timeline: "4 weeks deployment",
      icon: Clock,
      color: "from-blue-500 to-blue-600"
    },
    {
      industry: "SaaS Tool",
      title: "Internal AI Co-pilot Implementation",
      challenge: "A B2B SaaS company's support team was overwhelmed with 200+ daily queries, causing response delays and customer churn.",
      solution: "We developed an internal AI co-pilot that helps support agents quickly find relevant information and generate contextual responses.",
      results: [
        "40% reduction in support response time",
        "30% increase in customer satisfaction",
        "₹8L+ annual cost savings"
      ],
      timeline: "8 weeks rollout",
      icon: Users,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const metrics = [
    { icon: TrendingUp, value: "35%", label: "Average Performance Boost" },
    { icon: DollarSign, value: "₹15L+", label: "Total Client Savings" },
    { icon: Clock, value: "6 weeks", label: "Average Implementation Time" },
    { icon: Users, value: "95%", label: "Client Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 lg:pt-32 lg:pb-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Real Results,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Real Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in">
              See how we've helped businesses like yours achieve measurable AI success with strategic implementation
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Track Record
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every project is measured by tangible business outcomes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="fade-in-on-scroll text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={index} className="fade-in-on-scroll">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="p-8 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center mb-4">
                          <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${study.color} rounded-full mr-4`}>
                            <study.icon className="h-6 w-6 text-white" />
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            {study.industry}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          {study.title}
                        </h3>
                        
                        <div className="space-y-4 text-gray-600">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                            <p>{study.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                            <p>{study.solution}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-4">Results Achieved:</h4>
                        <ul className="space-y-3 mb-6">
                          {study.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700 font-medium">{result}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{study.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in-on-scroll">
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8">
              "Aidea Digital didn't just implement AI for us—they helped us think strategically about where AI could have the biggest impact. The results speak for themselves."
            </blockquote>
            <div className="text-lg text-gray-600 mb-2">— Startup Founder</div>
            <div className="text-blue-600 font-medium">FinTech Industry</div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Success Formula
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every successful project follows our proven methodology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Strategic Analysis",
                description: "We analyze your business goals and identify the highest-impact AI opportunities."
              },
              {
                step: "02",
                title: "Rapid Validation",
                description: "We validate AI concepts with minimal investment before full implementation."
              },
              {
                step: "03",
                title: "Measured Implementation",
                description: "We deploy solutions with clear success metrics and continuous optimization."
              }
            ].map((process, index) => (
              <div key={index} className="fade-in-on-scroll text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-xl font-bold mb-6">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-on-scroll">
            Want results like these? Start Your Strategy Sprint
          </h2>
          <p className="text-xl text-blue-100 mb-8 fade-in-on-scroll">
            Book a free strategy session and discover how AI can transform your business
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 fade-in-on-scroll"
          >
            Start Your Success Story
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
