const Joi = require('joi');

const commonValidations = {
  class_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Class ID must be a number',
      'number.integer': 'Class ID must be an integer',
      'number.positive': 'Class ID must be a positive number',
      'any.required': 'Class ID is required'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

const createClassShareUserSchema = Joi.object({
  class_id: commonValidations.class_id,
  status: commonValidations.status
});

const updateClassShareUserSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Class Share Map User ID must be a number',
      'number.integer': 'Class Share Map User ID must be an integer',
      'number.positive': 'Class Share Map User ID must be a positive number',
      'any.required': 'Class Share Map User ID is required'
    }),
  class_id: commonValidations.class_id.optional(),
  status: commonValidations.status.optional()
}).min(2).messages({
  'object.min': 'At least one field besides id must be provided for update'
});

const getClassShareUserByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Class Share Map User ID must be a number',
      'number.integer': 'Class Share Map User ID must be an integer',
      'number.positive': 'Class Share Map User ID must be a positive number'
    })
});

const getAllClassShareUserSchema = Joi.object({
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
  class_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Class ID must be a number',
      'number.integer': 'Class ID must be an integer',
      'number.positive': 'Class ID must be a positive number'
    }),
  sortBy: Joi.string()
    .valid('class_id', 'status', 'created_at', 'updated_at')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: class_id, status, created_at, updated_at'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createClassShareUserSchema,
  updateClassShareUserSchema,
  getClassShareUserByIdSchema,
  getAllClassShareUserSchema
};
