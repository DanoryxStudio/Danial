import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  ShoppingBag,
  Truck,
  ArrowRight,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cartItems, cartTotal, calculateShipping, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: '',
    postcode: '',
    state: '',
    agentId: user?.userId || '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const states = [
    'Selangor', 'Kuala Lumpur', 'Putrajaya', 'Perak', 'Penang', 
    'Kedah', 'Perlis', 'Kelantan', 'Terengganu', 'Pahang', 
    'Negeri Sembilan', 'Melaka', 'Johor', 'Sabah', 'Sarawak', 'Labuan'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const shippingFee = formData.state ? calculateShipping(formData.postcode, formData.state) : 0;
  const totalAmount = cartTotal + shippingFee;

  const generateWhatsAppMessage = () => {
    const orderItems = cartItems.map(item => 
      `• ${item.name} x ${item.quantity} = RM${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `Hello Danoryx Studio, saya ingin membuat order.

*Maklumat Pelanggan:*
Nama: ${formData.fullName}
No Phone: ${formData.phone}
Alamat: ${formData.address}
Poskod: ${formData.postcode}
Negeri: ${formData.state}
ID Agent/Dropship: ${formData.agentId || 'Tiada'}

*Order:*
${orderItems}

*Summary:*
Subtotal: RM${cartTotal.toFixed(2)}
Shipping: RM${shippingFee.toFixed(2)}
*Total: RM${totalAmount.toFixed(2)}*

${formData.notes ? `Notes: ${formData.notes}` : ''}

Terima kasih! 🙏`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.postcode || !formData.state) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);

    // Generate WhatsApp URL
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `[wa.me](https://wa.me/601170720910?text=${whatsappMessage})`;

    // Clear cart
    clearCart();
    setOrderComplete(true);

    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);

    setLoading(false);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-danoryx-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4 card-premium text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-danoryx-dark-brown mb-3">
            Order Submitted!
          </h2>
          <p className="text-danoryx-dark-brown/60 mb-6">
            You'll be redirected to WhatsApp to confirm your order. 
            Our team will process it shortly.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-danoryx-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-display font-bold text-danoryx-dark-brown mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium"
              >
                <h2 className="text-lg font-semibold text-danoryx-dark-brown mb-6 flex items-center space-x-2">
                  <User size={20} className="text-danoryx-brown" />
                  <span>Contact Information</span>
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                      Phone Number *
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
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-premium"
              >
                <h2 className="text-lg font-semibold text-danoryx-dark-brown mb-6 flex items-center space-x-2">
                  <MapPin size={20} className="text-danoryx-brown" />
                  <span>Shipping Address</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, unit, apartment, etc."
                      rows={3}
                      className="input-field resize-none"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        placeholder="e.g. 47500"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="input-field"
                        required
                      >
                        <option value="">Select state</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-premium"
              >
                <h2 className="text-lg font-semibold text-danoryx-dark-brown mb-6 flex items-center space-x-2">
                  <FileText size={20} className="text-danoryx-brown" />
                  <span>Additional Information</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                      Dropship/Agent ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="agentId"
                      value={formData.agentId}
                      onChange={handleChange}
                      placeholder="e.g. DS-1234567 or AG-1234567"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-danoryx-dark-brown mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special requests or notes for your order"
                      rows={3}
                      className="input-field resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-premium sticky top-24"
            >
              <h2 className="text-lg font-semibold text-danoryx-dark-brown mb-6 flex items-center space-x-2">
                <ShoppingBag size={20} className="text-danoryx-brown" />
                <span>Order Summary</span>
              </h2>

              {/* Products List */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-danoryx-dark-brown text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-danoryx-brown text-sm">
                        RM{item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-danoryx-dark-brown">
                      RM{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-danoryx-beige pt-4 space-y-3">
                <div className="flex justify-between text-danoryx-dark-brown/70">
                  <span>Subtotal</span>
                  <span>RM{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-danoryx-dark-brown/70">
                  <span className="flex items-center space-x-1">
                    <Truck size={16} />
                    <span>Shipping</span>
                  </span>
                  <span>
                    {formData.state ? (
                      shippingFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `RM${shippingFee.toFixed(2)}`
                      )
                    ) : (
                      <span className="text-danoryx-dark-brown/50">Select state</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-danoryx-dark-brown pt-3 border-t border-danoryx-beige">
                  <span>Total</span>
                  <span>RM{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Info */}
              {shippingFee === 0 && formData.state && (
                <div className="mt-4 p-3 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-700">
                    🎉 You qualify for free shipping!
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading || cartItems.length === 0}
                className="w-full btn-primary mt-6 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Order via WhatsApp</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              <p className="text-xs text-center text-danoryx-dark-brown/50 mt-4">
                You'll be redirected to WhatsApp to confirm your order
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
