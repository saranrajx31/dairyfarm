import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, LayoutDashboard, LogIn, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, setDarkMode, setCurrentView, currentView } = useApp();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Services', href: '#features' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#footer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md py-3 border-b border-teal-100 dark:border-teal-900/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0D8F87] to-[#18B6A6] flex items-center justify-center text-2xl shadow-lg shadow-teal-700/20 group-hover:scale-105 transition-transform">
            🐄
          </div>
          <div>
            <span className="text-xl font-bold font-heading tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Dairy Farm <span className="text-[#0D8F87] dark:text-[#18B6A6]">Pro</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
              Management System
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-[#0D8F87] dark:text-slate-300 dark:hover:text-[#18B6A6] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#F7C948]" /> : <Moon className="w-4 h-4 text-[#0D8F87]" />}
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => setCurrentView(currentView === 'dashboard' ? 'landing' : 'dashboard')}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{currentView === 'dashboard' ? 'View Website' : 'Go to Dashboard'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#F7C948]" /> : <Moon className="w-4 h-4 text-[#0D8F87]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-slate-800"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAuthenticated) {
                    setCurrentView('dashboard');
                  } else {
                    onOpenAuth();
                  }
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white text-sm font-medium flex items-center justify-center gap-2"
              >
                {isAuthenticated ? (
                  <>
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open Dashboard</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Login to Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
