const axios = require('axios');

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

// Get AI recommendations for personalized learning path
const getAIRecommendations = async (userProfile) => {
  try {
    const prompt = `Based on the following student profile, recommend 3-5 relevant learning paths, courses, or projects:
    
    Student Profile:
    - Branch: ${userProfile.branch || 'General'}
    - Year: ${userProfile.year || 'Unknown'}
    - Goals: ${userProfile.goals || 'General skill development'}
    - Current Skill Points: ${userProfile.skillPoints || 0}
    - Current Eco Points: ${userProfile.ecoPoints || 0}
    - Completed Projects: ${userProfile.completedProjects || 0}
    
    Provide recommendations for:
    1. Technical skills to learn
    2. Career-focused projects
    3. Environmental sustainability actions
    
    Format as JSON array with: { title, description, category, difficulty, resources }`;

    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-tiny',
        messages: [
          {
            role: 'system',
            content: 'You are an AI educational advisor for Learnify, an EdTech platform focused on career skills and environmental education. Provide practical, actionable recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Mistral AI Recommendations Error:', error.response?.data || error.message);
    
    // Fallback recommendations if API fails
    return JSON.stringify([
      {
        title: 'Web Development Basics',
        description: 'Learn HTML, CSS, and JavaScript fundamentals',
        category: 'technical',
        difficulty: 'beginner',
        resources: ['FreeCodeCamp', 'MDN Web Docs']
      },
      {
        title: 'Build a Sustainable Energy Calculator',
        description: 'Create a web app to calculate carbon footprint and energy savings',
        category: 'hybrid',
        difficulty: 'intermediate',
        resources: ['Climate Action APIs', 'Chart.js']
      },
      {
        title: 'Start a Campus Recycling Initiative',
        description: 'Organize and lead a waste management program at your institution',
        category: 'environmental',
        difficulty: 'beginner',
        resources: ['EPA Recycling Guide', 'Local Environmental NGOs']
      }
    ]);
  }
};

// Get AI chatbot response
const getChatbotResponse = async (userMessage, context = {}) => {
  try {
    const systemPrompt = `You are an AI mentor for Learnify, helping students with:
    - Academic questions and study tips
    - Career guidance and skill development
    - Environmental sustainability education and actions
    - Project ideas and technical help
    
    Be encouraging, practical, and concise. Provide actionable advice.
    
    User Context:
    - Name: ${context.userName || 'Student'}
    - Branch: ${context.branch || 'General'}
    - Level: ${context.level || 1}
    - Goals: ${context.goals || 'Learning and growth'}`;

    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-tiny',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Mistral AI Chatbot Error:', error.response?.data || error.message);
    
    // Fallback response
    return "I'm here to help you with your learning journey! Could you please rephrase your question or ask about specific topics like career skills, environmental actions, or academic support?";
  }
};

// Generate personalized study plan
const generateStudyPlan = async (userProfile, targetSkills) => {
  try {
    const prompt = `Create a 4-week personalized study plan for:
    
    Student: ${userProfile.name}
    Branch: ${userProfile.branch}
    Year: ${userProfile.year}
    Target Skills: ${targetSkills.join(', ')}
    Goals: ${userProfile.goals}
    
    Include:
    - Weekly learning objectives
    - Daily time commitment (realistic for students)
    - Resources and tutorials
    - Practice projects
    - Environmental sustainability integration
    
    Format as structured JSON with weeks, days, and tasks.`;

    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-small',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational planner creating personalized, achievable study plans.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 1500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Mistral AI Study Plan Error:', error.response?.data || error.message);
    return null;
  }
};

module.exports = {
  getAIRecommendations,
  getChatbotResponse,
  generateStudyPlan
};
