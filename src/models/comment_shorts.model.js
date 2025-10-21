const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentShortsSchema = new mongoose.Schema({
  comment_shorts_id: {
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
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
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
commentShortsSchema.index({ shorts_id: 1 });
commentShortsSchema.index({ user_id: 1 });
commentShortsSchema.index({ created_at: 1 });

commentShortsSchema.plugin(AutoIncrement, { inc_field: 'comment_shorts_id' });

module.exports = mongoose.model('Comment_Shorts', commentShortsSchema);
