const Joi = require('joi');

/**
 * Gift validation schemas using Joi
 */

// Common validation patterns
const commonValidations = {
  name: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Gift name is required',
      'string.min': 'Gift name must be at least 2 characters long',
      'string.max': 'Gift name cannot exceed 200 characters',
      'any.required': 'Gift name is required'
    }),

  cost: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Gift cost must be a number',
      'number.min': 'Gift cost cannot be negative',
      'any.required': 'Gift cost is required'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

// Create gift validation schema
const createGiftSchema = Joi.object({
  name: commonValidations.name,
  cost: commonValidations.cost,
  status: commonValidations.status
});

// Update gift validation schema
const updateGiftSchema = Joi.object({
  name: commonValidations.name.optional(),
  cost: commonValidations.cost.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Get gift by ID validation schema
const getGiftByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Gift ID must be a number',
      'number.integer': 'Gift ID must be an integer',
      'number.positive': 'Gift ID must be a positive number'
    })
});

// Get all gifts query validation schema
const getAllGiftsSchema = Joi.object({
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
    .valid('gift_id', 'name', 'cost', 'created_on', 'updated_on')
    .default('created_on')
    .messages({
      'any.only': 'Sort by must be one of: gift_id, name, cost, created_on, updated_on'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createGiftSchema,
  updateGiftSchema,
  getGiftByIdSchema,
  getAllGiftsSchema
};
