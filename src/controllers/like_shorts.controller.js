const Like_Shorts = require('../models/like_shorts.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new like for shorts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createLikeShorts = asyncHandler(async (req, res) => {
  try {
    const { shorts_id } = req.body;

    // Check if user already liked this short
    const existingLike = await Like_Shorts.findOne({
      user_id: req.userId,
      shorts_id: shorts_id,
      status: true
    });

    if (existingLike) {
      return sendError(res, 'You have already liked this short', 400);
    }

    // Create like data
    const likeData = {
      user_id: req.userId,
      shorts_id: shorts_id,
      created_by: req.userId
    };

    // Create like
    const like = await Like_Shorts.create(likeData);

    sendSuccess(res, like, 'Short liked successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all likes with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllLikeShorts = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      user_id,
      shorts_id,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Add user filter
    if (user_id) {
      filter.user_id = parseInt(user_id);
    }

    // Add shorts filter
    if (shorts_id) {
      filter.shorts_id = parseInt(shorts_id);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [likes, total] = await Promise.all([
      Like_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Like_Shorts.countDocuments(filter)
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

    sendPaginated(res, likes, pagination, 'Likes retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get like by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getLikeShortsById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const like = await Like_Shorts.findOne({ like_shorts_id: parseInt(id) });

    if (!like) {
      return sendNotFound(res, 'Like not found');
    }

    sendSuccess(res, like, 'Like retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update like by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateLikeShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const like = await Like_Shorts.findOneAndUpdate(
      { like_shorts_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!like) {
      return sendNotFound(res, 'Like not found');
    }

    sendSuccess(res, like, 'Like updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete like by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteLikeShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const like = await Like_Shorts.findOneAndUpdate(
      { like_shorts_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!like) {
      return sendNotFound(res, 'Like not found');
    }

    sendSuccess(res, like, 'Like deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get likes by shorts ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getLikesByShortsId = asyncHandler(async (req, res) => {
  try {
    const { shorts_id } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {
      shorts_id: parseInt(shorts_id)
    };

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [likes, total] = await Promise.all([
      Like_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Like_Shorts.countDocuments(filter)
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

    sendPaginated(res, likes, pagination, `Likes for shorts ${shorts_id} retrieved successfully`);
  } catch (error) {
    throw error;
  }
});

/**
 * Unlike a short (toggle like)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const unlikeShorts = asyncHandler(async (req, res) => {
  try {
    const { shorts_id } = req.body;

    // Find existing like
    const existingLike = await Like_Shorts.findOne({
      user_id: req.userId,
      shorts_id: shorts_id,
      status: true
    });

    if (!existingLike) {
      return sendError(res, 'You have not liked this short', 400);
    }

    // Soft delete the like
    const like = await Like_Shorts.findOneAndUpdate(
      { like_shorts_id: existingLike.like_shorts_id },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    sendSuccess(res, like, 'Short unliked successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createLikeShorts,
  getAllLikeShorts,
  getLikeShortsById,
  updateLikeShorts,
  deleteLikeShorts,
  getLikesByShortsId,
  unlikeShorts
};
