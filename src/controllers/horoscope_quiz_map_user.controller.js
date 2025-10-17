const HoroscopeQuizMapUser = require('../models/horoscope_quiz_map_user.model');

const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new horoscope quiz map user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createHoroscopeQuizMapUser = asyncHandler(async (req, res) => {
  try {
    // Create quiz map user data
    const quizMapUserData = {
      ...req.body,
      user_id: req.userId,
      created_by: req.userId || null
    };

    // Create quiz map user
    const quizMapUser = await HoroscopeQuizMapUser.create(quizMapUserData);

    sendSuccess(res, quizMapUser, 'Horoscope quiz map user created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all horoscope quiz map users with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllHoroscopeQuizMapUsers = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      user_id,
      question_id,
      sortBy = 'created_on',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Add user_id filter
    if (user_id) {
      filter.user_id = parseInt(user_id);
    }

    // Add question_id filter
    if (question_id) {
      filter.question_id = parseInt(question_id);
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
    const [quizMapUsers, total] = await Promise.all([
      HoroscopeQuizMapUser.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      HoroscopeQuizMapUser.countDocuments(filter)
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

    sendPaginated(res, quizMapUsers, pagination, 'Horoscope quiz map users retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get horoscope quiz map user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHoroscopeQuizMapUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const quizMapUser = await HoroscopeQuizMapUser.findOne({ 
      Horoscope_quiz_Map_user_id: parseInt(id) 
    });

    if (!quizMapUser) {
      return sendNotFound(res, 'Horoscope quiz map user not found');
    }

    sendSuccess(res, quizMapUser, 'Horoscope quiz map user retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update horoscope quiz map user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateHoroscopeQuizMapUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_on: new Date()
    };

    const quizMapUser = await HoroscopeQuizMapUser.findOneAndUpdate(
      { Horoscope_quiz_Map_user_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!quizMapUser) {
      return sendNotFound(res, 'Horoscope quiz map user not found');
    }

    sendSuccess(res, quizMapUser, 'Horoscope quiz map user updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete horoscope quiz map user by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteHoroscopeQuizMapUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const quizMapUser = await HoroscopeQuizMapUser.findOneAndUpdate(
      { Horoscope_quiz_Map_user_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_on: new Date()
      },
      { new: true }
    );

    if (!quizMapUser) {
      return sendNotFound(res, 'Horoscope quiz map user not found');
    }

    sendSuccess(res, quizMapUser, 'Horoscope quiz map user deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get high score users for horoscope quiz
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHighScoreUsers = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      question_id,
      sortBy = 'created_on',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {
      status: true
    };

    // Add question_id filter if provided
    if (question_id) {
      filter.question_id = parseInt(question_id);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [quizMapUsers, total] = await Promise.all([
      HoroscopeQuizMapUser.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      HoroscopeQuizMapUser.countDocuments(filter)
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

    sendPaginated(res, quizMapUsers, pagination, 'High score users retrieved successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createHoroscopeQuizMapUser,
  getAllHoroscopeQuizMapUsers,
  getHoroscopeQuizMapUserById,
  updateHoroscopeQuizMapUser,
  deleteHoroscopeQuizMapUser,
  getHighScoreUsers
};
