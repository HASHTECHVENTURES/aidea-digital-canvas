import { useEffect, useState } from 'react';
import { Calendar, User, BookOpen, Download, Clock, MapPin, LogIn, UserPlus, ArrowRight, Mail, X } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

const Community = () => {
  // Authentication state
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  
  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [previewPdf, setPreviewPdf] = useState<{url: string, title: string} | null>(null);
  
  // Data state
  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Check authentication on component mount and listen for changes
  useEffect(() => {
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch data when user is authenticated
  useEffect(() => {
    if (user) {
      console.log('User authenticated, fetching data for:', user.email);
      fetchCommunityData();
    } else {
      console.log('No user, clearing data');
      setEvents([]);
      setResources([]);
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityData = async () => {
    setDataLoading(true);
    try {
      // Fetch events
      const { data: eventsData, error: eventsError } = await supabase
        .from('community_events')
        .select('*')
        .eq('is_active', true)
        .order('event_date', { ascending: true });

      if (eventsError) throw eventsError;

      // Fetch resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('community_resources')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (resourcesError) throw resourcesError;

      setEvents(eventsData || []);
      setResources(resourcesData || []);
    } catch (error) {
      console.error('Error fetching community data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      if (isLogin) {
        // Login
        console.log('Attempting login for:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.error('Login error:', error);
          throw error;
        }
        
        console.log('Login successful:', data.user?.email);
        // The auth state change listener will handle setting the user
      } else {
        // Register
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }

        console.log('Attempting registration for:', email);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone_number: phoneNumber,
              company_name: companyName,
            }
          }
        });
        
        if (error) {
          console.error('Registration error:', error);
          throw error;
        }
        
        console.log('Registration successful:', data.user?.email);
        alert('Account created successfully! You are now signed in.');
        // The auth state change listener will handle setting the user
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      alert(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordLoading(true);

    try {
      console.log('Sending password reset email to:', forgotPasswordEmail);
      
      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        throw error;
      }

      console.log('Password reset email sent successfully');
      alert('Password reset email sent! Please check your inbox and follow the instructions.');
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error: any) {
      console.error('Forgot password error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('Signing out user...');
      await supabase.auth.signOut();
      // The auth state change listener will handle clearing the user state
      console.log('Sign out successful');
    } catch (error: any) {
      console.error('Sign out error:', error);
      alert(error.message);
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setPhoneNumber('');
    setCompanyName('');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    clearForm();
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      // Fetch the file
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'resource.pdf';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(fileUrl, '_blank');
    }
  };

  const handlePreview = (fileUrl: string, title: string) => {
    setPreviewPdf({ url: fileUrl, title });
  };

  const closePreview = () => {
    setPreviewPdf(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/30 to-purple-950/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"></div>
        <div className="relative modern-container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight px-2 sm:px-0">
              AIdea Digital Community
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Join our exclusive community of AI-forward business leaders. Access premium resources, attend exclusive events, and connect with like-minded professionals.
            </p>
            
            {user && (
                <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600/20 border border-green-500/30 text-green-300 rounded-full font-medium text-xs sm:text-sm">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Authentication Section - Only for non-logged-in users */}
      {!user && (
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-950 px-4 sm:px-6 lg:px-8">
          <div className="modern-container max-w-md mx-auto">
            <div className="modern-card p-4 sm:p-6 md:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Join Our Community'}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-400">
                  {isLogin ? 'Sign in to access your community benefits' : 'Create your account to access exclusive resources'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4 sm:space-y-6">
                {!isLogin && (
                  <>
                    <div>
                      <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required={!isLogin}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required={!isLogin}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                        placeholder="Enter your company name (optional)"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Password *
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={!isLogin}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-white placeholder-gray-500 min-h-[44px]"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-3.5 px-4 sm:px-5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                >
                  {authLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      {isLogin ? <LogIn className="h-5 w-5 mr-2" /> : <UserPlus className="h-5 w-5 mr-2" />}
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-4 sm:mt-6 text-center space-y-2 sm:space-y-3">
                <button
                  onClick={toggleAuthMode}
                  className="text-blue-600 hover:text-blue-800 font-medium block w-full text-xs sm:text-sm min-h-[32px] flex items-center justify-center"
                >
                  {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
                </button>
                
                {isLogin && (
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-gray-400 hover:text-white text-xs sm:text-sm block w-full min-h-[32px] flex items-center justify-center"
                  >
                    Forgot your password?
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="modern-card p-6 sm:p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Reset Password</h3>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordEmail('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="text-gray-400 mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="forgotEmail"
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                disabled={forgotPasswordLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {forgotPasswordLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Send Reset Link
                  </div>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordEmail('');
                }}
                className="text-gray-400 hover:text-white text-sm"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Community Dashboard - Only for logged-in users */}
      {user && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Your Community Dashboard
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                Access exclusive resources and join upcoming events
              </p>
            </div>
            
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
              {/* Resources Card - Made larger and scrollable */}
              <div className="modern-card overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 sm:p-6">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white mr-3" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Community Resources</h3>
                      <p className="text-blue-100 text-sm sm:text-base">Access exclusive tools and templates</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
                  {dataLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading resources...</p>
                    </div>
                  ) : resources.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-400">No resources available</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resources.map((resource) => (
                        <div key={resource.id} className="bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors">
                          {/* Mobile-first responsive layout */}
                          <div className="p-4">
                            {/* Top row: Icon, title, and premium badge */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center flex-1 min-w-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                  <Download className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-white text-sm sm:text-base truncate">{resource.title}</h4>
                                  <p className="text-xs sm:text-sm text-gray-400">{resource.resource_type}</p>
                                </div>
                              </div>
                              {resource.is_premium && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex-shrink-0 ml-2">
                                  Premium
                                </span>
                              )}
                            </div>
                            
                            {/* Description row */}
                            {resource.description && (
                              <div className="mb-3">
                                <p className="text-xs text-gray-500 line-clamp-2">
                                  {resource.description}
                                </p>
                              </div>
                            )}
                            
                            {/* Action buttons row - responsive layout */}
                            {resource.file_url && (
                              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <button
                                  onClick={() => handlePreview(resource.file_url, resource.title)}
                                  className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors touch-manipulation min-h-[44px] flex items-center justify-center"
                                >
                                  Preview
                                </button>
                                <button
                                  onClick={() => handleDownload(resource.file_url, resource.title)}
                                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors touch-manipulation min-h-[44px] flex items-center justify-center"
                                >
                                  Download
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Events Card - Made scrollable for consistency */}
              <div className="modern-card overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 sm:p-6">
                  <div className="flex items-center">
                    <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white mr-3" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Upcoming Events</h3>
                      <p className="text-pink-100 text-sm sm:text-base">Join our community events</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
                  {dataLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading events...</p>
                    </div>
                  ) : events.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-400">No events scheduled</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {events.map((event) => (
                        <div key={event.id} className="p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-white text-sm sm:text-base flex-1 pr-2">{event.title}</h4>
                            {event.is_featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex-shrink-0">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-xs sm:text-sm text-gray-400">
                              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>{formatEventDate(event.event_date)}</span>
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-400">
                              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>{event.event_time}</span>
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-400">
                              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="w-full mt-4 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors touch-manipulation min-h-[44px]">
                        View All Events
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="text-center">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>
      )}

      {/* PDF Preview Modal */}
      {previewPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="modern-card max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">{previewPdf.title}</h3>
              <button
                onClick={closePreview}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
          </div>
          
            {/* PDF Viewer */}
            <div className="flex-1 p-4">
              <iframe
                src={previewPdf.url}
                className="w-full h-full min-h-[500px] border-0 rounded"
                title={previewPdf.title}
              />
                  </div>
                  
            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                PDF Preview - Click Download to save the file
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={closePreview}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(previewPdf.url, previewPdf.title);
                    closePreview();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                          Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default Community;