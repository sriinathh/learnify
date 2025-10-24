const User = require('../models/User');

// @desc Get leaderboard
// @route GET /api/users/leaderboard
// @access Private
const getLeaderboard = async (req, res) => {
  try {
    const { type = 'skill', limit = 10 } = req.query;
    const sortField = type === 'eco' ? 'ecoPoints' : 'skillPoints';

    const users = await User.find()
      .select('name email avatar level ecoPoints skillPoints badges className')
      .sort({ [sortField]: -1 })
      .limit(parseInt(limit));

    res.json(users);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get user stats
// @route GET /api/users/stats
// @access Private
const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('completedProjects')
      .populate('completedChallenges')
      .populate('completedQuizzes');

    const stats = {
      totalPoints: user.skillPoints + user.ecoPoints,
      skillPoints: user.skillPoints,
      ecoPoints: user.ecoPoints,
      level: user.level,
      badges: user.badges,
      completedProjects: user.completedProjects.length,
      completedChallenges: user.completedChallenges.length,
      completedQuizzes: user.completedQuizzes.length,
      rank: await User.countDocuments({ skillPoints: { $gt: user.skillPoints } }) + 1
    };

    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getLeaderboard,
  getUserStats
};
