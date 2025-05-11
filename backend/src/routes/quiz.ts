import express, { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import axios from 'axios';
import Quiz, { IQuestion } from '../models/Quiz';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL!;


router.get('/generate', async (req: Request, res: Response) => {
    try {
        const topic = req.query.topic as string;

        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }

        const existingQuiz = await Quiz.findOne({
            topic: topic.trim().toLowerCase()
        }).sort({ createdAt: -1 });

        if (existingQuiz) {
            console.log(`Found existing quiz for topic: ${topic}`);

            const clientQuiz = {
                quizId: existingQuiz.quizId,
                questions: existingQuiz.questions.map(({ id, text, options }: IQuestion) => ({
                    id,
                    text,
                    options,
                })),
            };

            return res.status(200).json(clientQuiz);
        }

        console.log(`Generating new quiz for topic: ${topic}`);

        const aiResponse = await axios.post(
            `${AI_SERVICE_URL}/generate-quiz`,
            { topic }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const generatedQuestions = aiResponse.data.questions;

        const quizId = nanoid(10);
        const newQuiz = new Quiz({
            quizId,
            topic: topic.trim().toLowerCase(),
            questions: generatedQuestions,
        });

        await newQuiz.save();

        const clientQuiz = {
            quizId,
            questions: generatedQuestions.map(({ id, text, options }: IQuestion) => ({
                id,
                text,
                options,
            })),
        };

        res.status(200).json(clientQuiz);
    } catch (error) {
        console.error('Error generating quiz:', error);
        res.status(500).json({ error: 'Failed to generate quiz' });
    }
});


router.post('/grade', async (req: Request, res: Response) => {
    try {
        const quizId = req.query.quizId as string;

        const { answers } = req.body;

        if (!quizId) {
            return res.status(400).json({ error: 'Quiz ID is required' });
        }
        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({ error: 'Answers are required' });
        }

        const quiz = await Quiz.findOne({ quizId });

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        let correct = 0;
        const feedback = quiz.questions.map(question => {

            const questionId = question.id.toString();
            const userAnswer = answers[questionId];
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) {
                correct++;
            }

            return {
                id: question.id,
                yourAnswer: userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect,
            };
        });

        res.status(200).json({
            correct,
            total: quiz.questions.length,
            feedback,
        });
    } catch (error) {
        console.error('Error grading quiz:', error);
        res.status(500).json({ error: 'Failed to grade quiz' });
    }
});

export default router;