const Project = require('../models/project');

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
        if (err) {
            res.send(err);
        }

        res.send(project);
    });
};