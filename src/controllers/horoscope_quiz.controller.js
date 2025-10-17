const HoroscopeQuiz = require('../models/horoscope_quiz.model');

const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new horoscope quiz
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createHoroscopeQuiz = asyncHandler(async (req, res) => {
  try {
    // Create quiz data
    const quizData = {
      ...req.body,
      created_by: req.userId || null
    };

    // Create quiz
    const quiz = await HoroscopeQuiz.create(quizData);

    sendSuccess(res, quiz, 'Horoscope quiz created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all horoscope quizzes with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllHoroscopeQuizzes = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      sortBy = 'created_on',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Add search filter
    if (search) {
      filter.$or = [
        { QuestionText: { $regex: search, $options: 'i' } }
      ];
    }

    // Add status filter
    if (status !== undefined) {
      filter.status = status === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [quizzes, total] = await Promise.all([
      HoroscopeQuiz.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      HoroscopeQuiz.countDocuments(filter)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const pagination = {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit),
      hasNextPage,
      hasPrevPage
    };

    sendPaginated(res, quizzes, pagination, 'Horoscope quizzes retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get horoscope quiz by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHoroscopeQuizById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await HoroscopeQuiz.findOne({ question_id: parseInt(id) });

    if (!quiz) {
      return sendNotFound(res, 'Horoscope quiz not found');
    }

    sendSuccess(res, quiz, 'Horoscope quiz retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update horoscope quiz by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateHoroscopeQuiz = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_on: new Date()
    };

    const quiz = await HoroscopeQuiz.findOneAndUpdate(
      { question_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!quiz) {
      return sendNotFound(res, 'Horoscope quiz not found');
    }

    sendSuccess(res, quiz, 'Horoscope quiz updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete horoscope quiz by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteHoroscopeQuiz = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await HoroscopeQuiz.findOneAndUpdate(
      { question_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_on: new Date()
      },
      { new: true }
    );

    if (!quiz) {
      return sendNotFound(res, 'Horoscope quiz not found');
    }

    sendSuccess(res, quiz, 'Horoscope quiz deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get horoscope quiz by authenticated user (created by user)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHoroscopeQuizByAuth = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      sortBy = 'created_on',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {
      created_by: req.userId
    };

    // Add search filter
    if (search) {
      filter.$or = [
        { QuestionText: { $regex: search, $options: 'i' } }
      ];
    }

    // Add status filter
    if (status !== undefined) {
      filter.status = status === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [quizzes, total] = await Promise.all([
      HoroscopeQuiz.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      HoroscopeQuiz.countDocuments(filter)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const pagination = {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit),
      hasNextPage,
      hasPrevPage
    };

    sendPaginated(res, quizzes, pagination, 'User horoscope quizzes retrieved successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createHoroscopeQuiz,
  getAllHoroscopeQuizzes,
  getHoroscopeQuizById,
  updateHoroscopeQuiz,
  deleteHoroscopeQuiz,
  getHoroscopeQuizByAuth
};
