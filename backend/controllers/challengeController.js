const Challenge = require('../models/Challenge');
const User = require('../models/User');

// @desc Get all challenges
// @route GET /api/challenges
// @access Private
const getChallenges = async (req, res) => {
  try {
    const { category, level } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (level) filter.level = level;

    const challenges = await Challenge.find(filter);
    res.json(challenges);
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get single challenge
// @route GET /api/challenges/:id
// @access Private
const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    console.error('Get challenge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Complete a challenge
// @route POST /api/challenges/:id/complete
// @access Private
const completeChallenge = async (req, res) => {
  try {
    const { proof, notes } = req.body;
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if already completed
    const alreadyCompleted = challenge.completions.find(
      c => c.userId.toString() === req.user._id.toString()
    );

    if (alreadyCompleted && challenge.actionType === 'one-time') {
      return res.status(400).json({ message: 'Challenge already completed' });
    }

    // Add completion
    challenge.completions.push({
      userId: req.user._id,
      proof: proof || '',
      notes: notes || ''
    });

    await challenge.save();

    // Update user eco points and badges
    const user = await User.findById(req.user._id);
    user.ecoPoints += challenge.ecoPoints;

    if (!user.completedChallenges.includes(challenge._id)) {
      user.completedChallenges.push(challenge._id);
    }

    // Award badge if applicable
    if (challenge.badgeAwarded && !user.badges.find(b => b.name === challenge.badgeAwarded.name)) {
      user.badges.push({
        name: challenge.badgeAwarded.name,
        icon: challenge.badgeAwarded.icon
      });
    }

    // Level up eco warrior
    const ecoLevel = Math.floor(user.ecoPoints / 500) + 1;
    if (ecoLevel > user.level) {
      user.level = ecoLevel;
      user.badges.push({
        name: `Eco Level ${ecoLevel}`,
        icon: '🌱'
      });
    }

    await user.save();

    res.json({
      message: 'Challenge completed successfully!',
      pointsEarned: challenge.ecoPoints,
      newTotalEcoPoints: user.ecoPoints,
      badgeAwarded: challenge.badgeAwarded,
      newLevel: user.level
    });
  } catch (error) {
    console.error('Complete challenge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create challenge (Admin)
// @route POST /api/challenges
// @access Private
const createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Create challenge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get user's challenge history
// @route GET /api/challenges/my-challenges
// @access Private
const getUserChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({
      'completions.userId': req.user._id
    });

    const userCompletions = challenges.map(challenge => {
      const userCompletion = challenge.completions.find(
        c => c.userId.toString() === req.user._id.toString()
      );
      return {
        challenge: challenge,
        completion: userCompletion
      };
    });

    res.json(userCompletions);
  } catch (error) {
    console.error('Get user challenges error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getChallenges,
  getChallenge,
  completeChallenge,
  createChallenge,
  getUserChallenges
};
