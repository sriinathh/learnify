const express = require('express');
const router = express.Router();
const { getProjects, getProject, submitProject, createProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getProjects);
router.get('/:id', protect, getProject);
router.post('/:id/submit', protect, submitProject);
router.post('/', protect, createProject);

module.exports = router;
