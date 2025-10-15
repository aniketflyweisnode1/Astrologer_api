const express = require('express');
const router = express.Router();

const { 
  createClassShareUser, 
  getAllClassShareUser, 
  getClassShareUserById, 
  updateClassShareUser, 
  deleteClassShareUser 
} = require('../../controllers/class_share_user.controller');

const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

const { 
  createClassShareUserSchema, 
  updateClassShareUserSchema, 
  getClassShareUserByIdSchema, 
  getAllClassShareUserSchema 
} = require('../../../validators/class_share_user.validator');

// Create class share user (with auth)
router.post('/create', auth, validateBody(createClassShareUserSchema), createClassShareUser);

// Get all class share users
router.get('/getAll', validateQuery(getAllClassShareUserSchema), getAllClassShareUser);

// Get class share user by ID (with auth)
router.get('/getClassShareUserById/:id', auth, validateParams(getClassShareUserByIdSchema), getClassShareUserById);

// Update class share user by ID (with auth)
router.put('/updateClassShareUserById', auth, validateBody(updateClassShareUserSchema), updateClassShareUser);

// Delete class share user by ID (with auth)
router.delete('/deleteClassShareUserById/:id', auth, validateParams(getClassShareUserByIdSchema), deleteClassShareUser);

module.exports = router;
