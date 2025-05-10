export interface QuizQuestion {
    id: number;
    text: string;
    options: string[];
}

export interface Quiz {
    quizId: string;
    questions: QuizQuestion[];
}

export interface QuizAnswers {
    [questionId: string]: string;
}

export interface FeedbackItem {
    id: number;
    yourAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}

export interface QuizResults {
    correct: number;
    total: number;
    feedback: FeedbackItem[];
}