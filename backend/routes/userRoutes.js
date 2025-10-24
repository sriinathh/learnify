const express = require('express');
const router = express.Router();
const { getLeaderboard, getUserStats } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/leaderboard', protect, getLeaderboard);
router.get('/stats', protect, getUserStats);

module.exports = router;
