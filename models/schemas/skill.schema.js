const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Skill = new Schema({
    name: {
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

function autoPopulateChildren(next) {
    console.log(this.getQuery());
    this.populate('children');
    next();
}

// Skill
//     .pre('findOne', autoPopulateChildren)
//     .pre('find', autoPopulateChildren);

module.exports = mongoose.model('Skill', Skill);
