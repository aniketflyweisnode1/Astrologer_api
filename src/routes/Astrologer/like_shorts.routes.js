const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createLikeShorts, 
  getAllLikeShorts, 
  getLikeShortsById, 
  updateLikeShorts, 
  deleteLikeShorts, 
  getLikesByShortsId,
  unlikeShorts
} = require('../../controllers/like_shorts.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createLikeShortsSchema, 
  updateLikeShortsSchema, 
  getLikeShortsByIdSchema, 
  getAllLikeShortsSchema,
  getLikesByShortsIdSchema,
  unlikeShortsSchema
} = require('../../../validators/like_shorts.validator');

// Like_Shorts routes
router.post('/create', auth, validateBody(createLikeShortsSchema), createLikeShorts);
router.get('/getAll', validateQuery(getAllLikeShortsSchema), getAllLikeShorts);
router.get('/getById/:id', auth, validateParams(getLikeShortsByIdSchema), getLikeShortsById);
router.put('/update/:id', auth, validateBody(updateLikeShortsSchema), updateLikeShorts);
router.delete('/delete/:id', auth, validateParams(getLikeShortsByIdSchema), deleteLikeShorts);
router.get('/getByShortsId/:shorts_id', validateParams(getLikesByShortsIdSchema), getLikesByShortsId);
router.post('/unlike', auth, validateBody(unlikeShortsSchema), unlikeShorts);

module.exports = router;
