import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon, XMarkIcon, UserIcon, ChevronDownIcon,
  GlobeAltIcon, SunIcon, MoonIcon, HomeIcon,
  ChartBarIcon, CameraIcon, CalculatorIcon,
  ChatBubbleLeftRightIcon, CurrencyRupeeIcon,
  BeakerIcon, MapPinIcon, CloudIcon, HeartIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AppContext';

// Updated navigation with new features
const navItems = [
  { label: 'Market Prices', href: '/cost-calculator', icon: CurrencyRupeeIcon, highlight: false },
  { label: 'Soil Analysis', href: '/soil-analysis', icon: BeakerIcon, highlight: true },
  { label: 'Crop Advisory', href: '/crop-recommendations', icon: MapPinIcon, highlight: true },
  { label: 'Weather Alerts', href: '/weather-alerts', icon: CloudIcon, highlight: true },
  { label: 'Disease Detection', href: '/disease-detection', icon: CameraIcon, highlight: false },
  //{ label: 'Cost Calculator', href: '/cost-calculator', icon: CalculatorIcon, highlight: false },
  { label: 'AI Assistant', href: '/chatbot', icon: ChatBubbleLeftRightIcon, highlight: false },
  //{ label: 'IoT Dashboard', href: '/iot-dashboard', icon: HomeIcon, highlight: false },
  { label: 'Feedback', href: '/feedback', icon: HeartIcon, highlight: true }
];

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
];

const Header = () => {
  const { user, logout, language, setLanguage, theme, setTheme } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const languageRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setLanguageOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const currentLanguage = languages.find(l => l.code === language) || languages[0];
  
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    window.location.href = '/auth';
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-emerald-600/95 to-green-700/95 border-b border-white/10 shadow-xl">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            
            {/* Logo - Enhanced */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center cursor-pointer flex-shrink-0"
              onClick={() => (window.location.href = '/')}
            >
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-xl mr-2 sm:mr-3 shadow-lg">
                🌾
              </div>
              <div className="hidden xs:block">
                <h1 className="font-bold text-white text-base sm:text-lg leading-tight bg-gradient-to-r from-white to-emerald-100 bg-clip-text">
                  कृषि सहायक
                </h1>
                <span className="text-xs font-medium text-white/80 leading-none">
                  Smart Farming Assistant
                </span>
              </div>
              <div className="block xs:hidden">
                <h1 className="font-bold text-white text-sm">कृषि</h1>
              </div>
            </motion.div>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.slice(0, 6).map(({ label, href, icon: Icon, highlight }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -1 }}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                    highlight 
                      ? 'text-amber-100 hover:text-white hover:bg-white/20 bg-white/10' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1.5" />
                  {label}
                  {highlight && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Right Side Controls - Enhanced */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              
              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="flex items-center px-2 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                  aria-expanded={languageOpen}
                  aria-haspopup="true"
                >
                  <span className="text-sm mr-1">{currentLanguage.flag}</span>
                  <span className="hidden sm:block text-xs font-medium">
                    {currentLanguage.code.toUpperCase()}
                  </span>
                  <ChevronDownIcon className="h-3 w-3 ml-1" />
                </button>

                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-44 sm:w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setLanguageOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-2.5 text-sm transition-colors ${
                              language === lang.code
                                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className="mr-2">{lang.flag}</span>
                            <span className="flex-1 text-left">{lang.native}</span>
                            <span className="text-xs text-gray-400">({lang.name})</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>

              {/* User Profile or Auth Buttons */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center px-2 py-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                  >
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
                      <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="hidden sm:block ml-2 text-sm font-medium text-white/90 max-w-20 truncate">
                      {user.name}
                    </span>
                    <ChevronDownIcon className="hidden sm:block h-3 w-3 ml-1 text-white/70" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                      >
                        <div className="py-1">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                          <a href="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <UserIcon className="h-4 w-4 mr-3" />
                            Your Profile
                          </a>
                          <div className="border-t border-gray-100">
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                            >
                              <span className="mr-3">🚪</span>
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <a
                    href="/auth"
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/auth"
                    className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-xs sm:text-sm font-bold text-white hover:from-amber-500 hover:to-amber-700 rounded-lg transition-all duration-200 shadow-lg"
                  >
                    Sign Up
                  </a>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors ml-1"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-green-50">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-lg mr-3 shadow-lg">
                      🌾
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">कृषि सहायक</h2>
                      <span className="text-xs text-gray-600">Smart Farming Assistant</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4">
                  <div className="space-y-2">
                    {navItems.map(({ label, href, icon: Icon, highlight }) => (
                      <motion.a
                        key={label}
                        href={href}
                        whileHover={{ x: 4 }}
                        className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                          highlight 
                            ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className={`h-5 w-5 mr-3 ${highlight ? 'text-emerald-600' : 'group-hover:text-emerald-600'}`} />
                        <span className="font-medium">{label}</span>
                        {highlight && (
                          <span className="ml-auto bg-amber-400 text-amber-900 text-xs px-2 py-1 rounded-full font-bold">
                            NEW
                          </span>
                        )}
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile User Section */}
                  {user && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
                          <UserIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <a href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                          <UserIcon className="h-4 w-4 mr-3" />
                          Your Profile
                        </a>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <span className="mr-3">🚪</span>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Mobile Auth Section */}
                  {!user && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-3">
                        <a
                          href="/auth"
                          className="flex items-center justify-center w-full px-4 py-3 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 rounded-lg font-medium"
                        >
                          Login
                        </a>
                        <a
                          href="/auth"
                          className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 rounded-lg font-bold shadow-lg"
                        >
                          Sign Up Free
                        </a>
                      </div>
                    </div>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
