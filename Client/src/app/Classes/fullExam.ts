import { Question } from './question';

export class FullExam {
    constructor (
        public name: string,
        public description: string,
        public allowedTime: number,
        public subject: string,
        public questions: Question[]
    ) {}
}