const express = require('express');
const router = express.Router();

const { 
  createAppCategory, 
  getAllAppCategory, 
  getAppCategoryById, 
  getAppCategoryByAuth, 
  updateAppCategory, 
  deleteAppCategory 
} = require('../../controllers/app_category.controller');

const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

const { 
  createAppCategorySchema, 
  updateAppCategorySchema, 
  getAppCategoryByIdSchema, 
  getAllAppCategorySchema 
} = require('../../../validators/app_category.validator');

// Create app category (with auth)
router.post('/create',  validateBody(createAppCategorySchema), createAppCategory);

// Get all app categories
router.get('/getAll', validateQuery(getAllAppCategorySchema), getAllAppCategory);

// Get app category by ID (with auth)
router.get('/getAppCategoryById/:id', auth, validateParams(getAppCategoryByIdSchema), getAppCategoryById);

// Get app category by authenticated user (with auth)
router.get('/getAppCategoryByAuth', auth, getAppCategoryByAuth);

// Update app category by ID (with auth)
router.put('/updateAppCategoryById', auth, validateBody(updateAppCategorySchema), updateAppCategory);

// Delete app category by ID (with auth)
router.delete('/deleteAppCategoryById/:id', auth, validateParams(getAppCategoryByIdSchema), deleteAppCategory);

module.exports = router;

