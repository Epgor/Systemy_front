import { Answer } from "./answer";
export interface Question {
    questionText: string;
    answers: Answer[];
}