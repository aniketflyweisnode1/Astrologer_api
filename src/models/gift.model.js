const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const giftSchema = new mongoose.Schema({
  gift_id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Gift name is required'],
    trim: true,
    maxlength: [200, 'Gift name cannot exceed 200 characters']
  },
  cost: {
    type: Number,
    required: [true, 'Gift cost is required'],
    min: [0, 'Gift cost cannot be negative']
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

giftSchema.plugin(AutoIncrement, { inc_field: 'gift_id' });

module.exports = mongoose.model('Gift', giftSchema);
