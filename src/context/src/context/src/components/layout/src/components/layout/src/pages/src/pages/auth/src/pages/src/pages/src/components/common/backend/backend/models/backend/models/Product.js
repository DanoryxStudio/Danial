const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: 2000
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  dropshipPrice: {
    type: Number,
    required: true,
    min: 0
  },
  agentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['bouquet', 'keychain', 'custom', 'giftbox', 'services']
  },
  images: [{
    url: String,
    alt: String
  }],
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  specifications: {
    material: String,
    size: String,
    weight: String,
    color: [String]
  },
  soldCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Virtual for main image
productSchema.virtual('image').get(function() {
  return this.images && this.images.length > 0 ? this.images[0].url : null;
});

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
