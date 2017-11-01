import { Question } from './question';

export class Exam {
    constructor (
        public name: string,
        public allowedTime: number,
        public subject: string,
        public description?: string,
        public _id?: string,
        public __v?: number,
        public questions?: Question[],
        public hasUserAttempted?: boolean
    ) {}
}
