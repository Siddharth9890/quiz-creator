# Quiz Creator AI - Backend API 🚀

Node.js/TypeScript backend API for Quiz Creator AI, providing RESTful endpoints for quiz management and user interactions.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Docker** - Containerization
- **Mongoose** - ODM for MongoDB

## 📋 Prerequisites

- Node.js 18+
- MongoDB 6+
- Docker and Docker Compose
- TypeScript 5+

## 🔧 Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/quiz-db
   AI_SERVICE_URL=http://localhost:5000
   NODE_ENV=development
   ```

   > 📝 Refer to `.env.example` for all available environment variables

5. Start development server:
   ```bash
   npm run dev
   ```

## 🏗️ Build

Build TypeScript to JavaScript:
```bash
npm run build
```


## 🐳 Docker

Build and run with Docker:
```bash
docker build -t quiz-backend .
docker run -p 3000:3000 quiz-backend
```


## 📁 Project Structure

```
backend/
├── src/
│   ├── models/       # Database models
│   ├── routes/       # API routes
└── .env.example      # Environment variables template
```

## 📚 API Endpoints

### Quiz Generation
```
GET /api/generate?topic={topic}
```
Generates a new quiz on the specified topic.

**Response:**
```json
{
  "quizId": "abc123",
  "questions": [
    {
      "id": 1,
      "text": "Question text",
      "options": ["A", "B", "C", "D"]
    }
  ]
}
```

### Quiz Submission
```
POST /api/submit
```
Submits quiz answers for scoring.

**Request Body:**
```json
{
  "quizId": "abc123",
  "answers": {
    "1": "A",
    "2": "B",
    "3": "C",
    "4": "D",
    "5": "A"
  }
}
```

**Response:**
```json
{
  "score": 4,
  "total": 5,
  "percentage": 80,
  "feedback": [
    {
      "questionId": 1,
      "correct": true,
      "correctAnswer": "A",
      "userAnswer": "A"
    }
  ]
}
```

### Health Check
```
GET /api/health
```
Returns server health status.


## 🚀 Deployment

### Render Deployment

1. Create a new Web Service on Render choose Docker
2. Add environment variables:
   - `MONGODB_URI`
   - `AI_SERVICE_URL`
   - `NODE_ENV=production`
