const authFunctions = require('../serverFunctions/authFunctions');

module.exports = {
    register: authFunctions.register,
    login: authFunctions.login,
    getUser: authFunctions.getUser
};