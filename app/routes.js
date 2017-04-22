const express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    AuthenticationController = require('./controllers/authentication'),
    UserController = require('./controllers/user'),
    ProjectController = require('./controllers/project');

const requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function (app) {

    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router(),
        projectRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.get('/protected', requireAuth, function (req, res) {
        res.send({content: 'Success'});
    });

    // User Routes
    apiRoutes.use('/user', userRoutes);
    userRoutes.get('/', requireAuth, UserController.getAllUsers);
    userRoutes.get('/:id_user', requireAuth, UserController.getUser);

    // Project Routes
    apiRoutes.use('/project', projectRoutes);
    projectRoutes.get('/', requireAuth, ProjectController.getAllProjects);
    projectRoutes.get('/:id_project', requireAuth, ProjectController.getProject);
    projectRoutes.post('/', requireAuth, ProjectController.create);
    projectRoutes.put('/:id_project', requireAuth, ProjectController.update);
    projectRoutes.delete('/:id_project', requireAuth, ProjectController.delete);

    // Set up routes
    app.use('/api', apiRoutes);

};