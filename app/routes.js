const express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    AuthenticationController = require('./controllers/authentication'),
    UserController = require('./controllers/user'),
    ProjectController = require('./controllers/project'),
    StoryController = require('./controllers/story');

const requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function (app) {

    const versionApi = express.Router(),
        apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router(),
        projectRoutes = express.Router(),
        storyRoutes = express.Router();

    // Set up routes
    app.use('/api', versionApi);

    // Api V1
    versionApi.use('/v1',
        // Auth Routes
        apiRoutes.use('/auth',
            authRoutes.post('/register', AuthenticationController.register),
            authRoutes.post('/login', requireLogin, AuthenticationController.login),
            authRoutes.get('/protected', requireAuth, function (req, res) {
                res.send({content: 'Success'});
            })
        ),

        // User Routes
        apiRoutes.use('/user',
            userRoutes.get('/', requireAuth, UserController.getAllUsers),
            userRoutes.get('/:id_user', requireAuth, UserController.getUser)
        ),

        // Project Routes
        apiRoutes.use('/project',
            projectRoutes.get('/', requireAuth, ProjectController.getAllProjects),
            projectRoutes.get('/:id_project', requireAuth, ProjectController.getProject),
            projectRoutes.post('/', requireAuth, ProjectController.create),
            projectRoutes.put('/:id_project', requireAuth, ProjectController.update),
            projectRoutes.delete('/:id_project', requireAuth, ProjectController.delete)
        ),

        // Story Routes
        apiRoutes.use('/story',
            storyRoutes.get('/:id_project/:id_story', requireAuth, StoryController.getStory),
            storyRoutes.get('/:id_project', requireAuth, StoryController.getAllStoryProject),
            storyRoutes.post('/:id_project', requireAuth, StoryController.create),
            storyRoutes.put('/:id_project/:id_story', requireAuth, StoryController.update),
            storyRoutes.delete('/:id_project/:id_story', requireAuth, StoryController.delete)
        )
    );
};