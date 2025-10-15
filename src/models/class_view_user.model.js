const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const classViewUserSchema = new mongoose.Schema({
  Class_View_Map_user_id: {
    type: Number,
    unique: true
  },
  class_id: {
    type: Number,
    ref: 'AstrologerClass',
    required: [true, 'Class ID is required']
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

classViewUserSchema.plugin(AutoIncrement, { inc_field: 'Class_View_Map_user_id' });

module.exports = mongoose.model('ClassViewUser', classViewUserSchema);
