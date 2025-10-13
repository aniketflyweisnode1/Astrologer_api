const Joi = require('joi');

const commonValidations = {
  walletAmount: Joi.number()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'Wallet amount must be a number',
      'number.min': 'Wallet amount cannot be negative'
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

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

const createWalletSchema = Joi.object({
  walletAmount: commonValidations.walletAmount.optional(),
  user_id: commonValidations.user_id,
  status: commonValidations.status.optional()
});

const updateWalletSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Wallet ID must be a number',
      'number.integer': 'Wallet ID must be an integer',
      'number.positive': 'Wallet ID must be a positive number',
      'any.required': 'Wallet ID is required'
    }),
  walletAmount: commonValidations.walletAmount.optional(),
  status: commonValidations.status.optional()
}).min(2).messages({
  'object.min': 'At least one field besides id must be provided for update'
});

const updateWalletByAuthSchema = Joi.object({
  walletAmount: commonValidations.walletAmount.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

const getWalletByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Wallet ID must be a number',
      'number.integer': 'Wallet ID must be an integer',
      'number.positive': 'Wallet ID must be a positive number'
    })
});

const getAllWalletsSchema = Joi.object({
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
  status: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'Status must be a boolean value'
    }),
  sortBy: Joi.string()
    .valid('walletAmount', 'created_at', 'updated_at')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: walletAmount, created_at, updated_at'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createWalletSchema,
  updateWalletSchema,
  updateWalletByAuthSchema,
  getWalletByIdSchema,
  getAllWalletsSchema
};

