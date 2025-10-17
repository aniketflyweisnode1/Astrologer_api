const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const planSubscriptionByUserSchema = new mongoose.Schema({
  Plan_Subscription_id: {
    type: Number,
    unique: true
  },
  Plan_id: {
    type: Number,
    ref: 'Plan',
    required: [true, 'Plan ID is required']
  },
  user_id: {
    type: Number,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  PayemntStatus: {
    type: String,
    required: [true, 'Payment status is required'],
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
    trim: true
  },
  ExpiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  Trangesction_id: {
    type: String,
    trim: true,
    maxlength: [100, 'Transaction ID cannot exceed 100 characters']
  },
  TrangactionStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending',
    trim: true
  },
  status: {
    type: Boolean,
    default: true
  },
  created_by: {
    type: Number,
    ref: 'User',
    default: null
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: Number,
    ref: 'User',
    default: null
  },
  updated_on: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false, // We're using custom timestamp fields
  versionKey: false
});

planSubscriptionByUserSchema.plugin(AutoIncrement, { inc_field: 'Plan_Subscription_id' });

module.exports = mongoose.model('PlanSubscriptionByUser', planSubscriptionByUserSchema);
