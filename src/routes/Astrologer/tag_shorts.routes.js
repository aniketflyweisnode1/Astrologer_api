const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createTagShorts, 
  getAllTagShorts, 
  getTagShortsById, 
  updateTagShorts, 
  deleteTagShorts, 
  getTagsByShortsId
} = require('../../controllers/tag_shorts.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createTagShortsSchema, 
  updateTagShortsSchema, 
  getTagShortsByIdSchema, 
  getAllTagShortsSchema,
  getTagsByShortsIdSchema
} = require('../../../validators/tag_shorts.validator');

// Tag_Shorts routes
router.post('/create', auth, validateBody(createTagShortsSchema), createTagShorts);
router.get('/getAll', validateQuery(getAllTagShortsSchema), getAllTagShorts);
router.get('/getById/:id', auth, validateParams(getTagShortsByIdSchema), getTagShortsById);
router.put('/update/:id', auth, validateBody(updateTagShortsSchema), updateTagShorts);
router.delete('/delete/:id', auth, validateParams(getTagShortsByIdSchema), deleteTagShorts);
router.get('/getByShortsId/:shorts_id', validateParams(getTagsByShortsIdSchema), getTagsByShortsId);

module.exports = router;
