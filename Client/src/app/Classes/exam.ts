import { Question } from './question';

export class Exam {
    constructor (
        public name: string,
        public description: string,
        public allowedTime: number,
        public subject: string,
        public questions: Question[]
    ) {}
}
