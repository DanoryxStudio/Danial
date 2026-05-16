import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('danoryx_cart');
    const savedWishlist = localStorage.getItem('danoryx_wishlist');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('danoryx_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('danoryx_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === product._id);
      
      if (existingItem) {
        toast.success('Updated quantity in cart');
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      toast.success('Added to cart!');
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('danoryx_cart');
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item._id === product._id);
    if (!exists) {
      setWishlist(prev => [...prev, product]);
      toast.success('Added to wishlist!');
    } else {
      toast('Already in wishlist', { icon: '💝' });
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item._id !== productId));
    toast.success('Removed from wishlist');
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const calculateShipping = (postcode, state) => {
    // Shipping calculation based on region
    const westMalaysia = [
      'Selangor', 'Kuala Lumpur', 'Putrajaya', 'Perak', 'Penang', 
      'Kedah', 'Perlis', 'Kelantan', 'Terengganu', 'Pahang', 
      'Negeri Sembilan', 'Melaka', 'Johor'
    ];
    const eastMalaysia = ['Sabah', 'Sarawak', 'Labuan'];
    
    if (westMalaysia.includes(state)) {
      return cartTotal >= 100 ? 0 : 8;
    } else if (eastMalaysia.includes(state)) {
      return cartTotal >= 150 ? 0 : 15;
    }
    return 10;
  };

  const value = {
    cartItems,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    cartTotal,
    cartCount,
    calculateShipping,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
