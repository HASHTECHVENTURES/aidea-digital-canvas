import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { ICON_SIZES } from '../constants/design-system';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 text-white">
      <div className="modern-container py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AIdea Digital
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 leading-relaxed">
              AI That Works. Not Just AI That Impresses. We help startups, SMEs, and enterprises 
              design, build, and deploy practical AI solutions that improve speed, efficiency, and decision-making.
            </p>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-gray-400">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-gray-900/50 rounded-lg flex-shrink-0" aria-hidden="true">
                  <Mail className={ICON_SIZES.sm + " sm:" + ICON_SIZES.md + " text-blue-400"} />
                </div>
                <a 
                  href="mailto:aideadigitalagency@gmail.com" 
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded break-all sm:break-normal"
                  aria-label="Send email to aideadigitalagency@gmail.com"
                >
                  aideadigitalagency@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-gray-900/50 rounded-lg flex-shrink-0" aria-hidden="true">
                  <MapPin className={ICON_SIZES.sm + " sm:" + ICON_SIZES.md + " text-blue-400"} />
                </div>
                <span className="hover:text-white transition-colors">Mumbai, India</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="mt-4 sm:mt-6 flex items-center space-x-3 sm:space-x-4">
              <a
                href="https://linkedin.com/company/aidea-digital"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-900/50 rounded-lg hover:bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className={ICON_SIZES.md + " text-blue-400 hover:text-white"} />
              </a>
              <a
                href="https://twitter.com/aidea_digital"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-900/50 rounded-lg hover:bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Visit our Twitter page"
              >
                <Twitter className={ICON_SIZES.md + " text-blue-400 hover:text-white"} />
              </a>
              <a
                href="https://github.com/aidea-digital"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-900/50 rounded-lg hover:bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Visit our GitHub page"
              >
                <Github className={ICON_SIZES.md + " text-blue-400 hover:text-white"} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 uppercase tracking-wider text-gray-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded min-h-[32px] flex items-center"
                  aria-label="Navigate to Home page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/case-studies" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded min-h-[32px] flex items-center"
                  aria-label="Navigate to Case Studies page"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded min-h-[32px] flex items-center"
                  aria-label="Navigate to Community page"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded min-h-[32px] flex items-center"
                  aria-label="Navigate to Contact page"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">
            © 2025 AIdea Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;