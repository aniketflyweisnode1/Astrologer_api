const Plan = require('../models/plan.model');

const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new plan
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPlan = asyncHandler(async (req, res) => {
  try {
    // Create plan data
    const planData = {
      ...req.body,
      created_by: req.userId || null
    };

    // Create plan
    const plan = await Plan.create(planData);

    sendSuccess(res, plan, 'Plan created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all plans with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllPlans = asyncHandler(async (req, res) => {
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
        { Name: { $regex: search, $options: 'i' } },
        { mainHeadingText: { $regex: search, $options: 'i' } },
        { TimePried: { $regex: search, $options: 'i' } }
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
    const [plans, total] = await Promise.all([
      Plan.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Plan.countDocuments(filter)
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

    sendPaginated(res, plans, pagination, 'Plans retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get plan by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPlanById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findOne({ Plan_id: parseInt(id) });

    if (!plan) {
      return sendNotFound(res, 'Plan not found');
    }

    sendSuccess(res, plan, 'Plan retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update plan by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updatePlan = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_on: new Date()
    };

    const plan = await Plan.findOneAndUpdate(
      { Plan_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!plan) {
      return sendNotFound(res, 'Plan not found');
    }

    sendSuccess(res, plan, 'Plan updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete plan by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deletePlan = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findOneAndUpdate(
      { Plan_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_on: new Date()
      },
      { new: true }
    );

    if (!plan) {
      return sendNotFound(res, 'Plan not found');
    }

    sendSuccess(res, plan, 'Plan deleted successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan
};
