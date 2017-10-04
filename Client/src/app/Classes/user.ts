export class User {

    constructor (
        public firstName: String,
        public lastName: String,
        public email: String,
        public phoneNumber: String,
        public password: String,
        public middleName?: String,
        public address?: String
    ) {}
}
