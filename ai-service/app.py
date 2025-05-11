from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route('/health')
def health_check():
    return jsonify({"status": "ok"})


@app.route('/generate-quiz', methods=['POST'])
async def generate_quiz():
    try:
        data = request.get_json()
        topic = data.get('topic', '')
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
            
        return jsonify(quiz_data)
    except Exception as e:
        print(f"Error generating quiz: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

