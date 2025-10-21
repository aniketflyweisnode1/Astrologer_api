const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createMyShorts, 
  getAllMyShorts, 
  getMyShortsById, 
  updateMyShorts, 
  deleteMyShorts, 
  getMyShortsByAuth 
} = require('../../controllers/my_shorts.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createMyShortsSchema, 
  updateMyShortsSchema, 
  getMyShortsByIdSchema, 
  getAllMyShortsSchema 
} = require('../../../validators/my_shorts.validator');

// My_Shorts routes
router.post('/create', auth, validateBody(createMyShortsSchema), createMyShorts);
router.get('/getAll', validateQuery(getAllMyShortsSchema), getAllMyShorts);
router.get('/getById/:id', auth, validateParams(getMyShortsByIdSchema), getMyShortsById);
router.put('/update/:id', auth, validateBody(updateMyShortsSchema), updateMyShorts);
router.delete('/delete/:id', auth, validateParams(getMyShortsByIdSchema), deleteMyShorts);
router.get('/getByAuth', auth, validateQuery(getAllMyShortsSchema), getMyShortsByAuth);

module.exports = router;
