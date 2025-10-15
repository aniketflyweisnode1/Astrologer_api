const Joi = require('joi');

const commonValidations = {
  Astorloger_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Astrologer ID must be a number',
      'number.integer': 'Astrologer ID must be an integer',
      'number.positive': 'Astrologer ID must be a positive number',
      'any.required': 'Astrologer ID is required'
    }),

  user_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'User ID must be a number',
      'number.integer': 'User ID must be an integer',
      'number.positive': 'User ID must be a positive number',
      'any.required': 'User ID is required'
    }),

  CallStatus: Joi.string()
    .valid('Approve', 'Reject')
    .default('Approve')
    .messages({
      'any.only': 'Call Status must be either Approve or Reject'
    }),

  BooingStatus: Joi.string()
    .valid('Pending', 'Completed', 'Cancelled')
    .default('Pending')
    .messages({
      'any.only': 'Booking Status must be either Pending, Completed, or Cancelled'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

const createBookingAstrologerSchema = Joi.object({
  Astorloger_id: commonValidations.Astorloger_id,
  user_id: commonValidations.user_id,
  CallStatus: commonValidations.CallStatus,
  BooingStatus: commonValidations.BooingStatus,
  status: commonValidations.status
});

const updateBookingAstrologerSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Booking ID must be a number',
      'number.integer': 'Booking ID must be an integer',
      'number.positive': 'Booking ID must be a positive number',
      'any.required': 'Booking ID is required'
    }),
  Astorloger_id: commonValidations.Astorloger_id.optional(),
  user_id: commonValidations.user_id.optional(),
  CallStatus: commonValidations.CallStatus.optional(),
  BooingStatus: commonValidations.BooingStatus.optional(),
  status: commonValidations.status.optional()
}).min(2).messages({
  'object.min': 'At least one field besides id must be provided for update'
});

const getBookingAstrologerByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Booking ID must be a number',
      'number.integer': 'Booking ID must be an integer',
      'number.positive': 'Booking ID must be a positive number'
    })
});

const getAllBookingAstrologerSchema = Joi.object({
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
  CallStatus: Joi.string()
    .valid('Approve', 'Reject')
    .optional()
    .messages({
      'any.only': 'Call Status must be either Approve or Reject'
    }),
  BooingStatus: Joi.string()
    .valid('Pending', 'Completed', 'Cancelled')
    .optional()
    .messages({
      'any.only': 'Booking Status must be either Pending, Completed, or Cancelled'
    }),
  Astorloger_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Astrologer ID must be a number',
      'number.integer': 'Astrologer ID must be an integer',
      'number.positive': 'Astrologer ID must be a positive number'
    }),
  user_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'User ID must be a number',
      'number.integer': 'User ID must be an integer',
      'number.positive': 'User ID must be a positive number'
    }),
  sortBy: Joi.string()
    .valid('CallStatus', 'BooingStatus', 'created_at', 'updated_at')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: CallStatus, BooingStatus, created_at, updated_at'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createBookingAstrologerSchema,
  updateBookingAstrologerSchema,
  getBookingAstrologerByIdSchema,
  getAllBookingAstrologerSchema
};
