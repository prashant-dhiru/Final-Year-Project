export class QuestionAnswer {
    constructor (
        public question: string,
        public exam: string,
        public timeTaken: number,
        public answerSubmitted: string,
        public isAnswerCorrect?: boolean,
        public marksObtained?: number,
        public _id?: string,
        public __v?: number
    ) {}
}
