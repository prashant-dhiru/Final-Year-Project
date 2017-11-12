export class ExamAnalysis {
    constructor (
        public cutOff: number,
        public studentsAttempted: number,
        public averageQuestionsAttempted: number,
        public averageTimeSpent: number,
        public exam?: string,
        public questionAnalysis?: string,
        public _id?: string,
        public __v?: number
    ) {}
}
