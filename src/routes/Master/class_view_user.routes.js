const express = require('express');
const router = express.Router();

const { 
  createClassViewUser, 
  getAllClassViewUser, 
  getClassViewUserById, 
  updateClassViewUser, 
  deleteClassViewUser 
} = require('../../controllers/class_view_user.controller');

const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

const { 
  createClassViewUserSchema, 
  updateClassViewUserSchema, 
  getClassViewUserByIdSchema, 
  getAllClassViewUserSchema 
} = require('../../../validators/class_view_user.validator');

// Create class view user (with auth)
router.post('/create', auth, validateBody(createClassViewUserSchema), createClassViewUser);

// Get all class view users
router.get('/getAll', validateQuery(getAllClassViewUserSchema), getAllClassViewUser);

// Get class view user by ID (with auth)
router.get('/getClassViewUserById/:id', auth, validateParams(getClassViewUserByIdSchema), getClassViewUserById);

// Update class view user by ID (with auth)
router.put('/updateClassViewUserById', auth, validateBody(updateClassViewUserSchema), updateClassViewUser);

// Delete class view user by ID (with auth)
router.delete('/deleteClassViewUserById/:id', auth, validateParams(getClassViewUserByIdSchema), deleteClassViewUser);

module.exports = router;
