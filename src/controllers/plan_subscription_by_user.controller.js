const PlanSubscriptionByUser = require('../models/plan_subscription_by_user.model');

const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new plan subscription by user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPlanSubscriptionByUser = asyncHandler(async (req, res) => {
  try {
    // Create plan subscription data
    const planSubscriptionData = {
      ...req.body,
      user_id: req.userId,
      created_by: req.userId || null
    };

    // Create plan subscription
    const planSubscription = await PlanSubscriptionByUser.create(planSubscriptionData);

    sendSuccess(res, planSubscription, 'Plan subscription created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all plan subscriptions with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllPlanSubscriptions = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      user_id,
      Plan_id,
      PayemntStatus,
      TrangactionStatus,
      sortBy = 'created_on',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Add user_id filter
    if (user_id) {
      filter.user_id = parseInt(user_id);
    }

    // Add Plan_id filter
    if (Plan_id) {
      filter.Plan_id = parseInt(Plan_id);
    }

    // Add PayemntStatus filter
    if (PayemntStatus) {
      filter.PayemntStatus = PayemntStatus;
    }

    // Add TrangactionStatus filter
    if (TrangactionStatus) {
      filter.TrangactionStatus = TrangactionStatus;
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
    const [planSubscriptions, total] = await Promise.all([
      PlanSubscriptionByUser.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      PlanSubscriptionByUser.countDocuments(filter)
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

    sendPaginated(res, planSubscriptions, pagination, 'Plan subscriptions retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get plan subscription by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPlanSubscriptionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const planSubscription = await PlanSubscriptionByUser.findOne({ 
      Plan_Subscription_id: parseInt(id) 
    });

    if (!planSubscription) {
      return sendNotFound(res, 'Plan subscription not found');
    }

    sendSuccess(res, planSubscription, 'Plan subscription retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update plan subscription by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updatePlanSubscription = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_on: new Date()
    };

    const planSubscription = await PlanSubscriptionByUser.findOneAndUpdate(
      { Plan_Subscription_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!planSubscription) {
      return sendNotFound(res, 'Plan subscription not found');
    }

    sendSuccess(res, planSubscription, 'Plan subscription updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete plan subscription by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deletePlanSubscription = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const planSubscription = await PlanSubscriptionByUser.findOneAndUpdate(
      { Plan_Subscription_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_on: new Date()
      },
      { new: true }
    );

    if (!planSubscription) {
      return sendNotFound(res, 'Plan subscription not found');
    }

    sendSuccess(res, planSubscription, 'Plan subscription deleted successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createPlanSubscriptionByUser,
  getAllPlanSubscriptions,
  getPlanSubscriptionById,
  updatePlanSubscription,
  deletePlanSubscription
};
