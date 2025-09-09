import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  UserGroupIcon as HandshakeIcon,  // Fix for HandshakeIcon
  ShoppingCartIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getMarketPrices, getPriceTrends, getOptimalSellingTime } from '../services/agmarknet';
import { useAuth } from '../context/AppContext';

const MarketIntelligence = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedState, setSelectedState] = useState(user?.location || 'Delhi');
  const [marketData, setMarketData] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [sellingRecommendation, setSellingRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [showB2BModal, setShowB2BModal] = useState(false);

  // Popular crops for quick access
  const popularCrops = [
    { name: 'Wheat', value: 'wheat', icon: '🌾', season: 'Rabi' },
    { name: 'Rice', value: 'rice', icon: '🌾', season: 'Kharif' },
    { name: 'Onion', value: 'onion', icon: '🧅', season: 'Rabi' },
    { name: 'Tomato', value: 'tomato', icon: '🍅', season: 'Year Round' },
    { name: 'Potato', value: 'potato', icon: '🥔', season: 'Rabi' },
    { name: 'Cotton', value: 'cotton', icon: '🌿', season: 'Kharif' }
  ];

  // Enhanced B2B marketplace data with more features
  const b2bOffers = [
    {
      id: 1,
      type: 'buy',
      title: 'Premium Wheat Seeds',
      company: 'AgriTech Solutions Pvt Ltd',
      price: '₹45/kg',
      quantity: '500+ tons available',
      rating: 4.8,
      verified: true,
      location: 'Punjab',
      contact: '+91-98765-43210',
      description: 'High-yield certified wheat seeds with 95% germination rate',
      minOrder: '1 ton',
      delivery: 'Free delivery above 5 tons'
    },
    {
      id: 2,
      type: 'sell',
      title: 'Fresh Organic Tomatoes',
      company: 'Green Valley Farms',
      price: '₹25/kg',
      quantity: '200 tons needed weekly',
      rating: 4.9,
      verified: true,
      location: 'Maharashtra',
      contact: '+91-87654-32109',
      description: 'Looking for grade-A fresh tomatoes for retail chains',
      minOrder: '5 tons',
      delivery: 'Pickup from farm gate'
    },
    {
      id: 3,
      type: 'service',
      title: 'Cold Chain Transportation',
      company: 'FarmLogistics Pro',
      price: '₹8/km/ton',
      quantity: 'Pan-India service',
      rating: 4.7,
      verified: true,
      location: 'All India',
      contact: '+91-76543-21098',
      description: 'Temperature-controlled logistics for fresh produce',
      minOrder: '10 tons',
      delivery: 'Door-to-door service'
    },
    {
      id: 4,
      type: 'equipment',
      title: 'Tractor Rental Service',
      company: 'Rural Equipment Hub',
      price: '₹800/day',
      quantity: '50+ tractors available',
      rating: 4.6,
      verified: true,
      location: 'Haryana',
      contact: '+91-65432-10987',
      description: 'New model tractors with operator for farming operations',
      minOrder: '1 day',
      delivery: 'On-site service'
    },
    {
      id: 5,
      type: 'finance',
      title: 'Crop Loan - Easy Approval',
      company: 'AgriFinance Bank',
      price: '7.5% interest',
      quantity: 'Up to ₹5 lakhs',
      rating: 4.5,
      verified: true,
      location: 'Pan India',
      contact: '+91-54321-09876',
      description: 'Quick processing crop loans with minimal documentation',
      minOrder: '₹50,000',
      delivery: 'Digital process'
    }
  ];

  // B2B Categories
  const b2bCategories = [
    { name: 'Seeds & Inputs', icon: '🌱', count: 150, color: 'bg-green-100 text-green-700' },
    { name: 'Fresh Produce', icon: '🥬', count: 89, color: 'bg-blue-100 text-blue-700' },
    { name: 'Equipment', icon: '🚜', count: 45, color: 'bg-orange-100 text-orange-700' },
    { name: 'Transportation', icon: '🚛', count: 32, color: 'bg-purple-100 text-purple-700' },
    { name: 'Finance', icon: '💰', count: 28, color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Processing', icon: '⚙️', count: 22, color: 'bg-pink-100 text-pink-700' }
  ];

  // Search functionality with enhanced mock data
  const searchCropPrices = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setMarketData({
          minPrice: 2850,
          modalPrice: 3200,
          maxPrice: 3580,
          minPriceChange: -2.3,
          modalPriceChange: 1.8,
          maxPriceChange: 3.2,
          weeklyHigh: 3650,
          weeklyLow: 2780,
          monthlyAvg: 3150,
          volatility: 12.5,
          markets: [
            { name: 'Azadpur Mandi', price: 3200, change: 2.1, updatedAt: '2 hours ago' },
            { name: 'Ghazipur Market', price: 3150, change: -1.5, updatedAt: '3 hours ago' },
            { name: 'Okhla Market', price: 3300, change: 4.2, updatedAt: '1 hour ago' },
            { name: 'Anaj Mandi', price: 3180, change: 0.8, updatedAt: '4 hours ago' }
          ]
        });

        setPriceHistory([
          { date: '01/09', modalPrice: 3100 },
          { date: '02/09', modalPrice: 3150 },
          { date: '03/09', modalPrice: 3080 },
          { date: '04/09', modalPrice: 3200 },
          { date: '05/09', modalPrice: 3250 },
          { date: '06/09', modalPrice: 3180 },
          { date: '07/09', modalPrice: 3220 },
          { date: '08/09', modalPrice: 3280 },
          { date: '09/09', modalPrice: 3200 }
        ]);

        setSellingRecommendation({
          recommendation: 'sell',
          confidence: 78,
          reason: 'Prices are at monthly high with strong demand',
          expectedTrend: 'Slight decline expected in next 5-7 days',
          bestTime: 'Within next 2-3 days'
        });

        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Market data fetch error:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPriceChangeIcon = (change) => {
    if (change > 0) return <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />;
    if (change < 0) return <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />;
    return <span className="h-4 w-4 text-gray-600">-</span>;
  };

  const openB2BMarketplace = () => {
    window.open('https://enam.gov.in/web/', '_blank');
  };

  const getOfferTypeColor = (type) => {
    switch(type) {
      case 'buy': return 'bg-green-100 text-green-700 border-green-200';
      case 'sell': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'service': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'equipment': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'finance': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const contactSeller = (offer) => {
    const message = `Hi, I'm interested in your ${offer.title}. Price: ${offer.price}. Please share more details.`;
    window.open(`https://wa.me/${offer.contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl mr-3 shadow-lg">
              📈
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                बाज़ार भाव - Market Intelligence & B2B Hub
              </h1>
              <p className="text-sm text-gray-600">Real-time prices, B2B marketplace & selling insights</p>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Crop</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              >
                {popularCrops.map(crop => (
                  <option key={crop.value} value={crop.value}>
                    {crop.icon} {crop.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              >
                <option value="Delhi">Delhi</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={searchCropPrices}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2.5 px-6 rounded-xl font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Search Prices
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced B2B Marketplace Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
              <div className="flex items-center mb-4 lg:mb-0">
                <BuildingStorefrontIcon className="h-10 w-10 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1">🛒 B2B Marketplace for Farmers</h2>
                  <p className="text-indigo-100 text-sm">Connect with 10,000+ verified suppliers, buyers & service providers</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowB2BModal(true)}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors flex items-center shadow-lg"
                >
                  <HandshakeIcon className="h-5 w-5 mr-2" />
                  Browse Deals
                </button>
                <button
                  onClick={openB2BMarketplace}
                  className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-400 transition-colors flex items-center"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Sell Your Crop
                </button>
              </div>
            </div>

            {/* B2B Categories Quick Access */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {b2bCategories.map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all cursor-pointer"
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-xs font-semibold">{category.name}</div>
                  <div className="text-xs opacity-80">{category.count} deals</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {marketData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Current Prices and Charts */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Price Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-green-700">Minimum Price</span>
                    {getPriceChangeIcon(marketData.minPriceChange)}
                  </div>
                  <div className="text-2xl font-bold text-green-800">
                    {formatCurrency(marketData.minPrice)}/quintal
                  </div>
                  <div className="text-xs text-green-600">
                    {marketData.minPriceChange > 0 ? '+' : ''}{marketData.minPriceChange}% from yesterday
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-700">Modal Price</span>
                    {getPriceChangeIcon(marketData.modalPriceChange)}
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    {formatCurrency(marketData.modalPrice)}/quintal
                  </div>
                  <div className="text-xs text-blue-600">
                    {marketData.modalPriceChange > 0 ? '+' : ''}{marketData.modalPriceChange}% from yesterday
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-orange-700">Maximum Price</span>
                    {getPriceChangeIcon(marketData.maxPriceChange)}
                  </div>
                  <div className="text-2xl font-bold text-orange-800">
                    {formatCurrency(marketData.maxPrice)}/quintal
                  </div>
                  <div className="text-xs text-orange-600">
                    {marketData.maxPriceChange > 0 ? '+' : ''}{marketData.maxPriceChange}% from yesterday
                  </div>
                </div>
              </motion.div>

              {/* Price Trend Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <ChartBarIcon className="h-5 w-5 mr-2 text-emerald-600" />
                  30-Day Price Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Price']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line type="monotone" dataKey="modalPrice" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Market Centers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2 text-emerald-600" />
                  Top Markets in {selectedState}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-xs font-semibold text-gray-600 uppercase">
                        <th className="text-left pb-2">Market</th>
                        <th className="text-left pb-2">Price</th>
                        <th className="text-left pb-2">Change</th>
                        <th className="text-left pb-2">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {marketData.markets?.map((market, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="py-2 font-medium text-gray-900">{market.name}</td>
                          <td className="py-2 font-bold text-emerald-600">{formatCurrency(market.price)}</td>
                          <td className="py-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              market.change > 0 ? 'bg-green-100 text-green-700' : 
                              market.change < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {market.change > 0 ? '+' : ''}{market.change}%
                            </span>
                          </td>
                          <td className="py-2 text-gray-500 text-xs">{market.updatedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-4">
              
              {/* Selling Recommendation */}
              {sellingRecommendation && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200"
                >
                  <h3 className="font-bold text-yellow-900 mb-3 flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    Selling Recommendation
                  </h3>
                  
                  <div className={`text-center p-3 rounded-xl mb-3 ${
                    sellingRecommendation.recommendation === 'sell' 
                      ? 'bg-green-100 border border-green-300' 
                      : sellingRecommendation.recommendation === 'hold'
                      ? 'bg-yellow-100 border border-yellow-300'
                      : 'bg-red-100 border border-red-300'
                  }`}>
                    <div className="text-2xl mb-1">
                      {sellingRecommendation.recommendation === 'sell' ? '✅' : 
                       sellingRecommendation.recommendation === 'hold' ? '⏳' : '⏸️'}
                    </div>
                    <div className="font-bold text-sm">
                      {sellingRecommendation.recommendation === 'sell' ? 'SELL NOW' : 
                       sellingRecommendation.recommendation === 'hold' ? 'HOLD' : 'WAIT'}
                    </div>
                    <div className="text-xs opacity-80">
                      {sellingRecommendation.confidence}% confidence
                    </div>
                  </div>

                  <div className="text-xs text-yellow-800 space-y-1">
                    <p><strong>Reason:</strong> {sellingRecommendation.reason}</p>
                    <p><strong>Expected trend:</strong> {sellingRecommendation.expectedTrend}</p>
                    <p><strong>Best time:</strong> {sellingRecommendation.bestTime}</p>
                  </div>
                </motion.div>
              )}

              {/* Enhanced B2B Marketplace Live Offers */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-purple-900 flex items-center">
                    <HandshakeIcon className="h-4 w-4 mr-2" />
                    Live B2B Deals
                  </h3>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                    <span className="text-xs text-purple-700">368 active</span>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {b2bOffers.slice(0,3).map(offer => (
                    <div key={offer.id} className="bg-white/80 rounded-lg p-3 border border-purple-100 hover:bg-white transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-sm text-purple-900">{offer.title}</div>
                        {offer.verified && <CheckBadgeIcon className="h-4 w-4 text-green-600" />}
                      </div>
                      <div className="text-xs text-purple-700 mb-1">{offer.company}</div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-purple-800">{offer.price}</div>
                        <div className="flex items-center text-xs text-purple-600">
                          <StarIcon className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {offer.rating}
                        </div>
                      </div>
                      <div className="text-xs text-purple-600 mb-2">{offer.quantity}</div>
                      <button
                        onClick={() => contactSeller(offer)}
                        className="w-full bg-purple-600 text-white py-1 px-3 rounded text-xs font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Contact Now
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowB2BModal(true)}
                  className="w-full mt-3 bg-purple-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-purple-700 transition-colors text-sm"
                >
                  View All {b2bOffers.length}+ Deals →
                </button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/20"
              >
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Quick Stats</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekly High:</span>
                    <span className="font-bold text-green-600">{formatCurrency(marketData.weeklyHigh)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekly Low:</span>
                    <span className="font-bold text-red-600">{formatCurrency(marketData.weeklyLow)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Avg:</span>
                    <span className="font-bold text-blue-600">{formatCurrency(marketData.monthlyAvg)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volatility:</span>
                    <span className={`font-bold ${
                      marketData.volatility > 15 ? 'text-red-600' : 
                      marketData.volatility > 8 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {marketData.volatility}%
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Market Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200"
              >
                <h3 className="font-bold text-emerald-900 mb-3 text-sm">💡 Smart Tips</h3>
                <div className="space-y-2 text-xs text-emerald-800">
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Use B2B platform for better rates (+15-25%)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Compare 3+ buyers before selling</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Check transportation & packaging costs</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Verified sellers have 98% success rate</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Popular Crops Quick Access */}
        {!marketData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 text-center"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Crops</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCrops.map((crop) => (
                <motion.button
                  key={crop.value}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCrop(crop.value);
                    searchCropPrices();
                  }}
                  className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-emerald-200 hover:from-emerald-50 hover:to-green-50 transition-all duration-200"
                >
                  <div className="text-2xl mb-2">{crop.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm">{crop.name}</div>
                  <div className="text-xs text-gray-500">{crop.season}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* B2B Modal */}
        <AnimatePresence>
          {showB2BModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowB2BModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">B2B Marketplace - All Deals</h3>
                  <button
                    onClick={() => setShowB2BModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {b2bOffers.map(offer => (
                    <div key={offer.id} className={`border-2 rounded-xl p-4 ${getOfferTypeColor(offer.type)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/50">
                          {offer.type.toUpperCase()}
                        </span>
                        {offer.verified && <CheckBadgeIcon className="h-5 w-5 text-green-600" />}
                      </div>
                      
                      <h4 className="font-bold text-lg mb-1">{offer.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{offer.company}</p>
                      <p className="text-xs mb-2">{offer.description}</p>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg">{offer.price}</span>
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{offer.rating}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600 space-y-1 mb-3">
                        <p>📍 {offer.location}</p>
                        <p>📦 {offer.quantity}</p>
                        <p>📋 Min: {offer.minOrder}</p>
                        <p>🚚 {offer.delivery}</p>
                      </div>
                      
                      <button
                        onClick={() => contactSeller(offer)}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                      >
                        <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                        Contact Seller
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={openB2BMarketplace}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all"
                  >
                    Visit Full Marketplace →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarketIntelligence;
