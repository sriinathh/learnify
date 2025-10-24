const express = require('express');
const router = express.Router();
const { getRecommendations, chatWithAI, getStudyPlan } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.get('/recommendations', protect, getRecommendations);
router.post('/chat', protect, chatWithAI);
router.post('/study-plan', protect, getStudyPlan);

module.exports = router;
