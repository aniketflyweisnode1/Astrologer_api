const express = require('express');
const router = express.Router();

// Import controllers
const { 
  createHoroscopeQuiz, 
  getAllHoroscopeQuizzes, 
  getHoroscopeQuizById, 
  updateHoroscopeQuiz, 
  deleteHoroscopeQuiz,
  getHoroscopeQuizByAuth 
} = require('../../controllers/horoscope_quiz.controller');

// Import middleware
const { auth } = require('../../../middleware/auth');
const { validateBody, validateQuery, validateParams } = require('../../../middleware/validation');

// Import validators
const { 
  createHoroscopeQuizSchema, 
  updateHoroscopeQuizSchema, 
  getHoroscopeQuizByIdSchema, 
  getAllHoroscopeQuizzesSchema 
} = require('../../../validators/horoscope_quiz.validator');

// Routes
router.post('/create', auth, validateBody(createHoroscopeQuizSchema), createHoroscopeQuiz);
router.get('/getAll', validateQuery(getAllHoroscopeQuizzesSchema), getAllHoroscopeQuizzes);
router.get('/getById/:id', auth, validateParams(getHoroscopeQuizByIdSchema), getHoroscopeQuizById);
router.put('/update/:id', auth, validateBody(updateHoroscopeQuizSchema), updateHoroscopeQuiz);
router.delete('/delete/:id', auth, validateParams(getHoroscopeQuizByIdSchema), deleteHoroscopeQuiz);
router.get('/getByAuth', auth, validateQuery(getAllHoroscopeQuizzesSchema), getHoroscopeQuizByAuth);

module.exports = router;
