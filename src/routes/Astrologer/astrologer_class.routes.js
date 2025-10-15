const express = require('express');
const router = express.Router();

const { 
  createAstrologerClass, 
  getAllAstrologerClass, 
  getAstrologerClassById, 
  updateAstrologerClass, 
  deleteAstrologerClass,
  getAstrologerClassByCategoryId
} = require('../../controllers/astrologer_class.controller');

const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

const { 
  createAstrologerClassSchema, 
  updateAstrologerClassSchema, 
  getAstrologerClassByIdSchema, 
  getAllAstrologerClassSchema,
  getAstrologerClassByCategoryIdSchema
} = require('../../../validators/astrologer_class.validator');

// Create astrologer class (with auth)
router.post('/create', auth, validateBody(createAstrologerClassSchema), createAstrologerClass);

// Get all astrologer classes
router.get('/getAll', validateQuery(getAllAstrologerClassSchema), getAllAstrologerClass);

// Get astrologer class by ID (with auth)
router.get('/getAstrologerClassById/:id', auth, validateParams(getAstrologerClassByIdSchema), getAstrologerClassById);

// Update astrologer class by ID (with auth)
router.put('/updateAstrologerClassById', auth, validateBody(updateAstrologerClassSchema), updateAstrologerClass);

// Delete astrologer class by ID (with auth)
router.delete('/deleteAstrologerClassById/:id', auth, validateParams(getAstrologerClassByIdSchema), deleteAstrologerClass);

// Get astrologer classes by category ID
router.get('/getAstrologerClassByCategoryId/:categoryId', validateParams(getAstrologerClassByCategoryIdSchema), getAstrologerClassByCategoryId);

module.exports = router;
