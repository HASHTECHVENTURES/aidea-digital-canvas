import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Heading from '../components/ui/Heading';
import { ICON_SIZES } from '../constants/design-system';

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  // Auto-fill form when user is logged in
  useEffect(() => {
    if (user && !isAutoFilled) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata?.full_name || '',
        email: user.email || '',
        company: user.user_metadata?.company_name || ''
      }));
      setIsAutoFilled(true);
    }
  }, [user, isAutoFilled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save contact message to Supabase
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            subject: formData.subject,
            message: formData.message
          }
        ])
        .select();

      if (error) {
        if (import.meta.env.DEV) {
          console.error('Database error:', error);
        }
        throw error;
      }

      if (import.meta.env.DEV) {
        console.log('Contact message saved:', data);
      }
      setSubmitStatus('success');
      
      // Reset form but keep user data if logged in
      if (user) {
        setFormData({
          name: user.user_metadata?.full_name || '',
          email: user.email || '',
          company: user.user_metadata?.company_name || '',
          subject: '',
          message: ''
        });
      } else {
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Form submission error:', error);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      detail: "aideadigitalagency@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: MapPin,
      title: "Location", 
      detail: "Mumbai, India",
      description: "Visit our office"
    }
  ];

  const subjects = [
    "General Inquiry",
    "AI Consulting Services",
    "Partnership Opportunities",
    "Technical Support",
    "Media & Press",
    "Career Opportunities",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/30 to-purple-950/20" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]" aria-hidden="true"></div>
        <div className="relative modern-container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heading level={1} align="center" className="mb-3 sm:mb-4">
              Get in Touch
            </Heading>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Ready to transform your business with AI? Let's discuss how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Section background="primary">
        <div className="modern-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Information */}
            <div>
              <Heading level={2} className="mb-6">
                Let's Start a Conversation
              </Heading>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                Whether you're looking to implement AI solutions, need strategic guidance, or want to explore partnership opportunities, we're here to help. Reach out to us and let's discuss how we can drive your business forward.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center glow-blue" aria-hidden="true">
                      <item.icon className={ICON_SIZES.lg + " sm:" + ICON_SIZES.xl + " text-white"} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 font-medium mb-1">
                        {item.detail}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 sm:p-8 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  Response Time
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <Card padding="lg">
              <Heading level={3} className="mb-6">
                Send us a Message
              </Heading>

              {/* User Status Indicator */}
              {user && (
                <div className="mb-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center space-x-3" role="status" aria-live="polite">
                  <User className={`${ICON_SIZES.md} text-blue-400 flex-shrink-0`} aria-hidden="true" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">
                      Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
                    </p>
                    <p className="text-blue-400/80 text-xs">
                      Your information has been pre-filled for convenience.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-xl flex items-center space-x-3" role="alert" aria-live="polite">
                  <CheckCircle className={`${ICON_SIZES.md} text-green-400 flex-shrink-0`} aria-hidden="true" />
                  <p className="text-green-300 text-sm">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-xl flex items-center space-x-3" role="alert" aria-live="assertive">
                  <AlertCircle className={`${ICON_SIZES.md} text-red-400 flex-shrink-0`} aria-hidden="true" />
                  <p className="text-red-300 text-sm">
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              )}
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                      placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                  <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Company Name
                    </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                      onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                    placeholder="Enter your company name"
                  />
                  </div>

                  <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Subject *
                    </label>
                    <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                      onChange={handleInputChange}
                      required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white min-h-[44px]"
                  >
                    <option value="" className="bg-gray-900">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject} className="bg-gray-900">
                        {subject}
                      </option>
                    ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base text-white placeholder-gray-500"
                    placeholder="Tell us about your project or inquiry..."
                    />
                </div>

                {/* Quick Contact Options for Logged-in Users */}
                {user && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-3">Quick Contact Options:</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, subject: 'AI Consulting Services', message: 'Hi! I\'m interested in learning more about your AI consulting services. Could you please provide more information?' }))}
                        className="px-3 py-2 bg-blue-600/20 text-blue-400 text-xs rounded-lg hover:bg-blue-600/30 border border-blue-500/30 transition-colors touch-manipulation"
                      >
                        AI Consulting
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, subject: 'Partnership Opportunities', message: 'Hi! I\'d like to explore potential partnership opportunities with AIdea Digital.' }))}
                        className="px-3 py-2 bg-purple-600/20 text-purple-400 text-xs rounded-lg hover:bg-purple-600/30 border border-purple-500/30 transition-colors touch-manipulation"
                      >
                        Partnership
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, subject: 'General Inquiry', message: 'Hi! I have a general question about your services.' }))}
                        className="px-3 py-2 bg-green-600/20 text-green-400 text-xs rounded-lg hover:bg-green-600/30 border border-green-500/30 transition-colors touch-manipulation"
                      >
                        General Question
                      </button>
                    </div>
                  </div>
                )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-5 sm:px-6 rounded-lg font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg touch-manipulation glow-blue min-h-[44px] flex items-center justify-center"
                  >
                    {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </div>
                  )}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;