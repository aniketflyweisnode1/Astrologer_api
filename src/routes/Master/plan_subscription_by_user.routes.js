const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createPlanSubscriptionByUser, 
  getAllPlanSubscriptions, 
  getPlanSubscriptionById, 
  updatePlanSubscription, 
  deletePlanSubscription 
} = require('../../controllers/plan_subscription_by_user.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createPlanSubscriptionByUserSchema, 
  updatePlanSubscriptionByUserSchema, 
  getPlanSubscriptionByIdSchema, 
  getAllPlanSubscriptionsSchema 
} = require('../../../validators/plan_subscription_by_user.validator');

// Routes
router.post('/create', auth, validateBody(createPlanSubscriptionByUserSchema), createPlanSubscriptionByUser);
router.get('/getAll', validateQuery(getAllPlanSubscriptionsSchema), getAllPlanSubscriptions);
router.get('/getById/:id', auth, validateParams(getPlanSubscriptionByIdSchema), getPlanSubscriptionById);
router.put('/update/:id', auth, validateBody(updatePlanSubscriptionByUserSchema), updatePlanSubscription);
router.delete('/delete/:id', auth, validateParams(getPlanSubscriptionByIdSchema), deletePlanSubscription);

module.exports = router;
