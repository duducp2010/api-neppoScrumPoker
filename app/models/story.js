var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Informe o título da Estória']
    },
    description: {
        type: String,
        required: [true, 'Informe uma descrição para a Estória']
    },
    id_project: {
        type: String,
        required: true
    },
    time_total: String,
    voting: {id_user: String, note: Number}
}, {
    timestamps: true
});

module.exports = mongoose.model('Story', StorySchema);