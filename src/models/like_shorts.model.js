const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const likeShortsSchema = new mongoose.Schema({
  like_shorts_id: {
    type: Number,
    unique: true
  },
  user_id: {
    type: Number,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  shorts_id: {
    type: Number,
    ref: 'My_Shorts',
    required: [true, 'Shorts ID is required']
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
  timestamps: false, // We're using custom timestamp fields
  versionKey: false
});

// Add indexes for better performance
likeShortsSchema.index({ user_id: 1, shorts_id: 1 }, { unique: true });
likeShortsSchema.index({ shorts_id: 1 });
likeShortsSchema.index({ created_at: 1 });

likeShortsSchema.plugin(AutoIncrement, { inc_field: 'like_shorts_id' });

module.exports = mongoose.model('Like_Shorts', likeShortsSchema);
