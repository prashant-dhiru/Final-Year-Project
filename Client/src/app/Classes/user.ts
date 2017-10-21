export class User {

    constructor (
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public password: string,
        public studentClass: string,
        public middleName?: string,
        public address?: string,
        public _id?: string,
        public __v?: number
    ) {}
}
