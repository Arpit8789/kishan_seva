// src/components/FeedbackSystem.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  StarIcon,
  HeartIcon,
  XMarkIcon,
  CheckCircleIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const FeedbackSystem = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [feedback, setFeedback] = useState({
    rating: 0,
    category: '',
    message: '',
    name: '',
    phone: '',
    email: '',
    feature: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'राम सिंह',
      location: 'Punjab',
      rating: 5,
      message: 'Krishi Sahayak helped me increase my wheat yield by 30%. The AI recommendations are very accurate!',
      feature: 'AI Assistant'
    },
    {
      id: 2,
      name: 'सुनीता देवी',
      location: 'Haryana',
      rating: 5,
      message: 'Disease detection feature saved my tomato crop. Detected blight disease early and provided treatment.',
      feature: 'Disease Detection'
    },
    {
      id: 3,
      name: 'मोहन गुप्ता',
      location: 'UP',
      rating: 4,
      message: 'Market price feature helps me sell at the right time. Earned 15% more profit this season.',
      feature: 'Market Prices'
    }
  ]);

  const categories = [
    { id: 'suggestion', label: 'सुझाव - Suggestion', icon: '💡' },
    { id: 'bug', label: 'समस्या - Bug Report', icon: '🐛' },
    { id: 'praise', label: 'प्रशंसा - Praise', icon: '👏' },
    { id: 'feature', label: 'नई सुविधा - Feature Request', icon: '⭐' }
  ];

  const features = [
    'AI Assistant', 'Disease Detection', 'Market Prices', 'Crop Guide', 
    'Weather Alerts', 'Cost Calculator', 'Soil Analysis', 'IoT Dashboard'
  ];

  const handleRatingClick = (rating) => {
    setFeedback({ ...feedback, rating });
  };

  const handleSubmit = () => {
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setShowFeedbackForm(false);
        setSubmitted(false);
        setCurrentStep(1);
        setFeedback({
          rating: 0,
          category: '',
          message: '',
          name: '',
          phone: '',
          email: '',
          feature: ''
        });
      }, 2000);
    }, 1000);
  };

  const FloatingFeedbackButton = () => (
    <motion.button
      onClick={() => setShowFeedbackForm(true)}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <ChatBubbleLeftRightIcon className="h-6 w-6" />
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            💬
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-2">
            प्रतिक्रिया - Farmer Feedback
          </h1>
          <p className="text-gray-600">Help us improve Krishi Sahayak with your valuable feedback</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <HeartIcon className="h-5 w-5 mr-2 text-red-600" />
              Farmer Success Stories
            </h2>
            
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <div className="font-bold text-green-900">{testimonial.name}</div>
                        <div className="text-sm text-green-700">{testimonial.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-green-800 mb-2">"{testimonial.message}"</p>
                  <div className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded inline-block">
                    Used: {testimonial.feature}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">4.8/5</div>
              <div className="text-sm text-blue-800">Average Rating</div>
              <div className="text-xs text-blue-600 mt-1">Based on 1,247 farmer reviews</div>
            </div>
          </motion.div>

          {/* Quick Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-emerald-600" />
              Quick Feedback
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">How helpful is Krishi Sahayak?</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className="p-2 hover:scale-110 transition-transform"
                    >
                      <StarIcon 
                        className={`h-8 w-8 ${star <= feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Which feature helped you most?</p>
                <div className="grid grid-cols-2 gap-2">
                  {features.slice(0, 6).map((feature) => (
                    <button
                      key={feature}
                      onClick={() => setFeedback({...feedback, feature})}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        feedback.feature === feature 
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-800' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Share your experience (Optional)
                </label>
                <textarea
                  value={feedback.message}
                  onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                  rows="3"
                  placeholder="Tell us how Krishi Sahayak helped you..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-200"
              >
                Submit Feedback
              </motion.button>

              <div className="text-center">
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  Need detailed feedback form? Click here
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Feedback Button */}
      <FloatingFeedbackButton />

      {/* Detailed Feedback Modal */}
      <AnimatePresence>
        {showFeedbackForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Detailed Feedback</h3>
                    <button
                      onClick={() => setShowFeedbackForm(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Step 1: Rating & Category */}
                    <div>
                      <p className="font-semibold mb-2">Rate your experience</p>
                      <div className="flex space-x-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRatingClick(star)}
                          >
                            <StarIcon 
                              className={`h-6 w-6 ${star <= feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Feedback Category</p>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <label key={cat.id} className="flex items-center">
                            <input
                              type="radio"
                              name="category"
                              value={cat.id}
                              checked={feedback.category === cat.id}
                              onChange={(e) => setFeedback({...feedback, category: e.target.value})}
                              className="mr-3"
                            />
                            <span className="mr-2">{cat.icon}</span>
                            <span className="text-sm">{cat.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Your Message</label>
                      <textarea
                        value={feedback.message}
                        onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        rows="4"
                        placeholder="Share your detailed feedback..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="text"
                        value={feedback.name}
                        onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="Your Name (Optional)"
                      />
                      <input
                        type="tel"
                        value={feedback.phone}
                        onChange={(e) => setFeedback({...feedback, phone: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="Phone Number (Optional)"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-200"
                    >
                      Submit Detailed Feedback
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackSystem;
