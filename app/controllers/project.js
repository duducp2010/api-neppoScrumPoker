const Project = require('../models/project');

function sortAndOrderBy(keySort, keyOrderBy) {
    var sort = 'asc';
    if (keySort)
        sort = keySort;

    var orderBy = 'createdAt';
    if (keyOrderBy)
        orderBy = keyOrderBy;

    const sortObj = {};
    sortObj[orderBy] = sort;

    return sortObj;
}

exports.getAllProjects = function (req, res, next) {
    const sortObj = sortAndOrderBy(req.query.sort, req.query.orderBy);
    const limit = req.query.limit;
    var query = {};

    if (req.query.userTime === 'true') {
        query = Project.find({$or: [{time: req.user._id}, {id_user: req.user._id}]})
            .sort(sortObj)
            .limit(Number(limit));

        query.exec(function (err, project) {
            if (err) return res.send(500, {error: err});
            res.json(project);
        });
    } else {
        query = Project.find()
            .sort(sortObj)
            .limit(Number(limit));

        query.exec(function (err, projects) {
            if (err) return res.send(500, {error: err});
            res.json(projects);
        });
    }
};

exports.getProject = function (req, res, next) {
    if (req.query.userTime === 'true') {
        Project.find({
            _id: req.params.id_project,
            $or: [{'time': req.user._id}, {'id_user': req.user._id}]
        }, function (err, project) {
            if (err) return res.send(500, {error: err});

            res.json(project);
        });
    } else {
        Project.findById(req.params.id_project, function (err, project) {
            if (err) return res.send(500, {error: err});

            res.json(project);
        });
    }
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