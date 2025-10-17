const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createPlan, 
  getAllPlans, 
  getPlanById, 
  updatePlan, 
  deletePlan 
} = require('../../controllers/plan.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createPlanSchema, 
  updatePlanSchema, 
  getPlanByIdSchema, 
  getAllPlansSchema 
} = require('../../../validators/plan.validator');

// Routes
router.post('/create', auth, validateBody(createPlanSchema), createPlan);
router.get('/getAll', validateQuery(getAllPlansSchema), getAllPlans);
router.get('/getById/:id', auth, validateParams(getPlanByIdSchema), getPlanById);
router.put('/update/:id', auth, validateBody(updatePlanSchema), updatePlan);
router.delete('/delete/:id', auth, validateParams(getPlanByIdSchema), deletePlan);

module.exports = router;
