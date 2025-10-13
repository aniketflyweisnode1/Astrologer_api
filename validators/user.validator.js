const Joi = require('joi');

/**
 * User validation schemas using Joi
 */

// Common validation patterns
const commonValidations = {
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Please enter a valid 10-digit mobile number'
    }),

  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    }),

  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters'
    }),

  address: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.min': 'Address must be at least 10 characters long',
      'string.max': 'Address cannot exceed 500 characters'
    }),

  country_id: Joi.number()
    .integer()
    .positive()
    .default(1)
    .optional()
    .messages({
      'number.base': 'Country ID must be a number',
      'number.integer': 'Country ID must be an integer',
      'number.positive': 'Country ID must be a positive number'
    }),

  state_id: Joi.number()
    .integer()
    .positive()
    .default(1)
    .optional()
    .messages({
      'number.base': 'State ID must be a number',
      'number.integer': 'State ID must be an integer',
      'number.positive': 'State ID must be a positive number'
    }),

  city_id: Joi.number()
    .integer()
    .positive()
    .default(1)
    .optional()
    .messages({
      'number.base': 'City ID must be a number',
      'number.integer': 'City ID must be an integer',
      'number.positive': 'City ID must be a positive number'
    }),

  role_id: Joi.number()
    .integer()
    .positive()
    .default(1)
    .optional()
    .allow(null)
    .messages({
      'number.base': 'Role ID must be a number',
      'number.integer': 'Role ID must be an integer',
      'number.positive': 'Role ID must be a positive number'
    }),

  online_status: Joi.boolean()
    .default(false)
    .messages({
      'boolean.base': 'Online status must be a boolean value'
    }),

  gender: Joi.string()
    .valid('male', 'female', 'other')
    .optional()
    .allow('')
    .messages({
      'any.only': 'Gender must be one of: male, female, other'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    }),

  user_img: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .allow('')
    .messages({
      'string.uri': 'Please enter a valid URL starting with http:// or https://'
    }),

  fullName: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Full name is required',
      'string.min': 'Full name must be at least 2 characters long',
      'string.max': 'Full name cannot exceed 200 characters'
    }),

  app_category_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null)
    .messages({
      'number.base': 'App category ID must be a number',
      'number.integer': 'App category ID must be an integer',
      'number.positive': 'App category ID must be a positive number'
    }),

  language_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null)
    .messages({
      'number.base': 'Language ID must be a number',
      'number.integer': 'Language ID must be an integer',
      'number.positive': 'Language ID must be a positive number'
    }),

  preferedContentFormat: Joi.string()
    .valid('Text', 'Audio')
    .optional()
    .messages({
      'any.only': 'Preferred content format must be either Text or Audio'
    }),

  notificationSettings: Joi.array()
    .items(
      Joi.object({
        settingName: Joi.string().trim().optional(),
        enabled: Joi.boolean().default(true)
      })
    )
    .optional()
    .messages({
      'array.base': 'Notification settings must be an array'
    }),

  manageYourPrivacy: Joi.array()
    .items(
      Joi.object({
        privacyName: Joi.string().trim().optional(),
        enabled: Joi.boolean().default(true)
      })
    )
    .optional()
    .messages({
      'array.base': 'Privacy settings must be an array'
    }),

  dateOfBirth: Joi.date()
    .optional()
    .messages({
      'date.base': 'Date of birth must be a valid date'
    }),

  timeOfBirth: Joi.string()
    .trim()
    .optional()
    .allow('')
    .messages({
      'string.base': 'Time of birth must be a string'
    }),

  placeOfBirth: Joi.string()
    .trim()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Place of birth cannot exceed 200 characters'
    }),

  pincode: Joi.string()
    .trim()
    .max(10)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Pincode cannot exceed 10 characters'
    }),

  specialty: Joi.string()
    .trim()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Specialty cannot exceed 200 characters'
    }),

  experience: Joi.number()
    .min(0)
    .default(0)
    .optional()
    .messages({
      'number.base': 'Experience must be a number',
      'number.min': 'Experience cannot be negative'
    }),

  consultation_fees: Joi.number()
    .min(0)
    .default(0)
    .optional()
    .messages({
      'number.base': 'Consultation fees must be a number',
      'number.min': 'Consultation fees cannot be negative'
    }),

  mlnsOfConsultation: Joi.number()
    .min(0)
    .default(0)
    .optional()
    .messages({
      'number.base': 'Millions of consultation must be a number',
      'number.min': 'Millions of consultation cannot be negative'
    }),

  aboutUs: Joi.string()
    .trim()
    .max(1000)
    .optional()
    .allow('')
    .messages({
      'string.max': 'About us cannot exceed 1000 characters'
    }),

  bankHolderName: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Bank holder name cannot exceed 100 characters'
    }),

  bankAccountNo: Joi.string()
    .trim()
    .max(20)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Bank account number cannot exceed 20 characters'
    }),

  branch: Joi.string()
    .trim()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Branch name cannot exceed 200 characters'
    }),

  ifscCode: Joi.string()
    .trim()
    .max(11)
    .optional()
    .allow('')
    .messages({
      'string.max': 'IFSC code cannot exceed 11 characters'
    }),

  passBookImg: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .allow('')
    .messages({
      'string.uri': 'Passbook image must be a valid URL'
    }),

  panCardImg: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .allow('')
    .messages({
      'string.uri': 'PAN card image must be a valid URL'
    }),

  adhaarCardImg: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .allow('')
    .messages({
      'string.uri': 'Adhaar card image must be a valid URL'
    }),

  tdsCertificateImg: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .allow('')
    .messages({
      'string.uri': 'TDS certificate image must be a valid URL'
    })
};

// Create user validation schema
const createUserSchema = Joi.object({
  fullName: commonValidations.fullName,
  email: commonValidations.email,
  password: commonValidations.password,
  mobile: commonValidations.mobile,
  address: commonValidations.address,
  country_id: commonValidations.country_id,
  state_id: commonValidations.state_id,
  city_id: commonValidations.city_id,
  role_id: commonValidations.role_id,
  online_status: commonValidations.online_status,
  gender: commonValidations.gender,
  user_img: commonValidations.user_img,
  app_category_id: commonValidations.app_category_id,
  language_id: commonValidations.language_id,
  preferedContentFormat: commonValidations.preferedContentFormat,
  notificationSettings: commonValidations.notificationSettings,
  manageYourPrivacy: commonValidations.manageYourPrivacy,
  dateOfBirth: commonValidations.dateOfBirth,
  timeOfBirth: commonValidations.timeOfBirth,
  placeOfBirth: commonValidations.placeOfBirth,
  pincode: commonValidations.pincode,
  specialty: commonValidations.specialty,
  experience: commonValidations.experience,
  consultation_fees: commonValidations.consultation_fees,
  mlnsOfConsultation: commonValidations.mlnsOfConsultation,
  aboutUs: commonValidations.aboutUs,
  bankHolderName: commonValidations.bankHolderName,
  bankAccountNo: commonValidations.bankAccountNo,
  branch: commonValidations.branch,
  ifscCode: commonValidations.ifscCode,
  passBookImg: commonValidations.passBookImg,
  panCardImg: commonValidations.panCardImg,
  adhaarCardImg: commonValidations.adhaarCardImg,
  tdsCertificateImg: commonValidations.tdsCertificateImg,
  status: commonValidations.status
});

// Update user validation schema (for updateProfile - uses auth user)
const updateUserSchema = Joi.object({
  mobile: commonValidations.mobile.optional(),
  email: commonValidations.email.optional(),
  password: commonValidations.password.optional(),
  address: commonValidations.address.optional(),
  country_id: commonValidations.country_id.optional(),
  state_id: commonValidations.state_id.optional(),
  city_id: commonValidations.city_id.optional(),
  role_id: commonValidations.role_id.optional(),
  online_status: commonValidations.online_status.optional(),
  gender: commonValidations.gender.optional(),
  user_img: commonValidations.user_img.optional(),
  fullName: commonValidations.fullName.optional(),
  app_category_id: commonValidations.app_category_id.optional(),
  language_id: commonValidations.language_id.optional(),
  preferedContentFormat: commonValidations.preferedContentFormat.optional(),
  notificationSettings: commonValidations.notificationSettings.optional(),
  manageYourPrivacy: commonValidations.manageYourPrivacy.optional(),
  dateOfBirth: commonValidations.dateOfBirth.optional(),
  timeOfBirth: commonValidations.timeOfBirth.optional(),
  placeOfBirth: commonValidations.placeOfBirth.optional(),
  pincode: commonValidations.pincode.optional(),
  specialty: commonValidations.specialty.optional(),
  experience: commonValidations.experience.optional(),
  consultation_fees: commonValidations.consultation_fees.optional(),
  mlnsOfConsultation: commonValidations.mlnsOfConsultation.optional(),
  aboutUs: commonValidations.aboutUs.optional(),
  bankHolderName: commonValidations.bankHolderName.optional(),
  bankAccountNo: commonValidations.bankAccountNo.optional(),
  branch: commonValidations.branch.optional(),
  ifscCode: commonValidations.ifscCode.optional(),
  passBookImg: commonValidations.passBookImg.optional(),
  panCardImg: commonValidations.panCardImg.optional(),
  adhaarCardImg: commonValidations.adhaarCardImg.optional(),
  tdsCertificateImg: commonValidations.tdsCertificateImg.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Login validation schema (requires email and password)
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'any.required': 'Password is required'
    })
});

// Get user by ID validation schema
const getUserByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'User ID must be a number',
      'number.integer': 'User ID must be an integer',
      'number.positive': 'User ID must be a positive number'
    })
});

// Get all users query validation schema
const getAllUsersSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1'
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100'
    }),
  search: Joi.string()
    .trim()
    .max(100)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Search term cannot exceed 100 characters'
    }),
  status: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'Status must be a boolean value'
    }),
  sortBy: Joi.string()
    .valid('name', 'email', 'gender', 'online_status', 'business_name', 'business_type_id', 'business_category_id', 'created_on', 'updated_on')
    .default('created_on')
    .messages({
      'any.only': 'Sort by must be one of: name, email, gender, online_status, business_name, business_type_id, business_category_id, created_on, updated_on'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

// Update user by ID with ID in body validation schema
const updateUserByIdBodySchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'User ID must be a number',
      'number.integer': 'User ID must be an integer',
      'number.positive': 'User ID must be a positive number'
    }),
  fullName: commonValidations.fullName.optional(),
  mobile: commonValidations.mobile.optional(),
  email: commonValidations.email.optional(),
  password: commonValidations.password.optional(),
  address: commonValidations.address.optional(),
  status: commonValidations.status.optional()
}).min(2).messages({
  'object.min': 'At least one field (other than ID) must be provided for update'
});

// Change password validation schema
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.empty': 'Current password is required'
    }),
  newPassword: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.empty': 'New password is required',
      'string.min': 'New password must be at least 6 characters long',
      'string.max': 'New password cannot exceed 128 characters'
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'string.empty': 'Confirm password is required',
      'any.only': 'Confirm password must match new password'
    })
});

// Send OTP validation schema
const sendOTPSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    })
});

// Verify OTP validation schema
const verifyOTPSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    }),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.empty': 'OTP is required',
      'string.length': 'OTP must be exactly 6 digits',
      'string.pattern.base': 'OTP must contain only numbers',
      'any.required': 'OTP is required'
    })
});

// Update notification settings validation schema
const updateNotificationSettingsSchema = Joi.object({
  notificationSettings: Joi.array()
    .items(
      Joi.object({
        settingName: Joi.string().trim().required().messages({
          'string.empty': 'Setting name is required',
          'any.required': 'Setting name is required'
        }),
        enabled: Joi.boolean().required().messages({
          'boolean.base': 'Enabled must be a boolean value',
          'any.required': 'Enabled is required'
        })
      })
    )
    .required()
    .min(1)
    .messages({
      'array.base': 'Notification settings must be an array',
      'array.min': 'At least one notification setting is required',
      'any.required': 'Notification settings are required'
    })
});

// Update privacy settings validation schema
const updatePrivacySettingsSchema = Joi.object({
  manageYourPrivacy: Joi.array()
    .items(
      Joi.object({
        privacyName: Joi.string().trim().required().messages({
          'string.empty': 'Privacy name is required',
          'any.required': 'Privacy name is required'
        }),
        enabled: Joi.boolean().required().messages({
          'boolean.base': 'Enabled must be a boolean value',
          'any.required': 'Enabled is required'
        })
      })
    )
    .required()
    .min(1)
    .messages({
      'array.base': 'Privacy settings must be an array',
      'array.min': 'At least one privacy setting is required',
      'any.required': 'Privacy settings are required'
    })
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateUserByIdBodySchema,
  loginSchema,
  getUserByIdSchema,
  getAllUsersSchema,
  changePasswordSchema,
  sendOTPSchema,
  verifyOTPSchema,
  updateNotificationSettingsSchema,
  updatePrivacySettingsSchema
};
