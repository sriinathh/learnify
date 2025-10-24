const CommunityPost = require('../models/CommunityPost');

// @desc Get all posts
// @route GET /api/community
// @access Private
const getPosts = async (req, res) => {
  try {
    const { category, tags } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(',') };

    const posts = await CommunityPost.find(filter)
      .populate('author', 'name email avatar level')
      .populate('replies.author', 'name avatar level')
      .sort({ isPinned: -1, createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get single post
// @route GET /api/community/:id
// @access Private
const getPost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
      .populate('author', 'name email avatar level badges')
      .populate('replies.author', 'name avatar level');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create post
// @route POST /api/community
// @access Private
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const post = await CommunityPost.create({
      author: req.user._id,
      title,
      content,
      category,
      tags: tags || []
    });

    const populatedPost = await CommunityPost.findById(post._id)
      .populate('author', 'name email avatar level');

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Add reply to post
// @route POST /api/community/:id/reply
// @access Private
const addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.replies.push({
      author: req.user._id,
      content
    });

    await post.save();

    const updatedPost = await CommunityPost.findById(post._id)
      .populate('author', 'name avatar level')
      .populate('replies.author', 'name avatar level');

    res.json(updatedPost);
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Upvote post
// @route PUT /api/community/:id/upvote
// @access Private
const upvotePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const alreadyUpvoted = post.upvotes.includes(req.user._id);

    if (alreadyUpvoted) {
      post.upvotes = post.upvotes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.upvotes.push(req.user._id);
    }

    await post.save();

    res.json({ upvotes: post.upvotes.length, upvoted: !alreadyUpvoted });
  } catch (error) {
    console.error('Upvote post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Mark post as solved
// @route PUT /api/community/:id/solve
// @access Private
const markAsSolved = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Only author can mark as solved
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    post.isSolved = !post.isSolved;
    await post.save();

    res.json({ isSolved: post.isSolved });
  } catch (error) {
    console.error('Mark solved error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  addReply,
  upvotePost,
  markAsSolved
};
