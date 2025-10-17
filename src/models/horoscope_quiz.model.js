const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const horoscopeQuizSchema = new mongoose.Schema({
  question_id: {
    type: Number,
    unique: true
  },
  Time: {
    type: Number,
    required: [true, 'Time is required'],
    min: [1, 'Time must be at least 1 minute']
  },
  QuestionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    maxlength: [1000, 'Question text cannot exceed 1000 characters']
  },
  Answer: [{
    A: {
      type: String,
      required: [true, 'Option A is required'],
      trim: true,
      maxlength: [200, 'Option A cannot exceed 200 characters']
    },
    ans: {
      type: Boolean,
      required: [true, 'Answer flag for option A is required']
    }
  }, {
    B: {
      type: String,
      required: [true, 'Option B is required'],
      trim: true,
      maxlength: [200, 'Option B cannot exceed 200 characters']
    },
    ans: {
      type: Boolean,
      required: [true, 'Answer flag for option B is required']
    }
  }, {
    C: {
      type: String,
      required: [true, 'Option C is required'],
      trim: true,
      maxlength: [200, 'Option C cannot exceed 200 characters']
    },
    ans: {
      type: Boolean,
      required: [true, 'Answer flag for option C is required']
    }
  }, {
    D: {
      type: String,
      required: [true, 'Option D is required'],
      trim: true,
      maxlength: [200, 'Option D cannot exceed 200 characters']
    },
    ans: {
      type: Boolean,
      required: [true, 'Answer flag for option D is required']
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

horoscopeQuizSchema.plugin(AutoIncrement, { inc_field: 'question_id' });

module.exports = mongoose.model('HoroscopeQuiz', horoscopeQuizSchema);
