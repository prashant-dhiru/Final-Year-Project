export class Question {
    constructor (
        public body: string,
        public answerOptionOne: string,
        public answerOptionTwo: string,
        public answerOptionThree: string,
        public answerOptionFour: string,
        public correctAnswer?: string,
        public marksForCorrectAnswer?: number,
        public negativeMark?: number,
        public difficulty?: string,
        public _id?: string,
        public __v?: number
    ) {}
}

// body,
// answerOptionOne,
// answerOptionTwo,
// answerOptionThree,
// answerOptionFour,
// correctAnswer,
// marksForCorrectAnswer,
// negativeMark,
// difficulty,
// _id,
// __v