export class Question {
    constructor (
        public body: string,
        public answerOptions: string[],
        public correctAnswer: string,
        public marksForCorrectAnswer: number,
        public negativeMark: number,
        public difficulty: string
    ) {}
}
