const Joi = require('joi');

/**
 * Horoscope Quiz Claim Gift validation schemas using Joi
 */

// Common validation patterns
const commonValidations = {
  name: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 200 characters',
      'any.required': 'Name is required'
    }),

  address: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.empty': 'Address is required',
      'string.min': 'Address must be at least 10 characters long',
      'string.max': 'Address cannot exceed 500 characters',
      'any.required': 'Address is required'
    }),

  mobileno: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty': 'Mobile number is required',
      'string.pattern.base': 'Please enter a valid 10-digit mobile number',
      'any.required': 'Mobile number is required'
    }),

  pincode: Joi.string()
    .trim()
    .min(3)
    .max(10)
    .required()
    .messages({
      'string.empty': 'Pincode is required',
      'string.min': 'Pincode must be at least 3 characters long',
      'string.max': 'Pincode cannot exceed 10 characters',
      'any.required': 'Pincode is required'
    }),

  gift_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Gift ID must be a number',
      'number.integer': 'Gift ID must be an integer',
      'number.positive': 'Gift ID must be a positive number',
      'any.required': 'Gift ID is required'
    }),

  map: Joi.string()
    .trim()
    .max(1000)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Map data cannot exceed 1000 characters'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

// Create horoscope quiz claim gift validation schema
const createHoroscopeQuizClaimGiftSchema = Joi.object({
  name: commonValidations.name,
  address: commonValidations.address,
  mobileno: commonValidations.mobileno,
  pincode: commonValidations.pincode,
  gift_id: commonValidations.gift_id,
  map: commonValidations.map,
  status: commonValidations.status
});

// Update horoscope quiz claim gift validation schema
const updateHoroscopeQuizClaimGiftSchema = Joi.object({
  name: commonValidations.name.optional(),
  address: commonValidations.address.optional(),
  mobileno: commonValidations.mobileno.optional(),
  pincode: commonValidations.pincode.optional(),
  gift_id: commonValidations.gift_id.optional(),
  map: commonValidations.map.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Get horoscope quiz claim gift by ID validation schema
const getHoroscopeQuizClaimGiftByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Claim Gift ID must be a number',
      'number.integer': 'Claim Gift ID must be an integer',
      'number.positive': 'Claim Gift ID must be a positive number'
    })
});

// Get all horoscope quiz claim gifts query validation schema
const getAllHoroscopeQuizClaimGiftsSchema = Joi.object({
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
  gift_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Gift ID must be a number',
      'number.integer': 'Gift ID must be an integer',
      'number.positive': 'Gift ID must be a positive number'
    }),
  sortBy: Joi.string()
    .valid('Horoscope_quiz_Claim_gift_id', 'name', 'gift_id', 'created_on', 'updated_on')
    .default('created_on')
    .messages({
      'any.only': 'Sort by must be one of: Horoscope_quiz_Claim_gift_id, name, gift_id, created_on, updated_on'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createHoroscopeQuizClaimGiftSchema,
  updateHoroscopeQuizClaimGiftSchema,
  getHoroscopeQuizClaimGiftByIdSchema,
  getAllHoroscopeQuizClaimGiftsSchema
};
