const express = require('express');
const router = express.Router();
const { getPosts, getPost, createPost, addReply, upvotePost, markAsSolved } = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getPosts);
router.post('/', protect, createPost);
router.get('/:id', protect, getPost);
router.post('/:id/reply', protect, addReply);
router.put('/:id/upvote', protect, upvotePost);
router.put('/:id/solve', protect, markAsSolved);

module.exports = router;
