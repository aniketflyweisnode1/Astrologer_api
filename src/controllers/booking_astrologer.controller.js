const BookingAstrologer = require('../models/booking_astrologer.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new booking astrologer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createBookingAstrologer = asyncHandler(async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      created_by: req.userId || 1
    };

    const booking = await BookingAstrologer.create(bookingData);
    sendSuccess(res, booking, 'Booking created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all booking astrologers with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllBookingAstrologer = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      CallStatus,
      BooingStatus,
      Astorloger_id,
      user_id,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { CallStatus: { $regex: search, $options: 'i' } },
        { BooingStatus: { $regex: search, $options: 'i' } }
      ];
    }

    if (status !== undefined) {
      filter.status = status === 'true';
    }

    if (CallStatus) {
      filter.CallStatus = CallStatus;
    }

    if (BooingStatus) {
      filter.BooingStatus = BooingStatus;
    }

    if (Astorloger_id) {
      filter.Astorloger_id = parseInt(Astorloger_id);
    }

    if (user_id) {
      filter.user_id = parseInt(user_id);
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      BookingAstrologer.find(filter)
        .populate('Astorloger_id', 'fullName email mobile')
        .populate('user_id', 'fullName email mobile')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      BookingAstrologer.countDocuments(filter)
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
    sendPaginated(res, bookings, pagination, 'Bookings retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get booking astrologer by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBookingAstrologerById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await BookingAstrologer.findOne({ Booking_Astrologer_id: parseInt(id) })
      .populate('Astorloger_id', 'fullName email mobile')
      .populate('user_id', 'fullName email mobile');

    if (!booking) {
      return sendNotFound(res, 'Booking not found');
    }
    sendSuccess(res, booking, 'Booking retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update booking astrologer by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateBookingAstrologer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const booking = await BookingAstrologer.findOneAndUpdate(
      { Booking_Astrologer_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!booking) {
      return sendNotFound(res, 'Booking not found');
    }
    sendSuccess(res, booking, 'Booking updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete booking astrologer by ID (soft delete)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteBookingAstrologer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await BookingAstrologer.findOneAndUpdate(
      { Booking_Astrologer_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!booking) {
      return sendNotFound(res, 'Booking not found');
    }
    sendSuccess(res, booking, 'Booking deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get booking astrologers created by authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBookingAstrologerByAuth = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      CallStatus,
      BooingStatus,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const filter = {
      created_by: req.userId
    };

    if (search) {
      filter.$or = [
        { CallStatus: { $regex: search, $options: 'i' } },
        { BooingStatus: { $regex: search, $options: 'i' } }
      ];
    }

    if (status !== undefined) {
      filter.status = status === 'true';
    }

    if (CallStatus) {
      filter.CallStatus = CallStatus;
    }

    if (BooingStatus) {
      filter.BooingStatus = BooingStatus;
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      BookingAstrologer.find(filter)
        .populate('Astorloger_id', 'fullName email mobile')
        .populate('user_id', 'fullName email mobile')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      BookingAstrologer.countDocuments(filter)
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
    sendPaginated(res, bookings, pagination, 'User bookings retrieved successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createBookingAstrologer,
  getAllBookingAstrologer,
  getBookingAstrologerById,
  updateBookingAstrologer,
  deleteBookingAstrologer,
  getBookingAstrologerByAuth
};
