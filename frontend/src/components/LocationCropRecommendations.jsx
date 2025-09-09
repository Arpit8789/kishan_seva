// src/components/LocationCropRecommendations.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  CalendarIcon, 
  SunIcon,
  CloudIcon,
  SparklesIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const LocationCropRecommendations = () => {
  const [location, setLocation] = useState({ state: '', district: '', coordinates: null });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Mock regional crop data
  const regionalCrops = {
    'Punjab': {
      kharif: ['Rice', 'Cotton', 'Sugarcane', 'Maize'],
      rabi: ['Wheat', 'Mustard', 'Peas', 'Gram'],
      climate: 'Semi-arid',
      bestPractices: 'Rice-wheat rotation system',
      averageTemp: '25°C'
    },
    'Maharashtra': {
      kharif: ['Cotton', 'Sugarcane', 'Rice', 'Jowar'],
      rabi: ['Wheat', 'Gram', 'Mustard', 'Safflower'],
      climate: 'Tropical',
      bestPractices: 'Drip irrigation recommended',
      averageTemp: '28°C'
    },
    'Karnataka': {
      kharif: ['Rice', 'Maize', 'Cotton', 'Sugarcane'],
      rabi: ['Wheat', 'Gram', 'Sunflower', 'Safflower'],
      climate: 'Tropical',
      bestPractices: 'Mixed cropping with pulses',
      averageTemp: '26°C'
    },
    'Uttar Pradesh': {
      kharif: ['Rice', 'Sugarcane', 'Cotton', 'Bajra'],
      rabi: ['Wheat', 'Mustard', 'Gram', 'Peas'],
      climate: 'Subtropical',
      bestPractices: 'Traditional rice-wheat system',
      averageTemp: '24°C'
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          // Mock weather data based on coordinates
          setWeatherData({
            temperature: Math.round(Math.random() * 10 + 20),
            humidity: Math.round(Math.random() * 30 + 50),
            rainfall: Math.round(Math.random() * 100 + 200),
            forecast: 'Moderate rainfall expected this week'
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  const generateRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      const stateData = regionalCrops[location.state];
      if (stateData) {
        const currentMonth = new Date().getMonth();
        const isKharifSeason = currentMonth >= 5 && currentMonth <= 9; // June-October
        
        setRecommendations({
          currentSeason: isKharifSeason ? 'Kharif' : 'Rabi',
          recommendedCrops: isKharifSeason ? stateData.kharif : stateData.rabi,
          alternativeCrops: isKharifSeason ? stateData.rabi : stateData.kharif,
          climate: stateData.climate,
          bestPractices: stateData.bestPractices,
          averageTemp: stateData.averageTemp,
          seasonTiming: isKharifSeason ? 'June - October' : 'November - April'
        });
      }
      setLoading(false);
    }, 1500);
  };

  const getCropIcon = (crop) => {
    const icons = {
      'Rice': '🌾', 'Wheat': '🌾', 'Cotton': '🌿', 'Sugarcane': '🎋',
      'Maize': '🌽', 'Mustard': '🌻', 'Gram': '🫘', 'Peas': '🟢'
    };
    return icons[crop] || '🌱';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            📍
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-2">
            स्थान आधारित सुझाव - Location-Based Crop Advisory
          </h1>
          <p className="text-gray-600">Get crop recommendations based on your location and season</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Location Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2 text-blue-600" />
              Location Selection
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                <select
                  value={location.state}
                  onChange={(e) => setLocation({...location, state: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  {Object.keys(regionalCrops).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">District (Optional)</label>
                <input
                  type="text"
                  value={location.district}
                  onChange={(e) => setLocation({...location, district: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your district"
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">Auto-detect Location</span>
                </div>
                <button
                  onClick={detectLocation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Detect
                </button>
              </div>
              
              {weatherData && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Current Weather</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Temperature: {weatherData.temperature}°C</div>
                    <div>Humidity: {weatherData.humidity}%</div>
                    <div className="col-span-2">Rainfall: {weatherData.rainfall}mm (annual)</div>
                    <div className="col-span-2 text-green-700 font-medium mt-2">
                      {weatherData.forecast}
                    </div>
                  </div>
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateRecommendations}
                disabled={!location.state || loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Generating Recommendations...
                  </>
                ) : (
                  'Get Crop Recommendations'
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
          >
            {recommendations ? (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2 text-emerald-600" />
                  Crop Recommendations for {location.state}
                </h2>
                
                <div className="space-y-4">
                  {/* Current Season */}
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-emerald-900">Current Season: {recommendations.currentSeason}</h3>
                      <CalendarIcon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <p className="text-sm text-emerald-700">Season Duration: {recommendations.seasonTiming}</p>
                  </div>

                  {/* Recommended Crops */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Recommended Crops for This Season</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {recommendations.recommendedCrops.map((crop, index) => (
                        <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="text-2xl mr-3">{getCropIcon(crop)}</span>
                          <span className="font-medium text-green-900">{crop}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Climate Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-1">
                        <SunIcon className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-900">Climate</span>
                      </div>
                      <span className="text-sm text-blue-700">{recommendations.climate}</span>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center mb-1">
                        <CloudIcon className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="text-sm font-semibold text-orange-900">Avg. Temp</span>
                      </div>
                      <span className="text-sm text-orange-700">{recommendations.averageTemp}</span>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center mb-2">
                      <InformationCircleIcon className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="font-bold text-yellow-900">Regional Best Practices</span>
                    </div>
                    <p className="text-sm text-yellow-800">{recommendations.bestPractices}</p>
                  </div>

                  {/* Alternative Crops */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Next Season Options</h3>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.alternativeCrops.slice(0, 4).map((crop, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {getCropIcon(crop)} <span className="ml-1">{crop}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MapPinIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p>Select your location to get personalized crop recommendations</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LocationCropRecommendations;
