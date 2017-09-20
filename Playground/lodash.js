const _ = require('lodash');

const obj = {
    name: {
        first: 'Himanshu',
        last: 'Mittal'
    },
    age: 20,
    contact: {
        phone: 8103755186,
        email: 'mittal01091997@gmail.com'
    }
};

const body = _.pick(obj, ['name.first', 'name.last', 'contact.phone', 'age']);

console.log(body);