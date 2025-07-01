
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, ArrowRight, Brain, TrendingUp, Globe } from 'lucide-react';

const About = () => {
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

  const stats = [
    { icon: Brain, number: "20+", label: "AI MVP Strategies Delivered" },
    { icon: Users, number: "500+", label: "Professionals Trained" },
    { icon: TrendingUp, number: "35%", label: "Average Efficiency Increase" },
    { icon: Globe, number: "15+", label: "Industries Served" }
  ];

  const values = [
    {
      icon: Target,
      title: "Strategy First",
      description: "We believe in thinking before building. Every AI implementation starts with a clear business strategy."
    },
    {
      icon: Users,
      title: "Human-Centered",
      description: "AI should enhance human capabilities, not replace them. We design solutions that empower your team."
    },
    {
      icon: Award,
      title: "Results Driven",
      description: "Every project is measured by business impact. We focus on ROI and tangible outcomes."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 lg:pt-32 lg:pb-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              We Think{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Before You Build
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in">
              Aidea Digital helps business leaders make AI practical and strategic, not just technological
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-6">
                Make AI practical and business-focused for founders and business leaders who want results, not just technology.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that AI's true power lies not in the technology itself, but in how strategically it's applied to solve real business problems. That's why we focus on strategy first, implementation second.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Work With Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="fade-in-on-scroll">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why We're Different</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">We don't build—we help you think strategically about what to build</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Every recommendation is backed by business impact analysis</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">We focus on practical implementation, not theoretical possibilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We measure our success by the tangible results we deliver for our clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="fade-in-on-scroll text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and every recommendation we make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="fade-in-on-scroll text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Product strategists and growth specialists with deep AI expertise
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg fade-in-on-scroll max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Expertise</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Product strategy and MVP development</li>
                  <li>• AI/ML implementation consulting</li>
                  <li>• Business process optimization</li>
                  <li>• Team training and enablement</li>
                  <li>• Growth strategy and analytics</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Background</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• 10+ years in product strategy</li>
                  <li>• Former startup founders and operators</li>
                  <li>• Deep expertise in AI/ML technologies</li>
                  <li>• Proven track record with 500+ professionals</li>
                  <li>• Industry experience across multiple sectors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-on-scroll">
            Start Smarter with AI
          </h2>
          <p className="text-xl text-blue-100 mb-8 fade-in-on-scroll">
            Ready to think strategically about AI for your business? Let's start the conversation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 fade-in-on-scroll"
          >
            Schedule Your Strategy Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
