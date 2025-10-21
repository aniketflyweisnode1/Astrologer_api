const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const tagShortsSchema = new mongoose.Schema({
  tag_shorts_id: {
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
tagShortsSchema.index({ user_id: 1, shorts_id: 1 }, { unique: true });
tagShortsSchema.index({ shorts_id: 1 });
tagShortsSchema.index({ created_at: 1 });

tagShortsSchema.plugin(AutoIncrement, { inc_field: 'tag_shorts_id' });

module.exports = mongoose.model('Tag_Shorts', tagShortsSchema);
