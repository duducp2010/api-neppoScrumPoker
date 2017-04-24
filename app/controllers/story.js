const Story = require('../models/story');

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

exports.getAllStoryProject = function (req, res, next) {
    const sortObj = sortAndOrderBy(req.query.sort, req.query.orderBy);
    const limit = req.query.limit;
    const select = req.query.select;

    const search = {};
    search[req.query.key] = req.query.text;
    search['id_project'] = req.params.id_project;

    var query = Story.find(search)
        .sort(sortObj)
        .limit(Number(limit))
        .select(select);

    query.exec(function (err, users) {
        if (err) return res.send(500, {error: err});
        res.json(users);
    });
};

exports.getStory = function (req, res, next) {
    const select = req.query.select;

    var query = Story.find({$and: [{id_project: req.params.id_project}, {_id: req.params.id_story}]}).select(select);
    query.exec(function (err, users) {
        if (err)
            return res.send(500, {message: 'Erro ao buscar estória', error: err});

        if (!users || !users.length)
            return res.send(422, {message: 'Nenhuma estória foi encontrada'});

        return res.json(users);
    });
};

exports.create = function (req, res, next) {
    Story.create({
        title: req.body.title,
        description: req.body.description,
        time_total: req.body.time_total,
        id_project: req.params.id_project,
        voting: {
            id_user: req.body.voting.id_user,
            note: req.body.voting.note
        }
    }, function (err, story) {
        if (err) return res.send(500, {error: err});

        res.json({
            message: 'Estória cadastrada com sucesso',
            story: story
        });
    });
};

exports.update = function (req, res, next) {
    var optionsObj = {
        new: true,
        upsert: true
    };

    const id_project = req.params.id_project;
    const id_story = req.params.id_story;

    var query = Story.find({$and: [{id_project: id_project}, {_id: id_story}]});
    query.exec(function (err, foundStory) {
        if (err)
            return res.send(500, {message: 'Erro ao buscar estória', error: err});

        if (!foundStory || !foundStory.length)
            return res.send(422, {message: 'Nenhuma estória foi encontrada'});

        Story.findByIdAndUpdate(id_story, {$set: req.body}, optionsObj, function (err, updateStory) {
            if (err)
                return res.send(500, {message: 'Erro ao atualizar estória', error: err});

            res.json({
                message: 'Estória atualizada com sucesso',
                story: updateStory
            });
        });
    });
};

exports.delete = function (req, res, next) {
    const id_project = req.params.id_project;
    const id_story = req.params.id_story;

    var query = Story.find({$and: [{id_project: id_project}, {_id: id_story}]});
    query.exec(function (err, foundStory) {
        if (err)
            return res.send(500, {message: 'Erro ao buscar estória', error: err});

        if (!foundStory || !foundStory.length)
            return res.send(422, {message: 'Nenhuma estória foi encontrada'});

        if (req.query.key) {
            var obj = {};
            obj[req.query.key] = 1;

            Story.findByIdAndUpdate(id_story, {$unset: obj}, {new: true}, function (err, foundProject) {
                if (err)
                    return res.send(500, {message: 'A key ' + req.query.key + ' não pode ser excluída', error: err});

                return res.json({
                    message: 'A key ' + req.query.key + ' foi excluída',
                    project: foundProject
                });
            });
        } else {
            Story.remove({$and: [{id_project: id_project}, {_id: id_story}]}, function (err, deleted) {
                if (err)
                    return res.send(500, {message: 'Erro ao excluir estória', error: err});

                return res.json({message: 'Estória excluída com sucesso'});
            });
        }
    });
};