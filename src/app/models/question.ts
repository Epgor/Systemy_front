import { Answer } from "./answer";
export interface Question {
    questionId?: number;
    questionText: string;
    answers: Answer[];
}