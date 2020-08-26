const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Skill = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
    }],
    links: {
        type: [{
            name: String,
            source: String,
        }],
        required: true
    }
});

module.exports = mongoose.model('Skill', Skill);
