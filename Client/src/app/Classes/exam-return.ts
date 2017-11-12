import { QuestionAnswer } from './question-answer';

export class ExamReturn {
    constructor (
        public totalTimeTaken: number,
        public marksObtained: number,
        public exam?: string,
        public user?: string,
        public questionAnswers?: QuestionAnswer[],
        public totalQuestionAttempted?: number,
        public totalQuestionNotAttempted?: number,
        public percentageOfQuestionAttempted?: number,
        public percentageOfQuestionNotAttempted?: number,
        public _id?: string,
        public __v?: number
    ) {}
}
