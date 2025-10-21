const My_Shorts = require('../models/my_shorts.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new short
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createMyShorts = asyncHandler(async (req, res) => {
  try {
    // Create shorts data
    const shortsData = {
      ...req.body,
      created_by: req.userId
    };

    // Create shorts
    const shorts = await My_Shorts.create(shortsData);

    sendSuccess(res, shorts, 'Short created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all shorts with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllMyShorts = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Add search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [shorts, total] = await Promise.all([
      My_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      My_Shorts.countDocuments(filter)
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

    sendPaginated(res, shorts, pagination, 'Shorts retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get short by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getMyShortsById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const shorts = await My_Shorts.findOne({ shorts_id: parseInt(id) });

    if (!shorts) {
      return sendNotFound(res, 'Short not found');
    }

    sendSuccess(res, shorts, 'Short retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update short by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateMyShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const shorts = await My_Shorts.findOneAndUpdate(
      { shorts_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!shorts) {
      return sendNotFound(res, 'Short not found');
    }

    sendSuccess(res, shorts, 'Short updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete short by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteMyShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const shorts = await My_Shorts.findOneAndUpdate(
      { shorts_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!shorts) {
      return sendNotFound(res, 'Short not found');
    }

    sendSuccess(res, shorts, 'Short deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get shorts by authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getMyShortsByAuth = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {
      created_by: req.userId
    };

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [shorts, total] = await Promise.all([
      My_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      My_Shorts.countDocuments(filter)
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

    sendPaginated(res, shorts, pagination, 'User shorts retrieved successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createMyShorts,
  getAllMyShorts,
  getMyShortsById,
  updateMyShorts,
  deleteMyShorts,
  getMyShortsByAuth
};
