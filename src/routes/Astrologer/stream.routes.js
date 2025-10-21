const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createStream, 
  getAllStreams, 
  getStreamById, 
  updateStream, 
  deleteStream, 
  getStreamsByAuth, 
  getStreamsBySessionStatus 
} = require('../../controllers/stream.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createStreamSchema, 
  updateStreamSchema, 
  getStreamByIdSchema, 
  getAllStreamsSchema 
} = require('../../../validators/stream.validator');

// Stream routes
router.post('/create', auth, validateBody(createStreamSchema), createStream);
router.get('/getAll', validateQuery(getAllStreamsSchema), getAllStreams);
router.get('/getById/:id', auth, validateParams(getStreamByIdSchema), getStreamById);
router.put('/update/:id', auth, validateBody(updateStreamSchema), updateStream);
router.delete('/delete/:id', auth, validateParams(getStreamByIdSchema), deleteStream);
router.get('/getByAuth', auth, validateQuery(getAllStreamsSchema), getStreamsByAuth);
router.get('/getBySessionStatus/:session_status', validateQuery(getAllStreamsSchema), getStreamsBySessionStatus);

module.exports = router;
