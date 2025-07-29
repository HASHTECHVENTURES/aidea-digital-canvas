import { Link } from 'react-router-dom';
import { Mail, Clock, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
      return <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <img alt="Aidea Digital" className="h-6 sm:h-8 w-auto brightness-0 invert" src="/lovable-uploads/ef6db4c7-6dce-4192-8441-83891edcaaae.png" />
            </div>
            <p className="text-gray-300 mb-3 sm:mb-4 max-w-md text-sm sm:text-base leading-relaxed">
              Making AI practical and business-focused for founders and business leaders worldwide.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>aideadgital@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; {currentYear} Aidea Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;