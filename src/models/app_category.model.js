const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const appCategorySchema = new mongoose.Schema({
  app_category_id: {
    type: Number,
    unique: true
  },
  categoryName: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [200, 'Category name cannot exceed 200 characters']
  },
  image: {
    type: String,
    trim: true
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

appCategorySchema.plugin(AutoIncrement, { inc_field: 'app_category_id' });

module.exports = mongoose.model('AppCategory', appCategorySchema);

