
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ICON_SIZES } from '../constants/design-system';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location]);

  const navItems: Array<{ name: string; path: string }> = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50' : 'bg-transparent'
    } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className="modern-container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 sm:space-x-3 hover-scale group z-10 transition-all duration-500 min-h-[44px] min-w-[44px] items-center justify-center"
            style={{
              animation: mounted ? 'fadeInLeft 0.6s ease-out' : 'none'
            }}
            aria-label="AIdea Digital Home"
          >
            <img 
              src="/f634805c-58b8-4a71-b801-507dfd69aa6d__1_-removebg-preview.png" 
              alt="Aidea Digital Logo" 
              className="h-7 w-auto sm:h-8 md:h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-2"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation - Centered Container */}
          <div 
            className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 transition-all duration-700"
            style={{
              animation: mounted ? 'fadeInDown 0.8s ease-out 0.2s both' : 'none'
            }}
          >
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800/50 rounded-2xl px-3 py-2.5 shadow-lg shadow-gray-900/50">
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-6 py-3 text-base sm:text-lg font-medium transition-colors duration-200 rounded-xl min-h-[48px] flex items-center ${
                      location.pathname === item.path
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    style={{
                      animation: mounted ? `slideInUp 0.5s ease-out ${0.3 + index * 0.1}s both` : 'none'
                    }}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Us Button - Far Right */}
          <div 
            className="hidden md:block z-10 transition-all duration-500"
            style={{
              animation: mounted ? 'fadeInRight 0.6s ease-out 0.4s both' : 'none'
            }}
          >
            <Link
              to="/contact"
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 text-blue-800 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-110 hover:from-blue-300 hover:via-purple-300 hover:to-blue-300 transform relative overflow-hidden group min-h-[48px] flex items-center"
              aria-label="Contact Us"
            >
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-300 touch-manipulation transform hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-6">
                <Menu className={`${ICON_SIZES.lg} absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} aria-hidden="true" />
                <X className={`${ICON_SIZES.lg} absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} aria-hidden="true" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        } overflow-hidden`}>
          <div className={`px-4 pt-4 pb-4 space-y-2 bg-gray-900/95 backdrop-blur-xl rounded-2xl mt-4 shadow-2xl border border-gray-800 transition-all duration-500 ${
            isOpen ? 'scale-100' : 'scale-95'
          }`}>
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-5 py-3 text-base sm:text-lg font-semibold transition-all duration-300 touch-manipulation rounded-xl transform min-h-[44px] flex items-center ${
                  location.pathname === item.path
                    ? 'text-blue-800 bg-blue-200 scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:scale-105 active:scale-95'
                }`}
                onClick={() => setIsOpen(false)}
                style={{
                  animation: isOpen ? `slideInLeft 0.4s ease-out ${index * 0.1}s both` : 'none'
                }}
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block px-5 py-3 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 text-blue-800 text-base sm:text-lg font-semibold rounded-xl text-center transition-all duration-300 hover:scale-105 active:scale-95 transform min-h-[44px] flex items-center justify-center hover:from-blue-300 hover:via-purple-300 hover:to-blue-300"
              onClick={() => setIsOpen(false)}
              style={{
                animation: isOpen ? `slideInLeft 0.4s ease-out ${navItems.length * 0.1}s both` : 'none'
              }}
              aria-label="Contact Us"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
