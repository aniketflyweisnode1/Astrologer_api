const Stream = require('../models/stream.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new stream
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createStream = asyncHandler(async (req, res) => {
  try {
    // Create stream data
    const streamData = {
      ...req.body,
      created_by: req.userId,
      byuser_stream_id: req.userId
    };

    // Create stream
    const stream = await Stream.create(streamData);

    sendSuccess(res, stream, 'Stream created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all streams with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllStreams = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      session_status,
      streamType,
      language_id,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Add search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description_sessionAgenda: { $regex: search, $options: 'i' } },
        { category_topic_tag: { $regex: search, $options: 'i' } }
      ];
    }

    // Add status filter
    if (session_status) {
      filter.session_status = session_status;
    }

    // Add stream type filter
    if (streamType) {
      filter.streamType = streamType;
    }

    // Add language filter
    if (language_id) {
      filter.language_id = parseInt(language_id);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [streams, total] = await Promise.all([
      Stream.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Stream.countDocuments(filter)
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

    sendPaginated(res, streams, pagination, 'Streams retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get stream by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStreamById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const stream = await Stream.findOne({ stream_id: parseInt(id) });

    if (!stream) {
      return sendNotFound(res, 'Stream not found');
    }

    sendSuccess(res, stream, 'Stream retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update stream by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateStream = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Add update metadata
    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const stream = await Stream.findOneAndUpdate(
      { stream_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!stream) {
      return sendNotFound(res, 'Stream not found');
    }

    sendSuccess(res, stream, 'Stream updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete stream by ID (soft delete by setting status to false)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteStream = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const stream = await Stream.findOneAndUpdate(
      { stream_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!stream) {
      return sendNotFound(res, 'Stream not found');
    }

    sendSuccess(res, stream, 'Stream deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get streams by authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStreamsByAuth = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      session_status,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {
      byuser_stream_id: req.userId
    };

    // Add status filter
    if (session_status) {
      filter.session_status = session_status;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [streams, total] = await Promise.all([
      Stream.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Stream.countDocuments(filter)
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

    sendPaginated(res, streams, pagination, 'User streams retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get streams by session status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStreamsBySessionStatus = asyncHandler(async (req, res) => {
  try {
    const { session_status } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {
      session_status: session_status
    };

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const [streams, total] = await Promise.all([
      Stream.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Stream.countDocuments(filter)
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

    sendPaginated(res, streams, pagination, `Streams with status '${session_status}' retrieved successfully`);
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createStream,
  getAllStreams,
  getStreamById,
  updateStream,
  deleteStream,
  getStreamsByAuth,
  getStreamsBySessionStatus
};
