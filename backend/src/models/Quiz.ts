import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
}

export interface IQuiz extends Document {
    quizId: string;
    topic: string;
    questions: IQuestion[];
    createdAt: Date;
}

const QuestionSchema = new Schema({
    id: { type: Number, required: true },
    text: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
});

const QuizSchema = new Schema({
    quizId: { type: String, required: true, unique: true },
    topic: { type: String, required: true },
    questions: { type: [QuestionSchema], required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
