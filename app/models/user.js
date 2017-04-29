var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Informe seu nome e sobrenome']
    },
    email: {
        type: String,
        lowercase: true,
        index: {unique: true},
        required: [true, 'Um e-mail deve ser informado'],
        validate: function (email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    password: {
        type: String,
        required: [true, 'Uma senha deve ser informada']
    },
    department: {
        type: String,
        required: [true, 'Informe o departamento do usuário']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 5;

    // Verifica se o hash da senha foi modificado (ou é novo)
    if (!user.isModified('password')) return next();

    // Gera o Salt
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err);

        // Gera o Hash da senha junto com o Salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // substitui a senha da variavel pelo hash
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);