var jwt = require('jsonwebtoken');
var User = require('../models/user');
var authConfig = require('../../config/auth');

function generateToken(user) {
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        email: request.email,
        role: request.role
    };
}

exports.login = function (req, res, next) {
    var userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
};

exports.roleAuthorization = function (roles) {
    return function (req, res, next) {
        var user = req.user;

        User.findById(user._id, function (err, foundUser) {
            if (err) {
                res.status(422).json({error: 'Usuário não encontrado..'});
                return next(err);
            }

            if (roles.indexOf(foundUser.role) > -1) {
                return next();
            }

            res.status(401).json({error: 'Você não está autorizado a visualizar este conteúdo'});
            return next('Não autorizado');
        });
    }
};