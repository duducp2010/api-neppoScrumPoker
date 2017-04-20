var AuthenticationController = require('./controllers/authentication'),
    TodoController = require('./controllers/todos'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function (app) {

    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.get('/protected', requireAuth, function (req, res) {
        res.send({content: 'Success'});
    });

    // Todos Routes
    apiRoutes.use('/projeto', todoRoutes);

    todoRoutes.get('/list-all', requireAuth, function (req, res) {
        res.send({content: 'Success'});
    });

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader', 'creator', 'editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator', 'editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);

    // Set up routes
    app.use('/api', apiRoutes);

};