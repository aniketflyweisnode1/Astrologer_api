const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const astrologerClassSchema = new mongoose.Schema({
  Astrologer_class_id: {
    type: Number,
    unique: true
  },
  Astorloger_id: {
    type: Number,
    ref: 'User',
    required: [true, 'Astrologer ID is required']
  },
  Title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  Classtype: {
    type: String,
    enum: ['Recorded Video', 'Audio', 'PDF', 'Live Session'],
    required: [true, 'Class type is required']
  },
  Access: {
    type: String,
    enum: ['Free', 'Premium'],
    default: 'Free',
    required: [true, 'Access type is required']
  },
  Category_id: {
    type: Number,
    ref: 'Category',
    required: [true, 'Category ID is required']
  },
  Duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
    maxlength: [50, 'Duration cannot exceed 50 characters']
  },
  upload_image: {
    type: String,
    trim: true
  },
  Description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  Pricing: {
    type: Number,
    required: [true, 'Pricing is required'],
    min: [0, 'Pricing cannot be negative']
  },
  TargetAudience: {
    type: String,
    required: [true, 'Target Audience is required'],
    trim: true,
    maxlength: [200, 'Target Audience cannot exceed 200 characters']
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

astrologerClassSchema.plugin(AutoIncrement, { inc_field: 'Astrologer_class_id' });

module.exports = mongoose.model('AstrologerClass', astrologerClassSchema);
