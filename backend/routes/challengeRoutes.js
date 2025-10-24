const express = require('express');
const router = express.Router();
const { getChallenges, getChallenge, completeChallenge, createChallenge, getUserChallenges } = require('../controllers/challengeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getChallenges);
router.get('/my-challenges', protect, getUserChallenges);
router.get('/:id', protect, getChallenge);
router.post('/:id/complete', protect, completeChallenge);
router.post('/', protect, createChallenge);

module.exports = router;
