import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  Star,
  Award,
  ChevronRight,
  Heart,
  Package,
  Truck,
  Shield,
  MessageCircle,
  ArrowRight,
  Crown,
  Medal,
  Trophy
} from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Components
import TestimonialSlider from '../components/home/TestimonialSlider';
import FAQAccordion from '../components/home/FAQAccordion';
import PromoBanner from '../components/common/PromoBanner';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalDropship: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [leaderboard, setLeaderboard] = useState({
    topAgents: [],
    topDropship: []
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Fetch stats and leaderboard data
    fetchStats();
    fetchLeaderboard();
  }, []);

  const fetchStats = async () => {
    // API call to get live stats
    // For demo, using mock data
    setStats({
      totalAgents: 156,
      totalDropship: 892,
      totalOrders: 15420,
      totalRevenue: 285000
    });
  };

  const fetchLeaderboard = async () => {
    // API call to get leaderboard
    // For demo, using mock data
    setLeaderboard({
      topAgents: [
        { name: 'Sarah Ahmad', userId: 'AG-9281730', sales: 45200, points: 4520 },
        { name: 'Nurul Aisyah', userId: 'AG-8372641', sales: 38900, points: 3890 },
        { name: 'Farah Zulkifli', userId: 'AG-7263451', sales: 32100, points: 3210 },
      ],
      topDropship: [
        { name: 'Amirah Hassan', userId: 'DS-4839201', sales: 12800, points: 1280 },
        { name: 'Syafiqah Razak', userId: 'DS-3928174', sales: 9500, points: 950 },
        { name: 'Hana Ismail', userId: 'DS-2817364', sales: 8200, points: 820 },
      ]
    });
  };

  const features = [
    {
      icon: Package,
      title: 'Produk Berkualiti',
      description: 'Setiap crochet dihasilkan dengan teliti menggunakan bahan premium.'
    },
    {
      icon: Truck,
      title: 'Penghantaran Pantas',
      description: 'Penghantaran ke seluruh Malaysia dalam masa 2-5 hari bekerja.'
    },
    {
      icon: Shield,
      title: 'Jaminan Kualiti',
      description: 'Produk dijamin berkualiti tinggi dengan polisi pemulangan mudah.'
    },
    {
      icon: Heart,
      title: 'Handmade with Love',
      description: 'Setiap produk dihasilkan dengan penuh kasih sayang dan dedikasi.'
    }
  ];

  const dropshipBenefits = [
    'FREE registration – tiada modal permulaan',
    'Margin keuntungan sehingga 30%',
    'Marketing materials disediakan',
    'Support group eksklusif',
    'Sistem tracking order real-time',
    'Bonus & rewards bulanan'
  ];

  const agentBenefits = [
    'Yuran sekali seumur hidup RM10 sahaja',
    'Margin keuntungan sehingga 50%',
    'Priority stock & early access',
    'Personal mentoring session',
    'Exclusive agent-only products',
    'Higher leaderboard points multiplier'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="overflow-hidden">
      <PromoBanner />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            style={{ y }}
            className="absolute top-20 right-10 w-72 h-72 bg-danoryx-beige/30 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ y }}
            className="absolute bottom-20 left-10 w-96 h-96 bg-danoryx-nude/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-danoryx-beige/50 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles size={16} className="text-danoryx-brown" />
                <span className="text-sm text-danoryx-dark-brown font-medium">
                  Handcrafted with Love
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-danoryx-dark-brown mb-6"
              >
                Welcome to{' '}
                <span className="text-danoryx-brown">Danoryx</span>{' '}
                <span className="text-danoryx-light-brown">Studio</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-danoryx-dark-brown/70 mb-4"
              >
                Crochet • Services • Dropship Opportunity
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-danoryx-dark-brown/60 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Discover beautiful handcrafted crochet creations and join our growing 
                community of dropshippers and agents. Start your journey today!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/signup?type=dropship">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
                  >
                    <Users size={18} />
                    <span>Join Dropship</span>
                  </motion.button>
                </Link>

                <Link to="/signup?type=agent">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center justify-center space-x-2 w-full sm:w-auto"
                  >
                    <Award size={18} />
                    <span>Become Agent</span>
                  </motion.button>
                </Link>

                <Link to="/catalog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-danoryx-brown font-medium flex items-center justify-center space-x-2 w-full sm:w-auto hover:text-danoryx-dark-brown transition-colors"
                  >
                    <ShoppingBag size={18} />
                    <span>Shop Now</span>
                    <ChevronRight size={18} />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-danoryx-beige"
                />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-danoryx-cream via-danoryx-beige to-danoryx-nude overflow-hidden shadow-premium">
                  <img
                    src="/images/hero-crochet.png"
                    alt="Danoryx Studio Crochet"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-soft p-4"
                >
                  <Star size={24} className="text-yellow-500" fill="currentColor" />
                  <p className="text-sm font-medium text-danoryx-dark-brown mt-1">4.9 Rating</p>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-soft p-4"
                >
                  <Heart size={24} className="text-red-400" fill="currentColor" />
                  <p className="text-sm font-medium text-danoryx-dark-brown mt-1">15k+ Orders</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-danoryx-brown/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-danoryx-brown"
            />
          </div>
        </motion.div>
      </section>

      {/* Live Stats Counter */}
      <section ref={ref} className="py-16 bg-gradient-to-r from-danoryx-brown to-danoryx-dark-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Total Agents', value: stats.totalAgents, icon: Award },
              { label: 'Total Dropship', value: stats.totalDropship, icon: Users },
              { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag },
              { label: 'Revenue (RM)', value: stats.totalRevenue, icon: TrendingUp, prefix: 'RM ' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                  <stat.icon size={24} className="text-danoryx-beige" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {inView && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      prefix={stat.prefix || ''}
                    />
                  )}
                </div>
                <p className="text-danoryx-beige/80 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-premium">
                  <img
                    src="/images/about-danoryx.jpg"
                    alt="About Danoryx Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-danoryx-cream rounded-2xl shadow-soft p-6">
                  <p className="text-4xl font-display font-bold text-danoryx-brown">3+</p>
                  <p className="text-danoryx-dark-brown/70">Years Experience</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-danoryx-brown font-medium">About Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-danoryx-dark-brown mt-2 mb-6">
                Tentang Danoryx Studio
              </h2>
              <p className="text-danoryx-dark-brown/70 mb-6">
                Danoryx Studio bermula dari passion terhadap seni crochet yang indah. 
                Kami percaya setiap jahitan membawa makna dan kasih sayang yang unik.
              </p>
              <p className="text-danoryx-dark-brown/70 mb-8">
                Dengan pengalaman lebih 3 tahun, kami telah menghasilkan ribuan produk 
                crochet yang membahagiakan pelanggan di seluruh Malaysia. Setiap produk 
                dihasilkan dengan teliti menggunakan bahan berkualiti tinggi.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-danoryx-beige/50 flex items-center justify-center flex-shrink-0">
                      <feature.icon size={20} className="text-danoryx-brown" />
                    </div>
                    <div>
                      <h4 className="font-medium text-danoryx-dark-brown">{feature.title}</h4>
                      <p className="text-sm text-danoryx-dark-brown/60">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-danoryx-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-danoryx-brown font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-danoryx-dark-brown mt-2">
              Kenapa Pilih Danoryx?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🎨', title: 'Design Unik', desc: 'Setiap produk mempunyai design yang unik dan cantik' },
              { icon: '✨', title: 'Kualiti Premium', desc: 'Menggunakan bahan berkualiti tinggi untuk ketahanan' },
              { icon: '🚚', title: 'Penghantaran Cepat', desc: 'Penghantaran segera ke seluruh Malaysia' },
              { icon: '💝', title: 'Customer First', desc: 'Kepuasan pelanggan adalah keutamaan kami' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-danoryx-dark-brown mb-2">{item.title}</h3>
                <p className="text-danoryx-dark-brown/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dropship & Agent Opportunity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-danoryx-brown font-medium">Business Opportunity</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-danoryx-dark-brown mt-2">
              Peluang Jana Income Bersama Kami
            </h2>
            <p className="text-danoryx-dark-brown/60 mt-4 max-w-2xl mx-auto">
              Mulakan perjalanan bisnes anda bersama Danoryx Studio. 
              Pilih program yang sesuai dengan anda!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Dropship Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-premium relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-4 py-1 rounded-bl-xl font-medium">
                FREE
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-danoryx-beige/50 flex items-center justify-center">
                  <Users size={32} className="text-danoryx-brown" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-danoryx-dark-brown">Dropship</h3>
                  <p className="text-danoryx-brown font-medium">Percuma Selamanya</p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {dropshipBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-danoryx-dark-brown/70">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup?type=dropship">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <span>Daftar Dropship Sekarang</span>
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Agent Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-premium relative overflow-hidden border-2 border-danoryx-brown"
            >
              <div className="absolute top-0 right-0 bg-danoryx-brown text-white text-xs px-4 py-1 rounded-bl-xl font-medium">
                BEST VALUE
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-danoryx-brown flex items-center justify-center">
                  <Award size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-danoryx-dark-brown">Agent</h3>
                  <p className="text-danoryx-brown font-medium">RM10 Sekali Seumur Hidup</p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {agentBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-danoryx-brown/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-danoryx-brown" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-danoryx-dark-brown/70">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup?type=agent">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-danoryx-brown text-white px-6 py-3 rounded-full font-medium flex items-center justify-center space-x-2 hover:bg-danoryx-dark-brown transition-colors"
                >
                  <span>Jadi Agent Sekarang</span>
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-20 bg-gradient-to-br from-danoryx-cream via-white to-danoryx-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-danoryx-brown font-medium">Leaderboard</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-danoryx-dark-brown mt-2">
              Top Performers
            </h2>
            <p className="text-danoryx-dark-brown/60 mt-4">
              Meet our star sellers this month!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Top Agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-premium"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Crown size={24} className="text-yellow-500" />
                <h3 className="text-xl font-semibold text-danoryx-dark-brown">Top Agent Bulanan</h3>
              </div>

              <div className="space-y-4">
                {leaderboard.topAgents.map((agent, index) => (
                  <motion.div
                    key={agent.userId}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-xl ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200' :
                      index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200' :
                      'bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      'bg-orange-400'
                    }`}>
                      {index === 0 ? <Trophy size={20} className="text-white" /> :
                       index === 1 ? <Medal size={20} className="text-white" /> :
                       <Award size={20} className="text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-danoryx-dark-brown">{agent.name}</p>
                      <p className="text-sm text-danoryx-brown">{agent.userId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-danoryx-dark-brown">RM {agent.sales.toLocaleString()}</p>
                      <p className="text-sm text-danoryx-brown">{agent.points} pts</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Dropship */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-premium"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Star size={24} className="text-danoryx-brown" />
                <h3 className="text-xl font-semibold text-danoryx-dark-brown">Top Dropship Mingguan</h3>
              </div>

              <div className="space-y-4">
                {leaderboard.topDropship.map((dropship, index) => (
                  <motion.div
                    key={dropship.userId}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-danoryx-cream/50 border border-danoryx-beige"
                  >
                    <div className="w-10 h-10 rounded-full bg-danoryx-brown flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-danoryx-dark-brown">{dropship.name}</p>
                      <p className="text-sm text-danoryx-brown">{dropship.userId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-danoryx-dark-brown">RM {dropship.sales.toLocaleString()}</p>
                      <p className="text-sm text-danoryx-brown">{dropship.points} pts</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hiring Section */}
      <section className="py-20 bg-danoryx-dark-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-danoryx-light-brown font-medium">Join Our Team</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
                We're Hiring! 🎉
              </h2>
              <p className="text-danoryx-beige/80 mb-8">
                Kami sedang mencari individu yang bersemangat untuk menyertai pasukan Danoryx Studio. 
                Jika anda kreatif, rajin, dan suka bekerja dalam persekitaran yang menyeronokkan, 
                jom sertai kami!
              </p>

              <div className="space-y-4 mb-8">
                {['Crochet Artisan', 'Social Media Manager', 'Customer Service', 'Packer'].map((position) => (
                  <div key={position} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-danoryx-light-brown" />
                    <span className="text-danoryx-beige">{position}</span>
                  </div>
                ))}
              </div>

              <Link to="/hiring">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-danoryx-dark-brown px-8 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-danoryx-beige transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="/images/team-danoryx.jpg"
                  alt="Danoryx Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-danoryx-brown font-medium">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-danoryx-dark-brown mt-2">
              Apa Kata Pelanggan Kami
            </h2>
          </motion.div>

          <TestimonialSlider />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-danoryx-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-danoryx-brown font-medium">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-danoryx-dark-brown mt-2">
              Soalan Lazim
            </h2>
          </motion.div>

          <FAQAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-danoryx-brown to-danoryx-dark-brown">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-danoryx-beige/80 mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers and business partners. 
              Start your crochet journey with Danoryx Studio today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-danoryx-brown px-8 py-3 rounded-full font-medium hover:bg-danoryx-beige transition-colors"
                >
                  Browse Products
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  Join Program
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
