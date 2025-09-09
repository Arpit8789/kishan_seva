import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContextProvider, useAuth, useNotifications, useTheme } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

// Lazy load components for better performance
const Auth = React.lazy(() => import('./pages/Auth'));
const SoilHealthAnalysis = React.lazy(() => import('./components/SoilHealthAnalysis'));
const LocationCropRecommendations = React.lazy(() => import('./components/LocationCropRecommendations'));
const WeatherAlerts = React.lazy(() => import('./components/WeatherAlerts'));
const FeedbackSystem = React.lazy(() => import('./components/FeedbackSystem'));
//const PriceTracker = React.lazy(() => import('./components/PriceTracker'));
const CropGuide = React.lazy(() => import('./components/CropGuide'));
const DiseaseDetector = React.lazy(() => import('./components/DiseaseDetector'));
const CostCalculator = React.lazy(() => import('./components/CostCalculator'));
const Chatbot = React.lazy(() => import('./components/Chatbot'));
//const IoTDashboard = React.lazy(() => import('./components/IoTPlaceholder')); // Fixed import

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading Krishi Sahayak...</p>
      <p className="text-sm text-gray-500 mt-2">कृषि सहायक लोड हो रहा है...</p>
    </motion.div>
  </div>
);

// Home/Landing Page Component
const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-4xl mr-4 shadow-lg">
            🌾
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-2">
              कृषि सहायक
            </h1>
            <p className="text-xl text-gray-600">Smart Farming Assistant</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Empowering Indian farmers with AI-powered insights, real-time market data, soil analysis, 
          weather alerts, and comprehensive agricultural guidance in their native language.
        </p>
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <motion.a
          href="/soil-analysis"
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🧪
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Soil Analysis</h3>
          <p className="text-sm text-gray-600">NPK calculator with fertilizer recommendations</p>
          <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">NEW</span>
        </motion.a>

        <motion.a
          href="/crop-recommendations"
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            📍
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Crop Advisory</h3>
          <p className="text-sm text-gray-600">Location-based crop recommendations</p>
          <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">NEW</span>
        </motion.a>

        <motion.a
          href="/weather-alerts"
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            ⛈️
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Weather Alerts</h3>
          <p className="text-sm text-gray-600">Real-time weather alerts with notifications</p>
          <span className="inline-block mt-2 bg-sky-100 text-sky-700 text-xs font-bold px-2 py-1 rounded-full">NEW</span>
        </motion.a>

        <motion.a
          href="/market-prices"
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            💰
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Market Prices</h3>
          <p className="text-sm text-gray-600">Real-time crop prices across India</p>
        </motion.a>

        <motion.a
          href="/disease-detection"
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🔬
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Disease Detection</h3>
          <p className="text-sm text-gray-600">AI-powered crop disease identification</p>
        </motion.a>

        <motion.a
          href="/cost-calculator"
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🧮
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Cost Calculator</h3>
          <p className="text-sm text-gray-600">Calculate farming costs per acre</p>
        </motion.a>

        <motion.a
          href="/chatbot"
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🤖
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">AI Assistant</h3>
          <p className="text-sm text-gray-600">Multilingual farming chatbot</p>
        </motion.a>

        <motion.a
          href="/feedback"
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            💬
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Feedback</h3>
          <p className="text-sm text-gray-600">Share your farming experience</p>
          <span className="inline-block mt-2 bg-pink-100 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">NEW</span>
        </motion.a>
      </div>

      {/* Quick Auth Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="text-gray-600 mb-4">Want to save your preferences?</p>
        <div className="flex justify-center space-x-4">
          <a
            href="/auth"
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
          >
            Login / Sign Up
          </a>
        </div>
      </motion.div>
    </div>
  </div>
);

// Enhanced Notification component
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`max-w-sm w-full p-4 rounded-2xl shadow-xl border-2 backdrop-blur-lg ${
              notification.type === 'success' ? 'bg-green-50/90 border-green-200' :
              notification.type === 'error' ? 'bg-red-50/90 border-red-200' :
              notification.type === 'warning' ? 'bg-yellow-50/90 border-yellow-200' :
              'bg-blue-50/90 border-blue-200'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-2xl">
                  {notification.type === 'success' ? '✅' :
                   notification.type === 'error' ? '❌' :
                   notification.type === 'warning' ? '⚠️' : 'ℹ️'}
                </span>
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-bold text-gray-900">
                  {notification.title}
                </p>
                {notification.message && (
                  <p className="mt-1 text-xs text-gray-600">
                    {notification.message}
                  </p>
                )}
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="inline-flex text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-white/50 rounded-full"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Responsive Layout component
const Layout = ({ children, showHeader = true, showFooter = true }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      {showHeader && <Header />}
      <main className="flex-1 w-full">
        {children}
      </main>
      {showFooter && <Footer />}
      <NotificationContainer />
    </div>
  );
};

// 🚀 REMOVED AUTHENTICATION REQUIREMENTS - No more forced login!
const ProtectedRoute = ({ children }) => {
  // ❌ Removed authentication check for prototype
  return children;
};

const PublicRoute = ({ children }) => {
  // ❌ Removed authentication redirect for prototype  
  return children;
};

// Main App Routes
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* 🏠 Landing Page - Now shows Home instead of Auth */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Home />
            </Layout>
          } 
        />
        
        {/* Auth page - accessible but not required */}
        <Route 
          path="/auth" 
          element={
            <Layout showHeader={false} showFooter={false}>
              <Auth />
            </Layout>
          } 
        />

        {/* 🆕 New Feature Pages - No auth required */}
        <Route 
          path="/soil-analysis" 
          element={
            <Layout>
              <SoilHealthAnalysis />
            </Layout>
          } 
        />

        <Route 
          path="/crop-recommendations" 
          element={
            <Layout>
              <LocationCropRecommendations />
            </Layout>
          } 
        />

        <Route 
          path="/weather-alerts" 
          element={
            <Layout>
              <WeatherAlerts />
            </Layout>
          } 
        />

        <Route 
          path="/feedback" 
          element={
            <Layout>
              <FeedbackSystem />
            </Layout>
          } 
        />

        {/* Existing Feature Pages - No auth required */}
        

        <Route 
          path="/crop-guide" 
          element={
            <Layout>
              <CropGuide />
            </Layout>
          } 
        />

        <Route 
          path="/disease-detection" 
          element={
            <Layout>
              <DiseaseDetector />
            </Layout>
          } 
        />

        <Route 
          path="/cost-calculator" 
          element={
            <Layout>
              <CostCalculator />
            </Layout>
          } 
        />

        <Route 
          path="/chatbot" 
          element={
            <Layout>
              <Chatbot />
            </Layout>
          } 
        />

        

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <Layout>
              <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center px-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-6xl sm:text-8xl lg:text-9xl mb-6">🌾</div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    404 - Page Not Found
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist in our digital farm.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/'}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg"
                  >
                    🏠 Back to Home
                  </motion.button>
                </motion.div>
              </div>
            </Layout>
          } 
        />
      </Routes>
    </Suspense>
  );
};

// Main App component
const AppContent = () => {
  const { isLoading } = useAuth();

  useEffect(() => {
    // Set up global error handler for better UX
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });

    // Set up offline/online handlers
    const handleOnline = () => {
      console.log('Krishi Sahayak is online');
    };

    const handleOffline = () => {
      console.log('Krishi Sahayak is offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('unhandledrejection', () => {});
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Remove loading check for prototype - no auth required
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

// Root App component with providers
const App = () => {
  return (
    <AppContextProvider>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
        }}
      />
    </AppContextProvider>
  );
};

export default App;
