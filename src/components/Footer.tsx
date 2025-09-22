import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">AIdea Digital</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Transforming businesses through AI-powered solutions. We help companies 
              leverage artificial intelligence to drive growth, efficiency, and innovation.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>aideadigitalagency@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/community" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">AI Strategy Consulting</span>
              </li>
              <li>
                <span className="text-gray-400">Machine Learning Solutions</span>
              </li>
              <li>
                <span className="text-gray-400">Data Analytics</span>
              </li>
              <li>
                <span className="text-gray-400">Process Automation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 AIdea Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;