// src/components/WeatherAlerts.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudIcon,
  ExclamationTriangleIcon,
  BellIcon,
  XMarkIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const WeatherAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  // Mock weather alerts
  const mockAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected in next 24 hours. Delay harvesting of wheat crop.',
      action: 'Cover harvested crops, ensure proper drainage',
      severity: 'high',
      timeRemaining: '6 hours',
      crops: ['Wheat', 'Mustard'],
      icon: '🌧️'
    },
    {
      id: 2,
      type: 'advisory',
      title: 'Temperature Drop',
      message: 'Temperature expected to drop below 10°C tonight. Protect sensitive crops.',
      action: 'Cover tomato and vegetable plants, use smoke or heaters',
      severity: 'medium',
      timeRemaining: '12 hours',
      crops: ['Tomato', 'Vegetables'],
      icon: '🥶'
    },
    {
      id: 3,
      type: 'info',
      title: 'Favorable Conditions',
      message: 'Perfect weather for sowing cotton seeds. Soil moisture and temperature optimal.',
      action: 'Begin cotton sowing operations',
      severity: 'low',
      timeRemaining: '2 days',
      crops: ['Cotton'],
      icon: '☀️'
    }
  ];

  useEffect(() => {
    // Simulate fetching weather data
    setWeatherData({
      temperature: 28,
      humidity: 75,
      windSpeed: 12,
      rainfall: 15,
      forecast: 'Thunderstorms expected'
    });

    // Simulate receiving alerts
    setTimeout(() => {
      setAlerts(mockAlerts);
      // Show notification for high severity alerts
      const highSeverityAlert = mockAlerts.find(alert => alert.severity === 'high');
      if (highSeverityAlert) {
        showNotification(highSeverityAlert);
      }
    }, 2000);
  }, []);

  const showNotification = (alert) => {
    const notification = {
      id: Date.now(),
      ...alert,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto remove notification after 10 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 10000);
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const simulateWhatsAppAlert = (alert) => {
    const message = `🚨 Weather Alert: ${alert.title}\n\n${alert.message}\n\n📋 Action: ${alert.action}\n\n⏰ Time: ${alert.timeRemaining}\n\nFrom: Krishi Sahayak`;
    alert('WhatsApp Alert Sent!\n\n' + message);
  };

  const simulateSMSAlert = (alert) => {
    const message = `KRISHI SAHAYAK ALERT: ${alert.title}. ${alert.message}. Action: ${alert.action}. Time: ${alert.timeRemaining}`;
    alert('SMS Alert Sent!\n\n' + message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            ⛈️
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-sky-600 bg-clip-text text-transparent mb-2">
            मौसम चेतावनी - Weather Alerts & Advisory
          </h1>
          <p className="text-gray-600">Real-time weather alerts with farming recommendations</p>
        </motion.div>

        {/* Live Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className={`p-4 rounded-lg shadow-lg max-w-sm ${getSeverityColor(notification.severity)} border-2`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{notification.icon}</span>
                    <div>
                      <div className="font-bold text-sm">{notification.title}</div>
                      <div className="text-xs mt-1">{notification.timestamp}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                    className="p-1 hover:bg-black/10 rounded"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weather Alerts */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-red-600" />
                Active Weather Alerts
              </h2>
              
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-lg border-2 ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{alert.icon}</span>
                        <div>
                          <h3 className="font-bold">{alert.title}</h3>
                          <div className="text-xs opacity-75">⏰ {alert.timeRemaining} remaining</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${alert.severity === 'high' ? 'bg-red-200 text-red-800' : alert.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="p-1 hover:bg-black/10 rounded"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3">{alert.message}</p>
                    
                    <div className="bg-black/5 rounded-lg p-3 mb-3">
                      <div className="font-semibold text-sm mb-1">📋 Recommended Action:</div>
                      <p className="text-sm">{alert.action}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold">Affects:</span>
                        {alert.crops.map((crop, index) => (
                          <span key={index} className="bg-black/10 px-2 py-1 rounded text-xs">
                            {crop}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => simulateWhatsAppAlert(alert)}
                          className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                        >
                          <ChatBubbleLeftRightIcon className="h-3 w-3 mr-1" />
                          WhatsApp
                        </button>
                        <button
                          onClick={() => simulateSMSAlert(alert)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                        >
                          <PhoneIcon className="h-3 w-3 mr-1" />
                          SMS
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Weather Dashboard */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/20"
            >
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <CloudIcon className="h-4 w-4 mr-2 text-blue-600" />
                Current Weather
              </h3>
              
              {weatherData && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Temperature</span>
                    <span className="font-bold text-orange-600">{weatherData.temperature}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Humidity</span>
                    <span className="font-bold text-blue-600">{weatherData.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Wind Speed</span>
                    <span className="font-bold text-gray-600">{weatherData.windSpeed} km/h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rainfall</span>
                    <span className="font-bold text-green-600">{weatherData.rainfall}mm</span>
                  </div>
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                    <strong>Forecast:</strong> {weatherData.forecast}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Alert Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/20"
            >
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <BellIcon className="h-4 w-4 mr-2 text-emerald-600" />
                Alert Preferences
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>SMS Alerts</span>
                  <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-4 transition-transform"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>WhatsApp Alerts</span>
                  <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-4 transition-transform"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Alerts</span>
                  <div className="w-10 h-6 bg-gray-300 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full shadow transition-transform"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;
