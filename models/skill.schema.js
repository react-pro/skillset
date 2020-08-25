const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Skill = new Schema({
    name:{
        type: String,
        required: true
    },
    isFirst: Boolean,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    links: [{
        name: String,
        source: String
    }]
});

module.exports = mongoose.model('Skill', Skill);
