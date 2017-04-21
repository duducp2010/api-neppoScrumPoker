const Project = require('../models/project');

exports.getAllProjects = function (req, res, next) {
    Project.find(function (err, projects) {
        if (err) return res.send(500, {error: err});

        res.json(projects);
    });
};

exports.getProject = function (req, res, next) {
    Project.findById(req.params.id_project, function (err, project) {
        if (err) return res.send(500, {error: err});

        res.json(project);
    });
};

exports.create = function (req, res, next) {
    Project.create({
        title: req.body.title,
        description: req.body.description,
        date_init: req.body.date_init,
        date_end: req.body.date_end,
        status: req.body.status,
        cards: req.body.cards,
        time: req.body.time,
        id_user: req.body.id_user
    }, function (err, project) {
        if (err) return res.send(500, {error: err});

        res.json({
            message: 'Projeto criado com sucesso!',
            project: project
        });
    });
};

exports.update = function (req, res, next) {
    Project.findByIdAndUpdate(req.params.id_project, {$set: req.body}, {new: true}, function (err, updateProject) {
        if (err) return res.send(500, {error: err});

        res.json({
            message: 'Atualizado com sucesso!',
            project: updateProject
        });
    });
};

exports.delete = function (req, res, next) {
    var user_id = req.user._id;
    var id_project = req.params.id_project;

    Project.findById(id_project, function (err, foundProject) {
        if (err) {
            res.status(422).json({error: 'Projeto não encontrado'});
            return next(err);
        }

        if (foundProject.id_user != user_id) {
            res.status(401).json({error: 'Você não está autorizado a excluir este projeto.'});
            return next('Não autorizado');
        }

        Project.remove({
            _id: id_project
        }, function (err, deleted) {
            if (err) return res.send(500, {error: err});

            return res.json({
                message: 'Projeto excluído com sucesso!',
                project: deleted
            });
        });
    });
};