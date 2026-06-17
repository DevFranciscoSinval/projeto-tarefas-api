const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        enum: ['Baixa', 'Média', 'Alta'],
        default: 'Baixa'
    },
    status: {
        type: String,
        enum: ['A Fazer', 'Em Andamento', 'Concluído'],
        default: 'A Fazer'
    },
    data_limite: {
        type: Date,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);