const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const walletSchema = new mongoose.Schema({
  wallet_id: {
    type: Number,
    unique: true
  },
  walletAmount: {
    type: Number,
    default: 0,
    min: [0, 'Wallet amount cannot be negative']
  },
  user_id: {
    type: Number,
    ref: 'User',
    required: [true, 'User ID is required']
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
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: Number,
    ref: 'User',
    default: null
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false,
  versionKey: false
});

walletSchema.plugin(AutoIncrement, { inc_field: 'wallet_id' });

module.exports = mongoose.model('Wallet', walletSchema);

