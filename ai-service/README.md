
# Quiz Creator AI - AI Service 🤖

Python Flask service for Quiz Creator AI that handles AI-powered quiz generation using OpenAI's GPT models.

## 🛠️ Tech Stack

- **Python 3.9+** - Programming language
- **Flask** - Web framework
- **OpenAI API** - AI model for quiz generation
- **Docker** - Containerization
- **python-dotenv** - Environment variable management

## 📋 Prerequisites

- Python 3.9+
- pip or poetry
- OpenAI API key
- Docker

## 🔧 Setup

1. Navigate to the ai-service directory:
   ```bash
   cd ai-service
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Configure environment variables:
   ```
   OPENAI_API_KEY=sk-your-openai-api-key
   ```

   > 📝 Refer to `.env.example` for all available environment variables

6. Start the service:
   ```bash
   python app.py
   ```

## 🐳 Docker

Build and run with Docker:
```bash
docker build -t quiz-ai-service .
docker run -p 5000:5000 -e OPENAI_API_KEY=your-key quiz-ai-service
```

## 📁 Project Structure

```
ai-service/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── Dockerfile         # Docker configuration
├── .env.example       # Environment variables template
```

## 📚 API Endpoints

### Health Check
```
GET /health
```
Returns service health status.

**Response:**
```json
{
  "status": "ok",
}
```

### Generate Quiz
```
POST /generate-quiz
```
Generates a quiz based on the provided topic.

**Request Body:**
```json
{
  "topic": "Ancient Rome"
}
```

**Response:**
```json
{
  "questions": [
    {
      "id": 1,
      "text": "Who was the first Roman Emperor?",
      "options": [
        "A. Julius Caesar",
        "B. Augustus",
        "C. Nero",
        "D. Marcus Aurelius"
      ],
      "correctAnswer": "B"
    }
  ]
}
```

## 🤖 AI Configuration

### OpenAI Models

The service support OpenAI models but can extend to other types:
- `gpt-4.1`

### Prompt Engineering

The service uses below crafted prompt to ensure consistent quiz generation:

```python
prompt = f"""
Create a multiple-choice quiz with 5 questions about {topic}.
For each question:
1. Write a clear, concise question
2. Provide exactly 4 options labeled A, B, C, and D
3. Indicate which option is correct

Format your response as a JSON object with this exact structure:
{{
  "questions": [
    {{
      "id": 1,
      "text": "Question text goes here?",
      "options": ["A. Option A", "B. Option B", "C. Option C", "D. Option D"],
      "correctAnswer": "A"
    }}
  ]
}}
"""
```

## 🚀 Deployment

### Render Deployment

1. Create a new Web Service on Render choose Docker

2. Add environment variables:
   - `OPENAI_API_KEY`

