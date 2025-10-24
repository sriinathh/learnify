const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'environmental', 'general'],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number, // Index of correct option
    explanation: String,
    points: {
      type: Number,
      default: 10
    }
  }],
  totalPoints: {
    type: Number,
    default: 0
  },
  timeLimit: {
    type: Number, // in minutes
    default: 15
  },
  attempts: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    score: Number,
    totalQuestions: Number,
    correctAnswers: Number,
    timeTaken: Number, // in seconds
    completedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);
