const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['career', 'sustainability', 'hybrid'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  technologies: [String],
  estimatedTime: {
    type: String,
    default: '2 weeks'
  },
  points: {
    type: Number,
    default: 100
  },
  resources: [{
    title: String,
    url: String,
    type: String // video, article, tutorial
  }],
  milestones: [{
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  submissions: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    projectUrl: String,
    githubUrl: String,
    notes: String,
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
