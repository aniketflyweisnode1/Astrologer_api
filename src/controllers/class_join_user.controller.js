const ClassJoinUser = require('../models/class_join_user.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new class join user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createClassJoinUser = asyncHandler(async (req, res) => {
  try {
    const classJoinData = {
      ...req.body,
      created_by: req.userId || 1
    };

    const classJoinUser = await ClassJoinUser.create(classJoinData);
    sendSuccess(res, classJoinUser, 'Class join user created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all class join users with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllClassJoinUser = asyncHandler(async (req, res) => {
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

    const [classJoinUsers, total] = await Promise.all([
      ClassJoinUser.find(filter)
        .populate('class_id', 'Title Classtype Pricing Access')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      ClassJoinUser.countDocuments(filter)
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
    sendPaginated(res, classJoinUsers, pagination, 'Class join users retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get class join user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getClassJoinUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const classJoinUser = await ClassJoinUser.findOne({ Class_Join_Map_user_id: parseInt(id) })
      .populate('class_id', 'Title Classtype Pricing Access');

    if (!classJoinUser) {
      return sendNotFound(res, 'Class join user not found');
    }
    sendSuccess(res, classJoinUser, 'Class join user retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update class join user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateClassJoinUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const classJoinUser = await ClassJoinUser.findOneAndUpdate(
      { Class_Join_Map_user_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!classJoinUser) {
      return sendNotFound(res, 'Class join user not found');
    }
    sendSuccess(res, classJoinUser, 'Class join user updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete class join user by ID (soft delete)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteClassJoinUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const classJoinUser = await ClassJoinUser.findOneAndUpdate(
      { Class_Join_Map_user_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!classJoinUser) {
      return sendNotFound(res, 'Class join user not found');
    }
    sendSuccess(res, classJoinUser, 'Class join user deleted successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createClassJoinUser,
  getAllClassJoinUser,
  getClassJoinUserById,
  updateClassJoinUser,
  deleteClassJoinUser
};
