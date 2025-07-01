
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Cog, BarChart3, GraduationCap, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Services = () => {
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

  const services = [
    {
      icon: Brain,
      title: "AI Strategy & MVP Consulting",
      description: "Validate your AI ideas and create actionable roadmaps",
      features: [
        "AI opportunity mapping",
        "MVP validation and scoping",
        "Technology stack recommendations",
        "ROI projections and business case development"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Cog,
      title: "Generative AI & Automation",
      description: "Custom GPT solutions and intelligent automation",
      features: [
        "Custom prompt engineering",
        "Workflow automation design",
        "AI-powered content generation",
        "Chatbot and assistant development"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: BarChart3,
      title: "Data & Analytics Consulting",
      description: "Transform your data into AI-ready insights",
      features: [
        "Data strategy and architecture",
        "Predictive analytics implementation",
        "Dashboard and visualization setup",
        "Performance tracking and optimization"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      icon: GraduationCap,
      title: "Training & Enablement",
      description: "Empower your team with AI knowledge and skills",
      features: [
        "Executive AI workshops",
        "Team training programs",
        "Best practices documentation",
        "Ongoing support and mentoring"
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Shield,
      title: "AI Ethics & Governance",
      description: "Implement responsible AI practices",
      features: [
        "Ethics framework development",
        "Bias detection and mitigation",
        "Compliance and risk assessment",
        "Governance policy creation"
      ],
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 lg:pt-32 lg:pb-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Your AI Thinking Partner —{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Not Just Another Vendor
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in">
              We help you think strategically about AI before you build anything. Our consulting services focus on strategy, validation, and practical implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="fade-in-on-scroll bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-full mb-6`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Strategic Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure your AI initiatives deliver real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discover & Assess",
                description: "We analyze your business, identify AI opportunities, and assess your readiness for AI implementation."
              },
              {
                step: "02",
                title: "Strategy & Planning",
                description: "We create a detailed AI roadmap with clear priorities, timelines, and success metrics."
              },
              {
                step: "03",
                title: "Implementation Support",
                description: "We guide you through implementation, providing ongoing support and optimization recommendations."
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
            Not sure where to start? Let's map your AI opportunity.
          </h2>
          <p className="text-xl text-blue-100 mb-8 fade-in-on-scroll">
            Book a free strategy session and get a customized AI roadmap for your business
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 fade-in-on-scroll"
          >
            Start Your AI Strategy Session
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
