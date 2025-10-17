const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const planSchema = new mongoose.Schema({
  Plan_id: {
    type: Number,
    unique: true
  },
  Name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
    maxlength: [200, 'Plan name cannot exceed 200 characters']
  },
  emozi: {
    type: String,
    required: [true, 'Emoji is required'],
    trim: true,
    maxlength: [10, 'Emoji cannot exceed 10 characters']
  },
  StartDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  mainHeadingText: {
    type: String,
    required: [true, 'Main heading text is required'],
    trim: true,
    maxlength: [500, 'Main heading text cannot exceed 500 characters']
  },
  TimePried: {
    type: String,
    required: [true, 'Time period is required'],
    trim: true,
    maxlength: [100, 'Time period cannot exceed 100 characters']
  },
  Textline: [{
    txt: {
      type: String,
      required: [true, 'Text is required'],
      trim: true,
      maxlength: [500, 'Text cannot exceed 500 characters']
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
      trim: true,
      maxlength: [50, 'Icon cannot exceed 50 characters']
    }
  }],
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

planSchema.plugin(AutoIncrement, { inc_field: 'Plan_id' });

module.exports = mongoose.model('Plan', planSchema);
