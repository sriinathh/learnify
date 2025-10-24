const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/challenges', require('./routes/challengeRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Welcome to Learnify API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      quizzes: '/api/quizzes',
      challenges: '/api/challenges',
      projects: '/api/projects',
      community: '/api/community',
      users: '/api/users',
      ai: '/api/ai'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Learnify backend server running on port ${PORT}`);
});
