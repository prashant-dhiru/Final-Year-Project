// creating a private member for class Admin
var password = '';

// creating class Admin and assignin the passwod passed in as arguement in constructor
function Admin (pass) {
    password = pass;
};

// creating a function for getting the password, as the password is private
Admin.prototype.getPassword = function() {
    return password;
};

//creating a new admin as adminpass as password
var admin = new Admin('adminpass');

//exporting the admin to be used
module.exports = admin;