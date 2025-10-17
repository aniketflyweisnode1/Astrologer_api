const Gift = require('../models/gift.model');

const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new gift
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createGift = asyncHandler(async (req, res) => {
  try {
    // Create gift data
    const giftData = {
      ...req.body,
      created_by: req.userId || null
    };

    // Create gift
    const gift = await Gift.create(giftData);

    sendSuccess(res, gift, 'Gift created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all gifts with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllGifts = asyncHandler(async (req, res) => {
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
        { name: { $regex: search, $options: 'i' } }
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
    const [gifts, total] = await Promise.all([
      Gift.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Gift.countDocuments(filter)
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

    sendPaginated(res, gifts, pagination, 'Gifts retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get gift by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getGiftById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const gift = await Gift.findOne({ gift_id: parseInt(id) });

    if (!gift) {
      return sendNotFound(res, 'Gift not found');
    }

    sendSuccess(res, gift, 'Gift retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update gift by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateGift = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_on: new Date()
    };

    const gift = await Gift.findOneAndUpdate(
      { gift_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!gift) {
      return sendNotFound(res, 'Gift not found');
    }

    sendSuccess(res, gift, 'Gift updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete gift by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteGift = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const gift = await Gift.findOneAndUpdate(
      { gift_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_on: new Date()
      },
      { new: true }
    );

    if (!gift) {
      return sendNotFound(res, 'Gift not found');
    }

    sendSuccess(res, gift, 'Gift deleted successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createGift,
  getAllGifts,
  getGiftById,
  updateGift,
  deleteGift
};
