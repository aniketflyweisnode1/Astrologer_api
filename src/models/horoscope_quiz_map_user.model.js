const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const horoscopeQuizMapUserSchema = new mongoose.Schema({
  Horoscope_quiz_Map_user_id: {
    type: Number,
    unique: true
  },
  question_id: {
    type: Number,
    ref: 'HoroscopeQuiz',
    required: [true, 'Question ID is required']
  },
  answer: [{
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
  user_id: {
    type: Number,
    ref: 'User',
    required: [true, 'User ID is required']
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

horoscopeQuizMapUserSchema.plugin(AutoIncrement, { inc_field: 'Horoscope_quiz_Map_user_id' });

module.exports = mongoose.model('HoroscopeQuizMapUser', horoscopeQuizMapUserSchema);
