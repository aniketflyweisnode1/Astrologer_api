const ClassViewUser = require('../models/class_view_user.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new class view user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createClassViewUser = asyncHandler(async (req, res) => {
  try {
    const classViewData = {
      ...req.body,
      created_by: req.userId || 1
    };

    const classViewUser = await ClassViewUser.create(classViewData);
    sendSuccess(res, classViewUser, 'Class view user created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all class view users with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllClassViewUser = asyncHandler(async (req, res) => {
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

    const [classViewUsers, total] = await Promise.all([
      ClassViewUser.find(filter)
        .populate('class_id', 'Title Classtype Pricing Access')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      ClassViewUser.countDocuments(filter)
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
    sendPaginated(res, classViewUsers, pagination, 'Class view users retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get class view user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getClassViewUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const classViewUser = await ClassViewUser.findOne({ Class_View_Map_user_id: parseInt(id) })
      .populate('class_id', 'Title Classtype Pricing Access');

    if (!classViewUser) {
      return sendNotFound(res, 'Class view user not found');
    }
    sendSuccess(res, classViewUser, 'Class view user retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update class view user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateClassViewUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const classViewUser = await ClassViewUser.findOneAndUpdate(
      { Class_View_Map_user_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!classViewUser) {
      return sendNotFound(res, 'Class view user not found');
    }
    sendSuccess(res, classViewUser, 'Class view user updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete class view user by ID (soft delete)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteClassViewUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const classViewUser = await ClassViewUser.findOneAndUpdate(
      { Class_View_Map_user_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!classViewUser) {
      return sendNotFound(res, 'Class view user not found');
    }
    sendSuccess(res, classViewUser, 'Class view user deleted successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createClassViewUser,
  getAllClassViewUser,
  getClassViewUserById,
  updateClassViewUser,
  deleteClassViewUser
};
