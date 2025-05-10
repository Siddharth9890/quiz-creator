import { Quiz, QuizAnswers, QuizResults } from "@/lib/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL!;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const generateQuiz = async (topic: string): Promise<Quiz> => {
    try {

        const response = await apiClient.get<Quiz>("/generate", {
            params: { topic },
        });

        return response.data;
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate quiz. Please try again.");
    }
};

export const gradeQuiz = async (
    quizId: string,
    answers: QuizAnswers
): Promise<QuizResults> => {
    try {

        const response = await apiClient.post<QuizResults>(
            "/grade",
            { answers },
            { params: { quizId } }
        );
        
        return response.data;
    } catch (error) {
        console.error("Error grading quiz:", error);
        throw new Error("Failed to grade quiz. Please try again.");
    }
};
