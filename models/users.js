const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    createdDate: {type: Date},
    lastLoginDate: {type: Date},
});

const User = mongoose.model('user', userSchema);

module.exports = User;

const hashPassword = password => bcrypt.hashSync(password, 10);

module.exports.getUserModel = function(username){
    return new Promise((resolve, reject) => {
        User.findOne({username, username})
            .then(user => {
                user.password = undefined;
                resolve(user)
            })  
            .catch(err => {
                reject(err)
            }) 
    })
}

module.exports.addUserModel = function(userData){
    return new Promise((resolve, reject) => {
        let now = Date.now();
        userData.createdDate = now;
        userData.password = hashPassword(userData.password);

        let newUser = new User(userData);
        newUser.save()
            .then(user => {
                user.password = undefined;
                resolve(user)
            })  
            .catch(err => {
                reject(err)
            })  
    })
}

module.exports.modifyUserModel = function(userID, modifiedData){
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(userID, modifiedData)
            .then(resp => {
                resolve(resp)
            })  
            .catch(err => {
                reject(err)
            })
    })
}

module.exports.updateUserModel = function(userID, updatedData){
    return new Promise((resolve, reject) => {
        //? password is a problem here
        updatedData.password = hashPassword(updatedData.password);
        User.findByIdAndUpdate(userID, updatedData)
            .then(resp => {
                resolve(resp)
            })  
            .catch(err => {
                reject(err)
            }) 
    })
}

module.exports.removeUserModel = function(userID){
    return new Promise((resolve, reject) => {
        User.findByIdAndRemove(userID)
            .then(resp => {
                resolve(resp)
            })  
            .catch(err => {
                reject(err)
            }) 
    })
}