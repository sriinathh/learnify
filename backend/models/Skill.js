const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'environmental', 'soft-skill', 'career'],
    required: true
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  resourcesCompleted: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
