const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bookingAstrologerSchema = new mongoose.Schema({
  Booking_Astrologer_id: {
    type: Number,
    unique: true
  },
  Astorloger_id: {
    type: Number,
    ref: 'User',
    required: [true, 'Astrologer ID is required']
  },
  user_id: {
    type: Number,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  CallStatus: {
    type: String,
    enum: ['Approve', 'Reject'],
    default: 'Approve'
  },
  BooingStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  status: {
    type: Boolean,
    default: true
  },
  created_by: {
    type: Number,
    ref: 'User',
    required: [true, 'Created by is required']
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

bookingAstrologerSchema.plugin(AutoIncrement, { inc_field: 'Booking_Astrologer_id' });

module.exports = mongoose.model('BookingAstrologer', bookingAstrologerSchema);
