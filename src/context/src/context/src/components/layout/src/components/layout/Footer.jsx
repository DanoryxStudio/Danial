import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', path: '/catalog' },
      { name: 'Crochet Bouquet', path: '/catalog?category=bouquet' },
      { name: 'Keychain', path: '/catalog?category=keychain' },
      { name: 'Custom Orders', path: '/catalog?category=custom' },
      { name: 'Gift Box', path: '/catalog?category=giftbox' },
    ],
    company: [
      { name: 'About Us', path: '/#about' },
      { name: 'Join Dropship', path: '/signup?type=dropship' },
      { name: 'Become Agent', path: '/signup?type=agent' },
      { name: 'We\'re Hiring', path: '/hiring' },
      { name: 'FAQ', path: '/#faq' },
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns & Refunds', path: '/returns' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '[instagram.com](https://instagram.com/danoxyrstudio)', label: 'Instagram' },
    { icon: MessageCircle, href: '[wa.me](https://wa.me/601170720910)', label: 'WhatsApp' },
    { icon: Mail, href: 'mailto:hello@danoxyrstudio.com', label: 'Email' },
  ];

  return (
    <footer className="bg-danoryx-dark-brown text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-display font-bold text-white">
                Danoryx
              </span>
              <span className="text-3xl font-display font-light text-danoryx-light-brown ml-1">
                Studio
              </span>
            </Link>
            <p className="text-danoryx-beige/80 mb-6 max-w-sm">
              Handcrafted with love, delivering beautiful crochet creations 
              that bring warmth and joy to every home.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-danoryx-brown transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-danoryx-beige/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-danoryx-beige/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-danoryx-light-brown mt-0.5" />
                <span className="text-danoryx-beige/70">+60 11-7072 0910</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-danoryx-light-brown mt-0.5" />
                <span className="text-danoryx-beige/70">hello@danoxyrstudio.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-danoryx-light-brown mt-0.5" />
                <span className="text-danoryx-beige/70">Kuala Lumpur, Malaysia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-danoryx-beige/60 text-sm">
              © {currentYear} Danoryx Studio. All rights reserved.
            </p>
            <p className="text-danoryx-beige/60 text-sm flex items-center">
              Made with <Heart size={14} className="mx-1 text-danoryx-brown" fill="currentColor" /> in Malaysia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
