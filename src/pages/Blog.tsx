
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, Shield, Lightbulb } from 'lucide-react';

const Blog = () => {

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

  const blogPosts = [
    {
      icon: Lightbulb,
      title: "How to validate your first AI MVP",
      excerpt: "Learn the proven framework for testing AI concepts before you invest in development. We'll show you how to validate ideas in just 2 weeks.",
      category: "Strategy",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      featured: true,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "GPT isn't a strategy — Here's what is",
      excerpt: "Why most AI implementations fail and how to build a strategic approach that actually delivers business value.",
      category: "Strategy",
      readTime: "6 min read",
      date: "Dec 10, 2024",
      featured: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: BookOpen,
      title: "10 prompts every business team should try",
      excerpt: "Ready-to-use prompts that can immediately improve your team's productivity across marketing, sales, and operations.",
      category: "Practical",
      readTime: "5 min read",
      date: "Dec 5, 2024",
      featured: true,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "AI Ethics 101: Bias, Safety & Compliance",
      excerpt: "Everything business leaders need to know about implementing AI responsibly and avoiding common ethical pitfalls.",
      category: "Ethics",
      readTime: "10 min read",
      date: "Nov 28, 2024",
      featured: false,
      color: "from-red-500 to-red-600"
    },
    {
      icon: TrendingUp,
      title: "The ROI of AI: How to measure success",
      excerpt: "A practical guide to setting up metrics and KPIs that actually matter for AI projects.",
      category: "Analytics",
      readTime: "7 min read",
      date: "Nov 20, 2024",
      featured: false,
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Lightbulb,
      title: "AI for non-technical founders",
      excerpt: "A beginner-friendly guide to understanding AI possibilities without getting lost in technical jargon.",
      category: "Beginner",
      readTime: "9 min read",
      date: "Nov 15, 2024",
      featured: false,
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: BookOpen,
      title: "Building an AI-ready data strategy",
      excerpt: "How to prepare your data infrastructure for AI implementation and ensure quality, security, and compliance.",
      category: "Strategy",
      readTime: "12 min read",
      date: "Nov 10, 2024",
      featured: false,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "AI automation for customer service",
      excerpt: "Transform your customer support with intelligent automation while maintaining the human touch your customers love.",
      category: "Practical",
      readTime: "8 min read",
      date: "Nov 5, 2024",
      featured: false,
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Shield,
      title: "AI security best practices for businesses",
      excerpt: "Essential security measures every company should implement when deploying AI solutions.",
      category: "Security",
      readTime: "11 min read",
      date: "Oct 30, 2024",
      featured: false,
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: Lightbulb,
      title: "The future of AI in marketing",
      excerpt: "Explore emerging AI trends in marketing and how to stay ahead of the competition.",
      category: "Trends",
      readTime: "7 min read",
      date: "Oct 25, 2024",
      featured: false,
      color: "from-rose-500 to-rose-600"
    },
    {
      icon: BookOpen,
      title: "AI implementation checklist",
      excerpt: "A comprehensive checklist to ensure successful AI deployment in your organization.",
      category: "Practical",
      readTime: "6 min read",
      date: "Oct 20, 2024",
      featured: false,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: TrendingUp,
      title: "Measuring AI project success",
      excerpt: "Key metrics and KPIs to track the success of your AI initiatives and demonstrate ROI.",
      category: "Analytics",
      readTime: "9 min read",
      date: "Oct 15, 2024",
      featured: false,
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  const categories = ["All", "Strategy", "Practical", "Ethics", "Analytics", "Beginner", "Security", "Trends"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pb-16 lg:pt-32 lg:pb-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in leading-tight">
              AI Insights &{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Strategic Resources
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto animate-fade-in leading-relaxed px-4">
              Practical insights, proven strategies, and actionable advice for business leaders navigating AI
            </p>
          </div>
        </div>
      </section>



      {/* Category Filter */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 fade-in-on-scroll">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Articles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our most popular and impactful content for AI strategy
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => post.featured).map((post, index) => (
                <article
                  key={index}
                  className="fade-in-on-scroll bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${post.color} rounded-full mb-4`}>
                      <post.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                                          <Link
                      to={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deeper into AI strategy and implementation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={index}
                className="fade-in-on-scroll bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${post.color} rounded-full mb-4`}>
                    <post.icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <Link
                      to={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Read
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-on-scroll">
            Ready to Apply These Insights?
          </h2>
          <p className="text-xl text-blue-100 mb-8 fade-in-on-scroll">
            Let's discuss how these strategies can be implemented in your specific business context
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 fade-in-on-scroll"
          >
            Book Your Strategy Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
