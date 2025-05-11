
# Quiz Creator AI 🧠✨

An intelligent quiz generation platform that leverages AI to create customized educational quizzes on any topic. Built with modern technologies and deployed using Docker containers.

## 🎯 Overview

Quiz Creator AI is a full-stack application that allows users to generate, take, and review personalized quizzes. The system uses OpenAI's GPT models to generate high-quality questions and provides instant feedback to users.

## 🏗️ Architecture

The project consists of three main services:

- **Frontend**: React-based web application with Tailwind CSS
- **Backend**: Node.js/TypeScript API server with MongoDB
- **AI Service**: Python Flask service for quiz generation using OpenAI

## 🚀 Services & URLs

| Service | Description | Production URL |
|---------|-------------|----------------|
| Frontend | React Web App | quiz-creator-frontend.vercel.app |
| Backend API | Node.js REST API | https://quiz-creator-backend.onrender.com |
| AI Service | Flask AI Service | https://quiz-creator-fhqm.onrender.com |
| MongoDB | Database | MongoDB Atlas |

## 🎥 Demo Video

[Watch the Demo Video](https://github.com/user-attachments/assets/e7aa8849-6c8f-44e1-8535-6670ce1d5ea8)

> Video showcasing the full functionality of Quiz Creator AI, from quiz generation to scoring. Also since backend is deployed to Render it may take upto 1~2 mins for it to wake up from

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **AI Service**: Python, Flask, OpenAI API
- **Deployment**: Docker, Docker Compose, Vercel, Render
- **Others**: Nginx, MongoDB Atlas

## 📁 Project Structure

```
quiz-creator-ai/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
├── ai-service/        # Python AI service
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker and Docker Compose
- MongoDB
- OpenAI API key

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiz-creator-ai.git
   cd quiz-creator-ai
   ```

2. Set up environment variables for each service:
   ```bash
   cd frontend && cp .env.example .env
   cd backend && cp .env.example .env
   cd ai-service && cp .env.example .env
   ```

3. Configure the environment variables in each .env file

4. Start all services:
   ```bash
   npm run dev
   ```

   Or start services individually:
   ```bash
   # Frontend
   cd frontend && npm install && npm run dev
   
   # Backend
   cd backend && npm install && npm run dev
   
   # AI Service
   cd ai-service && pip install -r requirements.txt && python app.py
   ```



## 🚀 Deployment
### Frontend Deployment (Vercel)
1) Connect github account to vercel and deploy

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository && choose docker and add envs

### AI Service Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository && choose docker and add envs

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Get connection string
3. Update MONGODB_URI in backend environment variables

## 📐 Architectural Trade-offs

### Chosen Approaches:
1. **Microservices Architecture**: Separated frontend, backend, and AI service for better scalability
2. **MongoDB**: NoSQL for flexible quiz data structure
3. **Docker**: Containerization for consistent development and deployment
4. **TypeScript**: Type safety for better developer experience
5. **Caching**: Basic mongodb caching implemented.

### Trade-offs & Future Considerations:
1. **AI Model**: Currently using GPT-4.1 but can switch to better models for better quality

2. **Authentication**: Currently no auth system - JWT implementation needed for user management
3. **Rate Limiting**: No rate limiting implemented - needed to prevent API abuse

4. **Scalability**: Microservices allow independent scaling but increase complexity


## 🧪 Testing Strategy

### Unit Tests

#### Backend Service Tests:
1) Test 1: Quiz generation endpoint


2) Test 2: Quiz submission validation



#### AI Service Tests:

1) Test 2: Quiz generation with valid topic

