const Joi = require('joi');

/**
 * Stream validation schemas using Joi
 */

// Common validation patterns
const commonValidations = {
  title: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 2 characters long',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required'
    }),

  datetime: Joi.date()
    .required()
    .messages({
      'date.base': 'Date and time must be a valid date',
      'any.required': 'Date and time is required'
    }),

  streamType: Joi.string()
    .trim()
    .max(50)
    .required()
    .messages({
      'string.empty': 'Stream type is required',
      'string.max': 'Stream type cannot exceed 50 characters',
      'any.required': 'Stream type is required'
    }),

  language_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Language ID must be a number',
      'number.integer': 'Language ID must be an integer',
      'number.positive': 'Language ID must be a positive number',
      'any.required': 'Language ID is required'
    }),

  category_topic_tag: Joi.string()
    .trim()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Category topic tag cannot exceed 500 characters'
    }),

  entry_fee: Joi.number()
    .min(0)
    .default(0)
    .optional()
    .messages({
      'number.base': 'Entry fee must be a number',
      'number.min': 'Entry fee cannot be negative'
    }),

  visibility: Joi.string()
    .valid('public', 'private', 'unlisted')
    .default('public')
    .optional()
    .messages({
      'any.only': 'Visibility must be one of: public, private, unlisted'
    }),

  description_sessionAgenda: Joi.string()
    .trim()
    .max(1000)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 1000 characters'
    }),

  thumbnail_banner_image: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .allow('')
    .messages({
      'string.uri': 'Thumbnail banner image must be a valid URL'
    }),

  session_status: Joi.string()
    .valid('scheduled', 'live', 'ended', 'cancelled')
    .default('scheduled')
    .optional()
    .messages({
      'any.only': 'Session status must be one of: scheduled, live, ended, cancelled'
    }),

  status: Joi.boolean()
    .default(true)
    .optional()
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

// Create stream validation schema
const createStreamSchema = Joi.object({
  title: commonValidations.title,
  datetime: commonValidations.datetime,
  streamType: commonValidations.streamType,
  language_id: commonValidations.language_id,
  category_topic_tag: commonValidations.category_topic_tag,
  entry_fee: commonValidations.entry_fee,
  visibility: commonValidations.visibility,
  description_sessionAgenda: commonValidations.description_sessionAgenda,
  thumbnail_banner_image: commonValidations.thumbnail_banner_image,
  session_status: commonValidations.session_status,
  status: commonValidations.status
});

// Update stream validation schema
const updateStreamSchema = Joi.object({
  title: commonValidations.title.optional(),
  datetime: commonValidations.datetime.optional(),
  streamType: commonValidations.streamType.optional(),
  language_id: commonValidations.language_id.optional(),
  category_topic_tag: commonValidations.category_topic_tag.optional(),
  entry_fee: commonValidations.entry_fee.optional(),
  visibility: commonValidations.visibility.optional(),
  description_sessionAgenda: commonValidations.description_sessionAgenda.optional(),
  thumbnail_banner_image: commonValidations.thumbnail_banner_image.optional(),
  session_status: commonValidations.session_status.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Get stream by ID validation schema
const getStreamByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Stream ID must be a number',
      'number.integer': 'Stream ID must be an integer',
      'number.positive': 'Stream ID must be a positive number',
      'any.required': 'Stream ID is required'
    })
});

// Get all streams query validation schema
const getAllStreamsSchema = Joi.object({
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
  session_status: Joi.string()
    .valid('scheduled', 'live', 'ended', 'cancelled')
    .optional()
    .messages({
      'any.only': 'Session status must be one of: scheduled, live, ended, cancelled'
    }),
  streamType: Joi.string()
    .trim()
    .max(50)
    .optional()
    .messages({
      'string.max': 'Stream type cannot exceed 50 characters'
    }),
  language_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Language ID must be a number',
      'number.integer': 'Language ID must be an integer',
      'number.positive': 'Language ID must be a positive number'
    }),
  sortBy: Joi.string()
    .valid('title', 'datetime', 'streamType', 'session_status', 'created_at', 'updated_at')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: title, datetime, streamType, session_status, created_at, updated_at'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createStreamSchema,
  updateStreamSchema,
  getStreamByIdSchema,
  getAllStreamsSchema
};
