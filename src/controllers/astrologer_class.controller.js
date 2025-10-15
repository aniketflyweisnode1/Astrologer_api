const AstrologerClass = require('../models/astrologer_class.model');
const { sendSuccess, sendError, sendNotFound, sendPaginated } = require('../../utils/response');
const { asyncHandler } = require('../../middleware/errorHandler');

/**
 * Create a new astrologer class
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createAstrologerClass = asyncHandler(async (req, res) => {
  try {
    const classData = {
      ...req.body,
      created_by: req.userId || 1
    };

    const astrologerClass = await AstrologerClass.create(classData);
    sendSuccess(res, astrologerClass, 'Astrologer class created successfully', 201);
  } catch (error) {
    throw error;
  }
});

/**
 * Get all astrologer classes with pagination and filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllAstrologerClass = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      Classtype,
      Access,
      Category_id,
      Astorloger_id,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { Title: { $regex: search, $options: 'i' } },
        { Description: { $regex: search, $options: 'i' } },
        { TargetAudience: { $regex: search, $options: 'i' } }
      ];
    }

    if (status !== undefined) {
      filter.status = status === 'true';
    }

    if (Classtype) {
      filter.Classtype = Classtype;
    }

    if (Access) {
      filter.Access = Access;
    }

    if (Category_id) {
      filter.Category_id = parseInt(Category_id);
    }

    if (Astorloger_id) {
      filter.Astorloger_id = parseInt(Astorloger_id);
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [classes, total] = await Promise.all([
      AstrologerClass.find(filter)
        .populate('Astorloger_id', 'fullName email mobile')
        .populate('Category_id', 'category_name emozi')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      AstrologerClass.countDocuments(filter)
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
    sendPaginated(res, classes, pagination, 'Astrologer classes retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get astrologer class by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAstrologerClassById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const astrologerClass = await AstrologerClass.findOne({ Astrologer_class_id: parseInt(id) })
      .populate('Astorloger_id', 'fullName email mobile')
      .populate('Category_id', 'category_name emozi');

    if (!astrologerClass) {
      return sendNotFound(res, 'Astrologer class not found');
    }
    sendSuccess(res, astrologerClass, 'Astrologer class retrieved successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Update astrologer class by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateAstrologerClass = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const updateData = {
      ...req.body,
      updated_by: req.userId,
      updated_at: new Date()
    };

    const astrologerClass = await AstrologerClass.findOneAndUpdate(
      { Astrologer_class_id: parseInt(id) },
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!astrologerClass) {
      return sendNotFound(res, 'Astrologer class not found');
    }
    sendSuccess(res, astrologerClass, 'Astrologer class updated successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Delete astrologer class by ID (soft delete)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteAstrologerClass = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const astrologerClass = await AstrologerClass.findOneAndUpdate(
      { Astrologer_class_id: parseInt(id) },
      { 
        status: false,
        updated_by: req.userId,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!astrologerClass) {
      return sendNotFound(res, 'Astrologer class not found');
    }
    sendSuccess(res, astrologerClass, 'Astrologer class deleted successfully');
  } catch (error) {
    throw error;
  }
});

/**
 * Get astrologer classes by category ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAstrologerClassByCategoryId = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      Classtype,
      Access,
      Astorloger_id,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const filter = {
      Category_id: parseInt(categoryId)
    };

    if (search) {
      filter.$or = [
        { Title: { $regex: search, $options: 'i' } },
        { Description: { $regex: search, $options: 'i' } },
        { TargetAudience: { $regex: search, $options: 'i' } }
      ];
    }

    if (status !== undefined) {
      filter.status = status === 'true';
    }

    if (Classtype) {
      filter.Classtype = Classtype;
    }

    if (Astorloger_id) {
      filter.Astorloger_id = parseInt(Astorloger_id);
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [classes, total] = await Promise.all([
      AstrologerClass.find(filter)
        .populate('Astorloger_id', 'fullName email mobile')
        .populate('Category_id', 'category_name emozi')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      AstrologerClass.countDocuments(filter)
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
    sendPaginated(res, classes, pagination, 'Astrologer classes by category retrieved successfully');
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createAstrologerClass,
  getAllAstrologerClass,
  getAstrologerClassById,
  updateAstrologerClass,
  deleteAstrologerClass,
  getAstrologerClassByCategoryId
};
