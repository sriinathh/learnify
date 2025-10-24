# 🎓 Learnify - AI-Powered Gamified EdTech Platform

Learnify is a full-stack web application that bridges academic learning, career skills, and environmental education through AI mentorship, gamification, and community engagement.

## 🌟 Features

### Core Features
- **AI-Powered Mentor Chatbot** - Get personalized guidance using Mistral AI
- **Personalized Learning Paths** - Adaptive recommendations based on your profile
- **Gamified Environmental Learning** - Complete eco-challenges and earn badges
- **Technical Skill Development** - Take quizzes and build projects
- **Community Forum** - Ask questions, share projects, and connect with peers
- **Dashboard Analytics** - Track your progress with visual charts
- **Leaderboard System** - Compete with classmates in skills and eco-actions
- **Badge & Points System** - Earn rewards for completing activities

### Environmental Focus
- Waste Management
- Biodiversity Conservation
- Energy Efficiency
- Water Conservation
- Sustainable Transportation

## 🏗️ Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **Mistral AI** - AI chatbot and recommendations
- **bcryptjs** - Password hashing

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Axios** - API calls
- **Lucide React** - Icons

## 📁 Project Structure

```
learnify/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── quizController.js
│   │   ├── challengeController.js
│   │   ├── projectController.js
│   │   ├── communityController.js
│   │   ├── userController.js
│   │   └── aiController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Quiz.js
│   │   ├── Challenge.js
│   │   ├── Project.js
│   │   ├── CommunityPost.js
│   │   └── Skill.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── challengeRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── communityRoutes.js
│   │   ├── userRoutes.js
│   │   └── aiRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── utils/
│   │   └── aiIntegration.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx (Landing)
    │   ├── auth/
    │   │   ├── login/page.tsx
    │   │   └── register/page.tsx
    │   ├── dashboard/page.tsx
    │   ├── quiz/page.tsx
    │   ├── projects/page.tsx
    │   ├── eco-challenges/page.tsx
    │   ├── community/page.tsx
    │   └── career-roadmap/page.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── Chatbot.tsx
    │   ├── DashboardCard.tsx
    │   ├── Leaderboard.tsx
    │   └── ... (other components)
    ├── lib/
    │   ├── api.ts
    │   └── AuthContext.tsx
    ├── tailwind.config.ts
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Mistral AI API Key** (sign up at mistral.ai)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd learnify
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# MONGODB_URI=mongodb://localhost:27017/learnify
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/learnify
# JWT_SECRET=your_strong_random_secret
# MISTRAL_API_KEY=your_mistral_api_key
# PORT=5000

# Start development server
npm run dev

# Or production mode
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get single quiz
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `POST /api/quizzes` - Create quiz (Admin)

### Challenges
- `GET /api/challenges` - Get all eco-challenges
- `GET /api/challenges/:id` - Get single challenge
- `POST /api/challenges/:id/complete` - Complete challenge
- `GET /api/challenges/my-challenges` - Get user's completed challenges

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects/:id/submit` - Submit project

### Community
- `GET /api/community` - Get all posts
- `POST /api/community` - Create new post
- `GET /api/community/:id` - Get single post
- `POST /api/community/:id/reply` - Add reply to post
- `PUT /api/community/:id/upvote` - Upvote post

### Users
- `GET /api/users/leaderboard` - Get leaderboard
- `GET /api/users/stats` - Get user statistics

### AI
- `GET /api/ai/recommendations` - Get AI recommendations
- `POST /api/ai/chat` - Chat with AI mentor
- `POST /api/ai/study-plan` - Generate study plan

## 🎮 Usage

### For Students
1. **Register** with your email, name, branch, and year
2. **Complete your profile** with learning goals
3. **Take quizzes** to earn skill points
4. **Complete eco-challenges** to earn eco points and badges
5. **Build projects** to apply your skills
6. **Chat with AI mentor** for personalized guidance
7. **Join community** to ask questions and share knowledge
8. **Track progress** on your dashboard

### For Educators/Admins
- Create custom quizzes and challenges
- Monitor student progress
- Facilitate community discussions
- Award badges for achievements

## 🏆 Gamification System

### Points
- **Skill Points**: Earned from quizzes and projects
- **Eco Points**: Earned from environmental challenges

### Levels
- Users level up based on total points
- Each level unlocks new features and challenges

### Badges
- 🏆 Perfect Score - Ace a quiz
- 🎯 First Project - Complete your first project
- 👨‍💻 Project Master - Complete 5+ projects
- 🌱 Eco Warrior - Reach high eco levels
- Custom badges for special achievements

## 🤖 AI Features

### Chatbot Mentor
- Ask academic questions
- Get career guidance
- Learn about environmental actions
- Receive study tips

### Personalized Recommendations
- Course suggestions based on your branch and goals
- Project ideas tailored to your skill level
- Eco-challenges matching your interests

### Study Plan Generator
- Create custom 4-week learning plans
- Realistic time commitments
- Integrated sustainability learning

## 🌍 Environmental Impact

Learnify promotes:
- **SDG 4**: Quality Education
- **SDG 13**: Climate Action
- **SDG 15**: Life on Land
- **SDG 17**: Partnerships for Goals

Track your environmental impact:
- Trees planted
- Waste recycled
- Carbon footprint reduced
- Water conserved

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- CORS configuration

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Accessible components

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set `NEXT_PUBLIC_API_URL` to your backend URL
3. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Add database user
3. Whitelist IP addresses
4. Update `MONGODB_URI` in backend .env

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by [Your Team Name]

## 📧 Contact

For questions or support, reach out at: [your-email@example.com]

## 🙏 Acknowledgments

- Mistral AI for chatbot capabilities
- MongoDB for database hosting
- Next.js team for the amazing framework
- Open source community

---

**Happy Learning! 🚀🌱**
