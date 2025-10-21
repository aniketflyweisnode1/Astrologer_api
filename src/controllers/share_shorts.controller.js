const Share_Shorts = require('../models/share_shorts.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new share for shorts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createShareShorts = asyncHandler(async (req, res) => {
  try {
    const { shorts_id } = req.body;

    // Check if user already shared this short
    const existingShare = await Share_Shorts.findOne({
      user_id: req.userId,
      shorts_id: shorts_id,
      status: true
    });

    if (existingShare) {
      return sendError(res, 'You have already shared this short', 400);
    }

    // Create share data
    const shareData = {
      user_id: req.userId,
      shorts_id: shorts_id,
      created_by: req.userId
    };

    // Create share
    const share = await Share_Shorts.create(shareData);

    sendSuccess(res, share, 'Short shared successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all shares with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllShareShorts = asyncHandler(async (req, res) => {
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
    const [shares, total] = await Promise.all([
      Share_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Share_Shorts.countDocuments(filter)
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

    sendPaginated(res, shares, pagination, 'Shares retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get share by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getShareShortsById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const share = await Share_Shorts.findOne({ share_shorts_id: parseInt(id) });

    if (!share) {
      return sendNotFound(res, 'Share not found');
    }

    sendSuccess(res, share, 'Share retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update share by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateShareShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const share = await Share_Shorts.findOneAndUpdate(
      { share_shorts_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!share) {
      return sendNotFound(res, 'Share not found');
    }

    sendSuccess(res, share, 'Share updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete share by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteShareShorts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const share = await Share_Shorts.findOneAndUpdate(
      { share_shorts_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!share) {
      return sendNotFound(res, 'Share not found');
    }

    sendSuccess(res, share, 'Share deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get shares by shorts ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSharesByShortsId = asyncHandler(async (req, res) => {
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
    const [shares, total] = await Promise.all([
      Share_Shorts.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Share_Shorts.countDocuments(filter)
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

    sendPaginated(res, shares, pagination, `Shares for shorts ${shorts_id} retrieved successfully`);
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createShareShorts,
  getAllShareShorts,
  getShareShortsById,
  updateShareShorts,
  deleteShareShorts,
  getSharesByShortsId
};
