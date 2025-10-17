const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createGift, 
  getAllGifts, 
  getGiftById, 
  updateGift, 
  deleteGift 
} = require('../../controllers/gift.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createGiftSchema, 
  updateGiftSchema, 
  getGiftByIdSchema, 
  getAllGiftsSchema 
} = require('../../../validators/gift.validator');

// Routes
router.post('/create', auth, validateBody(createGiftSchema), createGift);
router.get('/getAll', validateQuery(getAllGiftsSchema), getAllGifts);
router.get('/getById/:id', auth, validateParams(getGiftByIdSchema), getGiftById);
router.put('/update/:id', auth, validateBody(updateGiftSchema), updateGift);
router.delete('/delete/:id', auth, validateParams(getGiftByIdSchema), deleteGift);

module.exports = router;
