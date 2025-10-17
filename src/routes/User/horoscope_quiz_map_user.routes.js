const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createHoroscopeQuizMapUser, 
  getAllHoroscopeQuizMapUsers, 
  getHoroscopeQuizMapUserById, 
  updateHoroscopeQuizMapUser, 
  deleteHoroscopeQuizMapUser,
  getHighScoreUsers 
} = require('../../controllers/horoscope_quiz_map_user.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createHoroscopeQuizMapUserSchema, 
  updateHoroscopeQuizMapUserSchema, 
  getHoroscopeQuizMapUserByIdSchema, 
  getAllHoroscopeQuizMapUsersSchema 
} = require('../../../validators/horoscope_quiz_map_user.validator');

// Routes
router.post('/create', auth, validateBody(createHoroscopeQuizMapUserSchema), createHoroscopeQuizMapUser);
router.get('/getAll', validateQuery(getAllHoroscopeQuizMapUsersSchema), getAllHoroscopeQuizMapUsers);
router.get('/getById/:id', auth, validateParams(getHoroscopeQuizMapUserByIdSchema), getHoroscopeQuizMapUserById);
router.put('/update/:id', auth, validateBody(updateHoroscopeQuizMapUserSchema), updateHoroscopeQuizMapUser);
router.delete('/delete/:id', auth, validateParams(getHoroscopeQuizMapUserByIdSchema), deleteHoroscopeQuizMapUser);
router.get('/getHighScoreUsers', validateQuery(getAllHoroscopeQuizMapUsersSchema), getHighScoreUsers);

module.exports = router;
