import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, PhoneIcon,
  MapPinIcon, LockClosedIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AppContext';
import { login, signup } from '../services/auth';

const states = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana',
  'Uttar Pradesh','West Bengal'
];

const crops = [
  'Wheat','Rice','Cotton','Sugarcane','Maize','Bajra','Jowar',
  'Barley','Gram','Arhar','Moong','Urad','Mustard','Groundnut',
  'Sesame','Sunflower','Soybean','Potato','Onion','Tomato'
];

// Move Field component OUTSIDE of Auth component to prevent recreation
const InputField = ({ icon: Icon, error, ...rest }) => (
  <div>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />}
      <input
        {...rest}
        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border
                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                    ${error ? 'border-red-400' : 'border-gray-300'}
                    placeholder:text-sm bg-white/80 backdrop-blur-sm transition-colors`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const Auth = () => {
  const { setUser } = useAuth();
  const [mode, setMode] = useState('login');
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    farmSize: '',
    primaryCrops: []
  });

  // Use useCallback to prevent function recreation on each render
  const onChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setForm(prevForm => ({
        ...prevForm,
        primaryCrops: checked
          ? [...prevForm.primaryCrops, value]
          : prevForm.primaryCrops.filter(c => c !== value)
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  }, [errors]);

  // Validation function
  const validate = useCallback(() => {
    const newErrors = {};
    
    if (mode === 'signup') {
      if (!form.name.trim()) newErrors.name = 'Name required';
      if (!form.phone.trim()) {
        newErrors.phone = 'Phone required';
      } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
        newErrors.phone = 'Invalid phone number';
      }
      if (!form.location) newErrors.location = 'State required';
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!form.password) {
      newErrors.password = 'Password required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [mode, form]);

  // Submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setBusy(true);
    try {
      const response = mode === 'login'
        ? await login({ 
            email: form.email, 
            password: form.password 
          })
        : await signup({
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            location: form.location,
            farmSize: form.farmSize,
            primaryCrops: form.primaryCrops
          });

      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.message || 'Authentication failed. Please try again.' 
      });
    } finally {
      setBusy(false);
    }
  }, [mode, form, validate, setUser]);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPwd(prev => !prev);
  }, []);

  // Toggle mode
  const toggleMode = useCallback((newMode) => {
    setMode(newMode);
    setErrors({}); // Clear errors when switching modes
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-3 py-6">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 h-14 w-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl shadow-lg">
            🌾
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Welcome Back!' : 'Join Krishi Sahayak'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {mode === 'login'
              ? 'Sign in to your farming dashboard'
              : 'Create your account to get started'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6 text-sm">
          <button
            type="button"
            onClick={() => toggleMode('login')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white shadow text-emerald-600 font-semibold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => toggleMode('signup')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white shadow text-emerald-600 font-semibold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm" noValidate>
          {/* Signup Fields */}
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                key="signup-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Name Field */}
                <InputField
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={onChange}
                  icon={UserIcon}
                  error={errors.name}
                  autoComplete="name"
                  required
                />

                {/* Phone Field */}
                <InputField
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={onChange}
                  icon={PhoneIcon}
                  error={errors.phone}
                  autoComplete="tel"
                  required
                />

                {/* State Selection */}
                <div>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <select
                      name="location"
                      value={form.location}
                      onChange={onChange}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.location ? 'border-red-400' : 'border-gray-300'
                      } bg-white/80 backdrop-blur-sm transition-colors`}
                      required
                    >
                      <option value="">Select your state</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
                </div>

                {/* Farm Size */}
                <select
                  name="farmSize"
                  value={form.farmSize}
                  onChange={onChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 transition-colors"
                >
                  <option value="">Farm size (optional)</option>
                  <option value="small">Small (0-2 acres)</option>
                  <option value="medium">Medium (2-10 acres)</option>
                  <option value="large">Large (10+ acres)</option>
                </select>

                {/* Primary Crops */}
                <details className="rounded-xl bg-gray-50 p-3 border border-gray-200">
                  <summary className="cursor-pointer font-medium text-gray-700 select-none">
                    Primary crops (optional)
                  </summary>
                  <div className="grid grid-cols-2 gap-2 mt-3 max-h-32 overflow-y-auto">
                    {crops.map(crop => (
                      <label key={crop} className="flex items-center text-xs cursor-pointer hover:bg-gray-100 p-1 rounded">
                        <input
                          type="checkbox"
                          value={crop}
                          checked={form.primaryCrops.includes(crop)}
                          onChange={onChange}
                          className="h-4 w-4 text-emerald-600 mr-2 rounded border-gray-300 focus:ring-emerald-500"
                        />
                        <span>{crop}</span>
                      </label>
                    ))}
                  </div>
                </details>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Field */}
          <InputField
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={onChange}
            icon={EnvelopeIcon}
            error={errors.email}
            autoComplete="email"
            required
          />

          {/* Password Field */}
          <div>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type={showPwd ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className={`w-full pl-9 pr-11 py-2.5 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.password ? 'border-red-400' : 'border-gray-300'
                } bg-white/80 backdrop-blur-sm transition-colors`}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPwd ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password (Signup Only) */}
          <AnimatePresence>
            {mode === 'signup' && (
              <motion.div
                key="confirm-password"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <InputField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={onChange}
                  icon={LockClosedIcon}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Error */}
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700"
            >
              {errors.submit}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={busy}
            whileHover={{ scale: busy ? 1 : 1.02 }}
            whileTap={{ scale: busy ? 1 : 0.98 }}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg transition-all duration-200 ${
              busy ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {busy && (
              <div className="animate-spin h-4 w-4 rounded-full border-2 border-white border-t-transparent"></div>
            )}
            {busy
              ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
              : (mode === 'login' ? 'Sign In' : 'Create Account')
            }
          </motion.button>

          {/* Mode Switch Link */}
          <div className="text-center">
            <span className="text-xs text-gray-600">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => toggleMode(mode === 'login' ? 'signup' : 'login')}
                className="font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                {mode === 'login' ? 'Create one' : 'Sign in'}
              </button>
            </span>
          </div>
        </form>
      </motion.section>
    </div>
  );
};

export default Auth;
