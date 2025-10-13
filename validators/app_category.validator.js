const Joi = require('joi');

const commonValidations = {
  categoryName: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Category name is required',
      'string.min': 'Category name must be at least 2 characters long',
      'string.max': 'Category name cannot exceed 200 characters'
    }),

  image: Joi.string()
    .trim()
    .uri()
    .optional()
    .allow('')
    .messages({
      'string.uri': 'Image must be a valid URL'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

const createAppCategorySchema = Joi.object({
  categoryName: commonValidations.categoryName,
  image: commonValidations.image,
  status: commonValidations.status
});

const updateAppCategorySchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'App category ID must be a number',
      'number.integer': 'App category ID must be an integer',
      'number.positive': 'App category ID must be a positive number',
      'any.required': 'App category ID is required'
    }),
  categoryName: commonValidations.categoryName.optional(),
  image: commonValidations.image,
  status: commonValidations.status.optional()
}).min(2).messages({
  'object.min': 'At least one field besides id must be provided for update'
});

const getAppCategoryByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'App category ID must be a number',
      'number.integer': 'App category ID must be an integer',
      'number.positive': 'App category ID must be a positive number'
    })
});

const getAllAppCategorySchema = Joi.object({
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
    .valid('categoryName', 'created_at', 'updated_at')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: categoryName, created_at, updated_at'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createAppCategorySchema,
  updateAppCategorySchema,
  getAppCategoryByIdSchema,
  getAllAppCategorySchema
};

