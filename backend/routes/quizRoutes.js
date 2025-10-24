const express = require('express');
const router = express.Router();
const { getQuizzes, getQuiz, submitQuiz, createQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getQuizzes);
router.get('/:id', protect, getQuiz);
router.post('/:id/submit', protect, submitQuiz);
router.post('/', protect, createQuiz);

module.exports = router;
