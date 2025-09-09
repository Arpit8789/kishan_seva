import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BeakerIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  SparklesIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const SoilHealthAnalysis = () => {
  const [soilData, setSoilData] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    location: '',
    district: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('Punjab');
  const [showGovtServices, setShowGovtServices] = useState(false);

  // Government soil testing agencies data
  const govtSoilTestingAgencies = {
    'Punjab': {
      name: 'Punjab Agricultural University',
      website: 'https://pau.edu/content/dam/university/colleges/COAFS/contact-us.pdf',
      phone: '0161-2401960',
      services: ['Free soil testing', 'Mobile soil testing labs', 'Fertilizer recommendations'],
      locations: ['Ludhiana', 'Bathinda', 'Gurdaspur', 'Faridkot'],
      cost: 'FREE for farmers',
      timeframe: '7-10 days',
      documents: ['Land records', 'Identity proof'],
      features: ['pH analysis', 'NPK testing', 'Micronutrient analysis', 'Organic carbon']
    },
    'Haryana': {
      name: 'Department of Agriculture, Haryana',
      website: 'https://agriharyana.gov.in/',
      phone: '0172-2701373',
      services: ['Subsidized soil testing', 'Mobile soil labs'],
      locations: ['Hisar', 'Karnal', 'Kurukshetra', 'Sirsa'],
      cost: '₹100 per sample',
      timeframe: '5-7 days',
      documents: ['Aadhaar card', 'Land ownership proof'],
      features: ['Complete soil profile', 'Fertilizer recommendations', 'Digital reports']
    },
    'Uttar Pradesh': {
      name: 'Soil Health & Fertility Management, UP',
      website: 'https://upagriculture.com/',
      phone: '0522-2204223',
      services: ['Soil health cards', 'Mobile testing units'],
      locations: ['Lucknow', 'Meerut', 'Varanasi', 'Kanpur'],
      cost: '₹50 per sample',
      timeframe: '10-15 days',
      documents: ['Soil health card', 'Farmer registration'],
      features: ['Soil health mapping', 'Crop-specific recommendations']
    }
  };

  const states = Object.keys(govtSoilTestingAgencies);

  useEffect(() => {
    // Auto-detect location based on IP or show Punjab by default
    setSelectedState('Punjab');
    setShowGovtServices(true);
  }, []);

  const analyzesoil = () => {
    setLoading(true);
    setTimeout(() => {
      const ph = parseFloat(soilData.ph);
      const n = parseFloat(soilData.nitrogen);
      const p = parseFloat(soilData.phosphorus);
      const k = parseFloat(soilData.potassium);
      
      const recommendations = [];
      const costs = [];
      
      if (n < 280) {
        const ureaNeeded = Math.ceil((280 - n) * 2.17);
        recommendations.push(`Low Nitrogen - Apply ${ureaNeeded} kg Urea/hectare`);
        costs.push({ fertilizer: 'Urea', quantity: ureaNeeded, cost: ureaNeeded * 6 });
      }
      
      if (p < 22) {
        const dapNeeded = Math.ceil((22 - p) * 2.17);
        recommendations.push(`Low Phosphorus - Apply ${dapNeeded} kg DAP/hectare`);
        costs.push({ fertilizer: 'DAP', quantity: dapNeeded, cost: dapNeeded * 24 });
      }
      
      if (k < 280) {
        const mopNeeded = Math.ceil((280 - k) * 1.67);
        recommendations.push(`Low Potassium - Apply ${mopNeeded} kg MOP/hectare`);
        costs.push({ fertilizer: 'MOP', quantity: mopNeeded, cost: mopNeeded * 17 });
      }
      
      const healthScore = Math.min(100, ((n/280 + p/22 + k/280 + (ph >= 6.0 && ph <= 7.5 ? 1 : 0.5)) / 4) * 100);
      
      setAnalysis({
        healthScore: Math.round(healthScore),
        status: healthScore > 75 ? 'Excellent' : healthScore > 50 ? 'Good' : 'Needs Improvement',
        recommendations,
        costs,
        totalCost: costs.reduce((sum, item) => sum + item.cost, 0)
      });
      setLoading(false);
    }, 2000);
  };

  const openGovtWebsite = (agency) => {
    window.open(agency.website, '_blank');
  };

  const callGovtHelpline = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const currentAgency = govtSoilTestingAgencies[selectedState];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            🧪
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-2">
            मिट्टी स्वास्थ्य विश्लेषण - Soil Health Analysis
          </h1>
          <p className="text-gray-600">Complete NPK analysis with government support & fertilizer recommendations</p>
        </motion.div>

        {/* Government Free Soil Testing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-8 w-8 mr-3" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Government Free Soil Testing 🇮🇳</h2>
                  <p className="text-green-100 text-sm">Certified labs • Professional analysis • Zero cost</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="bg-white/20 px-3 py-2 rounded-lg">
                  <div className="text-sm font-semibold">Available in</div>
                  <div className="text-lg font-bold">{states.length}+ States</div>
                </div>
              </div>
            </div>
            
            {/* State Selector */}
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Select Your State:</label>
              <div className="flex flex-wrap gap-2">
                {states.map(state => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedState === state 
                        ? 'bg-white text-green-600 shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected State Info */}
            <AnimatePresence mode="wait">
              {currentAgency && (
                <motion.div
                  key={selectedState}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {/* Agency Info */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">{currentAgency.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <CurrencyRupeeIcon className="h-4 w-4 mr-2" />
                          <span className="font-semibold">Cost: {currentAgency.cost}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span>Report in: {currentAgency.timeframe}</span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          <span>{currentAgency.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Services & Locations */}
                    <div>
                      <h4 className="font-semibold text-white mb-2">Available Services:</h4>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {currentAgency.services.map((service, index) => (
                          <div key={index} className="bg-white/10 px-2 py-1 rounded text-xs">
                            ✓ {service}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-green-100">
                        <strong>Test Centers:</strong> {currentAgency.locations.join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      onClick={() => openGovtWebsite(currentAgency)}
                      className="flex-1 bg-white text-green-600 py-3 px-6 rounded-lg font-bold hover:bg-green-50 transition-colors flex items-center justify-center"
                    >
                      <GlobeAltIcon className="h-5 w-5 mr-2" />
                      Visit Official Website
                    </button>
                    <button
                      onClick={() => callGovtHelpline(currentAgency.phone)}
                      className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-green-400 transition-colors flex items-center justify-center"
                    >
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      Call Helpline
                    </button>
                  </div>

                  {/* Required Documents */}
                  <div className="mt-4 p-3 bg-white/10 rounded-lg">
                    <div className="text-sm">
                      <strong>Required Documents:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {currentAgency.documents.map((doc, index) => (
                          <span key={index} className="bg-white/20 px-2 py-1 rounded text-xs">
                            📄 {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Manual Soil Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <BeakerIcon className="h-5 w-5 mr-2 text-emerald-600" />
                Manual Soil Analysis
              </h2>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                OPTIONAL
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location/District</label>
                  <input
                    type="text"
                    value={soilData.location}
                    onChange={(e) => setSoilData({...soilData, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                    placeholder="Enter your location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">pH Level</label>
                  <input
                    type="number"
                    step="0.1"
                    value={soilData.ph}
                    onChange={(e) => setSoilData({...soilData, ph: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                    placeholder="6.5"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <SparklesIcon className="h-4 w-4 mr-2 text-emerald-600" />
                  NPK Values (kg/ha)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nitrogen (N)</label>
                    <input
                      type="number"
                      value={soilData.nitrogen}
                      onChange={(e) => setSoilData({...soilData, nitrogen: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm transition-colors"
                      placeholder="250"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Phosphorus (P)</label>
                    <input
                      type="number"
                      value={soilData.phosphorus}
                      onChange={(e) => setSoilData({...soilData, phosphorus: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm transition-colors"
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Potassium (K)</label>
                    <input
                      type="number"
                      value={soilData.potassium}
                      onChange={(e) => setSoilData({...soilData, potassium: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm transition-colors"
                      placeholder="200"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Organic Matter (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={soilData.organicMatter}
                  onChange={(e) => setSoilData({...soilData, organicMatter: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                  placeholder="2.5"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={analyzesoil}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Analyzing Soil...
                  </>
                ) : (
                  <>
                    <ChartBarIcon className="h-5 w-5 mr-2" />
                    Analyze Soil Health
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20"
          >
            {analysis ? (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <ChartBarIcon className="h-5 w-5 mr-2 text-emerald-600" />
                  Analysis Results
                </h2>
                
                {/* Health Score */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{analysis.healthScore}%</div>
                  <div className="font-semibold text-gray-900">{analysis.status}</div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${analysis.healthScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full" 
                    ></motion.div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="h-4 w-4 mr-2 text-amber-500" />
                    Fertilizer Recommendations
                  </h3>
                  <div className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                      >
                        <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-yellow-800">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cost Analysis */}
                {analysis.costs.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                      <CurrencyRupeeIcon className="h-4 w-4 mr-2 text-emerald-600" />
                      Cost Analysis
                    </h3>
                    <div className="space-y-2 mb-4">
                      {analysis.costs.map((cost, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm font-medium">{cost.fertilizer} ({cost.quantity} kg)</span>
                          <span className="font-bold text-gray-900">₹{cost.cost}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900">Total Estimated Cost</span>
                      <span className="font-bold text-2xl text-emerald-900">₹{analysis.totalCost}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <BeakerIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Ready for Analysis</p>
                <p className="text-sm">Enter your soil test values to get detailed fertilizer recommendations</p>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <InformationCircleIcon className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-blue-800">
                    <strong>Pro Tip:</strong> For most accurate results, use government certified soil test reports
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Additional Information Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Mobile Soil Testing */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center mb-3">
              <TruckIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-bold text-blue-900">Mobile Soil Labs</h3>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Government mobile labs visit villages for on-spot soil testing services.
            </p>
            <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block">
              📅 Schedule: Monthly visits
            </div>
          </div>

          {/* Soil Health Cards */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center mb-3">
              <SparklesIcon className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="font-bold text-green-900">Soil Health Cards</h3>
            </div>
            <p className="text-sm text-green-800 mb-3">
              Get digital soil health cards with crop-specific recommendations.
            </p>
            <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block">
              🏆 95% farmer satisfaction
            </div>
          </div>

          {/* Expert Consultation */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-3">
              <CheckCircleIcon className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="font-bold text-purple-900">Expert Support</h3>
            </div>
            <p className="text-sm text-purple-800 mb-3">
              Agricultural scientists provide personalized fertilizer guidance.
            </p>
            <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full inline-block">
              📞 Helpline: 1800-180-1551
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SoilHealthAnalysis;
