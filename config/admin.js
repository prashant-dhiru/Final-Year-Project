var password = '';

function Admin (pass) {
    password = pass;
};

Admin.prototype.getPassword = function() {
    return password;
};

var admin = new Admin('adminpass');

module.exports = admin;