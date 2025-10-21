const Tag_Shorts = require('../models/tag_shorts.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new tag for shorts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createTagShorts = asyncHandler(async (req, res) => {
  try {
    const { shorts_id } = req.body;

    // Check if user already tagged this short
    const existingTag = await Tag_Shorts.findOne({
      user_id: req.userId,
      shorts_id: shorts_id,
      status: true
    });

    if (existingTag) {
      return sendError(res, 'You have already tagged this short', 400);
    }

    // Create tag data
    const tagData = {
      user_id: req.userId,
      shorts_id: shorts_id,
      created_by: req.userId
    };

    // Create tag
    const tag = await Tag_Shorts.create(tagData);

    sendSuccess(res, tag, 'Short tagged successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all tags with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllTagShorts = asyncHandler(async (req, res) => {
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
    const [tags, total] = await Promise.all([
      Tag_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Tag_Shorts.countDocuments(filter)
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

    sendPaginated(res, tags, pagination, 'Tags retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get tag by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTagShortsById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag_Shorts.findOne({ tag_shorts_id: parseInt(id) });

    if (!tag) {
      return sendNotFound(res, 'Tag not found');
    }

    sendSuccess(res, tag, 'Tag retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update tag by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateTagShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const tag = await Tag_Shorts.findOneAndUpdate(
      { tag_shorts_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!tag) {
      return sendNotFound(res, 'Tag not found');
    }

    sendSuccess(res, tag, 'Tag updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete tag by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteTagShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag_Shorts.findOneAndUpdate(
      { tag_shorts_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!tag) {
      return sendNotFound(res, 'Tag not found');
    }

    sendSuccess(res, tag, 'Tag deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get tags by shorts ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTagsByShortsId = asyncHandler(async (req, res) => {
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
    const [tags, total] = await Promise.all([
      Tag_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Tag_Shorts.countDocuments(filter)
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

    sendPaginated(res, tags, pagination, `Tags for shorts ${shorts_id} retrieved successfully`);
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTagShorts,
  getAllTagShorts,
  getTagShortsById,
  updateTagShorts,
  deleteTagShorts,
  getTagsByShortsId
};
