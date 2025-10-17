const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createHoroscopeQuizClaimGift, 
  getAllHoroscopeQuizClaimGifts, 
  getHoroscopeQuizClaimGiftById, 
  updateHoroscopeQuizClaimGift, 
  deleteHoroscopeQuizClaimGift 
} = require('../../controllers/horoscope_quiz_claim_gift.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createHoroscopeQuizClaimGiftSchema, 
  updateHoroscopeQuizClaimGiftSchema, 
  getHoroscopeQuizClaimGiftByIdSchema, 
  getAllHoroscopeQuizClaimGiftsSchema 
} = require('../../../validators/horoscope_quiz_claim_gift.validator');

// Routes
router.post('/create', auth, validateBody(createHoroscopeQuizClaimGiftSchema), createHoroscopeQuizClaimGift);
router.get('/getAll', validateQuery(getAllHoroscopeQuizClaimGiftsSchema), getAllHoroscopeQuizClaimGifts);
router.get('/getById/:id', auth, validateParams(getHoroscopeQuizClaimGiftByIdSchema), getHoroscopeQuizClaimGiftById);
router.put('/update/:id', auth, validateBody(updateHoroscopeQuizClaimGiftSchema), updateHoroscopeQuizClaimGift);
router.delete('/delete/:id', auth, validateParams(getHoroscopeQuizClaimGiftByIdSchema), deleteHoroscopeQuizClaimGift);

module.exports = router;
