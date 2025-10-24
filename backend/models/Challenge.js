const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
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
    enum: ['waste-management', 'biodiversity', 'energy', 'water', 'transportation'],
    required: true
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  ecoPoints: {
    type: Number,
    required: true
  },
  actionType: {
    type: String,
    enum: ['one-time', 'recurring', 'habit'],
    default: 'one-time'
  },
  verificationMethod: {
    type: String,
    enum: ['photo', 'geotag', 'self-report', 'none'],
    default: 'self-report'
  },
  instructions: [String],
  tips: [String],
  icon: String,
  badgeAwarded: {
    name: String,
    icon: String
  },
  completions: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    proof: {
      type: String, // URL to uploaded image or geotag data
      default: ''
    },
    notes: String,
    completedAt: {
      type: Date,
      default: Date.now
    },
    verified: {
      type: Boolean,
      default: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);
