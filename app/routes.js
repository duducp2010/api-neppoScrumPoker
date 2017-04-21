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
    projectRoutes.get('/', requireAuth, ProjectController.getAllProjects);
    projectRoutes.get('/:id_project', requireAuth, ProjectController.getProject);
    projectRoutes.post('/', requireAuth, ProjectController.create);
    projectRoutes.put('/:id_project', requireAuth, ProjectController.update);
    projectRoutes.delete('/:id_project', requireAuth, ProjectController.delete);

    // Set up routes
    app.use('/api', apiRoutes);

};