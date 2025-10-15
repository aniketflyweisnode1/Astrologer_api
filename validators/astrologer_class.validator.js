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

  Title: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 2 characters long',
      'string.max': 'Title cannot exceed 200 characters'
    }),

  Classtype: Joi.string()
    .valid('Recorded Video', 'Audio', 'PDF', 'Live Session')
    .required()
    .messages({
      'any.only': 'Class type must be one of: Recorded Video, Audio, PDF, Live Session',
      'any.required': 'Class type is required'
    }),

  Category_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Category ID must be a number',
      'number.integer': 'Category ID must be an integer',
      'number.positive': 'Category ID must be a positive number',
      'any.required': 'Category ID is required'
    }),

  Duration: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Duration is required',
      'string.min': 'Duration must be at least 1 character long',
      'string.max': 'Duration cannot exceed 50 characters'
    }),

  upload_image: Joi.string()
    .trim()
    .optional()
    .allow('')
    .messages({
      'string.base': 'Upload image must be a string'
    }),

  Description: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters'
    }),

  Pricing: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Pricing must be a number',
      'number.min': 'Pricing cannot be negative',
      'any.required': 'Pricing is required'
    }),

  TargetAudience: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Target Audience is required',
      'string.min': 'Target Audience must be at least 2 characters long',
      'string.max': 'Target Audience cannot exceed 200 characters'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

const createAstrologerClassSchema = Joi.object({
  Astorloger_id: commonValidations.Astorloger_id,
  Title: commonValidations.Title,
  Classtype: commonValidations.Classtype,
  Category_id: commonValidations.Category_id,
  Duration: commonValidations.Duration,
  upload_image: commonValidations.upload_image,
  Description: commonValidations.Description,
  Pricing: commonValidations.Pricing,
  TargetAudience: commonValidations.TargetAudience,
  status: commonValidations.status
});

const updateAstrologerClassSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Class ID must be a number',
      'number.integer': 'Class ID must be an integer',
      'number.positive': 'Class ID must be a positive number',
      'any.required': 'Class ID is required'
    }),
  Astorloger_id: commonValidations.Astorloger_id.optional(),
  Title: commonValidations.Title.optional(),
  Classtype: commonValidations.Classtype.optional(),
  Category_id: commonValidations.Category_id.optional(),
  Duration: commonValidations.Duration.optional(),
  upload_image: commonValidations.upload_image,
  Description: commonValidations.Description.optional(),
  Pricing: commonValidations.Pricing.optional(),
  TargetAudience: commonValidations.TargetAudience.optional(),
  status: commonValidations.status.optional()
}).min(2).messages({
  'object.min': 'At least one field besides id must be provided for update'
});

const getAstrologerClassByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Class ID must be a number',
      'number.integer': 'Class ID must be an integer',
      'number.positive': 'Class ID must be a positive number'
    })
});

const getAstrologerClassByCategoryIdSchema = Joi.object({
  categoryId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Category ID must be a number',
      'number.integer': 'Category ID must be an integer',
      'number.positive': 'Category ID must be a positive number'
    })
});

const getAllAstrologerClassSchema = Joi.object({
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
  Classtype: Joi.string()
    .valid('Recorded Video', 'Audio', 'PDF', 'Live Session')
    .optional()
    .messages({
      'any.only': 'Class type must be one of: Recorded Video, Audio, PDF, Live Session'
    }),
  Category_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Category ID must be a number',
      'number.integer': 'Category ID must be an integer',
      'number.positive': 'Category ID must be a positive number'
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
  sortBy: Joi.string()
    .valid('Title', 'Classtype', 'Pricing', 'created_at', 'updated_at')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: Title, Classtype, Pricing, created_at, updated_at'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createAstrologerClassSchema,
  updateAstrologerClassSchema,
  getAstrologerClassByIdSchema,
  getAllAstrologerClassSchema,
  getAstrologerClassByCategoryIdSchema
};
