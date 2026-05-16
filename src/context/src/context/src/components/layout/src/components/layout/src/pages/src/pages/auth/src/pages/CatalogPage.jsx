import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { productAPI } from '../utils/api';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  ShoppingBag,
  X,
  ChevronDown,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: '',
    sortBy: 'newest',
  });

  const { addToCart, addToWishlist, wishlist } = useCart();

  const categories = [
    { id: '', name: 'All Products' },
    { id: 'bouquet', name: 'Crochet Bouquet' },
    { id: 'keychain', name: 'Keychain' },
    { id: 'custom', name: 'Custom Crochet' },
    { id: 'giftbox', name: 'Gift Box' },
    { id: 'services', name: 'Services' },
  ];

  const priceRanges = [
    { id: '', name: 'All Prices' },
    { id: '0-50', name: 'Under RM50' },
    { id: '50-100', name: 'RM50 - RM100' },
    { id: '100-200', name: 'RM100 - RM200' },
    { id: '200+', name: 'Above RM200' },
  ];

  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'popular', name: 'Most Popular' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters, searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAll({
        category: filters.category,
        priceRange: filters.priceRange,
        sortBy: filters.sortBy,
        search: searchQuery,
      });
      setProducts(response.data.products);
    } catch (error) {
      // Mock data for demo
      setProducts([
        {
          _id: '1',
          name: 'Rose Crochet Bouquet',
          price: 89.90,
          image: '/images/products/bouquet1.jpg',
          category: 'bouquet',
          stock: 15,
          rating: 4.9,
          reviews: 28,
          description: 'Beautiful handmade rose bouquet, perfect for any occasion.',
        },
        {
          _id: '2',
          name: 'Tulip Mini Bouquet',
          price: 59.90,
          image: '/images/products/bouquet2.jpg',
          category: 'bouquet',
          stock: 20,
          rating: 4.8,
          reviews: 42,
          description: 'Cute mini tulip bouquet that lasts forever.',
        },
        {
          _id: '3',
          name: 'Bunny Keychain',
          price: 25.90,
          image: '/images/products/keychain1.jpg',
          category: 'keychain',
          stock: 50,
          rating: 4.7,
          reviews: 65,
          description: 'Adorable bunny keychain to brighten your day.',
        },
        {
          _id: '4',
          name: 'Bear Keychain',
          price: 25.90,
          image: '/images/products/keychain2.jpg',
          category: 'keychain',
          stock: 45,
          rating: 4.8,
          reviews: 53,
          description: 'Cute bear keychain, handmade with love.',
        },
        {
          _id: '5',
          name: 'Custom Name Bouquet',
          price: 150.00,
          image: '/images/products/custom1.jpg',
          category: 'custom',
          stock: 10,
          rating: 5.0,
          reviews: 18,
          description: 'Personalized bouquet with your chosen name or message.',
        },
        {
          _id: '6',
          name: 'Premium Gift Box Set',
          price: 199.90,
          image: '/images/products/giftbox1.jpg',
          category: 'giftbox',
          stock: 8,
          rating: 4.9,
          reviews: 31,
          description: 'Complete gift set with bouquet, keychain, and card.',
        },
      ]);
    }
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'category') {
      setSearchParams(value ? { category: value } : {});
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const ProductCard = ({ product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="card-premium group"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Stock Badge */}
        {product.stock < 10 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Low Stock
          </span>
        )}
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="flex-1 bg-white text-danoryx-dark-brown py-2 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-danoryx-cream transition-colors"
            >
              <ShoppingBag size={16} />
              <span className="text-sm">Add to Cart</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToWishlist(product)}
              className={`p-2 rounded-lg transition-colors ${
                isInWishlist(product._id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-danoryx-dark-brown hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart size={16} fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
        </div>
      </div>

      <Link to={`/product/${product._id}`}>
        <h3 className="font-medium text-danoryx-dark-brown group-hover:text-danoryx-brown transition-colors">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center space-x-2 mt-1">
        <div className="flex items-center">
          <Star size={14} className="text-yellow-500" fill="currentColor" />
          <span className="text-sm text-danoryx-dark-brown/70 ml-1">{product.rating}</span>
        </div>
        <span className="text-danoryx-dark-brown/30">•</span>
        <span className="text-sm text-danoryx-dark-brown/60">{product.reviews} reviews</span>
      </div>

      <p className="text-lg font-semibold text-danoryx-brown mt-2">
        RM {product.price.toFixed(2)}
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 pb-12 bg-danoryx-cream">
      {/* Header */}
      <div className="bg-white border-b border-danoryx-beige/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-display font-bold text-danoryx-dark-brown">
            Product Catalog
          </h1>
          <p className="text-danoryx-dark-brown/60 mt-2">
            Discover our beautiful handcrafted crochet creations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-danoryx-dark-brown/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="input-field pl-11 pr-20"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-danoryx-brown text-white px-4 py-1.5 rounded-lg text-sm hover:bg-danoryx-dark-brown transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter & View Controls */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white rounded-xl border border-danoryx-beige hover:border-danoryx-brown transition-colors"
            >
              <Filter size={18} className="text-danoryx-brown" />
              <span className="text-danoryx-dark-brown">Filters</span>
              <ChevronDown size={16} className={`text-danoryx-dark-brown transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex bg-white rounded-xl border border-danoryx-beige overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-danoryx-brown text-white' : 'text-danoryx-dark-brown hover:bg-danoryx-cream'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-danoryx-brown text-white' : 'text-danoryx-dark-brown hover:bg-danoryx-cream'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl p-6 mb-8 shadow-soft"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-danoryx-dark-brown mb-3">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleFilterChange('category', cat.id)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          filters.category === cat.id
                            ? 'bg-danoryx-brown text-white'
                            : 'hover:bg-danoryx-cream text-danoryx-dark-brown'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-danoryx-dark-brown mb-3">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => handleFilterChange('priceRange', range.id)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          filters.priceRange === range.id
                            ? 'bg-danoryx-brown text-white'
                            : 'hover:bg-danoryx-cream text-danoryx-dark-brown'
                        }`}
                      >
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-danoryx-dark-brown mb-3">
                    Sort By
                  </label>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleFilterChange('sortBy', option.id)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          filters.sortBy === option.id
                            ? 'bg-danoryx-brown text-white'
                            : 'hover:bg-danoryx-cream text-danoryx-dark-brown'
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        {(filters.category || filters.priceRange) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.category && (
              <span className="inline-flex items-center gap-2 bg-danoryx-brown/10 text-danoryx-brown px-3 py-1 rounded-full text-sm">
                {categories.find(c => c.id === filters.category)?.name}
                <button onClick={() => handleFilterChange('category', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="inline-flex items-center gap-2 bg-danoryx-brown/10 text-danoryx-brown px-3 py-1 rounded-full text-sm">
                {priceRanges.find(p => p.id === filters.priceRange)?.name}
                <button onClick={() => handleFilterChange('priceRange', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-premium animate-pulse">
                <div className="aspect-square bg-danoryx-beige/50 rounded-xl mb-4" />
                <div className="h-4 bg-danoryx-beige/50 rounded w-3/4 mb-2" />
                <div className="h-4 bg-danoryx-beige/50 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div
            layout
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            <AnimatePresence>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-danoryx-beige/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} className="text-danoryx-brown/50" />
            </div>
            <h3 className="text-xl font-medium text-danoryx-dark-brown mb-2">
              No products found
            </h3>
            <p className="text-danoryx-dark-brown/60">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
