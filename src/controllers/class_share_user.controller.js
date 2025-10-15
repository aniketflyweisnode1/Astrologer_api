const ClassShareUser = require('../models/class_share_user.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new class share user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createClassShareUser = asyncHandler(async (req, res) => {
  try {
    const classShareData = {
      ...req.body,
      created_by: req.userId || 1
    };

    const classShareUser = await ClassShareUser.create(classShareData);
    sendSuccess(res, classShareUser, 'Class share user created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all class share users with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllClassShareUser = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      class_id,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};

    if (search) {
      // Since this model doesn't have text fields, we'll search by class_id
      if (!isNaN(search)) {
        filter.class_id = parseInt(search);
      }
    }

    if (status !== undefined) {
      filter.status = status === 'true';
    }

    if (class_id) {
      filter.class_id = parseInt(class_id);
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [classShareUsers, total] = await Promise.all([
      ClassShareUser.find(filter)
        .populate('class_id', 'Title Classtype Pricing Access')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      ClassShareUser.countDocuments(filter)
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
    sendPaginated(res, classShareUsers, pagination, 'Class share users retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get class share user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getClassShareUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const classShareUser = await ClassShareUser.findOne({ Class_Share_Map_user_id: parseInt(id) })
      .populate('class_id', 'Title Classtype Pricing Access');

    if (!classShareUser) {
      return sendNotFound(res, 'Class share user not found');
    }
    sendSuccess(res, classShareUser, 'Class share user retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update class share user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateClassShareUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const classShareUser = await ClassShareUser.findOneAndUpdate(
      { Class_Share_Map_user_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!classShareUser) {
      return sendNotFound(res, 'Class share user not found');
    }
    sendSuccess(res, classShareUser, 'Class share user updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete class share user by ID (soft delete)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteClassShareUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const classShareUser = await ClassShareUser.findOneAndUpdate(
      { Class_Share_Map_user_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!classShareUser) {
      return sendNotFound(res, 'Class share user not found');
    }
    sendSuccess(res, classShareUser, 'Class share user deleted successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createClassShareUser,
  getAllClassShareUser,
  getClassShareUserById,
  updateClassShareUser,
  deleteClassShareUser
};
