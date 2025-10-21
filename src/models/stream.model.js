const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const streamSchema = new mongoose.Schema({
  stream_id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  datetime: {
    type: Date,
    required: [true, 'Date and time is required']
  },
  streamType: {
    type: String,
    required: [true, 'Stream type is required'],
    trim: true,
    maxlength: [50, 'Stream type cannot exceed 50 characters']
  },
  language_id: {
    type: Number,
    ref: 'Language',
    required: [true, 'Language ID is required']
  },
  category_topic_tag: {
    type: String,
    trim: true,
    maxlength: [500, 'Category topic tag cannot exceed 500 characters']
  },
  entry_fee: {
    type: Number,
    default: 0,
    min: [0, 'Entry fee cannot be negative']
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  description_sessionAgenda: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  thumbnail_banner_image: {
    type: String,
    trim: true,
    maxlength: [500, 'Thumbnail banner image URL cannot exceed 500 characters']
  },
  byuser_stream_id: {
    type: Number,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  session_status: {
    type: String,
    enum: ['scheduled', 'live', 'ended', 'cancelled'],
    default: 'scheduled'
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
streamSchema.index({ byuser_stream_id: 1 });
streamSchema.index({ language_id: 1 });
streamSchema.index({ session_status: 1 });
streamSchema.index({ datetime: 1 });
streamSchema.index({ created_at: 1 });

streamSchema.plugin(AutoIncrement, { inc_field: 'stream_id' });

module.exports = mongoose.model('Stream', streamSchema);
