const express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    AuthenticationController = require('./controllers/authentication'),
    ProjectController = require('./controllers/project');

const requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function (app) {

    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        projectRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.get('/protected', requireAuth, function (req, res) {
        res.send({content: 'Success'});
    });

    // Project Routes
    apiRoutes.use('/project', projectRoutes);
    projectRoutes.get('/all', requireAuth, ProjectController.getAllProjects);
    projectRoutes.post('/create', requireAuth, ProjectController.create);
    projectRoutes.post('/delete/:id_project', requireAuth, ProjectController.delete);

    // Set up routes
    app.use('/api', apiRoutes);

};