import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '601170720910';

  const quickMessages = [
    { text: '👋 Hi, saya nak tanya tentang produk', label: 'Product Inquiry' },
    { text: '📦 Saya nak track order saya', label: 'Track Order' },
    { text: '💼 Saya berminat nak jadi dropship/agent', label: 'Join Program' },
    { text: '🎨 Saya nak custom order', label: 'Custom Order' },
  ];

  const handleQuickMessage = (message) => {
    const url = `[wa.me](https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)})`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 z-50 w-80 bg-white rounded-2xl shadow-premium overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <MessageCircle size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Danoryx Studio</p>
                    <p className="text-xs text-white/80">Usually replies within minutes</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-4 bg-[#ECE5DD]">
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                <p className="text-sm text-gray-700">
                  Hi! 👋 Welcome to Danoryx Studio. How can we help you today?
                </p>
                <p className="text-xs text-gray-400 mt-1 text-right">Just now</p>
              </div>
            </div>

            {/* Quick Messages */}
            <div className="p-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3">Quick messages:</p>
              <div className="space-y-2">
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(msg.text)}
                    className="w-full text-left p-3 rounded-xl bg-danoryx-cream hover:bg-danoryx-beige transition-colors text-sm text-danoryx-dark-brown"
                  >
                    {msg.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
        
        {/* Pulse Animation */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        )}
      </motion.button>
    </>
  );
};

export default FloatingWhatsApp;
