export class Question {
    constructor (
        public body: string,
        public answerOptionOne: string,
        public answerOptionTwo: string,
        public answerOptionThree: string,
        public answerOptionFour: string,
        public correctAnswer: string,
        public marksForCorrectAnswer: number,
        public negativeMark: number,
        public difficulty: string
    ) {}
}