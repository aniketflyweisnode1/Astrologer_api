const express = require('express');
const router = express.Router();

const { 
  createBookingAstrologer, 
  getAllBookingAstrologer, 
  getBookingAstrologerById, 
  getBookingAstrologerByAuth, 
  updateBookingAstrologer, 
  deleteBookingAstrologer 
} = require('../../controllers/booking_astrologer.controller');

const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

const { 
  createBookingAstrologerSchema, 
  updateBookingAstrologerSchema, 
  getBookingAstrologerByIdSchema, 
  getAllBookingAstrologerSchema 
} = require('../../../validators/booking_astrologer.validator');

// Create booking astrologer (with auth)
router.post('/create', auth, validateBody(createBookingAstrologerSchema), createBookingAstrologer);

// Get all booking astrologers
router.get('/getAll', validateQuery(getAllBookingAstrologerSchema), getAllBookingAstrologer);

// Get booking astrologer by ID (with auth)
router.get('/getBookingAstrologerById/:id', auth, validateParams(getBookingAstrologerByIdSchema), getBookingAstrologerById);

// Get booking astrologers by authenticated user (with auth)
router.get('/getBookingAstrologerByAuth', auth, getBookingAstrologerByAuth);

// Update booking astrologer by ID (with auth)
router.put('/updateBookingAstrologerById', auth, validateBody(updateBookingAstrologerSchema), updateBookingAstrologer);

// Delete booking astrologer by ID (with auth)
router.delete('/deleteBookingAstrologerById/:id', auth, validateParams(getBookingAstrologerByIdSchema), deleteBookingAstrologer);

module.exports = router;
