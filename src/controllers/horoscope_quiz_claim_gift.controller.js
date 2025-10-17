const HoroscopeQuizClaimGift = require('../models/horoscope_quiz_claim_gift.model');

const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new horoscope quiz claim gift
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createHoroscopeQuizClaimGift = asyncHandler(async (req, res) => {
  try {
    // Create claim gift data
    const claimGiftData = {
      ...req.body,
      created_by: req.userId || null
    };

    // Create claim gift
    const claimGift = await HoroscopeQuizClaimGift.create(claimGiftData);

    sendSuccess(res, claimGift, 'Horoscope quiz claim gift created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all horoscope quiz claim gifts with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllHoroscopeQuizClaimGifts = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      gift_id,
      sortBy = 'created_on',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Add search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { mobileno: { $regex: search, $options: 'i' } },
        { pincode: { $regex: search, $options: 'i' } }
      ];
    }

    // Add gift_id filter
    if (gift_id) {
      filter.gift_id = parseInt(gift_id);
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
    const [claimGifts, total] = await Promise.all([
      HoroscopeQuizClaimGift.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      HoroscopeQuizClaimGift.countDocuments(filter)
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

    sendPaginated(res, claimGifts, pagination, 'Horoscope quiz claim gifts retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get horoscope quiz claim gift by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHoroscopeQuizClaimGiftById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const claimGift = await HoroscopeQuizClaimGift.findOne({ 
      Horoscope_quiz_Claim_gift_id: parseInt(id) 
    });

    if (!claimGift) {
      return sendNotFound(res, 'Horoscope quiz claim gift not found');
    }

    sendSuccess(res, claimGift, 'Horoscope quiz claim gift retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update horoscope quiz claim gift by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateHoroscopeQuizClaimGift = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_on: new Date()
    };

    const claimGift = await HoroscopeQuizClaimGift.findOneAndUpdate(
      { Horoscope_quiz_Claim_gift_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!claimGift) {
      return sendNotFound(res, 'Horoscope quiz claim gift not found');
    }

    sendSuccess(res, claimGift, 'Horoscope quiz claim gift updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete horoscope quiz claim gift by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteHoroscopeQuizClaimGift = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const claimGift = await HoroscopeQuizClaimGift.findOneAndUpdate(
      { Horoscope_quiz_Claim_gift_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_on: new Date()
      },
      { new: true }
    );

    if (!claimGift) {
      return sendNotFound(res, 'Horoscope quiz claim gift not found');
    }

    sendSuccess(res, claimGift, 'Horoscope quiz claim gift deleted successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createHoroscopeQuizClaimGift,
  getAllHoroscopeQuizClaimGifts,
  getHoroscopeQuizClaimGiftById,
  updateHoroscopeQuizClaimGift,
  deleteHoroscopeQuizClaimGift
};
