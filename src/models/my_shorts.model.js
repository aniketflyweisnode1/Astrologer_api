const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const myShortsSchema = new mongoose.Schema({
  shorts_id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  image_video: {
    type: String,
    required: [true, 'Image or video is required'],
    trim: true,
    maxlength: [500, 'Image/video URL cannot exceed 500 characters']
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
myShortsSchema.index({ created_by: 1 });
myShortsSchema.index({ created_at: 1 });
myShortsSchema.index({ status: 1 });

myShortsSchema.plugin(AutoIncrement, { inc_field: 'shorts_id' });

module.exports = mongoose.model('My_Shorts', myShortsSchema);
