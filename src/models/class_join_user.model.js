const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const classJoinUserSchema = new mongoose.Schema({
  Class_Join_Map_user_id: {
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

classJoinUserSchema.plugin(AutoIncrement, { inc_field: 'Class_Join_Map_user_id' });

module.exports = mongoose.model('ClassJoinUser', classJoinUserSchema);
