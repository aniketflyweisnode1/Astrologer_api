const Joi = require('joi');

/**
 * Plan Subscription By User validation schemas using Joi
 */

// Common validation patterns
const commonValidations = {
  Plan_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Plan ID must be a number',
      'number.integer': 'Plan ID must be an integer',
      'number.positive': 'Plan ID must be a positive number',
      'any.required': 'Plan ID is required'
    }),

  PayemntStatus: Joi.string()
    .valid('pending', 'completed', 'failed', 'refunded')
    .default('pending')
    .messages({
      'any.only': 'Payment status must be one of: pending, completed, failed, refunded'
    }),

  ExpiryDate: Joi.date()
    .required()
    .messages({
      'date.base': 'Expiry date must be a valid date',
      'any.required': 'Expiry date is required'
    }),

  Trangesction_id: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Transaction ID cannot exceed 100 characters'
    }),

  TrangactionStatus: Joi.string()
    .valid('pending', 'completed', 'failed', 'cancelled')
    .default('pending')
    .messages({
      'any.only': 'Transaction status must be one of: pending, completed, failed, cancelled'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

// Create plan subscription by user validation schema
const createPlanSubscriptionByUserSchema = Joi.object({
  Plan_id: commonValidations.Plan_id,
  PayemntStatus: commonValidations.PayemntStatus,
  ExpiryDate: commonValidations.ExpiryDate,
  Trangesction_id: commonValidations.Trangesction_id,
  TrangactionStatus: commonValidations.TrangactionStatus,
  status: commonValidations.status
});

// Update plan subscription by user validation schema
const updatePlanSubscriptionByUserSchema = Joi.object({
  Plan_id: commonValidations.Plan_id.optional(),
  PayemntStatus: commonValidations.PayemntStatus.optional(),
  ExpiryDate: commonValidations.ExpiryDate.optional(),
  Trangesction_id: commonValidations.Trangesction_id.optional(),
  TrangactionStatus: commonValidations.TrangactionStatus.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Get plan subscription by ID validation schema
const getPlanSubscriptionByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Plan Subscription ID must be a number',
      'number.integer': 'Plan Subscription ID must be an integer',
      'number.positive': 'Plan Subscription ID must be a positive number'
    })
});

// Get all plan subscriptions query validation schema
const getAllPlanSubscriptionsSchema = Joi.object({
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
  user_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'User ID must be a number',
      'number.integer': 'User ID must be an integer',
      'number.positive': 'User ID must be a positive number'
    }),
  Plan_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Plan ID must be a number',
      'number.integer': 'Plan ID must be an integer',
      'number.positive': 'Plan ID must be a positive number'
    }),
  PayemntStatus: Joi.string()
    .valid('pending', 'completed', 'failed', 'refunded')
    .optional()
    .messages({
      'any.only': 'Payment status must be one of: pending, completed, failed, refunded'
    }),
  TrangactionStatus: Joi.string()
    .valid('pending', 'completed', 'failed', 'cancelled')
    .optional()
    .messages({
      'any.only': 'Transaction status must be one of: pending, completed, failed, cancelled'
    }),
  sortBy: Joi.string()
    .valid('Plan_Subscription_id', 'Plan_id', 'user_id', 'PayemntStatus', 'ExpiryDate', 'TrangactionStatus', 'created_on', 'updated_on')
    .default('created_on')
    .messages({
      'any.only': 'Sort by must be one of: Plan_Subscription_id, Plan_id, user_id, PayemntStatus, ExpiryDate, TrangactionStatus, created_on, updated_on'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createPlanSubscriptionByUserSchema,
  updatePlanSubscriptionByUserSchema,
  getPlanSubscriptionByIdSchema,
  getAllPlanSubscriptionsSchema
};
