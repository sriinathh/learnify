const Quiz = require('../models/Quiz');
const User = require('../models/User');

// @desc Get all quizzes
// @route GET /api/quizzes
// @access Private
const getQuizzes = async (req, res) => {
  try {
    const { category, difficulty, subject } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (subject) filter.subject = subject;

    const quizzes = await Quiz.find(filter).select('-questions.correctAnswer');
    res.json(quizzes);
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get single quiz
// @route GET /api/quizzes/:id
// @access Private
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select('-questions.correctAnswer');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Submit quiz attempt
// @route POST /api/quizzes/:id/submit
// @access Private
const submitQuiz = async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let correctAnswers = 0;
    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
        score += question.points;
      }
    });

    // Add attempt to quiz
    quiz.attempts.push({
      userId: req.user._id,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      timeTaken
    });

    await quiz.save();

    // Update user points and completed quizzes
    const user = await User.findById(req.user._id);
    user.skillPoints += score;

    if (!user.completedQuizzes.includes(quiz._id)) {
      user.completedQuizzes.push(quiz._id);
    }

    // Award badges based on performance
    if (correctAnswers === quiz.questions.length && !user.badges.find(b => b.name === 'Perfect Score')) {
      user.badges.push({
        name: 'Perfect Score',
        icon: '🏆'
      });
    }

    await user.save();

    res.json({
      score,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      percentage: (correctAnswers / quiz.questions.length) * 100,
      pointsEarned: score,
      newTotalPoints: user.skillPoints
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create quiz (Admin)
// @route POST /api/quizzes
// @access Private
const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getQuizzes,
  getQuiz,
  submitQuiz,
  createQuiz
};
