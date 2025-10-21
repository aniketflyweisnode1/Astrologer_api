const Joi = require('joi');

/**
 * My_Shorts validation schemas using Joi
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

  image_video: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.empty': 'Image or video is required',
      'string.uri': 'Image/video must be a valid URL',
      'any.required': 'Image or video is required'
    }),

  status: Joi.boolean()
    .default(true)
    .optional()
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

// Create my_shorts validation schema
const createMyShortsSchema = Joi.object({
  title: commonValidations.title,
  image_video: commonValidations.image_video,
  status: commonValidations.status
});

// Update my_shorts validation schema
const updateMyShortsSchema = Joi.object({
  title: commonValidations.title.optional(),
  image_video: commonValidations.image_video.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Get my_shorts by ID validation schema
const getMyShortsByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Shorts ID must be a number',
      'number.integer': 'Shorts ID must be an integer',
      'number.positive': 'Shorts ID must be a positive number',
      'any.required': 'Shorts ID is required'
    })
});

// Get all my_shorts query validation schema
const getAllMyShortsSchema = Joi.object({
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
  sortBy: Joi.string()
    .valid('title', 'created_at', 'updated_at')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: title, created_at, updated_at'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createMyShortsSchema,
  updateMyShortsSchema,
  getMyShortsByIdSchema,
  getAllMyShortsSchema
};
