const bcrypt = require('bcryptjs');
const User = require('./users');

function comparePass(newPass, hashedPass){
    return bcrypt.compareSync(newPass, hashedPass);
}


module.exports.localAuth = function(username, password){
    return new Promise((resolve, reject) => {
        User.findOne({username: username})
            .then(user => {
                if(comparePass(password, user.password)){
                    user.password = null; // try to remove
                    resolve(user);
                }
            })
            .catch(err => reject(err));
    })
}