const Project = require('../models/Project');
const User = require('../models/User');

// @desc Get all projects
// @route GET /api/projects
// @access Private
const getProjects = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const projects = await Project.find(filter);
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get single project
// @route GET /api/projects/:id
// @access Private
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('submissions.userId', 'name email');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Submit project
// @route POST /api/projects/:id/submit
// @access Private
const submitProject = async (req, res) => {
  try {
    const { projectUrl, githubUrl, notes } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if already submitted
    const alreadySubmitted = project.submissions.find(
      s => s.userId.toString() === req.user._id.toString()
    );

    if (alreadySubmitted) {
      return res.status(400).json({ message: 'Project already submitted' });
    }

    // Add submission
    project.submissions.push({
      userId: req.user._id,
      projectUrl: projectUrl || '',
      githubUrl: githubUrl || '',
      notes: notes || ''
    });

    await project.save();

    // Update user points and completed projects
    const user = await User.findById(req.user._id);
    user.skillPoints += project.points;

    if (!user.completedProjects.includes(project._id)) {
      user.completedProjects.push(project._id);
    }

    // Award project completion badge
    if (user.completedProjects.length === 1) {
      user.badges.push({
        name: 'First Project',
        icon: '🎯'
      });
    }

    if (user.completedProjects.length >= 5 && !user.badges.find(b => b.name === 'Project Master')) {
      user.badges.push({
        name: 'Project Master',
        icon: '👨‍💻'
      });
    }

    await user.save();

    res.json({
      message: 'Project submitted successfully!',
      pointsEarned: project.points,
      newTotalPoints: user.skillPoints
    });
  } catch (error) {
    console.error('Submit project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create project (Admin)
// @route POST /api/projects
// @access Private
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  getProject,
  submitProject,
  createProject
};
