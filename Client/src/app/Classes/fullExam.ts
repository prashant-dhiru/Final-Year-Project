import { Question } from './question';

export class FullExam {
    constructor (
        public name: string,
        public allowedTime: number,
        public subject: string,
        public questions: Question[],
        public _id?: string,
        public _v?: number,
        public description?: string
    ) {}
}