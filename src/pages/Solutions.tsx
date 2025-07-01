
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, BookOpen, DollarSign, Building2, ArrowRight, CheckCircle } from 'lucide-react';

const Solutions = () => {
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

  const industries = [
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      description: "Transform your online store with intelligent automation",
      solutions: [
        "AI-powered product recommendations",
        "Smart chatbots for customer support",
        "Automated inventory management",
        "Personalized marketing campaigns"
      ],
      caseStudy: "22% increase in conversion rates",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BookOpen,
      title: "EdTech",
      description: "Personalize learning experiences at scale",
      solutions: [
        "Adaptive learning platforms",
        "Automated content generation",
        "Student performance analytics",
        "AI-powered tutoring systems"
      ],
      caseStudy: "₹2.3L/month operational savings",
      color: "from-green-500 to-green-600"
    },
    {
      icon: DollarSign,
      title: "FinTech",
      description: "Streamline financial services with AI",
      solutions: [
        "Automated onboarding flows",
        "Document processing automation",
        "Risk assessment algorithms",
        "Fraud detection systems"
      ],
      caseStudy: "35% faster customer signups",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Building2,
      title: "SaaS/B2B",
      description: "Enhance your platform with intelligent features",
      solutions: [
        "Internal AI copilots",
        "Automated customer support",
        "Sales process optimization",
        "Data-driven insights dashboard"
      ],
      caseStudy: "40% reduction in support time",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 lg:pt-32 lg:pb-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              AI Solutions for{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Every Industry
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in">
              Discover how AI can transform your specific industry with proven use cases and real-world applications
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="fade-in-on-scroll bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${industry.color} rounded-full mb-6`}>
                  <industry.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{industry.title}</h3>
                <p className="text-gray-600 mb-6">{industry.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key AI Applications:</h4>
                  <ul className="space-y-2">
                    {industry.solutions.map((solution, solutionIndex) => (
                      <li key={solutionIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Success Story:</div>
                  <div className="font-semibold text-green-600">{industry.caseStudy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular AI Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These are some of the most effective AI implementations we've seen across different industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Customer Support Automation",
                description: "Reduce support tickets by 60% with intelligent chatbots that understand context and provide accurate responses.",
                benefits: ["24/7 availability", "Instant responses", "Scalable support"]
              },
              {
                title: "Content Generation",
                description: "Create marketing copy, product descriptions, and social media content at scale while maintaining brand voice.",
                benefits: ["Faster content creation", "Consistent messaging", "Cost reduction"]
              },
              {
                title: "Predictive Analytics",
                description: "Forecast trends, customer behavior, and business outcomes to make data-driven decisions with confidence.",
                benefits: ["Better forecasting", "Risk reduction", "Strategic insights"]
              }
            ].map((useCase, index) => (
              <div key={index} className="fade-in-on-scroll bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-on-scroll">
            Need an AI idea tailored to your domain?
          </h2>
          <p className="text-xl text-blue-100 mb-8 fade-in-on-scroll">
            Let's explore AI opportunities specific to your industry and business model
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 fade-in-on-scroll"
          >
            Explore Your AI Opportunities
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
