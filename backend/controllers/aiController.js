const { getAIRecommendations, getChatbotResponse, generateStudyPlan } = require('../utils/aiIntegration');
const User = require('../models/User');

// @desc Get AI recommendations
// @route GET /api/ai/recommendations
// @access Private
const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('completedProjects')
      .populate('completedChallenges');

    const userProfile = {
      branch: user.branch,
      year: user.year,
      goals: user.goals,
      skillPoints: user.skillPoints,
      ecoPoints: user.ecoPoints,
      completedProjects: user.completedProjects.length
    };

    const recommendations = await getAIRecommendations(userProfile);
    
    res.json({ recommendations });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Chat with AI mentor
// @route POST /api/ai/chat
// @access Private
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const user = await User.findById(req.user._id);
    
    const context = {
      userName: user.name,
      branch: user.branch,
      level: user.level,
      goals: user.goals
    };

    const response = await getChatbotResponse(message, context);
    
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Generate study plan
// @route POST /api/ai/study-plan
// @access Private
const getStudyPlan = async (req, res) => {
  try {
    const { targetSkills } = req.body;

    if (!targetSkills || !Array.isArray(targetSkills)) {
      return res.status(400).json({ message: 'Target skills array is required' });
    }

    const user = await User.findById(req.user._id);
    
    const userProfile = {
      name: user.name,
      branch: user.branch,
      year: user.year,
      goals: user.goals
    };

    const studyPlan = await generateStudyPlan(userProfile, targetSkills);
    
    res.json({ studyPlan });
  } catch (error) {
    console.error('Study plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRecommendations,
  chatWithAI,
  getStudyPlan
};
