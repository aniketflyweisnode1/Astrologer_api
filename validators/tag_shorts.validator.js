const Joi = require('joi');

/**
 * Tag_Shorts validation schemas using Joi
 */

// Common validation patterns
const commonValidations = {
  shorts_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Shorts ID must be a number',
      'number.integer': 'Shorts ID must be an integer',
      'number.positive': 'Shorts ID must be a positive number',
      'any.required': 'Shorts ID is required'
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

  status: Joi.boolean()
    .default(true)
    .optional()
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

// Create tag_shorts validation schema
const createTagShortsSchema = Joi.object({
  shorts_id: commonValidations.shorts_id
});

// Update tag_shorts validation schema
const updateTagShortsSchema = Joi.object({
  shorts_id: commonValidations.shorts_id.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Get tag_shorts by ID validation schema
const getTagShortsByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Tag shorts ID must be a number',
      'number.integer': 'Tag shorts ID must be an integer',
      'number.positive': 'Tag shorts ID must be a positive number',
      'any.required': 'Tag shorts ID is required'
    })
});

// Get all tag_shorts query validation schema
const getAllTagShortsSchema = Joi.object({
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
  user_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'User ID must be a number',
      'number.integer': 'User ID must be an integer',
      'number.positive': 'User ID must be a positive number'
    }),
  shorts_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Shorts ID must be a number',
      'number.integer': 'Shorts ID must be an integer',
      'number.positive': 'Shorts ID must be a positive number'
    }),
  sortBy: Joi.string()
    .valid('created_at', 'updated_at')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: created_at, updated_at'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

// Get tags by shorts ID validation schema
const getTagsByShortsIdSchema = Joi.object({
  shorts_id: Joi.number()
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

module.exports = {
  createTagShortsSchema,
  updateTagShortsSchema,
  getTagShortsByIdSchema,
  getAllTagShortsSchema,
  getTagsByShortsIdSchema
};
