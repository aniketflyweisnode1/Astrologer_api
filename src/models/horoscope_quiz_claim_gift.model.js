const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const horoscopeQuizClaimGiftSchema = new mongoose.Schema({
  Horoscope_quiz_Claim_gift_id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [200, 'Name cannot exceed 200 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  mobileno: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    trim: true,
    maxlength: [10, 'Pincode cannot exceed 10 characters']
  },
  gift_id: {
    type: Number,
    ref: 'Gift',
    required: [true, 'Gift ID is required']
  },
  map: {
    type: String,
    trim: true,
    maxlength: [1000, 'Map data cannot exceed 1000 characters']
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

horoscopeQuizClaimGiftSchema.plugin(AutoIncrement, { inc_field: 'Horoscope_quiz_Claim_gift_id' });

module.exports = mongoose.model('HoroscopeQuizClaimGift', horoscopeQuizClaimGiftSchema);
