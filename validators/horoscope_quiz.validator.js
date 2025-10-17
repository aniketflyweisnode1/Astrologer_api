const Joi = require('joi');

/**
 * Horoscope Quiz validation schemas using Joi
 */

// Common validation patterns
const commonValidations = {
  Time: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Time must be a number',
      'number.integer': 'Time must be an integer',
      'number.min': 'Time must be at least 1 minute',
      'any.required': 'Time is required'
    }),

  QuestionText: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Question text is required',
      'string.min': 'Question text must be at least 10 characters long',
      'string.max': 'Question text cannot exceed 1000 characters',
      'any.required': 'Question text is required'
    }),

  Answer: Joi.array()
    .items(
      Joi.object({
        A: Joi.string()
          .trim()
          .max(200)
          .required()
          .messages({
            'string.empty': 'Option A is required',
            'string.max': 'Option A cannot exceed 200 characters',
            'any.required': 'Option A is required'
          }),
        ans: Joi.boolean()
          .required()
          .messages({
            'boolean.base': 'Answer flag for option A must be a boolean',
            'any.required': 'Answer flag for option A is required'
          })
      }),
      Joi.object({
        B: Joi.string()
          .trim()
          .max(200)
          .required()
          .messages({
            'string.empty': 'Option B is required',
            'string.max': 'Option B cannot exceed 200 characters',
            'any.required': 'Option B is required'
          }),
        ans: Joi.boolean()
          .required()
          .messages({
            'boolean.base': 'Answer flag for option B must be a boolean',
            'any.required': 'Answer flag for option B is required'
          })
      }),
      Joi.object({
        C: Joi.string()
          .trim()
          .max(200)
          .required()
          .messages({
            'string.empty': 'Option C is required',
            'string.max': 'Option C cannot exceed 200 characters',
            'any.required': 'Option C is required'
          }),
        ans: Joi.boolean()
          .required()
          .messages({
            'boolean.base': 'Answer flag for option C must be a boolean',
            'any.required': 'Answer flag for option C is required'
          })
      }),
      Joi.object({
        D: Joi.string()
          .trim()
          .max(200)
          .required()
          .messages({
            'string.empty': 'Option D is required',
            'string.max': 'Option D cannot exceed 200 characters',
            'any.required': 'Option D is required'
          }),
        ans: Joi.boolean()
          .required()
          .messages({
            'boolean.base': 'Answer flag for option D must be a boolean',
            'any.required': 'Answer flag for option D is required'
          })
      })
    )
    .length(4)
    .required()
    .messages({
      'array.base': 'Answer must be an array',
      'array.length': 'Answer must contain exactly 4 options (A, B, C, D)',
      'any.required': 'Answer is required'
    }),

  status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status must be a boolean value'
    })
};

// Create horoscope quiz validation schema
const createHoroscopeQuizSchema = Joi.object({
  Time: commonValidations.Time,
  QuestionText: commonValidations.QuestionText,
  Answer: commonValidations.Answer,
  status: commonValidations.status
});

// Update horoscope quiz validation schema
const updateHoroscopeQuizSchema = Joi.object({
  Time: commonValidations.Time.optional(),
  QuestionText: commonValidations.QuestionText.optional(),
  Answer: commonValidations.Answer.optional(),
  status: commonValidations.status.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Get horoscope quiz by ID validation schema
const getHoroscopeQuizByIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Question ID must be a number',
      'number.integer': 'Question ID must be an integer',
      'number.positive': 'Question ID must be a positive number'
    })
});

// Get all horoscope quizzes query validation schema
const getAllHoroscopeQuizzesSchema = Joi.object({
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
    .valid('question_id', 'Time', 'QuestionText', 'created_on', 'updated_on')
    .default('created_on')
    .messages({
      'any.only': 'Sort by must be one of: question_id, Time, QuestionText, created_on, updated_on'
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
});

module.exports = {
  createHoroscopeQuizSchema,
  updateHoroscopeQuizSchema,
  getHoroscopeQuizByIdSchema,
  getAllHoroscopeQuizzesSchema
};
