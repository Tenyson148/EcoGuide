import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/daily-logs', label: 'Daily Logs' },
    { href: '/monthly-logs', label: 'Monthly Logs' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-[#2d5f4f]/95 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white tracking-wide">EcoGuide</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-gray-200 transition-colors duration-300 font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <button
            onClick={() => window.location.href = '/logout'}
            className="hidden md:block bg-white text-[#2d5f4f] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Logout
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'} text-3xl`}></i>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-gray-200 transition-colors duration-300 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => window.location.href = '/logout'}
                className="bg-white text-[#2d5f4f] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md text-center"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
