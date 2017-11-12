export class AggregateExamQuestionAnalysis {
    constructor (
        public avreageTimeTakenByStudentsWhoGotThisQuestionRight: number,
        public percentageOfStudentWhoAttemptedGotThisQuestionRight: number,
        public percentageOfStudentWhoAttempted: number,
        public avreageTimeTakenByStudents: number,
        public studentsAttempted: number,
        public cutOff: number,
        public exam?: string,
        public question?: string,
        public _id?: string,
        public __v?: string
    ) {}
}
