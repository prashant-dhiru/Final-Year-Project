export class QuestionItem {
    constructor (
        public body: String,
        public answerOptions: String[],
        public correctAnswer: String,
        public marksForCorrectAnswer: number,
        public negativeMark: number,
        public difficulty: String
    ) {}
}
