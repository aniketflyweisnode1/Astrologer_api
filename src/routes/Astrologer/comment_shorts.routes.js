const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createCommentShorts, 
  getAllCommentShorts, 
  getCommentShortsById, 
  updateCommentShorts, 
  deleteCommentShorts, 
  getCommentsByShortsId
} = require('../../controllers/comment_shorts.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createCommentShortsSchema, 
  updateCommentShortsSchema, 
  getCommentShortsByIdSchema, 
  getAllCommentShortsSchema,
  getCommentsByShortsIdSchema
} = require('../../../validators/comment_shorts.validator');

// Comment_Shorts routes
router.post('/create', auth, validateBody(createCommentShortsSchema), createCommentShorts);
router.get('/getAll', validateQuery(getAllCommentShortsSchema), getAllCommentShorts);
router.get('/getById/:id', auth, validateParams(getCommentShortsByIdSchema), getCommentShortsById);
router.put('/update/:id', auth, validateBody(updateCommentShortsSchema), updateCommentShorts);
router.delete('/delete/:id', auth, validateParams(getCommentShortsByIdSchema), deleteCommentShorts);
router.get('/getByShortsId/:shorts_id', validateParams(getCommentsByShortsIdSchema), getCommentsByShortsId);

module.exports = router;
