const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createShareShorts, 
  getAllShareShorts, 
  getShareShortsById, 
  updateShareShorts, 
  deleteShareShorts, 
  getSharesByShortsId
} = require('../../controllers/share_shorts.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createShareShortsSchema, 
  updateShareShortsSchema, 
  getShareShortsByIdSchema, 
  getAllShareShortsSchema,
  getSharesByShortsIdSchema
} = require('../../../validators/share_shorts.validator');

// Share_Shorts routes
router.post('/create', auth, validateBody(createShareShortsSchema), createShareShorts);
router.get('/getAll', validateQuery(getAllShareShortsSchema), getAllShareShorts);
router.get('/getById/:id', auth, validateParams(getShareShortsByIdSchema), getShareShortsById);
router.put('/update/:id', auth, validateBody(updateShareShortsSchema), updateShareShorts);
router.delete('/delete/:id', auth, validateParams(getShareShortsByIdSchema), deleteShareShorts);
router.get('/getByShortsId/:shorts_id', validateParams(getSharesByShortsIdSchema), getSharesByShortsId);

module.exports = router;
