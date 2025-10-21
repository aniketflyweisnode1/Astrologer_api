const Comment_Shorts = require('../models/comment_shorts.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new comment for shorts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createCommentShorts = asyncHandler(async (req, res) => {
  try {
    const { shorts_id, comment } = req.body;

    // Create comment data
    const commentData = {
      user_id: req.userId,
      shorts_id: shorts_id,
      comment: comment,
      created_by: req.userId
    };

    // Create comment
    const newComment = await Comment_Shorts.create(commentData);

    sendSuccess(res, newComment, 'Comment added successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all comments with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllCommentShorts = asyncHandler(async (req, res) => {
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
    const [comments, total] = await Promise.all([
      Comment_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Comment_Shorts.countDocuments(filter)
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

    sendPaginated(res, comments, pagination, 'Comments retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get comment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCommentShortsById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment_Shorts.findOne({ comment_shorts_id: parseInt(id) });

    if (!comment) {
      return sendNotFound(res, 'Comment not found');
    }

    sendSuccess(res, comment, 'Comment retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update comment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateCommentShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const comment = await Comment_Shorts.findOneAndUpdate(
      { comment_shorts_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!comment) {
      return sendNotFound(res, 'Comment not found');
    }

    sendSuccess(res, comment, 'Comment updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete comment by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteCommentShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment_Shorts.findOneAndUpdate(
      { comment_shorts_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!comment) {
      return sendNotFound(res, 'Comment not found');
    }

    sendSuccess(res, comment, 'Comment deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get comments by shorts ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCommentsByShortsId = asyncHandler(async (req, res) => {
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
    const [comments, total] = await Promise.all([
      Comment_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Comment_Shorts.countDocuments(filter)
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

    sendPaginated(res, comments, pagination, `Comments for shorts ${shorts_id} retrieved successfully`);
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createCommentShorts,
  getAllCommentShorts,
  getCommentShortsById,
  updateCommentShorts,
  deleteCommentShorts,
  getCommentsByShortsId
};
