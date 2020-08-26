const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Skill = new Schema({
    id: {
        type: String,
        unique: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    children: [String],
    links: {
        type: [{
            name: String,
            source: String,
        }],
        required: true
    }
});

module.exports = mongoose.model('Skill', Skill);
