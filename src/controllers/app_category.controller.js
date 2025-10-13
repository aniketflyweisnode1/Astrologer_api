const AppCategory = require('../models/app_category.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new app category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createAppCategory = asyncHandler(async (req, res) => {
  try {
    const appCategoryData = {
      ...req.body,
      created_by: req.userId || 1
    };

    const appCategory = await AppCategory.create(appCategoryData);
    sendSuccess(res, appCategory, 'App category created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all app categories with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllAppCategory = asyncHandler(async (req, res) => {
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

    if (search) {
      filter.categoryName = { $regex: search, $options: 'i' };
    }

    if (status !== undefined) {
      filter.status = status === 'true';
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [appCategories, total] = await Promise.all([
      AppCategory.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      AppCategory.countDocuments(filter)
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
    sendPaginated(res, appCategories, pagination, 'App categories retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get app category by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAppCategoryById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const appCategory = await AppCategory.findOne({ app_category_id: parseInt(id) });

    if (!appCategory) {
      return sendNotFound(res, 'App category not found');
    }
    sendSuccess(res, appCategory, 'App category retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update app category by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateAppCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const appCategory = await AppCategory.findOneAndUpdate(
      { app_category_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!appCategory) {
      return sendNotFound(res, 'App category not found');
    }
    sendSuccess(res, appCategory, 'App category updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete app category by ID (soft delete)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteAppCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const appCategory = await AppCategory.findOneAndUpdate(
      { app_category_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!appCategory) {
      return sendNotFound(res, 'App category not found');
    }
    sendSuccess(res, appCategory, 'App category deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get app categories created by authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAppCategoryByAuth = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const filter = {
      created_by: req.userId
    };

    if (search) {
      filter.categoryName = { $regex: search, $options: 'i' };
    }

    if (status !== undefined) {
      filter.status = status === 'true';
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [appCategories, total] = await Promise.all([
      AppCategory.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      AppCategory.countDocuments(filter)
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
    sendPaginated(res, appCategories, pagination, 'User app categories retrieved successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createAppCategory,
  getAllAppCategory,
  getAppCategoryById,
  updateAppCategory,
  deleteAppCategory,
  getAppCategoryByAuth
};

