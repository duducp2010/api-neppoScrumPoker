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
    const select = req.query.select;
    var obj = {};

    obj[req.query.key] = req.query.text; //select key=text

    if (req.query.userTeam === 'true') {
        obj['$or'] = [{'team': req.user._id}, {'id_user': req.user._id}];
    }

    query = Project.find(obj).sort(sortObj).limit(Number(limit)).select(select);
    query.exec(function (err, project) {
        if (err)
            return res.send(500, {message: 'Nenhum projeto foi encontrado', error: err});

        if (!project.length)
            return res.status(422).json({message: 'Nenhum projeto foi encontrado'});

        return res.json(project);
    });
};

exports.getProject = function (req, res, next) {
    const select = req.query.select;

    var obj = {};
    obj['_id'] = req.params.id_project;

    if (req.query.userTeam === 'true')
        obj['$or'] = [{'team': req.user._id}, {'id_user': req.user._id}];

    query = Project.find(obj).select(select);
    query.exec(function (err, project) {
        if (err)
            return res.send(500, {message: 'Nenhum projeto foi encontrado', error: err});

        if (!project.length)
            return res.status(422).json({message: 'Você não tem permissão para visualizar o projeto'});

        return res.json(project);
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
        team: req.body.team,
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
    var updateObj = {
        $set: req.body
    };

    var optionsObj = {
        new: true,
        upsert: true
    };

    Project.findByIdAndUpdate(req.params.id_project, updateObj, optionsObj, function (err, updateProject) {
        if (err)
            return res.send(500, {error: err});

        if (updateProject) {
            res.json({
                message: 'Projeto atualizado com sucesso!',
                project: updateProject
            });
        }

        res.status(422).json({message: 'Nenhum projeto encontrado'});
    });
};

exports.delete = function (req, res, next) {
    const id_project = req.params.id_project;

    if (req.query.key) {
        var obj = {};
        obj[req.query.key] = 1;

        Project.findByIdAndUpdate(id_project, {$unset: obj}, {new: true}, function (err, foundProject) {
            if (err.code === 16837)
                return res.status(500).json({message: 'A key ' + req.query.key + ' não pode ser excluida'});

            if (err)
                return res.send(500, {error: err});

            if (foundProject.id_user !== req.user._id) {
                res.status(401).json({message: 'Você não está autorizado a modificar este projeto'});
                return next('Não autorizado');
            }

            return res.json({
                message: 'A key ' + req.query.key + ' foi excluida',
                project: foundProject
            });
        });
    } else {
        Project.findById(id_project, function (err, foundProject) {
            if (err) {
                res.status(422).json({message: 'Projeto não encontrado', error: err});
                return next(err);
            }

            if (foundProject.id_user !== req.user._id) {
                res.status(401).json({message: 'Você não está autorizado a excluir este projeto'});
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
    }
};