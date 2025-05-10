from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import os
import openai
from dotenv import load_dotenv
import json

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI(title="Quiz Creator AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuizRequest(BaseModel):
    topic: str

class Question(BaseModel):
    id: int
    text: str
    options: List[str]
    correctAnswer: str

class QuizResponse(BaseModel):
    questions: List[Question]

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/generate-quiz", response_model=QuizResponse)
async def generate_quiz(request: QuizRequest):
    try:
        prompt = f"""
        Create a multiple-choice quiz with 5 questions about {request.topic}.
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
        }},
        ... and so on for 5 questions
        ]
        }}
        Make sure the questions are accurate, challenging but fair, and cover different aspects of {request.topic}.
        """
        
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        response = client.chat.completions.create(
            model="gpt-4.1",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that creates educational quizzes."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
        )
        
        content = response.choices[0].message.content
        quiz_data = json.loads(content)
        
        if "questions" not in quiz_data or len(quiz_data["questions"]) != 5:
            raise ValueError("Invalid quiz format returned by AI")
            
        return quiz_data
    except Exception as e:
        print(f"Error generating quiz: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate quiz")
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)

