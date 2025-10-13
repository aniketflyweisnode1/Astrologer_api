const Wallet = require('../models/wallet.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new wallet
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createWallet = asyncHandler(async (req, res) => {
  try {
    const walletData = {
      ...req.body,
      walletAmount: req.body.walletAmount || 0,
      created_by: req.userId || null
    };

    const wallet = await Wallet.create(walletData);
    sendSuccess(res, wallet, 'Wallet created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Helper function to create wallet for a user
 * @param {Number} userId - User ID
 * @param {Number} createdBy - Created by user ID
 */
const createWalletForUser = async (userId, createdBy = null) => {
  try {
    const existingWallet = await Wallet.findOne({ user_id: userId });
    if (existingWallet) {
      return existingWallet;
    }

    const walletData = {
      user_id: userId,
      walletAmount: 0,
      created_by: createdBy
    };

    const wallet = await Wallet.create(walletData);
    return wallet;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all wallets with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllWallets = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};

    if (status !== undefined) {
      filter.status = status === 'true';
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [wallets, total] = await Promise.all([
      Wallet.find(filter)
        .populate('user_id', 'fullName email mobile')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Wallet.countDocuments(filter)
    ]);

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
    sendPaginated(res, wallets, pagination, 'Wallets retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get wallet by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getWalletById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const wallet = await Wallet.findOne({ wallet_id: parseInt(id) })
      .populate('user_id', 'fullName email mobile');

    if (!wallet) {
      return sendNotFound(res, 'Wallet not found');
    }
    sendSuccess(res, wallet, 'Wallet retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get wallet by authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getWalletByAuth = asyncHandler(async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user_id: req.userId })
      .populate('user_id', 'fullName email mobile');

    if (!wallet) {
      return sendNotFound(res, 'Wallet not found for this user');
    }
    sendSuccess(res, wallet, 'Wallet retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update wallet by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateWallet = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const wallet = await Wallet.findOneAndUpdate(
      { wallet_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    ).populate('user_id', 'fullName email mobile');

    if (!wallet) {
      return sendNotFound(res, 'Wallet not found');
    }
    sendSuccess(res, wallet, 'Wallet updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update wallet by authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateWalletByAuth = asyncHandler(async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    // Remove user_id from update to prevent changing wallet owner
    delete updateData.user_id;

    const wallet = await Wallet.findOneAndUpdate(
      { user_id: req.userId },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    ).populate('user_id', 'fullName email mobile');

    if (!wallet) {
      return sendNotFound(res, 'Wallet not found for this user');
    }
    sendSuccess(res, wallet, 'Wallet updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete wallet by ID (soft delete)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteWallet = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const wallet = await Wallet.findOneAndUpdate(
      { wallet_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    ).populate('user_id', 'fullName email mobile');

    if (!wallet) {
      return sendNotFound(res, 'Wallet not found');
    }
    sendSuccess(res, wallet, 'Wallet deleted successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createWallet,
  createWalletForUser,
  getAllWallets,
  getWalletById,
  getWalletByAuth,
  updateWallet,
  updateWalletByAuth,
  deleteWallet
};

