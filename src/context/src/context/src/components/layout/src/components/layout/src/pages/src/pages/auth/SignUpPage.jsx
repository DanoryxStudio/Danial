import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  Users,
  Award,
  ArrowRight,
  Check,
  Copy,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'dropship';
  
  const [userType, setUserType] = useState(initialType);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedId, setGeneratedId] = useState(null);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setUserType(searchParams.get('type') || 'dropship');
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateUserId = (type) => {
    const prefix = type === 'agent' ? 'AG' : 'DS';
    const randomNum = Math.floor(1000000 + Math.random() * 9000000);
    return `${prefix}-${randomNum}`;
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.username || !formData.email) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setLoading(true);
    
    const userId = generateUserId(userType);
    
    const result = await signup({
      ...formData,
      role: userType,
      userId,
    });

    setLoading(false);

    if (result.success) {
      setGeneratedId(userId);
      
      if (userType === 'agent') {
        setShowPaymentInfo(true);
      } else {
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-danoryx-cream via-white to-danoryx-beige/30">
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-danoryx-dark-brown">
            Join Danoryx Studio
          </h1>
          <p className="text-danoryx-dark-brown/60 mt-2">
            Create your account and start your journey
          </p>
        </motion.div>

        {/* User Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          <button
            onClick={() => setUserType('dropship')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 ${
              userType === 'dropship'
                ? 'border-danoryx-brown bg-danoryx-brown/5'
                : 'border-danoryx-beige bg-white hover:border-danoryx-light-brown'
            }`}
          >
            <Users size={24} className={`mx-auto mb-2 ${userType === 'dropship' ? 'text-danoryx-brown' : 'text-danoryx-dark-brown/50'}`} />
            <p className={`font-medium ${userType === 'dropship' ? 'text-danoryx-brown' : 'text-danoryx-dark-brown/70'}`}>
              Dropship
            </p>
            <p className="text-xs text-green-600 font-medium mt-1">FREE</p>
          </button>

          <button
            onClick={() => setUserType('agent')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 ${
              userType === 'agent'
                ? 'border-danoryx-brown bg-danoryx-brown/5'
                : 'border-danoryx-beige bg-white hover:border-danoryx-light-brown'
            }`}
          >
            <Award size={24} className={`mx-auto mb-2 ${userType === 'agent' ? 'text-danoryx-brown' : 'text-danoryx-dark-brown/50'}`} />
            <p className={`font-medium ${userType === 'agent' ? 'text-danoryx-brown' : 'text-danoryx-dark-brown/70'}`}>
              Agent
            </p>
            <p className="text-xs text-danoryx-brown font-medium mt-1">RM10</p>
          </button>
        </motion.div>

        {/* Success State with Generated ID */}
        <AnimatePresence mode="wait">
          {generatedId && !showPaymentInfo ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-premium text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-danoryx-dark-brown mb-2">
                Registration Successful!
              </h2>
              <p className="text-danoryx-dark-brown/60 mb-6">
                Welcome to Danoryx Studio. Your unique ID is:
              </p>
              <div className="bg-danoryx-cream rounded-xl p-4 flex items-center justify-between">
                <span className="text-2xl font-mono font-bold text-danoryx-brown">
                  {generatedId}
                </span>
                <button
                  onClick={() => copyToClipboard(generatedId)}
                  className="p-2 hover:bg-danoryx-beige rounded-lg transition-colors"
                >
                  <Copy size={20} className="text-danoryx-dark-brown" />
                </button>
              </div>
              <p className="text-sm text-danoryx-dark-brown/60 mt-4">
                Redirecting to dashboard...
              </p>
            </motion.div>
          ) : showPaymentInfo ? (
            <motion.div
              key="payment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-premium"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-danoryx-brown/10 rounded-full flex items-center justify-center">
                  <Info size={24} className="text-danoryx-brown" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-danoryx-dark-brown">
                    Complete Payment
                  </h2>
                  <p className="text-sm text-danoryx-dark-brown/60">
                    One more step to activate your account
                  </p>
                </div>
              </div>

              <div className="bg-danoryx-cream rounded-xl p-4 mb-6">
                <p className="text-sm text-danoryx-dark-brown/60 mb-2">Your Agent ID:</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-bold text-danoryx-brown">
                    {generatedId}
                  </span>
                  <button
                    onClick={() => copyToClipboard(generatedId)}
                    className="p-2 hover:bg-danoryx-beige rounded-lg transition-colors"
                  >
                    <Copy size={18} className="text-danoryx-dark-brown" />
                  </button>
                </div>
              </div>

              <div className="border border-danoryx-beige rounded-xl p-4 mb-6">
                <h3 className="font-medium text-danoryx-dark-brown mb-3">
                  Payment Instructions:
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-danoryx-brown text-white flex items-center justify-center text-xs flex-shrink-0">1</span>
                    <p className="text-danoryx-dark-brown/70">
                      Transfer RM10 to: <br />
                      <strong>Maybank: 1234 5678 9012</strong><br />
                      <strong>Name: Danoryx Studio</strong>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-danoryx-brown text-white flex items-center justify-center text-xs flex-shrink-0">2</span>
                    <p className="text-danoryx-dark-brown/70">
                      Screenshot your payment receipt
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-danoryx-brown text-white flex items-center justify-center text-xs flex-shrink-0">3</span>
                    <p className="text-danoryx-dark-brown/70">
                      WhatsApp receipt to: <strong>011-7072 0910</strong><br />
                      with your Agent ID: <strong>{generatedId}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  ⏳ Your account will be activated within 24 hours after payment verification.
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href={`[wa.me](https://wa.me/601170720910?text=Hi%20Danoryx%20Studio,%20saya%20telah%20mendaftar%20sebagai%20Agent.%0A%0AAgent%20ID:%20${generatedId}%0A%0ASaya%20telah%20membuat%20pembayaran%20RM10.%20Sila%20verify%20akaun%20saya.%20Terima%20kasih)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <span>Send Payment Proof</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </a>
              </div>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full mt-4 text-danoryx-brown text-sm hover:underline"
              >
                Go to Dashboard (Pending Verification)
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-premium"
            >
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-danoryx-brown text-white' : 'bg-danoryx-beige text-danoryx-dark-brown'
                  }`}>
                    1
                  </div>
                  <div className={`w-16 h-1 ${step >= 2 ? 'bg-danoryx-brown' : 'bg-danoryx-beige'}`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-danoryx-brown text-white' : 'bg-danoryx-beige text-danoryx-dark-brown'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-danoryx-dark-brown/40" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="input-field pl-11"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                          Username
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-danoryx-dark-brown/40">@</span>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            className="input-field pl-11"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-danoryx-dark-brown/40" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="input-field pl-11"
                            required
                          />
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        onClick={handleNextStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary flex items-center justify-center space-x-2 mt-6"
                      >
                        <span>Continue</span>
                        <ArrowRight size={18} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-danoryx-dark-brown/40" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. 0123456789"
                            className="input-field pl-11"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-danoryx-dark-brown/40" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Min. 8 characters"
                            className="input-field pl-11 pr-11"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-danoryx-dark-brown/40 hover:text-danoryx-brown"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-danoryx-dark-brown/40" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="input-field pl-11"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 btn-secondary"
                        >
                          Back
                        </button>
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 btn-primary flex items-center justify-center space-x-2"
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Create Account</span>
                              <ArrowRight size={18} />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <p className="text-center text-danoryx-dark-brown/60 text-sm mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-danoryx-brown font-medium hover:underline">
                  Login here
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignUpPage;
