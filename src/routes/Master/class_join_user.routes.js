const express = require('express');
const router = express.Router();

const { 
  createClassJoinUser, 
  getAllClassJoinUser, 
  getClassJoinUserById, 
  updateClassJoinUser, 
  deleteClassJoinUser 
} = require('../../controllers/class_join_user.controller');

const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

const { 
  createClassJoinUserSchema, 
  updateClassJoinUserSchema, 
  getClassJoinUserByIdSchema, 
  getAllClassJoinUserSchema 
} = require('../../../validators/class_join_user.validator');

// Create class join user (with auth)
router.post('/create', auth, validateBody(createClassJoinUserSchema), createClassJoinUser);

// Get all class join users
router.get('/getAll', validateQuery(getAllClassJoinUserSchema), getAllClassJoinUser);

// Get class join user by ID (with auth)
router.get('/getClassJoinUserById/:id', auth, validateParams(getClassJoinUserByIdSchema), getClassJoinUserById);

// Update class join user by ID (with auth)
router.put('/updateClassJoinUserById', auth, validateBody(updateClassJoinUserSchema), updateClassJoinUser);

// Delete class join user by ID (with auth)
router.delete('/deleteClassJoinUserById/:id', auth, validateParams(getClassJoinUserByIdSchema), deleteClassJoinUser);

module.exports = router;
