var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Informe o título para o projeto']
    },
    description: {
        type: String,
        required: [true, 'Informe uma descrição para o projeto']
    },
    date_init: {
        type: Date,
        required: [true, 'Informe a data de ínicio para votação do projeto']
    },
    date_end: {
        type: Date
    },
    status: {
        type: String
    },
    cards: {
        type: [String],
        required: [true, 'Informe as cartas que serão usadas durante a votação'],
        min: [2, 'Informe no mínimo 2 cartas']
    },
    team: {
        type: [String],
        required: [true, 'Informe os usuário que poderão votar no projeto.']
    },
    id_user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);
