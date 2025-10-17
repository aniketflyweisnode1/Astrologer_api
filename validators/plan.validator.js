const Joi = require('joi');

/**
 * Plan validation schemas using Joi
 */

// Common validation patterns
const commonValidations = {
  Name: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Plan name is required',
      'string.min': 'Plan name must be at least 2 characters long',
      'string.max': 'Plan name cannot exceed 200 characters',
      'any.required': 'Plan name is required'
    }),

  emozi: Joi.string()
    .trim()
    .max(10)
    .required()
    .messages({
      'string.empty': 'Emoji is required',
      'string.max': 'Emoji cannot exceed 10 characters',
      'any.required': 'Emoji is required'
    }),

  StartDate: Joi.date()
    .required()
    .messages({
      'date.base': 'Start date must be a valid date',
      'any.required': 'Start date is required'
    }),

  mainHeadingText: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .required()
    .messages({
      'string.empty': 'Main heading text is required',
      'string.min': 'Main heading text must be at least 5 characters long',
      'string.max': 'Main heading text cannot exceed 500 characters',
      'any.required': 'Main heading text is required'
    }),

  TimePried: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Time period is required',
      'string.min': 'Time period must be at least 2 characters long',
      'string.max': 'Time period cannot exceed 100 characters',
      'any.required': 'Time period is required'
    }),

  Textline: Joi.array()
    .items(
      Joi.object({
        txt: Joi.string()
          .trim()
          .min(1)
          .max(500)
          .required()
          .messages({
            'string.empty': 'Text is required',
            'string.min': 'Text must be at least 1 character long',
            'string.max': 'Text cannot exceed 500 characters',
            'any.required': 'Text is required'
          }),
        icon: Joi.string()
          .trim()
          .min(1)
          .max(50)
          .required()
          .messages({
            'string.empty': 'Icon is required',
            'string.min': 'Icon must be at least 1 character long',
            'string.max': 'Icon cannot exceed 50 characters',
            'any.required': 'Icon is required'
          })
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Textline must be an array',
      'array.min': 'At least one text line is required',
      'any.required': 'Textline is required'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

// Create plan validation schema
const createPlanSchema = Joi.object({
  Name: commonValidations.Name,
  emozi: commonValidations.emozi,
  StartDate: commonValidations.StartDate,
  mainHeadingText: commonValidations.mainHeadingText,
  TimePried: commonValidations.TimePried,
  Textline: commonValidations.Textline,
  status: commonValidations.status
});

// Update plan validation schema
const updatePlanSchema = Joi.object({
  Name: commonValidations.Name.optional(),
  emozi: commonValidations.emozi.optional(),
  StartDate: commonValidations.StartDate.optional(),
  mainHeadingText: commonValidations.mainHeadingText.optional(),
  TimePried: commonValidations.TimePried.optional(),
  Textline: commonValidations.Textline.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Get plan by ID validation schema
const getPlanByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Plan ID must be a number',
      'number.integer': 'Plan ID must be an integer',
      'number.positive': 'Plan ID must be a positive number'
    })
});

// Get all plans query validation schema
const getAllPlansSchema = Joi.object({
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
    .valid('Plan_id', 'Name', 'StartDate', 'TimePried', 'created_on', 'updated_on')
    .default('created_on')
    .messages({
      'any.only': 'Sort by must be one of: Plan_id, Name, StartDate, TimePried, created_on, updated_on'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createPlanSchema,
  updatePlanSchema,
  getPlanByIdSchema,
  getAllPlansSchema
};
