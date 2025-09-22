import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, Shield, Lightbulb, Users, Gift, Download, Clock, MapPin, Star, CheckCircle, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Community = () => {
  const { user, loading, signIn, signUp, signOut, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      if (isSignUp) {
        // Validate required fields for signup
        if (!name.trim() || !phoneNumber.trim() || !gender || !email.trim() || !password.trim()) {
          alert('Please fill in all required fields');
          setAuthLoading(false);
          return;
        }
        
        await signUp({
          email,
          password,
          full_name: name,
          phone_number: phoneNumber,
          gender
        });
        alert('Check your email for the confirmation link!');
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhoneNumber('');
    setGender('');
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    clearForm();
    setShowForgotPassword(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) {
      alert('Please enter your email address');
      return;
    }

    try {
      await resetPassword(forgotPasswordEmail);
      alert('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error: any) {
      alert(error.message);
    }
  };

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

  // Empty arrays for future content
  const upcomingEvents: any[] = [];
  const communityResources: any[] = [];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pb-16 lg:pt-32 lg:pb-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in leading-tight">
              AIdea Digital{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto animate-fade-in leading-relaxed px-4">
              Join our exclusive community of AI-forward business leaders. Access premium resources, attend exclusive events, and connect with like-minded professionals.
            </p>
            
            {user && (
              <div className="animate-fade-in">
                <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full font-medium">
                  <User className="h-5 w-5 mr-2" />
                  Welcome back, {user.email?.split('@')[0]}!
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Login/Signup Section */}
      {!user && (
        <section id="login" className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isSignUp ? 'Join Our Community' : 'Welcome Back'}
                </h2>
                <p className="text-gray-600">
                  {isSignUp ? 'Create your account to access exclusive resources' : 'Sign in to access your community benefits'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                {isSignUp && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={isSignUp}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                {isSignUp && (
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required={isSignUp}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                )}

                {isSignUp && (
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required={isSignUp}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isSignUp ? 'Creating Account...' : 'Signing In...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      {isSignUp ? <UserPlus className="h-5 w-5 mr-2" /> : <LogIn className="h-5 w-5 mr-2" />}
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center space-y-3">
                {!isSignUp && (
                  <div>
                    <button
                      onClick={() => setShowForgotPassword(!showForgotPassword)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
                
                <div>
                  <button
                    onClick={toggleAuthMode}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Forgot Password Section */}
      {!user && showForgotPassword && (
        <section className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Reset Your Password
                </h2>
                <p className="text-gray-600">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Send Reset Link
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Welcome Section for Authenticated Users */}
      {user && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16 fade-in-on-scroll">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Welcome to the Community
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Your community dashboard is ready. Resources and events will appear here soon.
              </p>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section - Only for authenticated users */}
      {user && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16 fade-in-on-scroll">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Events will be announced here soon
              </p>
            </div>
            
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
                <p className="text-gray-500">Check back soon for upcoming community events</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <div key={event.id} className={`fade-in-on-scroll bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 overflow-hidden ${event.featured ? 'lg:col-span-2' : ''}`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${event.color} rounded-full`}>
                          <event.icon className="h-6 w-6 text-white" />
                        </div>
                        {event.featured && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            Featured Event
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {event.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                      
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                        Register Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Community Resources Section - Only for authenticated users */}
      {user && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16 fade-in-on-scroll">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Community Resources
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Resources will be available here soon
              </p>
            </div>
            
            {communityResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources available</h3>
                <p className="text-gray-500">Check back soon for community resources and tools</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {communityResources.map((resource, index) => (
                  <div key={resource.id} className="fade-in-on-scroll bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${resource.color} rounded-full`}>
                          <resource.icon className="h-6 w-6 text-white" />
                        </div>
                        {resource.premium && (
                          <div className="flex items-center">
                            <Lock className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-xs text-yellow-600 font-medium">Premium</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {resource.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{resource.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Download className="h-3 w-3 mr-1" />
                          {resource.downloads} downloads
                        </div>
                        <button className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                          resource.premium && !user
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                        }`}>
                          {resource.premium && !user ? (
                            <>
                              <Lock className="h-4 w-4 mr-1" />
                              Login Required
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
};

export default Community;
