const User = require('../models/users');
const { createErrorResponse, createResponse } = require('./responses');

module.exports = {
    getUser: function(req, res){
        let username = req.params.username;
        if(!username){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        User.getUserModel(username)
            .then(resp => {
                return createResponse(res, 200, resp);
            })
            .catch(err => {
                return createErrorResponse(res, 404, err);
            })
    },
    addUser: function(req, res){
        let body = req.body;
        if(body.username && body.password && body.email){
            let userData = {
                username: body.username,
                password: body.password,
                email: body.email
            }

            User.addUserModel(userData)
                .then(resp => {
                    return createResponse(res, 201, resp);
                })
                .catch(err => {
                    let errorInfo = {
                        msg: 'mongoose Error',
                        original: err.errmsg
                    }

                    if(err.code === 11000){
                        errorInfo = {
                            msg: 'Duplicate Entry',
                            original: err.errmsg
                        }
                    }

                    return createErrorResponse(res, 400, errorInfo);
                })
        }else{
            return createErrorResponse(res, 400, 'Not All Parameters Provided')
        }
    },
    modifyUser: function(req, res){
        let id = req.params.id;
        if(!id){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        let body = req.body;
        if(!body){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        User.modifyUserModel(id, body)
            .then(resp => {
                return createResponse(res, 204, null);
            })
            .catch(err => {
                return createErrorResponse(res, 404, err);
            })
    },
    updateUser: function(req, res){
        let id = req.params.id;
        if(!id){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        let body = req.body;
        if(!body){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        User.updateUserModel(id, body)
            .then(resp => {
                return createResponse(res, 204, null);
            })
            .catch(err => {
                return createErrorResponse(res, 404, err);
            })
    },
    removeUser: function(req, res){
        let id = req.params.id;
        if(!id){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        User.removeUserModel(id)
            .then(resp => {
                return createResponse(res, 204, null);
            })
            .catch(err => {
                return createErrorResponse(res, 404, err);
            })
    },
}