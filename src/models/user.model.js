const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [200, 'Full name cannot exceed 200 characters']
  },
  mobile: {
    type: String,
    unique: true,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  address: {
    type: String,
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  country_id: {
    type: Number,
    ref: 'Country',
    default: 1
  },
  state_id: {
    type: Number,
    ref: 'State',
    default: 1
  },
  city_id: {
    type: Number,
    ref: 'City',
    default: 1
  },
  role_id: {
    type: Number,
    ref: 'Role',
    default: 1
  },
  Fixed_role_id: {
    type: Number,
    ref: 'Role',
    default: 1
  },
  online_status: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  user_img: {
    type: String,
    trim: true,
   
  },
  
  app_category_id: {
    type: Number,
    ref: 'AppCategory'
  },
  language_id: {
    type: Number,
    ref: 'Language'
  },
  preferedContentFormat: {
    type: String,
    enum: ['Text', 'Audio'],
    default: 'Text'
  },
  notificationSettings: [{
    settingName: {
      type: String,
      trim: true
    },
    enabled: {
      type: Boolean,
      default: true
    }
  }],
  manageYourPrivacy: [{
    privacyName: {
      type: String,
      trim: true
    },
    enabled: {
      type: Boolean,
      default: true
    }
  }],
  dateOfBirth: {
    type: Date
  },
  timeOfBirth: {
    type: String,
    trim: true
  },
  placeOfBirth: {
    type: String,
    trim: true,
    maxlength: [200, 'Place of birth cannot exceed 200 characters']
  },
  pincode: {
    type: String,
    trim: true,
    maxlength: [10, 'Pincode cannot exceed 10 characters']
  },
  specialty: {
    type: String,
    trim: true,
    maxlength: [200, 'Specialty cannot exceed 200 characters']
  },
  experience: {
    type: Number,
    default: 0,
    min: [0, 'Experience cannot be negative']
  },
  consultation_fees: {
    type: Number,
    default: 0,
    min: [0, 'Consultation fees cannot be negative']
  },
  mlnsOfConsultation: {
    type: Number,
    default: 0,
    min: [0, 'Millions of consultation cannot be negative']
  },
  aboutUs: {
    type: String,
    trim: true,
    maxlength: [1000, 'About us cannot exceed 1000 characters']
  },
  bankHolderName: {
    type: String,
    trim: true,
    maxlength: [100, 'Bank holder name cannot exceed 100 characters']
  },
  bankAccountNo: {
    type: String,
    trim: true,
    maxlength: [20, 'Bank account number cannot exceed 20 characters']
  },
  branch: {
    type: String,
    trim: true,
    maxlength: [200, 'Branch name cannot exceed 200 characters']
  },
  ifscCode: {
    type: String,
    trim: true,
    maxlength: [11, 'IFSC code cannot exceed 11 characters']
  },
  passBookImg: {
    type: String,
    trim: true
  },
  panCardImg: {
    type: String,
    trim: true
  },
  adhaarCardImg: {
    type: String,
    trim: true
  },
  tdsCertificateImg: {
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

userSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

// Transform output to remove sensitive data
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
